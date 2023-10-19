import React, { useContext } from "react";
import noteValue from "../context/notes/noteContext";

function Notesitem(props) {
  const context = useContext(noteValue);
  const { deleteNote } = context;
  const { note, updatenote } = props;

  return (
    <div className="size">
      <div className="col-md-3 my-3">
        <div className="card size3 ">
          <div className="card-body size2">
            <div className="d-flex align-items-center ">
              <h5 className="card-title">{note.title}</h5>
              <div className="icons">
                <i
                  className="fa-solid fa-pen-to-square mx-2"
                  onClick={() => {
                    updatenote(note);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash mx-2"
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                ></i>
              </div>
            </div>
            <p className="card-text">
              Description
              <br/>
              {note.description}
            </p>
            <p className="card-text">
              Tag
              <br />
              {note.tag}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notesitem;
