const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./userModel.js')
const { jwtSECRET } = require('../../utils/secrets.js');

router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 8)

    Users.register(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: 'could not register user'})
        })
})
router.post('/login', (req, res) => {
    const login = req.body;

    Users.findBy({username: login.username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(login.password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    msg: 'Login Successful',
                    token: token
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:'could not login user'})
        })
});
router.get('/', (req, res) => {
    Users.findAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:'could not get users'})
        })
})

module.exports = router

function generateToken(user){
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtSECRET, options)
}
