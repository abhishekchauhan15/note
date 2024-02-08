import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_SERVER_API || "http://localhost:5000/api";
  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);

  // Get all notes
  const getNotes = async () => {
    const url = `${host}/notes`; // Updated route path
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Updated header name
      },
    });
    const res = await response.json();
    setNotes(res);
  };


  return (
    <noteContext.Provider
      value={{ notes, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
