import {
  Notice,
  NewsItem,
  Teacher,
  GalleryItem,
  ContactMessage,
  AdmissionApplication,
  StudentResult
} from '../types';
import {
  INITIAL_NOTICES,
  INITIAL_NEWS,
  INITIAL_TEACHERS,
  INITIAL_GALLERY,
  INITIAL_MESSAGES,
  INITIAL_ADMISSIONS,
  INITIAL_MOCK_RESULTS
} from '../data/initialData';

const STORAGE_KEYS = {
  NOTICES: 'lsc_notices_v1',
  NEWS: 'lsc_news_v1',
  TEACHERS: 'lsc_teachers_v1',
  GALLERY: 'lsc_gallery_v1',
  MESSAGES: 'lsc_messages_v1',
  ADMISSIONS: 'lsc_admissions_v1',
  RESULTS: 'lsc_results_v1',
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.error('Error notifying storage listener', e);
    }
  });
}

export function subscribeStorage(callback: Listener): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Failed to read ${key} from storage:`, err);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (err) {
    console.error(`Failed to write ${key} to storage:`, err);
  }
}

// === Notices ===
export function getNotices(): Notice[] {
  return getItem<Notice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
}

export function addNotice(notice: Omit<Notice, 'id' | 'date'> & { date?: string }): Notice {
  const current = getNotices();
  const newNotice: Notice = {
    ...notice,
    id: `not-${Date.now()}`,
    date: notice.date || new Date().toISOString().split('T')[0],
  };
  setItem(STORAGE_KEYS.NOTICES, [newNotice, ...current]);
  return newNotice;
}

export function updateNotice(id: string, updates: Partial<Notice>): void {
  const current = getNotices();
  const next = current.map((n) => (n.id === id ? { ...n, ...updates } : n));
  setItem(STORAGE_KEYS.NOTICES, next);
}

export function deleteNotice(id: string): void {
  const current = getNotices();
  setItem(STORAGE_KEYS.NOTICES, current.filter((n) => n.id !== id));
}

// === News ===
export function getNews(): NewsItem[] {
  return getItem<NewsItem[]>(STORAGE_KEYS.NEWS, INITIAL_NEWS);
}

export function addNews(news: Omit<NewsItem, 'id' | 'date'> & { date?: string }): NewsItem {
  const current = getNews();
  const newNews: NewsItem = {
    ...news,
    id: `news-${Date.now()}`,
    date: news.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
  setItem(STORAGE_KEYS.NEWS, [newNews, ...current]);
  return newNews;
}

export function updateNews(id: string, updates: Partial<NewsItem>): void {
  const current = getNews();
  const next = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  setItem(STORAGE_KEYS.NEWS, next);
}

export function deleteNews(id: string): void {
  const current = getNews();
  setItem(STORAGE_KEYS.NEWS, current.filter((item) => item.id !== id));
}

// === Teachers ===
export function getTeachers(): Teacher[] {
  return getItem<Teacher[]>(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
}

export function addTeacher(teacher: Omit<Teacher, 'id'>): Teacher {
  const current = getTeachers();
  const newTeacher: Teacher = {
    ...teacher,
    id: `t-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.TEACHERS, [...current, newTeacher]);
  return newTeacher;
}

export function updateTeacher(id: string, updates: Partial<Teacher>): void {
  const current = getTeachers();
  const next = current.map((t) => (t.id === id ? { ...t, ...updates } : t));
  setItem(STORAGE_KEYS.TEACHERS, next);
}

export function deleteTeacher(id: string): void {
  const current = getTeachers();
  setItem(STORAGE_KEYS.TEACHERS, current.filter((t) => t.id !== id));
}

// === Gallery ===
export function getGallery(): GalleryItem[] {
  return getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
}

export function addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
  const current = getGallery();
  const newItem: GalleryItem = {
    ...item,
    id: `gal-${Date.now()}`,
  };
  setItem(STORAGE_KEYS.GALLERY, [newItem, ...current]);
  return newItem;
}

export function deleteGalleryItem(id: string): void {
  const current = getGallery();
  setItem(STORAGE_KEYS.GALLERY, current.filter((g) => g.id !== id));
}

// === Admissions ===
export function getAdmissions(): AdmissionApplication[] {
  return getItem<AdmissionApplication[]>(STORAGE_KEYS.ADMISSIONS, INITIAL_ADMISSIONS);
}

export function submitAdmission(data: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'status' | 'submittedAt'>): AdmissionApplication {
  const current = getAdmissions();
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const applicationNo = `LSC-ADM-${year}-${randomSuffix}`;
  
  const newApp: AdmissionApplication = {
    ...data,
    id: `adm-${Date.now()}`,
    applicationNo,
    status: 'Pending',
    submittedAt: new Date().toISOString().split('T')[0],
  };

  setItem(STORAGE_KEYS.ADMISSIONS, [newApp, ...current]);
  return newApp;
}

export function updateAdmissionStatus(id: string, status: AdmissionApplication['status']): void {
  const current = getAdmissions();
  const next = current.map((a) => (a.id === id ? { ...a, status } : a));
  setItem(STORAGE_KEYS.ADMISSIONS, next);
}

// === Messages ===
export function getMessages(): ContactMessage[] {
  return getItem<ContactMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
}

export function submitMessage(data: Omit<ContactMessage, 'id' | 'date' | 'status'>): ContactMessage {
  const current = getMessages();
  const newMsg: ContactMessage = {
    ...data,
    id: `msg-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Unread',
  };
  setItem(STORAGE_KEYS.MESSAGES, [newMsg, ...current]);
  return newMsg;
}

export function markMessageStatus(id: string, status: ContactMessage['status']): void {
  const current = getMessages();
  const next = current.map((m) => (m.id === id ? { ...m, status } : m));
  setItem(STORAGE_KEYS.MESSAGES, next);
}

// === Results Search ===
export function searchResults(rollNo: string, regNo?: string, year?: string): StudentResult | null {
  const results = getItem<StudentResult[]>(STORAGE_KEYS.RESULTS, INITIAL_MOCK_RESULTS);
  const cleanRoll = rollNo.trim();
  const cleanReg = regNo?.trim();
  const cleanYear = year?.trim();

  return results.find((r) => {
    const matchesRoll = r.rollNo === cleanRoll;
    const matchesReg = !cleanReg || r.regNo === cleanReg;
    const matchesYear = !cleanYear || r.year === cleanYear;
    return matchesRoll && matchesReg && matchesYear;
  }) || null;
}

// Reset data to defaults
export function resetDatabaseToDefault(): void {
  localStorage.removeItem(STORAGE_KEYS.NOTICES);
  localStorage.removeItem(STORAGE_KEYS.NEWS);
  localStorage.removeItem(STORAGE_KEYS.TEACHERS);
  localStorage.removeItem(STORAGE_KEYS.GALLERY);
  localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  localStorage.removeItem(STORAGE_KEYS.ADMISSIONS);
  localStorage.removeItem(STORAGE_KEYS.RESULTS);
  notifyListeners();
}
