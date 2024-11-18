require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')
const errorHandler = require('./errorHandler.js')
const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3010',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }};

async function run() {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db")
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    app.get('/', (req, res) => {
        res.send('Welcome to Assignment 2: Backend');
    })

    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/emp', employeeRouter);

    app.use(errorHandler);

    app.listen(SERVER_PORT, () => { console.log('Server is running...') });


  } finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir); 

