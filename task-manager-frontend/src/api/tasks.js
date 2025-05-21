import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://localhost:8000/tasks';

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, authHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to fetch tasks';
  }
};

export const createTask = async (title, description, assignedTo = null) => {
  try {
    const response = await axios.post(
      API_URL,
      { title, description, assigned_to: assignedTo },
      authHeader()
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to create task';
  }
};

export const updateTask = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates, authHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to update task';
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, authHeader());
  } catch (error) {
    throw error.response?.data?.detail || 'Failed to delete task';
  }
};
