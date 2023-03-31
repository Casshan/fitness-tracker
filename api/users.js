/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { getUserByUsername, createUser } = require(`../db/users`);


// POST /api/users/register
router.post('/register', async (req, res, next) => {

    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);
        
        
        if (_user) {
            res.send({ error: 'error', name: 'UserExistsError', message: `User ${_user.username} is already taken.`});
        } else if (password.length < 8) {
            res.send({error: 'error', message: "Password Too Short!", name: 'PasswordTooShort'})} else {
        const user = await createUser({username, password});
        
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '1w'});
        res.send({message: "thank you for signing up", token: `${token}`, user: user}); }
    } catch ({ name, message }) {
        next({ name, message })
    }
});
// POST /api/users/login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    // request must have both
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            // create token & return to user
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
            
            res.send({ user: user, token: token });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});
// GET /api/users/me
// router.get('/me', async (req, res) => {
//     // const { token } = req.body;
//     let  { jwt: TOKEN }  = response.headers.get('token');
//     console.log(jwt: TOKEN);
    
//     const user = await getUserByUsername(username);
//     console.log(user);
//     res.send({
        
//         user
//     });
    
// });
// GET /api/users/:username/routines

module.exports = router;
