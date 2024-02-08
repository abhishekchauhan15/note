import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, openUpdateNoteModal, openReadMoreModal, showAlert } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const date = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${year}/${month}/${date} ${hours}:${minutes}`;
    return formattedDateTime;
  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note.id);
                showAlert("Note deleted successfully", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                openUpdateNoteModal(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between align-items-end">
            <button
              onClick={() => {
                openReadMoreModal(note);
              }}
              className="btn btn-primary mr-2"
            >
              Read More
            </button>
            <p>{formatDateTime(note.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
