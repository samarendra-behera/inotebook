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
            console.error(error.message)
            res.status(500).send("Internal server Error");
        }

    })
// ROUTE 3:Upadate an existing Note using: PUT "/api/notes/updatenote:id". Login is required
router.put('/updatenote/:id', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Create a New newNote object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Not Found') };

        // Allow Updating only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, {new: true })
        res.json({note});
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
});
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/id". Login is required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send('Not Found') };

        // Allow deleteing only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted", note: note});
    } 
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
});
module.exports = router;