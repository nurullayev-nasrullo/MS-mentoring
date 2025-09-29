import React, { useState } from 'react';
import { Plus, Search, Mail, Calendar, TrendingUp, CreditCard as Edit, Trash2, Eye, UserPlus } from 'lucide-react';
import { mockStudents } from '../data/mockData';
import { Student, CreateStudentData } from '../types';

const Students: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CreateStudentModal = () => {
    const [formData, setFormData] = useState<CreateStudentData>({
      name: '',
      email: '',
      password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }

      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData,
        role: 'student',
        joinDate: new Date().toISOString().split('T')[0],
        points: 0,
        level: 1,
        badges: [],
        mentorId: '1', // Current mentor ID
        enrolledPrograms: [],
        lastActivity: new Date().toISOString(),
        totalLessonsCompleted: 0,
        averageProgress: 0
      };
      
      setStudents([...students, newStudent]);
      setShowCreateModal(false);
      setFormData({ name: '', email: '', password: '' });
      
      alert(`✅ Student created successfully: ${newStudent.name}`);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                Create Student
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

  const StudentDetailModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Student Details</h3>
            <button
              onClick={() => setShowStudentModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h4>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date</span>
                  <span className="font-medium">{new Date(selectedStudent.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">Level {selectedStudent.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points</span>
                  <span className="font-medium">{selectedStudent.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons Completed</span>
                  <span className="font-medium">{selectedStudent.totalLessonsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Progress</span>
                  <span className="font-medium">{selectedStudent.averageProgress}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Progress Overview</h5>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full"
                    style={{ width: `${selectedStudent.averageProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Achievements ({selectedStudent.badges.length})</h5>
                <div className="space-y-2">
                  {selectedStudent.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center p-2 bg-yellow-50 rounded-lg">
                      <span className="text-lg mr-2">{badge.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                  {selectedStudent.badges.length === 0 && (
                    <p className="text-sm text-gray-500">No achievements yet</p>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Last Activity</h5>
                <p className="text-sm text-gray-600">
                  {new Date(selectedStudent.lastActivity).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (confirm(`Are you sure you want to remove ${student?.name}?`)) {
      setStudents(students.filter(s => s.id !== studentId));
      alert(`✅ Student removed: ${student?.name}`);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Students</h1>
            <p className="text-gray-600">
              Manage your students and track their progress
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowStudentModal(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove Student"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Level {student.level}</span>
                <span className="font-medium text-gray-900">{student.points} pts</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{student.averageProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                    style={{ width: `${student.averageProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Lessons Completed</span>
                <span className="font-medium text-gray-900">{student.totalLessonsCompleted}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Programs</span>
                <span className="font-medium text-gray-900">{student.enrolledPrograms.length}</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  Last active: {new Date(student.lastActivity).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No students found</p>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Add your first student to get started'}
          </p>
        </div>
      )}

      {showCreateModal && <CreateStudentModal />}
      {showStudentModal && <StudentDetailModal />}
    </div>
  );
};

export default Students;