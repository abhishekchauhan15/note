import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_SERVER_API || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/notes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    setNotes(res);
  };

  // Add a note
  const addNote = async (newNote) => {
    const url = `${host}/notes`;
    console.log("add note", newNote);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const res = await response.json();
    getNotes();
  };

  // Edit a note
  const editNote = async (note) => {
    const url = `${host}/notes/${note.id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
      }),
    });
    await response.json();
    getNotes();
  };

  // Delete a note
  const deleteNote = async (id) => {
    const url = `${host}/notes/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getNotes();
  };


  // Fetch the previous version of a note
  const fetchPreviousVersion = async (note_id) => {
    console.log("finding prev version for", note_id)
    const url = `${host}/previousNote/${note_id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        fetchPreviousVersion,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
