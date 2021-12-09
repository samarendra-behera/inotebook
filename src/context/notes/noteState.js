import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all  Note
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYzhiYjM2Yzc2ZGViOGRjYzQ1YjIwIn0sImlhdCI6MTYzODcxOTcyOH0.FlCI2VblBvMQwPQ67PC0PqGowussTkoTOWV8_4snyp8"
      }
    });
    const newNotes = await response.json();
    // Logic to Add Note in client
    setNotes(newNotes);

  } 

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYzhiYjM2Yzc2ZGViOGRjYzQ1YjIwIn0sImlhdCI6MTYzODcxOTcyOH0.FlCI2VblBvMQwPQ67PC0PqGowussTkoTOWV8_4snyp8"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    // Logic to Add Note in client    
    setNotes(notes.concat(json));

  }

   // Delete a Note
   const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYzhiYjM2Yzc2ZGViOGRjYzQ1YjIwIn0sImlhdCI6MTYzODcxOTcyOH0.FlCI2VblBvMQwPQ67PC0PqGowussTkoTOWV8_4snyp8"
      }
    });
    const json = await response.json();
    console.log(json);

    // Logic to edit Note in client
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);

  }


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYzhiYjM2Yzc2ZGViOGRjYzQ1YjIwIn0sImlhdCI6MTYzODcxOTcyOH0.FlCI2VblBvMQwPQ67PC0PqGowussTkoTOWV8_4snyp8"
      },
      body: JSON.stringify(title, description, tag)
    });

    // Logic to edit Note in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (id === element._id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;