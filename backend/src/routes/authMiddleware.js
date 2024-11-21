const jwt = require('jsonwebtoken')

// Middleware to check Auth state before accessing private routes (employee routes)

const authMiddleware = (req, res, next) => {
    // const token = req.header('x-auth-token') || req.cookies.token
    const token = req.cookies.token

    if(!token)
        return res.status(401).send({ message: "Authentication failed: token not found."})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded; // pass token payload (email, username) into request
        // note: we are not doing checks in this project, but this is the usual auth flow

        next(); // call employeeRoutes
    } catch (err){
        res.status(400).send({message: 'Authentication failed', error: err.message})
    }

}

module.exports = authMiddleware;