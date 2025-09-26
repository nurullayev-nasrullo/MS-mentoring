import { User } from '../types';

const STORAGE_KEY = 'mentoring_platform_user';

const SUPER_ADMIN_EMAIL = 'mirshod@mentorhub.com';

export const authService = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in real app, this would call your API
        if (email && password) {
          let role: 'super_admin' | 'mentor' | 'student' = 'student';
          
          if (email === SUPER_ADMIN_EMAIL) {
            role = 'super_admin';
          } else if (email.includes('mentor')) {
            role = 'mentor';
          }
          
          const user: User = {
            id: '1',
            name: email === SUPER_ADMIN_EMAIL ? 'Mirshod Shakirov' : 
                  email.includes('mentor') ? 'John Mentor' : 'Jane Student',
            email: email,
            role: role,
            joinDate: '2024-01-15',
            points: role === 'super_admin' ? 5000 : role === 'mentor' ? 2500 : 1250,
            level: role === 'super_admin' ? 5 : role === 'mentor' ? 4 : 3,
            badges: [
              {
                id: '1',
                name: 'First Steps',
                description: 'Completed first program',
                icon: '🎯',
                earnedAt: '2024-02-01'
              },
              {
                id: '2',
                name: 'Knowledge Seeker',
                description: 'Downloaded 10+ materials',
                icon: '📚',
                earnedAt: '2024-02-15'
              }
            ]
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  register: (name: string, email: string, password: string, role: 'mentor' | 'student'): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
          joinDate: new Date().toISOString().split('T')[0],
          points: 0,
          level: 1,
          badges: []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }
};