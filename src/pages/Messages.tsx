import React, { useState } from 'react';
import { Send, Search, MessageCircle, StickyNote, User } from 'lucide-react';
import { mockMessages, mockStudents } from '../data/mockData';
import { Message } from '../types';
import { authService } from '../utils/auth';

const Messages: React.FC = () => {
  const user = authService.getCurrentUser()!;
  const [messages, setMessages] = useState(mockMessages);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState<'message' | 'note'>('message');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const isRelevant = user.role === 'mentor' 
      ? message.senderId === user.id || message.receiverId === user.id
      : message.senderId === user.id || message.receiverId === user.id;
    return matchesSearch && isRelevant;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim() || !selectedStudent) {
      alert('Please select a student and enter a message');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: selectedStudent,
      content: messageContent,
      timestamp: new Date().toISOString(),
      read: false,
      type: messageType
    };

    setMessages([newMessage, ...messages]);
    setMessageContent('');
    
    // Show success message
    const studentName = getStudentName(selectedStudent);
    alert(`✅ ${messageType === 'note' ? 'Note' : 'Message'} sent to ${studentName}!`);
  };

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(message =>
      message.id === messageId ? { ...message, read: true } : message
    ));
  };

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getMessageIcon = (type: string) => {
    return type === 'note' ? StickyNote : MessageCircle;
  };

  const getMessageColor = (type: string) => {
    return type === 'note' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages & Notes</h1>
        <p className="text-gray-600">
          {user.role === 'mentor' 
            ? 'Send messages and notes to your students'
            : 'View messages and notes from your mentor'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composer (Mentor Only) */}
        {user.role === 'mentor' && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h2>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Student
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Choose a student...</option>
                    {mockStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setMessageType('message')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        messageType === 'message'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageType('note')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        messageType === 'note'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <StickyNote className="h-4 w-4 inline mr-1" />
                      Note
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {messageType === 'note' ? 'Note Content' : 'Message'}
                  </label>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={4}
                    placeholder={messageType === 'note' 
                      ? 'Write a note for your student...' 
                      : 'Type your message...'
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all font-medium flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send {messageType === 'note' ? 'Note' : 'Message'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Messages List */}
        <div className={user.role === 'mentor' ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {user.role === 'mentor' ? 'Messages & Notes' : 'Messages from Mentor'}
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredMessages.map((message) => {
                const MessageIcon = getMessageIcon(message.type);
                
                return (
                  <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getMessageColor(message.type)}`}>
                        <MessageIcon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMessageColor(message.type)}`}>
                              {message.type === 'note' ? 'Note' : 'Message'}
                            </span>
                            {user.role === 'mentor' && (
                              <span className="text-sm text-gray-600">
                                {message.senderId === user.id ? `To: ${getStudentName(message.receiverId)}` : `From: ${getStudentName(message.senderId)}`}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <p className="text-gray-900 mb-2">{message.content}</p>
                        
                        {!message.read && user.role === 'student' && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              <span className="text-xs text-blue-600">New</span>
                            </div>
                            <button
                              onClick={() => markAsRead(message.id)}
                              className="text-xs text-blue-600 hover:text-blue-800 underline"
                            >
                              Mark as read
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">No messages found</p>
                <p className="text-gray-500">
                  {user.role === 'mentor' 
                    ? 'Send your first message to a student'
                    : 'Messages from your mentor will appear here'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;