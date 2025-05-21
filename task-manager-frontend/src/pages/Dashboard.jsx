import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../api/tasks';
import { logoutUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  // Fetch tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        alert(error);
      }
    };
    loadTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(form.title, form.description, form.assignedTo);
      setTasks([...tasks, newTask]);
      setForm({ title: '', description: '', assignedTo: '' });
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      alert(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create Task</h3>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assign to (User ID)"
          value={form.assignedTo}
          onChange={handleChange}
        />
        <button type="submit">Create Task</button>
      </form>

      <h3>My Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
              <br />
              Assigned To: {task.assigned_to || 'Unassigned'} | Status: {task.status}
              <br />
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
