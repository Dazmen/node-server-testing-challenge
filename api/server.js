const express = require('express');
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require('./users/authRouter.js');

const server = express();

// middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

// routes
server.use('/api/auth', authRouter)


server.get('/', (req, res) => {
    res.status(200).json({msg:'api is locked and loaded!'})
})

module.exports = server;