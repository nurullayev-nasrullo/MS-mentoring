import React, { useState } from 'react';
import { Calendar, Clock, User, Play, BookOpen, CheckCircle } from 'lucide-react';
import { mockPrograms } from '../data/mockData';
import { Program } from '../types';

const Programs: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'completed' | 'pending'>('all');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [programs, setPrograms] = useState(mockPrograms);

  const filteredPrograms = programs.filter(program => 
    selectedFilter === 'all' || program.status === selectedFilter
  );

  const filters = [
    { key: 'all', label: 'All Programs', count: programs.length },
    { key: 'active', label: 'Active', count: programs.filter(p => p.status === 'active').length },
    { key: 'completed', label: 'Completed', count: programs.filter(p => p.status === 'completed').length },
    { key: 'pending', label: 'Pending', count: programs.filter(p => p.status === 'pending').length }
  ];

  const handleContinueProgram = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    if (program) {
      const nextLesson = program.lessons.find(l => !l.completed);
      if (nextLesson) {
        // Mark the next lesson as completed
        handleCompleteLesson(programId, nextLesson.id);
        alert(`Started and completed lesson: ${nextLesson.title}`);
      } else {
        alert('All lessons completed!');
      }
    }
  };

  const handleCompleteLesson = (programId: string, lessonId: string) => {
    setPrograms(prev => prev.map(program => {
      if (program.id === programId) {
        const updatedLessons = program.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const newProgress = Math.round((completedCount / updatedLessons.length) * 100);
        
        const updatedProgram = {
          ...program,
          lessons: updatedLessons,
          progress: newProgress,
          status: newProgress === 100 ? 'completed' as const : program.status
        };

        // Update selected program if it's the same one
        if (selectedProgram && selectedProgram.id === programId) {
          setSelectedProgram(updatedProgram);
        }

        return updatedProgram;
      }
      return program;
    }));

    // Show success message
    const lesson = programs.find(p => p.id === programId)?.lessons.find(l => l.id === lessonId);
    if (lesson) {
      alert(`✅ Lesson completed: ${lesson.title}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Programs</h1>
        <p className="text-gray-600">
          Track your progress and continue your entrepreneurial journey
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                selectedFilter === filter.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs List */}
        <div className="lg:col-span-2 space-y-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {program.mentor}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {program.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(program.startDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)}`}>
                  {program.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{program.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${program.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {program.lessons.filter(l => l.completed).length} / {program.lessons.length} lessons completed
                  </div>
                </div>
                
                {program.status === 'active' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContinueProgram(program.id);
                    }}
                    className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </button>
                )}
                
                {program.status === 'pending' && (
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Sidebar */}
        <div>
          {selectedProgram ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedProgram.title}</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProgram.status)}`}>
                    {selectedProgram.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mentor</span>
                  <span className="text-sm font-medium text-gray-900">{selectedProgram.mentor}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium text-gray-900">{selectedProgram.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{selectedProgram.progress}%</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Lessons ({selectedProgram.lessons.length})</h4>
                <div className="space-y-2">
                  {selectedProgram.lessons.map((lesson, index) => (
                    <div 
                      key={lesson.id} 
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => !lesson.completed && handleCompleteLesson(selectedProgram.id, lesson.id)}
                    >
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${lesson.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                      <BookOpen className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {selectedProgram.status === 'active' && (
                <button 
                  onClick={() => handleContinueProgram(selectedProgram.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-medium"
                >
                  Continue Program
                </button>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a program to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;