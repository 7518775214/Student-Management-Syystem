import React, { useState } from 'react';
import { ArrowLeft, Edit, Mail, Phone, MapPin, Bookmark, User, UserCheck } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card, { CardContent, CardHeader, CardTitle } from '../ui/Card';
import Tabs from '../ui/Tabs';
import { Student, AttendanceRecord, GradeRecord } from '../../types';
import { mockAttendance, mockGrades } from '../../data/mockData';
import ProgressBar from '../ui/ProgressBar';
import Chart from '../ui/Chart';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const studentAttendance = mockAttendance.filter(record => record.studentId === student.id);
  const studentGrades = mockGrades.filter(record => record.studentId === student.id);
  
  // Generate attendance data for chart
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    present: studentAttendance.filter(record => record.status === 'present').length,
    absent: studentAttendance.filter(record => record.status === 'absent').length,
    late: studentAttendance.filter(record => record.status === 'late').length,
  };
  
  // Generate grade data for chart
  const subjectScores = studentGrades.map(grade => ({
    subject: grade.subject,
    percentage: (grade.score / grade.maxScore) * 100,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          icon={<ArrowLeft className="h-4 w-4" />}
          onClick={onBack}
        >
          Back to Students
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Edit className="h-4 w-4" />}
        >
          Edit Profile
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 h-32 relative">
          <div className="absolute -bottom-12 left-6">
            <Avatar 
              src={student.profileImage} 
              alt={`${student.firstName} ${student.lastName}`} 
              size="lg" 
              className="border-4 border-white" 
            />
          </div>
        </div>
        
        <div className="pt-16 pb-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-gray-500">Student ID: {student.id}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-2">
              <Badge variant="primary">{student.grade} Grade</Badge>
              <Badge variant="info">Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</Badge>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{student.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{student.contactNumber}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{student.address}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs
        tabs={[
          { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
          { id: 'attendance', label: 'Attendance', icon: <UserCheck className="h-4 w-4" /> },
          { id: 'grades', label: 'Grades', icon: <Bookmark className="h-4 w-4" /> },
        ]}
        defaultTabId="overview"
        onChange={setActiveTab}
      />
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Overall GPA</span>
                    <span className="text-sm font-medium text-blue-600">{student.currentGPA.toFixed(1)}/4.0</span>
                  </div>
                  <ProgressBar
                    value={student.currentGPA}
                    max={4}
                    color="primary"
                    size="lg"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Attendance Rate</span>
                    <span className="text-sm font-medium text-blue-600">{student.attendanceRate}%</span>
                  </div>
                  <ProgressBar
                    value={student.attendanceRate}
                    color={student.attendanceRate >= 90 ? 'success' : student.attendanceRate >= 80 ? 'warning' : 'danger'}
                    size="lg"
                  />
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Subject Performance</h4>
                  <div className="space-y-4">
                    {subjectScores.map((subject, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{subject.subject}</span>
                          <span className="text-sm text-gray-600">{subject.percentage.toFixed(1)}%</span>
                        </div>
                        <ProgressBar
                          value={subject.percentage}
                          color={subject.percentage >= 90 ? 'success' : subject.percentage >= 70 ? 'primary' : 'warning'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-sm text-gray-900">{student.parentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{student.parentEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{student.parentPhone}</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" size="sm" icon={<Mail className="h-4 w-4" />} className="w-full">
                    Contact Parent
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{student.attendanceRate}%</p>
                    <p className="text-sm text-gray-500">Overall Attendance Rate</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{attendanceData.present}</p>
                      <p className="text-xs text-gray-500">Present</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-red-600">{attendanceData.absent}</p>
                      <p className="text-xs text-gray-500">Absent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-amber-600">{attendanceData.late}</p>
                      <p className="text-xs text-gray-500">Late</p>
                    </div>
                  </div>
                </div>
                
                <Chart
                  title="Recent Attendance"
                  data={[4, 5, 3, 5, 4]}
                  labels={['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']}
                  height={200}
                />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Daily Records</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {studentAttendance.map((record) => (
                        <tr key={record.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge
                              variant={
                                record.status === 'present' ? 'success' :
                                record.status === 'absent' ? 'danger' :
                                record.status === 'late' ? 'warning' : 'default'
                              }
                            >
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {record.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Month</p>
                  <ProgressBar
                    value={student.attendanceRate}
                    color={student.attendanceRate >= 90 ? 'success' : student.attendanceRate >= 80 ? 'warning' : 'danger'}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Previous Month</p>
                  <ProgressBar
                    value={94}
                    color="success"
                    className="mt-2"
                  />
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">By Subject</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Mathematics</span>
                        <span>98%</span>
                      </div>
                      <ProgressBar value={98} color="success" size="sm" className="mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>English</span>
                        <span>95%</span>
                      </div>
                      <ProgressBar value={95} color="success" size="sm" className="mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Science</span>
                        <span>92%</span>
                      </div>
                      <ProgressBar value={92} color="success" size="sm" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'grades' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Grade Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{student.currentGPA.toFixed(1)}</p>
                    <p className="text-sm text-gray-500">Current GPA</p>
                  </div>
                  
                  <div>
                    <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                      <option>Spring 2024</option>
                      <option>Fall 2023</option>
                      <option>Spring 2023</option>
                    </select>
                  </div>
                </div>
                
                <Chart
                  title="Subject Performance"
                  data={subjectScores.map(s => s.percentage)}
                  labels={subjectScores.map(s => s.subject)}
                  type="bar"
                  height={200}
                />
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Grade Details</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {studentGrades.map((grade) => {
                        const percentage = (grade.score / grade.maxScore) * 100;
                        let letterGrade = 'F';
                        let badgeVariant: 'success' | 'primary' | 'warning' | 'danger' = 'danger';
                        
                        if (percentage >= 90) { letterGrade = 'A'; badgeVariant = 'success'; }
                        else if (percentage >= 80) { letterGrade = 'B'; badgeVariant = 'primary'; }
                        else if (percentage >= 70) { letterGrade = 'C'; badgeVariant = 'warning'; }
                        else if (percentage >= 60) { letterGrade = 'D'; badgeVariant = 'danger'; }
                        
                        return (
                          <tr key={grade.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {grade.subject}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {grade.score}/{grade.maxScore} ({percentage.toFixed(1)}%)
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Badge variant={badgeVariant}>{letterGrade}</Badge>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {new Date(grade.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {grade.notes || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Term GPA</p>
                  <p className="text-2xl font-bold text-gray-900">{student.currentGPA.toFixed(1)}</p>
                  <ProgressBar
                    value={student.currentGPA}
                    max={4}
                    color={student.currentGPA >= 3.5 ? 'success' : student.currentGPA >= 3.0 ? 'primary' : student.currentGPA >= 2.0 ? 'warning' : 'danger'}
                    className="mt-2"
                  />
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-3">GPA History</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Spring 2024</span>
                        <span>{student.currentGPA.toFixed(1)}</span>
                      </div>
                      <ProgressBar 
                        value={student.currentGPA} 
                        max={4} 
                        color="primary" 
                        size="sm" 
                        className="mt-1" 
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Fall 2023</span>
                        <span>3.6</span>
                      </div>
                      <ProgressBar value={3.6} max={4} color="primary" size="sm" className="mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Spring 2023</span>
                        <span>3.4</span>
                      </div>
                      <ProgressBar value={3.4} max={4} color="primary" size="sm" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Academic History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;