import { Program, Material, Notification, PlatformStats, Message, Student } from '../types';

export const mockStudents: Student[] = [
  {
    id: '2',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'student' as const,
    joinDate: '2024-01-20',
    points: 850,
    level: 2,
    badges: [
      {
        id: '1',
        name: 'First Steps',
        description: 'Completed first program',
        icon: '🎯',
        earnedAt: '2024-02-01'
      }
    ],
    mentorId: '1',
    enrolledPrograms: ['1', '2'],
    lastActivity: '2024-02-14T10:30:00Z',
    totalLessonsCompleted: 8,
    averageProgress: 65
  },
  {
    id: '3',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    role: 'student' as const,
    joinDate: '2024-02-01',
    points: 1420,
    level: 3,
    badges: [
      {
        id: '1',
        name: 'First Steps',
        description: 'Completed first program',
        icon: '🎯',
        earnedAt: '2024-02-10'
      },
      {
        id: '2',
        name: 'Knowledge Seeker',
        description: 'Downloaded 10+ materials',
        icon: '📚',
        earnedAt: '2024-02-20'
      }
    ],
    mentorId: '1',
    enrolledPrograms: ['1', '3'],
    lastActivity: '2024-02-15T14:20:00Z',
    totalLessonsCompleted: 12,
    averageProgress: 80
  },
  {
    id: '4',
    name: 'Mike Rodriguez',
    email: 'mike@example.com',
    role: 'student' as const,
    joinDate: '2024-01-15',
    points: 650,
    level: 2,
    badges: [],
    mentorId: '1',
    enrolledPrograms: ['2'],
    lastActivity: '2024-02-13T09:15:00Z',
    totalLessonsCompleted: 5,
    averageProgress: 45
  }
];

export const mockMentors = [
  {
    id: '5',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.mentor@example.com',
    role: 'mentor' as const,
    joinDate: '2023-08-15',
    points: 2500,
    level: 5,
    badges: [
      {
        id: '3',
        name: 'Master Mentor',
        description: 'Mentored 50+ students',
        icon: '🏆',
        earnedAt: '2024-01-01'
      }
    ],
    specialization: 'Startup Strategy & Business Development',
    bio: 'Former startup founder with 15+ years of experience in building and scaling businesses.',
    studentsCount: 12,
    programsCreated: 8
  },
  {
    id: '6',
    name: 'Michael Chen',
    email: 'michael.mentor@example.com',
    role: 'mentor' as const,
    joinDate: '2023-10-20',
    points: 1800,
    level: 4,
    badges: [],
    specialization: 'Digital Marketing & Growth',
    bio: 'Marketing expert who has helped 100+ startups achieve sustainable growth.',
    studentsCount: 8,
    programsCreated: 5
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Great progress on your business plan! I have some feedback for you.',
    timestamp: '2024-02-15T10:30:00Z',
    read: false,
    type: 'message'
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Remember to focus on your target market research this week.',
    timestamp: '2024-02-14T15:45:00Z',
    read: true,
    type: 'note'
  },
  {
    id: '3',
    senderId: '1',
    receiverId: '3',
    content: 'Excellent work on the marketing strategy assignment!',
    timestamp: '2024-02-13T16:20:00Z',
    read: true,
    type: 'message'
  },
  {
    id: '4',
    senderId: '1',
    receiverId: '4',
    content: 'Please review the financial planning materials before our next session.',
    timestamp: '2024-02-12T11:15:00Z',
    read: false,
    type: 'note'
  }
];

export const mockPlatformStats: PlatformStats = {
  totalUsers: 523,
  totalMentors: 45,
  totalStudents: 478,
  totalPrograms: 156,
  totalLessons: 1247,
  activeUsers: 342,
  completionRate: 87
};

export const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Startup Fundamentals',
    description: 'Learn the basics of starting and running a successful startup',
    mentor: 'Sarah Johnson',
    duration: '8 weeks',
    progress: 75,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-03-29',
    lessons: [
      {
        id: '1',
        title: 'Market Research Essentials',
        description: 'Understanding your target market',
        duration: '45 min',
        completed: true,
        type: 'video',
        content: 'Understanding your target market is crucial for startup success...',
        videoUrl: 'https://example.com/video1',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Business Model Canvas',
        description: 'Creating your business model',
        duration: '60 min',
        completed: true,
        type: 'exercise',
        content: 'Learn to create a comprehensive business model canvas...',
        documentUrl: 'https://example.com/doc1',
        createdAt: '2024-01-16T10:00:00Z',
        updatedAt: '2024-01-16T10:00:00Z'
      },
      {
        id: '3',
        title: 'MVP Development',
        description: 'Building your minimum viable product',
        duration: '90 min',
        completed: false,
        type: 'video',
        content: 'MVP development strategies and best practices...',
        videoUrl: 'https://example.com/video2',
        createdAt: '2024-01-17T10:00:00Z',
        updatedAt: '2024-01-17T10:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Digital Marketing Mastery',
    description: 'Master digital marketing strategies for modern entrepreneurs',
    mentor: 'Michael Chen',
    duration: '6 weeks',
    progress: 30,
    status: 'active',
    startDate: '2024-02-15',
    endDate: '2024-03-29',
    lessons: [
      {
        id: '4',
        title: 'Social Media Strategy',
        description: 'Building your social presence',
        duration: '50 min',
        completed: true,
        type: 'video',
        content: 'Building your social media presence effectively...',
        videoUrl: 'https://example.com/video3',
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: '2024-01-20T10:00:00Z'
      },
      {
        id: '5',
        title: 'Content Marketing',
        description: 'Creating engaging content',
        duration: '40 min',
        completed: false,
        type: 'document',
        content: 'Content marketing strategies for entrepreneurs...',
        documentUrl: 'https://example.com/doc2',
        createdAt: '2024-01-21T10:00:00Z',
        updatedAt: '2024-01-21T10:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Financial Planning for Startups',
    description: 'Master the financial aspects of entrepreneurship',
    mentor: 'Emily Rodriguez',
    duration: '4 weeks',
    progress: 0,
    status: 'pending',
    startDate: '2024-03-01',
    endDate: '2024-03-29',
    lessons: [
      {
        id: '6',
        title: 'Financial Fundamentals',
        description: 'Basic financial concepts for entrepreneurs',
        duration: '60 min',
        completed: false,
        type: 'video',
        content: 'Learn the essential financial concepts every entrepreneur needs to know...',
        videoUrl: 'https://example.com/video4',
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
      }
    ]
  }
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Business Plan Template',
    description: 'Comprehensive template for creating your business plan',
    type: 'template',
    category: 'Planning',
    author: 'Platform Team',
    uploadDate: '2024-01-15',
    downloads: 247,
    fileUrl: 'https://example.com/business-plan-template.pdf'
  },
  {
    id: '2',
    title: 'Market Research Guide',
    description: 'Step-by-step guide to conducting market research',
    type: 'guide',
    category: 'Research',
    author: 'Sarah Johnson',
    uploadDate: '2024-01-20',
    downloads: 156,
    fileUrl: 'https://example.com/market-research-guide.pdf'
  },
  {
    id: '3',
    title: 'Pitch Deck Fundamentals',
    description: 'Video tutorial on creating compelling pitch decks',
    type: 'video',
    category: 'Pitching',
    author: 'Michael Chen',
    uploadDate: '2024-02-01',
    downloads: 89,
    fileUrl: 'https://example.com/pitch-deck-video.mp4'
  },
  {
    id: '4',
    title: 'Financial Projections Worksheet',
    description: 'Excel template for financial planning and projections',
    type: 'template',
    category: 'Finance',
    author: 'Emily Rodriguez',
    uploadDate: '2024-02-10',
    downloads: 134,
    fileUrl: 'https://example.com/financial-projections.xlsx'
  },
  {
    id: '5',
    title: 'Customer Interview Script',
    description: 'Template for conducting effective customer interviews',
    type: 'template',
    category: 'Research',
    author: 'Sarah Johnson',
    uploadDate: '2024-02-05',
    downloads: 98,
    fileUrl: 'https://example.com/customer-interview-script.pdf'
  },
  {
    id: '6',
    title: 'Social Media Calendar Template',
    description: 'Monthly planning template for social media content',
    type: 'template',
    category: 'Marketing',
    author: 'Michael Chen',
    uploadDate: '2024-02-12',
    downloads: 76,
    fileUrl: 'https://example.com/social-media-calendar.xlsx'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Achievement Unlocked!',
    message: 'You\'ve earned the "Knowledge Seeker" badge for downloading 10+ materials.',
    type: 'achievement',
    read: false,
    timestamp: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Program Update',
    message: 'New lesson available in "Startup Fundamentals" program.',
    type: 'info',
    read: false,
    timestamp: '2024-02-14T15:45:00Z'
  },
  {
    id: '3',
    title: 'Mentor Session Reminder',
    message: 'Your 1-on-1 session with Sarah Johnson is scheduled for tomorrow at 2 PM.',
    type: 'warning',
    read: true,
    timestamp: '2024-02-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'Program Completed',
    message: 'Congratulations! You\'ve completed the "Digital Marketing Basics" program.',
    type: 'success',
    read: true,
    timestamp: '2024-02-10T16:20:00Z'
  },
  {
    id: '5',
    title: 'New Material Available',
    message: 'A new financial planning template has been added to your resources.',
    type: 'info',
    read: false,
    timestamp: '2024-02-12T11:30:00Z'
  },
  {
    id: '6',
    title: 'Weekly Progress Report',
    message: 'You\'ve completed 3 lessons this week. Keep up the great work!',
    type: 'success',
    read: true,
    timestamp: '2024-02-11T18:00:00Z'
  }
];