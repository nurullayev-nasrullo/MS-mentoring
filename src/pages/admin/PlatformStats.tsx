import React from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, Award, Activity, Calendar, Target } from 'lucide-react';
import { mockPlatformStats } from '../../data/mockData';

const PlatformStats: React.FC = () => {
  const stats = mockPlatformStats;

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Active Mentors',
      value: stats.totalMentors,
      icon: Award,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Students',
      value: stats.totalStudents,
      icon: GraduationCap,
      color: 'bg-green-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      name: 'Programs',
      value: stats.totalPrograms,
      icon: BookOpen,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'Total Lessons',
      value: stats.totalLessons,
      icon: Target,
      color: 'bg-teal-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Active Users',
      value: stats.activeUsers,
      icon: Activity,
      color: 'bg-indigo-500',
      change: '+7%',
      changeType: 'positive'
    },
    {
      name: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'bg-pink-500',
      change: '+3%',
      changeType: 'positive'
    },
    {
      name: 'Growth Rate',
      value: '24%',
      icon: TrendingUp,
      color: 'bg-cyan-500',
      change: '+2%',
      changeType: 'positive'
    }
  ];

  const recentActivity = [
    { action: 'New student registered', user: 'John Doe', time: '2 minutes ago', type: 'user' },
    { action: 'Program completed', user: 'Sarah Chen', time: '15 minutes ago', type: 'completion' },
    { action: 'New lesson created', user: 'Dr. Johnson', time: '1 hour ago', type: 'content' },
    { action: 'Mentor joined platform', user: 'Mike Rodriguez', time: '2 hours ago', type: 'mentor' },
    { action: 'Achievement unlocked', user: 'Alex Johnson', time: '3 hours ago', type: 'achievement' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'completion': return Award;
      case 'content': return BookOpen;
      case 'mentor': return GraduationCap;
      case 'achievement': return Target;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-600';
      case 'completion': return 'bg-green-100 text-green-600';
      case 'content': return 'bg-purple-100 text-purple-600';
      case 'mentor': return 'bg-orange-100 text-orange-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Statistics</h1>
        <p className="text-gray-600">
          Overview of platform performance and user engagement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Distribution Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Distribution</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-gray-700">Students</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium mr-2">{stats.totalStudents}</span>
                  <span className="text-gray-500">({Math.round((stats.totalStudents / stats.totalUsers) * 100)}%)</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(stats.totalStudents / stats.totalUsers) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                  <span className="text-gray-700">Mentors</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium mr-2">{stats.totalMentors}</span>
                  <span className="text-gray-500">({Math.round((stats.totalMentors / stats.totalUsers) * 100)}%)</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(stats.totalMentors / stats.totalUsers) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.activeUsers}</div>
                  <div className="text-sm text-gray-600">Active This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stats.completionRate}%</div>
                  <div className="text-sm text-gray-600">Avg. Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;