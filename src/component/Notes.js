import AddNote from "./AddNote";
import Notesitem from "./Notesitem";
import notevalue from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext, useState } from "react";
function Notes() {
  const navigate = useNavigate();
  const context = useContext(notevalue);
  const { defaultnotes, fetchAllNotes, editnote } = context;
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // eslint-disable-next-line
      fetchAllNotes();
    } else {
      // eslint-disable-next-line
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  const handleupdclick = (e) => {
    console.log("updating the note", note);
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onchange}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 4 || note.edescription.length < 5
                }
                onClick={handleupdclick}
                type="button"
                className="btn btn-primary"
              >
                update notes
              </button>
            </div>
          </div>
        </div>
      </div>

        <div className="row my-3">
        <h1>Your Notes</h1>
          <div className="container">
            {defaultnotes.length === 0 && "No notes to display"}
          </div>
          {defaultnotes.map((note) => {
            return (
              <Notesitem key={note._id} updatenote={updatenote} note={note} />
            );
          })}
        </div>

    </div>
  );
}

export default Notes;
