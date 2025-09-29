import React, { useState } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Play, FileText, Video, BookOpen, Clock } from 'lucide-react';
import { mockPrograms } from '../data/mockData';
import { Lesson, CreateLessonData } from '../types';

const Lessons: React.FC = () => {
  const [allLessons, setAllLessons] = useState(() => {
    return mockPrograms.flatMap(program => 
      program.lessons.map(lesson => ({ ...lesson, programId: program.id, programTitle: program.title }))
    );
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);

  const filteredLessons = allLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || lesson.type === selectedType;
    return matchesSearch && matchesType;
  });

  const LessonModal = ({ lesson, onClose, onSave }: { lesson?: any, onClose: () => void, onSave: (data: any) => void }) => {
    const [formData, setFormData] = useState<CreateLessonData>({
      title: lesson?.title || '',
      description: lesson?.description || '',
      duration: lesson?.duration || '',
      type: lesson?.type || 'video',
      content: lesson?.content || '',
      videoUrl: lesson?.videoUrl || '',
      documentUrl: lesson?.documentUrl || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!formData.title || !formData.description || !formData.duration) {
        alert('Please fill in all required fields');
        return;
      }
      
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {lesson ? 'Edit Lesson' : 'Create New Lesson'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 45 min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="video">Video</option>
                <option value="document">Document</option>
                <option value="exercise">Exercise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={4}
                placeholder="Lesson content, instructions, or notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {formData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://example.com/video"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {formData.type === 'document' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document URL</label>
                <input
                  type="url"
                  value={formData.documentUrl}
                  onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                  placeholder="https://example.com/document"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-medium"
              >
                {lesson ? 'Update Lesson' : 'Create Lesson'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveLesson = (data: CreateLessonData) => {
    if (editingLesson) {
      // Update existing lesson
      setAllLessons(prev => prev.map(lesson => 
        lesson.id === editingLesson.id 
          ? { ...lesson, ...data, updatedAt: new Date().toISOString() }
          : lesson
      ));
      setEditingLesson(null);
      alert(`✅ Lesson updated: ${data.title}`);
    } else {
      // Create new lesson
      const newLesson = {
        id: Date.now().toString(),
        ...data,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        programId: '1', // Default to first program
        programTitle: 'Startup Fundamentals'
      };
      setAllLessons(prev => [...prev, newLesson]);
      setShowCreateModal(false);
      alert(`✅ Lesson created: ${data.title}`);
    }
  };

  const deleteLesson = (lessonId: string) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (confirm(`Are you sure you want to delete "${lesson?.title}"?`)) {
      setAllLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
      alert(`✅ Lesson deleted: ${lesson?.title}`);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'exercise': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'exercise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Management</h1>
            <p className="text-gray-600">
              Create and manage lessons for your mentoring programs
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Lesson
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="video">Video</option>
          <option value="document">Document</option>
          <option value="exercise">Exercise</option>
        </select>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const IconComponent = getTypeIcon(lesson.type);
          
          return (
            <div key={lesson.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getTypeColor(lesson.type)}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setEditingLesson(lesson)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit Lesson"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete Lesson"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{lesson.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(lesson.type)}`}>
                    {lesson.type}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  <p className="font-medium text-gray-700">Program: {lesson.programTitle}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(lesson.updatedAt).toLocaleDateString()}
                  </div>
                  <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Play className="h-3 w-3 mr-1" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No lessons found</p>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria' : 'Create your first lesson to get started'}
          </p>
        </div>
      )}

      {showCreateModal && (
        <LessonModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveLesson}
        />
      )}

      {editingLesson && (
        <LessonModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onSave={handleSaveLesson}
        />
      )}
    </div>
  );
};

export default Lessons;