export type UserRole = 'student' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  avatar?: string;
  className?: string;
  rollNo?: string;
  section?: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Exam' | 'Admission' | 'Holiday' | 'General';
  date: string;
  description: string;
  content: string;
  pdfUrl?: string;
  isImportant?: boolean;
  publishedBy: string;
  refNo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  author: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: 'Bangla' | 'English' | 'Mathematics' | 'Science' | 'Social Science' | 'Commerce' | 'ICT' | 'Administration';
  subject: string;
  qualification: string;
  email: string;
  phone: string;
  image: string;
  joiningYear: string;
  bio: string;
}

export interface AcademicProgram {
  id: string;
  name: string;
  level: 'Primary' | 'Secondary' | 'Higher Secondary' | 'Co-Curricular';
  duration: string;
  classes: string;
  curriculum: string;
  description: string;
  subjects: string[];
  streams?: string[];
  highlights: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Events' | 'Students' | 'Cultural' | 'Sports' | 'Academic';
  imageUrl: string;
  description: string;
  date: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  desiredClass: string;
  desiredStream?: string;
  previousSchool: string;
  gpaOrMarks: string;
  phone: string;
  email: string;
  address: string;
  status: 'Pending' | 'Approved' | 'Reviewing' | 'Rejected';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface StudentResult {
  rollNo: string;
  regNo: string;
  studentName: string;
  className: string;
  examName: string;
  year: string;
  gpa: number;
  grade: string;
  status: 'Passed' | 'Failed';
  subjects: {
    subject: string;
    marks: number;
    grade: string;
    point: number;
  }[];
}
