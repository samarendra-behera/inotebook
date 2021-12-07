import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'
import { NoteItem } from './NoteItem';

export const Notes = (props) => {
    
    const context = useContext(noteContext);
    const {notes,setNotes} = context;
    return (
        <div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                {notes.map((note)=>{
                    return(
                        <NoteItem note={note}/>
                    )
                })}
            </div>
        </div>
    )
}
