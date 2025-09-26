import React from 'react';
import { Target } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
      <div className="flex min-h-screen">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center mb-8">
              <Target className="h-16 w-16 text-white" />
              <span className="ml-3 text-4xl font-bold text-white">MentorHub</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Empowering Entrepreneurs
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join a community of driven entrepreneurs and experienced mentors. 
              Access personalized programs, exclusive resources, and achieve your business goals.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-blue-100">Entrepreneurs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-blue-100">Mentors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-sm text-blue-100">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4 lg:hidden">
                  <Target className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-2xl font-bold text-gray-900">MentorHub</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="text-gray-600 mt-2">{subtitle}</p>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;