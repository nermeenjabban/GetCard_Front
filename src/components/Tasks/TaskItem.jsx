import React from 'react';
import Card from '../UI/Card';
import { useTasks } from '../../context/TaskContext';
import { 
  FiCheckCircle, 
  FiClock, 
  FiPlayCircle, 
  FiEdit2,
  FiTrash2,
  FiCalendar
} from 'react-icons/fi';

const TaskItem = ({ task, viewMode = 'list', onClick, onEdit }) => {
  const { deleteTask } = useTasks();

  const statusIcons = {
    pending: <FiClock className="w-4 h-4" />,
    in_progress: <FiPlayCircle className="w-4 h-4" />,
    done: <FiCheckCircle className="w-4 h-4" />
  };

  const statusColors = {
    pending: 'badge-pending',
    in_progress: 'badge-in-progress',
    done: 'badge-done'
  };

  const statusText = {
    pending: 'قيد الانتظار',
    in_progress: 'قيد التنفيذ',
    done: 'مكتمل'
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    } else if (onClick) {
      onClick(task);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      await deleteTask(task.id);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-SA');
    } catch {
      return dateString;
    }
  };

  if (viewMode === 'grid') {
    return (
      <Card 
        hover 
        className="cursor-pointer transition-all duration-200 hover:border-primary-300"
        onClick={() => onClick && onClick(task)}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <span className={`badge ${statusColors[task.status]} flex items-center gap-1`}>
              {statusIcons[task.status]}
              {statusText[task.status]}
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              <span>{formatDate(task.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="cursor-pointer" onClick={() => onClick && onClick(task)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            task.status === 'done' ? 'bg-green-100 text-green-600' :
            task.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
            'bg-yellow-100 text-yellow-600'
          }`}>
            {statusIcons[task.status]}
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {task.title}
            </h3>
            <span className={`badge ${statusColors[task.status]} ml-2 whitespace-nowrap`}>
              {statusText[task.status]}
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-1">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-3 h-3" />
              <span>تم الإنشاء: {formatDate(task.created_at)}</span>
            </div>
            {task.updated_at !== task.created_at && (
              <div className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                <span>آخر تحديث: {formatDate(task.updated_at)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-1">
          <button 
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;