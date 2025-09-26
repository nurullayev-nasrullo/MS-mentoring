import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Bell, 
  User, 
  LogOut,
  Trophy,
  Target,
  Users,
  GraduationCap,
  MessageCircle,
  BarChart3,
  Settings
} from 'lucide-react';
import { authService } from '../utils/auth';

const Layout: React.FC = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const studentNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Programs', href: '/programs', icon: BookOpen },
    { name: 'Materials', href: '/materials', icon: FileText },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const mentorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Students', href: '/students', icon: Users },
    { name: 'Programs', href: '/programs', icon: BookOpen },
    { name: 'Lessons', href: '/lessons', icon: GraduationCap },
    { name: 'Materials', href: '/materials', icon: FileText },
    { name: 'Messages', href: '/messages', icon: MessageCircle },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const superAdminNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Platform Stats', href: '/admin/stats', icon: BarChart3 },
    { name: 'Programs', href: '/programs', icon: BookOpen },
    { name: 'Materials', href: '/materials', icon: FileText },
    { name: 'Notifications', href: '/notifications', icon: Bell },
  ];

  const getNavigation = () => {
    switch (user.role) {
      case 'super_admin': return superAdminNavigation;
      case 'mentor': return mentorNavigation;
      case 'student': return studentNavigation;
      default: return studentNavigation;
    }
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <Target className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">MentorHub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Trophy className="h-3 w-3 mr-1" />
                  Level {user.level} • {user.points} pts
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;