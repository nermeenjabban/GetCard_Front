import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Layout from '../components/Layout/Layout';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { 
  FiCheckCircle, 
  FiClock, 
  FiPlayCircle, 
  FiCalendar,
  FiUser,
  FiRefreshCw
} from 'react-icons/fi';

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { tasks, loading, fetchTasks, getTaskStats } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

 
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, location.key, refreshKey]);

  const stats = getTaskStats();

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormSubmit = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const getArabicDate = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    try {
      return now.toLocaleDateString('ar-SA', options);
    } catch (error) {
      return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  if (loading && tasks.length === 0) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6" key={`dashboard-${location.key}`}>
        {/* Welcome Header */}
        <div className="gradient-bg rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                مرحباً، {user?.name} 👋
              </h1>
              <p className="text-white/90">
                {getArabicDate()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <FiUser className="w-5 h-5" />
                <span className="font-medium">{user?.email}</span>
              </div>
              <Button
                variant="secondary"
                onClick={handleRefresh}
                startIcon={<FiRefreshCw />}
                className="bg-white/20 hover:bg-white/30 border-0"
              >
                تحديث
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">إجمالي المهام</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <FiCalendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد الانتظار</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">قيد التنفيذ</p>
                <p className="text-2xl font-bold text-blue-600">{stats.in_progress}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FiPlayCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مكتمل</p>
                <p className="text-2xl font-bold text-green-600">{stats.done}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.completionRate}% معدل الإنجاز
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card>
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-gray-700">تقدم المهام</span>
            <span className="text-sm font-medium text-primary-600">{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </Card>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">المهام الأخيرة</h2>
          </div>
          <div className="p-6">
            <TaskList 
              onTaskSelect={handleTaskSelect}
              onCreateNew={() => setShowTaskForm(true)}
            />
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
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
    </Layout>
  );
};

export default Dashboard;