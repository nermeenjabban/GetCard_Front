import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FiPlus, FiRefreshCw, FiList,FiEdit2, FiTrash2 } from 'react-icons/fi';


const TaskList = ({ onTaskSelect, onCreateNew }) => {
  const { tasks, loading, pagination, fetchTasks, deleteTask,changePage } = useTasks();  
  const [viewMode, setViewMode] = useState('list');

  
  useEffect(() => {
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, [fetchTasks, tasks.length]);

  const formatNumber = (num) => {
    const number = Number(num);
    return isNaN(number) ? 0 : number;
  };

  const handleDelete = async (taskId, taskTitle) => {
    if (window.confirm(`هل أنت متأكد من حذف المهمة "${taskTitle}"؟`)) {
      try {
        await deleteTask(taskId);
       
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiList className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مهام</h3>
        <p className="text-gray-600 mb-6">ابدأ بإنشاء أول مهمة لك</p>
        <Button onClick={onCreateNew} startIcon={<FiPlus />}>
          إنشاء مهمة جديدة
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-900">
  المهام (<span className="text-primary-600">{pagination.totalItems}</span>)
</h2>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => fetchTasks()}
            startIcon={<FiRefreshCw />}
          >
            تحديث
          </Button>
          <Button
            onClick={onCreateNew}
            startIcon={<FiPlus />}
          >
            مهمة جديدة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <Card key={task.id} className="p-4">
            <div className="mb-2">
              <span className={`px-2 py-1 rounded text-xs ${
                task.status === 'done' ? 'bg-green-100 text-green-800' :
                task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {task.status === 'done' ? 'مكتمل' : 
                 task.status === 'in_progress' ? 'قيد التنفيذ' : 'قيد الانتظار'}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
            {task.description && (
              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            )}
            <div className="text-xs text-gray-500">
              أنشئت في: {new Date(task.created_at).toLocaleDateString('ar-SA')}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => onTaskSelect && onTaskSelect(task)}
                className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 flex items-center gap-1"
              >
                <FiEdit2 className="w-3 h-3" />
                تعديل
              </button>
              <button
                onClick={() => handleDelete(task.id, task.title)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center gap-1"
              >
                <FiTrash2 className="w-3 h-3" />
                حذف
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => changePage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            السابق
          </Button>
          <span className="px-4 py-2">
            صفحة {pagination.currentPage} من {pagination.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => changePage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            التالي
          </Button>
        </div>
      )}
    </div>
  );
};



export default TaskList;