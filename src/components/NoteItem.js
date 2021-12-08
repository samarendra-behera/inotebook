import React from 'react'

export const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <div className='d-flex'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-edit mx-3"></i>
                        <i className="far fa-trash-alt mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>



                </div>
            </div>
        </div>
    )
}
