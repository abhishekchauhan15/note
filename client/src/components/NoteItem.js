import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const {
    note,
    openUpdateNoteModal,
    openReadMoreModal,
    showAlert
  } = props;
  // console.log("note in noteitem", note)

  const context = useContext(noteContext);
  const { deleteNote, fetchPreviousVersion } = context;

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const date = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${date} ${hours}:${minutes}`;
  };

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            {/* Delete note button */}
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note.id);
                showAlert("Note deleted successfully", "success");
              }}
            ></i>
            {/* Edit note button */}
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                openUpdateNoteModal(note);
              }}
            ></i>
            {/* Display version history icon if note has versions */}
            {note.has_versions && (
              <i
                className="fa-solid fa-history mx-2"
                title="Version History"
                onClick={() => fetchPreviousVersion(note.id)} // Use fetchPreviousVersion directly
              ></i>
            )}
          </div>
          {/* Note description */}
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between align-items-end">
            {/* Read more button */}
            <button
              onClick={() => {
                openReadMoreModal(note);
              }}
              className="btn btn-primary mr-2"
            >
              Read More
            </button>
            {/* Display last updated date and time */}
            <p>{formatDateTime(note.updated_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
