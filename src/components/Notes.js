import { useContext, useEffect, useRef, useState} from 'react';
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import { NoteItem } from './NoteItem';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

export const Notes = (props) => {
    const navigate = useNavigate();
    const alContext = useContext(alertContext);
    const { showAlert } = alContext;
    const context = useContext(noteContext);
    const { notes,getNotes,editNote} = context;
    const [note, setNote] = useState({eid: '', etitle: '',edescription: "", etag: ""})
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null)
    const closeRef = useRef(null)

    const handelClick = (e)=>{
        e.preventDefault();
        editNote(note.eid,note.etitle,note.edescription,note.etag);
        closeRef.current.click();
        setNote({eid: '', etitle: '',edescription: "", etag: ""});
        showAlert('Updated Successfully','success')
    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    
    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})

    }
    return (
        <>

            <AddNote/>
            <button ref = {ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input value = {note.etitle} type="text" className="form-control" id="etitle" name='etitle' onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input value = {note.edescription} type="text" className="form-control" id="edescription" name='edescription' onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input value = {note.etag} type="text" className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {closeRef} type="button" className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handelClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Your Notes</h1>
                <div className="container mx-4">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} note={note} updateNote={updateNote}/>
                    )
                })}
            </div>
        </>
    )
}
export default Notes;
