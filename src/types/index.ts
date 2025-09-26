export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'super_admin' | 'mentor' | 'student';
  joinDate: string;
  points: number;
  level: number;
  badges: Badge[];
  mentorId?: string; // For mentees, references their assigned mentor
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  mentor: string;
  duration: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'document' | 'exercise';
  content?: string;
  videoUrl?: string;
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'template' | 'guide';
  category: string;
  author: string;
  uploadDate: string;
  downloads: number;
  fileUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'achievement';
  read: boolean;
  timestamp: string;
}

export interface Student extends User {
  role: 'student';
  mentorId: string;
  enrolledPrograms: string[];
  lastActivity: string;
  totalLessonsCompleted: number;
  averageProgress: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'message' | 'note';
}

export interface PlatformStats {
  totalUsers: number;
  totalMentors: number;
  totalStudents: number;
  totalPrograms: number;
  totalLessons: number;
  activeUsers: number;
  completionRate: number;
}

export interface CreateLessonData {
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'document' | 'exercise';
  content?: string;
  videoUrl?: string;
  documentUrl?: string;
}

export interface CreateStudentData {
  name: string;
  email: string;
  password: string;
  role?: 'mentor' | 'student';
}

export interface CreateMentorData {
  name: string;
  email: string;
  password: string;
  specialization: string;
  bio: string;
}