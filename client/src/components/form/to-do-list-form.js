import React, { useState } from 'react';
import './to-do-list-form.css';
import axios from "axios";



const NoteForm = ({onPostRequest}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('pending');

  let endpoint = "http://localhost:9000";
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Note:', note);
    console.log('Status:', status);
    axios.post(endpoint + "/api/tasks", {
      title: title,
      note: note,
      status: status
    }).then((res) => {
      console.log(res);
      setTitle('');
      setNote('');
      setStatus('pending');
      onPostRequest(res);
    });
  };



  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="note">Note:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-control"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="inProgress">In Progress</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Save Note</button>
    </form>
  );
};

export default NoteForm;
