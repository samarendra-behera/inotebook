const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Papunisbadb$oy';


// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
    // User name, email, password validation conditions
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),

    ],
    async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // user Creating and Checking inside the try
        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            console.log(user);
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already  exists" })
            }
            // Incrypt the password using bcrypt js packect
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);
            // Create a New user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(authtoken);
            res.json({ authtoken });
        }
        // When error occure to checking and creating user 
        catch (error) {
            console.error(error.mesage)
            res.status(500).send("Internal server Error");
        }
    })
// Authenticate a User using: POST "/api/auth/lonin".
router.post('/createuser',
    // User name, email, password validation conditions
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', "password can't be blank").exists()
    ],
    async (req, res) => {
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email,password} = req.body;
        try {
            let user = await User.findOne(email);
            if(!user){
                return res.json({error: "Please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.json({error: "Please try to login with correct credentials"});
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });

        } catch (error) {
            console.error(error.mesage)
            res.status(500).send("Internal server Error");
        }
    });

module.exports = router;