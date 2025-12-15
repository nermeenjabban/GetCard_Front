import React, { createContext, useState, useContext, useCallback } from 'react';
import { taskService } from '../services/tasks';
import toast from 'react-hot-toast';

const TaskContext = createContext({});

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10
  });
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  console.log('TaskProvider - tasks:', tasks); 
  console.log('TaskProvider - loading:', loading); 

  const fetchTasks = useCallback(async (page = 1, newFilters = filters) => {
    setLoading(true);
    try {
      const response = await taskService.getAll(page, newFilters);
      
      
      setTasks(response.data || []);
      setPagination({
        currentPage: parseInt(response.meta?.current_page) || 1,
        totalPages: parseInt(response.meta?.total_pages) || 1,
        totalItems: parseInt(response.meta?.total) || 0,
        perPage: parseInt(response.meta?.per_page) || 10
      });
      console.log('totalItems type:', typeof pagination.totalItems);
console.log('totalItems value:', pagination.totalItems);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('فشل تحميل المهام');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createTask = async (taskData) => {
    try {
      const response = await taskService.create(taskData);
      const newTask = response.task || response.data;
      
      
      setTasks(prev => {
        const newTasks = [newTask, ...prev];
        return newTasks.slice(0, pagination.perPage); 
      });
      
      toast.success('تم إنشاء المهمة بنجاح');
      return { success: true, task: newTask };
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error(error.response?.data?.message || 'فشل إنشاء المهمة');
      return { success: false, error: error.response?.data };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await taskService.update(id, taskData);
      const updatedTask = response.task || response.data;
      
     
      setTasks(prev => prev.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      ));
      
      toast.success('تم تحديث المهمة بنجاح');
      return { success: true, task: updatedTask };
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error(error.response?.data?.message || 'فشل تحديث المهمة');
      return { success: false, error: error.response?.data };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      
     
      setTasks(prev => prev.filter(task => task.id !== id));
      
      toast.success('تم حذف المهمة بنجاح');
      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('فشل حذف المهمة');
      return { success: false };
    }
  };

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchTasks(1, updatedFilters);
  };

  const changePage = (page) => {
    fetchTasks(page);
  };

  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      done: tasks.filter(t => t.status === 'done').length
    };
    
    return {
      ...stats,
      completionRate: stats.total > 0 
        ? Math.round((stats.done / stats.total) * 100) 
        : 0
    };
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      pagination,
      filters,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
      updateFilters,
      changePage,
      getTaskStats
    }}>
      {children}
    </TaskContext.Provider>
  );
};