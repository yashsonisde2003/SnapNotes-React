import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notes = [];

  // Use useState with an array as the initial value
  const [defaultnotes, setnotes] = useState(notes);
  const [userdata, setuserdata] = useState({ name: "", email: "" });
  // setting the alert logic and initializing alerts
  const [alert, setalert] = useState(null);
  const showalert = (type, message) => {
    setalert({ type: type, message: message });
  };
  setTimeout(() => {
    setalert(null);
  }, 1500);

  // NOTES RELATED FUNCTIONS

  //fetch all notes
  const fetchAllNotes = async (title, description, tag) => {
    // TODO: api call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setnotes(json);
    // showalert("success", " Note  has  been  fetched  successfully");
  };

  // adding note
  const addNote = async (title, description, tag) => {
    // TODO: api call
    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    // Logic for adding notes
    console.log(json);
    setnotes(defaultnotes.concat(json));
    showalert("success", " Note  has  been  added  successfully");
  };
  // updating note
  const editnote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}api/notes/updnote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
  response.json();

    let newNotes = JSON.parse(JSON.stringify(defaultnotes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
    showalert("success", " Note  has  been  updated  successfully");
  };
  // deleting note
  const deleteNote = async (id) => {
    // TODO: api call
    const response = await fetch(`${host}api/notes/delnote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    setnotes(json);
    // console.log("note has been deleted" + id);
    const newNotes = defaultnotes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
    showalert("success", " Note  has  been  deleted  successfully");
  };
  const showuser = async () => {
    // TODO: api call
    const response = await fetch(`${host}api/auth/details`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setuserdata(json);
  };

  return (
    <NoteContext.Provider
      value={{
        defaultnotes,
        addNote,
        editnote,
        deleteNote,
        fetchAllNotes,
        setnotes,
        alert,
        showalert,
        showuser,
        userdata,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
