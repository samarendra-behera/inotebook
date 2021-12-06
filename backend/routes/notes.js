const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login is required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }

})
// ROUTE 2: Add a New Note using: POST "/api/notes/addnote". Login is required
router.post('/addnote', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], fetchUser, async (req, res) => {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Note({ title, description, tag, user: req.user.id });
            const saveNote = await note.save();
            
            // OR You can also use this method to create a new Note of a user 
            // saveNote = await Note.create({
            //     title: req.body.title,
            //     description: req.body.description,
            //     tag: req.body.tag,
            //     user: req.user.id
            // })
            res.json(saveNote);
        } 
        catch (error) {
            console.error(error.mesage)
            res.status(500).send("Internal server Error");
        }

    })
module.exports = router;