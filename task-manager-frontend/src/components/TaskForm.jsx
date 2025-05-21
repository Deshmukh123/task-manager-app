import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <select name="status" onChange={handleChange}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;