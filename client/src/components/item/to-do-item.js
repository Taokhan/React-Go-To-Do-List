import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./to-do-item.css";
import { ReactComponent as ItemSVG } from "./../../assets/noteBox.svg";

const TodoItem = ({ item, updateTaskStatus, deleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [editedNote, setEditedNote] = useState(item.note);
  const [containerWidth, setContainerWidth] = useState(null);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Save the changes and exit edit mode
    // Call the updateTaskStatus function with the updated title and note

    setEditMode(false);
    axios
      .put(endpoint + "/api/taskEdit", {
        Headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        _id: item._id,
        title: editedTitle,
        note: editedNote,
        status: item.status,
      })
      .then((res) => {
        console.log(res.data);
        updateTaskStatus(item._id, {
          title: editedTitle,
          note: editedNote,
          status: item.status,
        });
      });
  };

  const handleCancel = () => {
    // Discard the changes and exit edit mode
    setEditedTitle(item.title);
    setEditedNote(item.note);
    setEditMode(false);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleNoteChange = (event) => {
    setEditedNote(event.target.value);
  };

  const handleContainerResize = () => {
    setContainerWidth(containerRef.current.offsetWidth);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    handleContainerResize();
    window.addEventListener("resize", handleContainerResize);
    return () => {
      window.removeEventListener("resize", handleContainerResize);
    };
  }, []);

  let endpoint = "http://localhost:9000";
  let borderColor;
  let textDecoration;
  switch (item.status) {
    case "completed":
      borderColor = "green";
      textDecoration = "line-through";
      break;
    case "inProgress":
      borderColor = "orange";
      textDecoration = "none";
      break;
    case "pending":
      borderColor = "red";
      textDecoration = "none";
      break;
    default:
      borderColor = "black";
      textDecoration = "none";
  }
  let style = {
    textDecoration: textDecoration,
    border: `2px solid ${borderColor}`,
    borderColor: borderColor,
  };

  return (
    <div
      ref={containerRef}
      className={`container ${editMode ? "edit-mode" : ""}`}
    >
      <div style={style} className="item">
        {editMode ? (
          <>
            <input
              value={editedTitle}
              onChange={handleTitleChange}
              style={{ fontWeight: "bold", textDecoration: "underline" }}
            />
            <textarea value={editedNote} onChange={handleNoteChange} />
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
              {item.title}
            </div>
            <div className="note">{item.note}</div>
            <div>
              <button onClick={toggleEditMode}>Edit</button>
              <button onClick={() => deleteTask(item._id)}>Delete</button>
            </div>
          </>
        )}
        <select
          value={item.status}
          onChange={(event) => updateTaskStatus(item._id, event.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="inProgress">In Progress</option>
        </select>
      </div>
    </div>
  );
};

export default TodoItem;
