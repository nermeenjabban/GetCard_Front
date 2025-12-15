import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { useTasks } from '../../context/TaskContext';
import { FiX, FiSave, FiCalendar } from 'react-icons/fi';

const TaskForm = ({ task, onClose, onSubmit }) => {
  const { createTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        due_date: task.due_date || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      let result;
      if (task) {
        result = await updateTask(task.id, formData);
      } else {
        result = await createTask(formData);
      }

      if (result.success) {
        if (onSubmit) onSubmit(result.task);
        if (onClose) onClose();
      } else if (result.error?.errors) {
        setErrors(result.error.errors);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl">
        <Card className="max-h-[90vh] overflow-hidden flex flex-col">
          <Card.Header className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {task ? 'تعديل المهمة' : 'مهمة جديدة'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </Card.Header>

          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
            <Card.Body className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان المهمة *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="أدخل عنوان المهمة"
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="أدخل وصف المهمة"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="in_progress">قيد التنفيذ</option>
                    <option value="done">مكتمل</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الأولوية
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="low">منخفض</option>
                    <option value="medium">متوسط</option>
                    <option value="high">عالي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الاستحقاق
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    className="input-field pr-10"
                  />
                </div>
              </div>
            </Card.Body>

            <Card.Footer className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                loading={loading}
                startIcon={<FiSave />}
              >
                {task ? 'حفظ التغييرات' : 'إنشاء المهمة'}
              </Button>
            </Card.Footer>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TaskForm;