const { validationResult, matchedData, checkSchema, oneOf, body } = require('express-validator');
const createUserValidationSchema = require("../utils/createUserValidationSchema.js");

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../model/user.js');


// route: POST /api/v1/user/signup
// create user 
router.post('/signup', 
    checkSchema(createUserValidationSchema),
    async (req, res) => {
    try {
        // check validation
        const expressValidationResult = validationResult(req);
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields",
                error: expressValidationResult.array()});
        }
        const validData = matchedData(req);

        // hash password
        const password = validData.password;
        const saltRounds = 10; // defines computational cost, default 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: validData.username,
            email: validData.email,
            password: passwordHash
        });
        await newUser.save(); // persist to db

        // on success
        res.status(201).json({
            message: "User created successfully.",
            username: newUser.username,
            user_id: newUser._id
        });
    } catch (err) {
        if('code' in err && err.code == 11000){
            return res.status(500).send({ 
                message: "Username or email already exists.", 
                status: 'Status 500: internal server error', 
                error: err 
            });
        }

        return res.status(500).send({ 
            message: "Signup operation failed.", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
    
});

// route: POST /api/v1/user/login
// authenticate login by username/email
router.post('/login', 
    oneOf([body('username').notEmpty(), body('email').notEmpty()],
    { message: "Username or email must be provided."}),
    body('password')
        .notEmpty().withMessage('Password cannot be empty.')
        .isString().withMessage('Password must be a string.'),
    async (req, res) => {
    try {
        const expressValidationResult = validationResult(req);
        if(!expressValidationResult.isEmpty()){
            return res.status(400).send({
                message: "Oops, you've entered some invalid fields.\n",
                error: expressValidationResult.array()});
        }

        // extract from request body
        const {email, username, password} = matchedData(req);
        const credentials = email || username; // either email or user

        const user = await User.findOne({
            $or: [{email: credentials}, {username: credentials}] // query both fields for match
        });

        if(!user)
            return res.status(404).send({status: false, message: "User cannot be found."})

        const result = await bcrypt.compare(password, user.password); // check pw
        if (!result)
            return res.status(401).send({status: false, message: "Authentication unsuccessful."}); 
        
        const token = jwt.sign({ 
            id: user.id, username: user.username}, // payload: no role-based auth for this assignment
            process.env.JWT_SECRET, // secret: hard-coded in .env / docker compose (not best practice)
            { expiresIn: '2h' } // expire time
        );

        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', path: "/", maxAge: 2*60*60*1000})

        return res.status(200).json({ username: user.username, token: token }); 
   

    } catch (err) {
        return res.status(500).send({ message: '500: internal server error', error: err });
    }

})

// route: POST /api/v1/user/logout
// logout user by deleteing 'token' cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, secure: true})
    res.status(200).send({ message: "User logged out successfully."})

})

// route: GET /api/v1/user/check-auth
// api for frontend to check if user is authenticated
// checks for 'token' cookie, if verified then return true
router.get('/check-auth', async (req, res) => {
    const token = req.cookies.token;
    try{
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            return res.send({ isAuth: true, username: decoded.username })   
        }
        res.send({ isAuth: false, username: '' })
           
    } catch (err) {
        res.send({ isAuth: false, username: '' })
    }
    
})

module.exports = router;