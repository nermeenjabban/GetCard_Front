import { api } from './api';

export const taskService = {
  getAll: async (page = 1, filters = {}) => {
    try {
      console.log('Fetching tasks from API...');
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: '10',
        ...filters
      });
      
      const response = await api.get(`/tasks?${params}`);
      console.log('API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  create: async (taskData) => {
    try {
      console.log('Creating task:', taskData);
      const response = await api.post('/tasks', taskData);
      console.log('Create response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  update: async (id, taskData) => {
    try {
      console.log('Updating task:', id, taskData);
      const response = await api.put(`/tasks/${id}`, taskData);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      console.log('Deleting task:', id);
      const response = await api.delete(`/tasks/${id}`);
      console.log('Delete response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};