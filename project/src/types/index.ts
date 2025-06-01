export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentDate: string;
  grade: string;
  profileImage?: string;
  attendanceRate: number;
  currentGPA: number;
  contactNumber: string;
  address: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  maxScore: number;
  term: string;
  date: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  profileImage?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}