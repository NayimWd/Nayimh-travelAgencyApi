const express = require('express');

const authRouter = express.Router();

authRouter.get('/auth', (req, res)=> {
    res.json("hello auth")
} );

authRouter.get('/register', (req, res)=> {
    res.json("hello auth register")
} );

module.exports = authRouter;