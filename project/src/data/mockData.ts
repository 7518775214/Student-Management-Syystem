import { Student, AttendanceRecord, GradeRecord, User } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.j@example.edu',
    enrollmentDate: '2023-09-01',
    grade: '10th',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendanceRate: 97,
    currentGPA: 3.8,
    contactNumber: '(555) 123-4567',
    address: '123 Education St, Learning City',
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.j@example.com',
    parentPhone: '(555) 987-6543'
  },
  {
    id: '2',
    firstName: 'Liam',
    lastName: 'Williams',
    email: 'liam.w@example.edu',
    enrollmentDate: '2023-09-01',
    grade: '10th',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendanceRate: 92,
    currentGPA: 3.5,
    contactNumber: '(555) 234-5678',
    address: '456 Scholar Ave, Learning City',
    parentName: 'Michael Williams',
    parentEmail: 'michael.w@example.com',
    parentPhone: '(555) 876-5432'
  },
  {
    id: '3',
    firstName: 'Olivia',
    lastName: 'Smith',
    email: 'olivia.s@example.edu',
    enrollmentDate: '2023-09-01',
    grade: '11th',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendanceRate: 99,
    currentGPA: 4.0,
    contactNumber: '(555) 345-6789',
    address: '789 Academy Lane, Learning City',
    parentName: 'David Smith',
    parentEmail: 'david.s@example.com',
    parentPhone: '(555) 765-4321'
  },
  {
    id: '4',
    firstName: 'Noah',
    lastName: 'Brown',
    email: 'noah.b@example.edu',
    enrollmentDate: '2023-09-01',
    grade: '9th',
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendanceRate: 85,
    currentGPA: 2.9,
    contactNumber: '(555) 456-7890',
    address: '101 Knowledge Road, Learning City',
    parentName: 'Jennifer Brown',
    parentEmail: 'jennifer.b@example.com',
    parentPhone: '(555) 654-3210'
  },
  {
    id: '5',
    firstName: 'Sophia',
    lastName: 'Garcia',
    email: 'sophia.g@example.edu',
    enrollmentDate: '2023-09-01',
    grade: '12th',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    attendanceRate: 95,
    currentGPA: 3.7,
    contactNumber: '(555) 567-8901',
    address: '202 Wisdom Way, Learning City',
    parentName: 'Carlos Garcia',
    parentEmail: 'carlos.g@example.com',
    parentPhone: '(555) 543-2109'
  }
];

export const mockAttendance: AttendanceRecord[] = [
  { id: '1', studentId: '1', date: '2024-05-01', status: 'present', notes: '' },
  { id: '2', studentId: '1', date: '2024-05-02', status: 'present', notes: '' },
  { id: '3', studentId: '1', date: '2024-05-03', status: 'present', notes: '' },
  { id: '4', studentId: '1', date: '2024-05-04', status: 'absent', notes: 'Doctor appointment' },
  { id: '5', studentId: '1', date: '2024-05-05', status: 'present', notes: '' },
  { id: '6', studentId: '2', date: '2024-05-01', status: 'present', notes: '' },
  { id: '7', studentId: '2', date: '2024-05-02', status: 'late', notes: 'Bus delay' },
  { id: '8', studentId: '2', date: '2024-05-03', status: 'present', notes: '' },
  { id: '9', studentId: '2', date: '2024-05-04', status: 'present', notes: '' },
  { id: '10', studentId: '2', date: '2024-05-05', status: 'present', notes: '' },
];

export const mockGrades: GradeRecord[] = [
  { id: '1', studentId: '1', subject: 'Mathematics', score: 92, maxScore: 100, term: 'Spring 2024', date: '2024-04-15', notes: 'Excellent work on calculus problems' },
  { id: '2', studentId: '1', subject: 'English', score: 88, maxScore: 100, term: 'Spring 2024', date: '2024-04-20', notes: 'Good essay structure' },
  { id: '3', studentId: '1', subject: 'Science', score: 95, maxScore: 100, term: 'Spring 2024', date: '2024-04-18', notes: 'Outstanding lab results' },
  { id: '4', studentId: '2', subject: 'Mathematics', score: 78, maxScore: 100, term: 'Spring 2024', date: '2024-04-15', notes: 'Needs work on algebra' },
  { id: '5', studentId: '2', subject: 'English', score: 85, maxScore: 100, term: 'Spring 2024', date: '2024-04-20', notes: 'Good vocabulary usage' },
  { id: '6', studentId: '2', subject: 'Science', score: 80, maxScore: 100, term: 'Spring 2024', date: '2024-04-18', notes: 'Satisfactory lab work' },
];

export const currentUser: User = {
  id: 'admin1',
  name: 'Alex Rodriguez',
  email: 'alex.rodriguez@example.edu',
  role: 'admin',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
};