import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import { useTasks } from '../context/TaskContext';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import SimpleLayout from '../components/Layout/SimpleLayout'
const Tasks = () => {
  const { tasks, loading, fetchTasks } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, refreshKey]);

  const handleTaskEdit = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormSubmit = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
    setRefreshKey(prev => prev + 1);
  };

  if (loading && tasks.length === 0) {
    return (
      <SimpleLayout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" />
        </div>
        </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-right">جميع المهام</h1>
        
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <TaskList 
              onTaskSelect={handleTaskEdit}
              onCreateNew={() => setShowTaskForm(true)}
            />
          </div>
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }}
          onSubmit={handleTaskFormSubmit}
        />
      )}

</SimpleLayout>
  );
  // return (
  //   <div>
  //     <div className="max-w-7xl mx-auto">
  //       {/* ... */}
  //       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
  //         <div className="p-6">
  //           {/* علّق TaskList وجرب: */}
  //           <div>قائمة المهام (تجريبية)</div>
  //           {/* <TaskList ... /> */}
  //         </div>
  //       </div>
  //     </div>
  //     {/* ... */}
  //   </div>
  // );
};

export default Tasks;