import React, { useState } from 'react';
import { Search, Filter, UserPlus } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Student } from '../../types';
import { mockStudents } from '../../data/mockData';

interface StudentListProps {
  onViewStudent: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ onViewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStudents = mockStudents.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceBadge = (rate: number) => {
    if (rate >= 95) return <Badge variant="success">Excellent</Badge>;
    if (rate >= 85) return <Badge variant="primary">Good</Badge>;
    if (rate >= 75) return <Badge variant="warning">Fair</Badge>;
    return <Badge variant="danger">Poor</Badge>;
  };

  const getGradeBadge = (gpa: number) => {
    if (gpa >= 3.7) return <Badge variant="success">A</Badge>;
    if (gpa >= 3.0) return <Badge variant="primary">B</Badge>;
    if (gpa >= 2.0) return <Badge variant="warning">C</Badge>;
    return <Badge variant="danger">D</Badge>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
            <Button variant="primary" size="sm" icon={<UserPlus className="h-4 w-4" />}>
              Add Student
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GPA
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewStudent(student)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar src={student.profileImage} alt={`${student.firstName} ${student.lastName}`} size="md" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.grade}</div>
                  <div className="text-sm text-gray-500">Class of 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900 mr-2">{student.attendanceRate}%</div>
                    {getAttendanceBadge(student.attendanceRate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900 mr-2">{student.currentGPA.toFixed(1)}</div>
                    {getGradeBadge(student.currentGPA)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;