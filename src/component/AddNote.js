import React, { useContext, useState } from "react";
import noteValue from "../context/notes/noteContext";

function AddNote() {
  const context = useContext(noteValue);
  const { addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleaddclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({
      title: "",
      description: "",
      tag: "",
    });
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div id="adpagesizing">
      <div className="adback"></div>
      <h1 className="adh1">Add a note</h1>
      <div className="adpenlogo"></div>
      <form id="adform">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            className="form-control adinput"
            aria-describedby="emailHelp"
            id="title"
            name="title"
            onChange={onchange}
            value={note.title}
          />
          {note.title.length < 4 && "Title must be atleast of 4 characters"}
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-bold "
          >
            Description
          </label>
          <textarea
            type="text"
            className="form-control adinput"
            id="description"
            name="description"
            onChange={onchange}
            value={note.description}
          />
        </div>
        {note.description.length < 5 &&
          "Description must be atleast of 5 characters"}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-bold "
          >
            Tag
          </label>
          <input
            type="text"
            className="form-control adinput"
            id="tag"
            name="tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>

        <button
          disabled={note.title.length < 4 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleaddclick}
        >
          Add Note
        </button>
      </form>

    </div>
  );
}

export default AddNote;
