import React from 'react';
import { TrendingUp, BookOpen, Award, Calendar, Clock, CheckCircle } from 'lucide-react';
import { authService } from '../utils/auth';
import { mockPrograms, mockNotifications } from '../data/mockData';

const Dashboard: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const activePrograms = mockPrograms.filter(p => p.status === 'active');
  const recentNotifications = mockNotifications.slice(0, 3);

  const stats = [
    {
      name: 'Active Programs',
      value: activePrograms.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      name: 'Points Earned',
      value: user.points.toLocaleString(),
      icon: Award,
      color: 'bg-green-500',
      change: '+23%'
    },
    {
      name: 'Completion Rate',
      value: '87%',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      name: 'Current Level',
      value: user.level,
      icon: Award,
      color: 'bg-orange-500',
      change: 'Level up!'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's your progress overview and what's coming up next.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Programs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Programs</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {activePrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{program.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {program.duration} • {program.mentor}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {program.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h2>
            <div className="space-y-3">
              {user.badges.map((badge) => (
                <div key={badge.id} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-2xl mr-3">{badge.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'achievement' ? 'bg-yellow-100' :
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    {notification.type === 'achievement' && <Award className="h-4 w-4 text-yellow-600" />}
                    {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {notification.type === 'warning' && <Clock className="h-4 w-4 text-orange-600" />}
                    {notification.type === 'info' && <BookOpen className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;