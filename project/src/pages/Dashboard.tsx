import React from 'react';
import { Users, Clock, Calendar, Book } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import Card, { CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { mockStudents } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Calculate some stats from mock data
  const totalStudents = mockStudents.length;
  const averageAttendance = Math.round(
    mockStudents.reduce((acc, student) => acc + student.attendanceRate, 0) / totalStudents
  );
  const averageGpa = parseFloat(
    (mockStudents.reduce((acc, student) => acc + student.currentGPA, 0) / totalStudents).toFixed(2)
  );
  
  // Sample data for charts
  const attendanceData = [92, 94, 89, 96, 93];
  const attendanceLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  const gradeData = [3.2, 3.4, 3.6, 3.5, 3.7];
  const gradeLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<Users />}
          trend={{ value: 5, isPositive: true }}
          description="Across all grades"
        />
        <StatCard
          title="Average Attendance"
          value={`${averageAttendance}%`}
          icon={<Clock />}
          trend={{ value: 2, isPositive: true }}
          description="Last 30 days"
        />
        <StatCard
          title="Average GPA"
          value={averageGpa}
          icon={<Book />}
          trend={{ value: 0.2, isPositive: true }}
          description="Current semester"
        />
        <StatCard
          title="Upcoming Events"
          value={4}
          icon={<Calendar />}
          description="This week"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              data={attendanceData}
              labels={attendanceLabels}
              type="bar"
              height={250}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-full justify-center">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">A (3.7-4.0)</span>
                    <span className="text-sm font-medium">24%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">B (3.0-3.6)</span>
                    <span className="text-sm font-medium">38%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">C (2.0-2.9)</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">D/F (0-1.9)</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Chart
                  data={gradeData}
                  labels={gradeLabels}
                  type="line"
                  height={150}
                  title="Average GPA Trend"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">GPA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockStudents.slice(0, 5).map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img 
                              className="h-8 w-8 rounded-full" 
                              src={student.profileImage} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className={`h-2 w-16 rounded-full ${
                              student.attendanceRate >= 90 ? 'bg-green-500' :
                              student.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                          >
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: `${student.attendanceRate}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">{student.attendanceRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{student.currentGPA.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;