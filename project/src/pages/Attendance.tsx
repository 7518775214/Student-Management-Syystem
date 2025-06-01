import React, { useState } from 'react';
import { Calendar, Filter, Check, X, Clock, FileText } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockStudents, mockAttendance } from '../data/mockData';
import Avatar from '../components/ui/Avatar';

const Attendance: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedGrade, setSelectedGrade] = useState('all');
  
  // Get the string representation of current date for filtering
  const dateString = currentDate.toISOString().split('T')[0];
  
  // Filter students based on selected grade
  const filteredStudents = selectedGrade === 'all'
    ? mockStudents
    : mockStudents.filter(student => student.grade === selectedGrade);
  
  // Get attendance records for the current date
  const todayAttendance = mockAttendance.filter(record => record.date === dateString);
  
  // Format the date for display
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate attendance stats
  const totalStudents = filteredStudents.length;
  const presentCount = todayAttendance.filter(record => record.status === 'present').length;
  const absentCount = todayAttendance.filter(record => record.status === 'absent').length;
  const lateCount = todayAttendance.filter(record => record.status === 'late').length;
  const unmarkedCount = totalStudents - (presentCount + absentCount + lateCount);
  
  // Handle previous/next day navigation
  const goToPreviousDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };
  
  const goToNextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" icon={<Calendar className="h-4 w-4" />}>
            Select Date
          </Button>
          <Button variant="primary" size="sm" icon={<FileText className="h-4 w-4" />}>
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-50 p-3">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-500">Present</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{presentCount}</p>
              <p className="text-sm text-gray-500">{Math.round((presentCount / totalStudents) * 100) || 0}%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-red-50 p-3">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-500">Absent</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{absentCount}</p>
              <p className="text-sm text-gray-500">{Math.round((absentCount / totalStudents) * 100) || 0}%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-amber-50 p-3">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-500">Late</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{lateCount}</p>
              <p className="text-sm text-gray-500">{Math.round((lateCount / totalStudents) * 100) || 0}%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-gray-50 p-3">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-500">Unmarked</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{unmarkedCount}</p>
              <p className="text-sm text-gray-500">{Math.round((unmarkedCount / totalStudents) * 100) || 0}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4">
              <button onClick={goToPreviousDay} className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <CardTitle className="text-lg">{formattedDate}</CardTitle>
              <button onClick={goToNextDay} className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Filter by grade:</span>
              </div>
              <select
                className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  // Find attendance record for this student on current date
                  const attendanceRecord = todayAttendance.find(record => record.studentId === student.id);
                  
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar
                            src={student.profileImage}
                            alt={`${student.firstName} ${student.lastName}`}
                            size="sm"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {attendanceRecord ? (
                          <Badge
                            variant={
                              attendanceRecord.status === 'present' ? 'success' :
                              attendanceRecord.status === 'absent' ? 'danger' :
                              attendanceRecord.status === 'late' ? 'warning' : 'default'
                            }
                          >
                            {attendanceRecord.status.charAt(0).toUpperCase() + attendanceRecord.status.slice(1)}
                          </Badge>
                        ) : (
                          <Badge variant="default">Not marked</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {attendanceRecord?.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant={attendanceRecord?.status === 'present' ? 'primary' : 'outline'}
                            size="sm"
                            className="px-2"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={attendanceRecord?.status === 'absent' ? 'danger' : 'outline'}
                            size="sm"
                            className="px-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={attendanceRecord?.status === 'late' ? 'warning' : 'outline'}
                            size="sm"
                            className="px-2"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;