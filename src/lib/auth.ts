import { User } from '../types';

const AUTH_STORAGE_KEY = 'lsc_auth_session_v1';

export const DEMO_STUDENT_USER: User = {
  id: 'usr-student-01',
  name: 'Tanvir Ahmed Tanmoy',
  email: 'student@laxmipur.edu.bd',
  role: 'student',
  studentId: 'LSC-2024-042',
  className: 'Class X (SSC)',
  rollNo: '101',
  section: 'A (Science)',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
};

export const DEMO_ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Academic Administration Cell',
  email: 'admin@laxmipur.edu.bd',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
};

type AuthListener = (user: User | null) => void;
const authListeners: Set<AuthListener> = new Set();

function notifyAuth(user: User | null) {
  authListeners.forEach((fn) => {
    try {
      fn(user);
    } catch (e) {
      console.error('Error notifying auth listener', e);
    }
  });
}

export function subscribeAuth(callback: AuthListener): () => void {
  authListeners.add(callback);
  return () => {
    authListeners.delete(callback);
  };
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function loginUser(identifier: string, password: string): { success: boolean; user?: User; error?: string } {
  const cleanId = identifier.trim().toLowerCase();

  // Admin authentication check
  if (cleanId === 'admin@laxmipur.edu.bd' || cleanId === 'admin') {
    if (password === 'admin123' || password === 'admin') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_ADMIN_USER));
      notifyAuth(DEMO_ADMIN_USER);
      return { success: true, user: DEMO_ADMIN_USER };
    }
    return { success: false, error: 'Invalid admin credentials. (Hint: admin@laxmipur.edu.bd / admin123)' };
  }

  // Student authentication check
  if (
    cleanId === 'student@laxmipur.edu.bd' ||
    cleanId === 'student' ||
    cleanId === 'lsc-2024-042' ||
    cleanId === '101'
  ) {
    if (password === 'student123' || password === 'student') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_STUDENT_USER));
      notifyAuth(DEMO_STUDENT_USER);
      return { success: true, user: DEMO_STUDENT_USER };
    }
    return { success: false, error: 'Invalid password. (Hint: student@laxmipur.edu.bd / student123)' };
  }

  // Generic student login simulation
  if (cleanId.includes('@') || cleanId.startsWith('lsc-')) {
    if (password.length >= 4) {
      const genericStudent: User = {
        id: `usr-${Date.now()}`,
        name: cleanId.split('@')[0].toUpperCase(),
        email: cleanId,
        role: 'student',
        studentId: 'LSC-2025-GEN',
        className: 'Class XI',
        rollNo: '204',
        section: 'Science',
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(genericStudent));
      notifyAuth(genericStudent);
      return { success: true, user: genericStudent };
    }
    return { success: false, error: 'Password must be at least 4 characters.' };
  }

  return { success: false, error: 'Account not found. Use student@laxmipur.edu.bd or admin@laxmipur.edu.bd' };
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  notifyAuth(null);
}
