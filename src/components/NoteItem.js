import {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
export const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-edit mx-3" onClick={()=>{updateNote(note);}}></i>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
