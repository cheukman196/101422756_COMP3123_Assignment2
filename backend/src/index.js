require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')
const authMiddleware = require('./routes/authMiddleware.js')
const errorHandler = require('./errorHandler.js')
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // json parsing
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()) // cookie parsing
// allow CORS
const allowedOrigins = [
  'http://localhost:3000', // Localhost 
  'http://localhost:5000', // Localhost 
  'http://frontend:3000', // Docker 
  'http://backend:5000', // Docker 
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));


async function run() {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db")
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    app.get('/', (req, res) => {
        res.send('Welcome to Assignment 2: Backend');
    })

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/emp', authMiddleware, employeeRouter); // check auth first

    app.use(errorHandler);

    app.listen(SERVER_PORT, () => { console.log('Server is running...') });


  } finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir); 

