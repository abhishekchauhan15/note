import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const { showAlert } = props;

  const context = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    try {
      e.preventDefault();
      context.addNote(note);
      setNote({
        title: "",
        content: "",
      });

      showAlert("Note added successfully", "success");
    } catch (error) {
      console.log(error.message);
      showAlert("Internal Server Error", "danger");
    }
  };

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            aria-describedby="titleHelp"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
            minLength={1}
            maxLength={1000}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
