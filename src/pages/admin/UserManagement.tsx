import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, Users, UserCheck, Shield } from 'lucide-react';
import { mockStudents, mockMentors } from '../../data/mockData';
import { User, CreateStudentData, CreateMentorData } from '../../types';

const UserManagement: React.FC = () => {
  const [allUsers, setAllUsers] = useState([...mockStudents, ...mockMentors]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUserType, setCreateUserType] = useState<'mentor' | 'student'>('student');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const CreateUserModal = () => {
    const [studentData, setStudentData] = useState<CreateStudentData>({
      name: '',
      email: '',
      password: ''
    });

    const [mentorData, setMentorData] = useState<CreateMentorData>({
      name: '',
      email: '',
      password: '',
      specialization: '',
      bio: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (createUserType === 'student') {
        if (!studentData.name || !studentData.email || !studentData.password) {
          alert('Please fill in all fields');
          return;
        }
        
        const newStudent: User = {
          id: Date.now().toString(),
          ...studentData,
          role: 'student',
          joinDate: new Date().toISOString().split('T')[0],
          points: 0,
          level: 1,
          badges: []
        };
        setAllUsers([...allUsers, newStudent]);
        alert(`✅ Student created: ${studentData.name}`);
      } else {
        if (!mentorData.name || !mentorData.email || !mentorData.password || !mentorData.specialization || !mentorData.bio) {
          alert('Please fill in all fields');
          return;
        }
        
        const newMentor: User = {
          id: Date.now().toString(),
          ...mentorData,
          role: 'mentor',
          joinDate: new Date().toISOString().split('T')[0],
          points: 0,
          level: 1,
          badges: []
        };
        setAllUsers([...allUsers, newMentor]);
        alert(`✅ Mentor created: ${mentorData.name}`);
      }
      
      setShowCreateModal(false);
      setStudentData({ name: '', email: '', password: '' });
      setMentorData({ name: '', email: '', password: '', specialization: '', bio: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Create New {createUserType === 'student' ? 'Student' : 'Mentor'}
          </h3>
          
          <div className="mb-4">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setCreateUserType('student')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  createUserType === 'student'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setCreateUserType('mentor')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  createUserType === 'mentor'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Mentor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={createUserType === 'student' ? studentData.name : mentorData.name}
                onChange={(e) => {
                  if (createUserType === 'student') {
                    setStudentData({ ...studentData, name: e.target.value });
                  } else {
                    setMentorData({ ...mentorData, name: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={createUserType === 'student' ? studentData.email : mentorData.email}
                onChange={(e) => {
                  if (createUserType === 'student') {
                    setStudentData({ ...studentData, email: e.target.value });
                  } else {
                    setMentorData({ ...mentorData, email: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={createUserType === 'student' ? studentData.password : mentorData.password}
                onChange={(e) => {
                  if (createUserType === 'student') {
                    setStudentData({ ...studentData, password: e.target.value });
                  } else {
                    setMentorData({ ...mentorData, password: e.target.value });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {createUserType === 'mentor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    value={mentorData.specialization}
                    onChange={(e) => setMentorData({ ...mentorData, specialization: e.target.value })}
                    placeholder="e.g., Startup Strategy, Digital Marketing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={mentorData.bio}
                    onChange={(e) => setMentorData({ ...mentorData, bio: e.target.value })}
                    rows={3}
                    placeholder="Brief description of experience and expertise"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                Create {createUserType === 'student' ? 'Student' : 'Mentor'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UserDetailModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
            <button
              onClick={() => setShowUserModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    selectedUser.role === 'mentor' ? 'bg-purple-100 text-purple-800' :
                    selectedUser.role === 'student' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedUser.role === 'super_admin' ? 'Super Admin' : 
                     selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date</span>
                  <span className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">Level {selectedUser.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points</span>
                  <span className="font-medium">{selectedUser.points}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Achievements ({selectedUser.badges.length})</h5>
                <div className="space-y-2">
                  {selectedUser.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center p-2 bg-yellow-50 rounded-lg">
                      <span className="text-lg mr-2">{badge.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                  {selectedUser.badges.length === 0 && (
                    <p className="text-sm text-gray-500">No achievements yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deleteUser = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (confirm(`Are you sure you want to delete ${user?.name}?`)) {
      setAllUsers(allUsers.filter(u => u.id !== userId));
      alert(`✅ User deleted: ${user?.name}`);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Shield;
      case 'mentor': return UserCheck;
      case 'student': return Users;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'mentor': return 'bg-purple-100 text-purple-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">
              Manage all platform users, mentors, and students
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="mentor">Mentor</option>
          <option value="student">Student</option>
        </select>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          
          return (
            <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {user.role !== 'super_admin' && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                    <RoleIcon className="h-3 w-3 mr-1" />
                    {user.role === 'super_admin' ? 'Super Admin' : 
                     user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">Level {user.level}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Points</span>
                  <span className="font-medium text-gray-900">{user.points}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Badges</span>
                  <span className="font-medium text-gray-900">{user.badges.length}</span>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No users found</p>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Add your first user to get started'}
          </p>
        </div>
      )}

      {showCreateModal && <CreateUserModal />}
      {showUserModal && <UserDetailModal />}
    </div>
  );
};

export default UserManagement;