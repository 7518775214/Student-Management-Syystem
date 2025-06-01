import React, { useState } from 'react';
import { Search, Filter, Plus, SortAsc, SortDesc } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockStudents, mockGrades } from '../data/mockData';
import ProgressBar from '../components/ui/ProgressBar';

const Grades: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Extract unique subjects from grades
  const subjects = Array.from(new Set(mockGrades.map(grade => grade.subject)));
  
  // Filter students based on selected grade level
  const filteredStudentsByGrade = selectedGrade === 'all'
    ? mockStudents
    : mockStudents.filter(student => student.grade === selectedGrade);
  
  // Filter students based on search term
  const filteredStudents = filteredStudentsByGrade.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate average scores by student and subject
  const studentScores = filteredStudents.map(student => {
    const studentGrades = mockGrades.filter(grade => grade.studentId === student.id);
    
    // Filter by selected subject if necessary
    const relevantGrades = selectedSubject === 'all'
      ? studentGrades
      : studentGrades.filter(grade => grade.subject === selectedSubject);
    
    // Calculate average score percentage
    const avgScore = relevantGrades.length > 0
      ? relevantGrades.reduce((sum, grade) => sum + (grade.score / grade.maxScore) * 100, 0) / relevantGrades.length
      : 0;
    
    return {
      student,
      avgScore,
      grades: relevantGrades
    };
  });
  
  // Sort students based on selected field and direction
  const sortedStudents = [...studentScores].sort((a, b) => {
    if (sortField === 'name') {
      const nameA = `${a.student.firstName} ${a.student.lastName}`.toLowerCase();
      const nameB = `${b.student.firstName} ${b.student.lastName}`.toLowerCase();
      return sortDirection === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortField === 'grade') {
      return sortDirection === 'asc'
        ? a.student.grade.localeCompare(b.student.grade)
        : b.student.grade.localeCompare(a.student.grade);
    } else if (sortField === 'score') {
      return sortDirection === 'asc'
        ? a.avgScore - b.avgScore
        : b.avgScore - a.avgScore;
    }
    return 0;
  });
  
  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get letter grade based on percentage
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return { letter: 'A', variant: 'success' as const };
    if (percentage >= 80) return { letter: 'B', variant: 'primary' as const };
    if (percentage >= 70) return { letter: 'C', variant: 'warning' as const };
    if (percentage >= 60) return { letter: 'D', variant: 'danger' as const };
    return { letter: 'F', variant: 'danger' as const };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Grades</h1>
        <div className="flex space-x-2">
          <Button variant="primary" size="sm" icon={<Plus className="h-4 w-4" />}>
            Add New Grade
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle>Grade Management</CardTitle>
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
            </div>
          </div>
        </CardHeader>
        
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600 mr-2">Grade Level:</span>
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
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Subject:</span>
              <select
                className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Term:</span>
              <select
                className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="spring2024">Spring 2024</option>
                <option value="fall2023">Fall 2023</option>
              </select>
            </div>
          </div>
        </div>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center">
                      Student
                      {sortField === 'name' && (
                        sortDirection === 'asc' 
                          ? <SortAsc className="ml-1 h-4 w-4" /> 
                          : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => toggleSort('grade')}
                  >
                    <div className="flex items-center">
                      Grade Level
                      {sortField === 'grade' && (
                        sortDirection === 'asc' 
                          ? <SortAsc className="ml-1 h-4 w-4" /> 
                          : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {selectedSubject === 'all' ? 'Average Score' : selectedSubject}
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => toggleSort('score')}
                  >
                    <div className="flex items-center">
                      Letter Grade
                      {sortField === 'score' && (
                        sortDirection === 'asc' 
                          ? <SortAsc className="ml-1 h-4 w-4" /> 
                          : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedStudents.map(({ student, avgScore, grades }) => {
                  const { letter, variant } = getLetterGrade(avgScore);
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img 
                              className="h-8 w-8 rounded-full" 
                              src={student.profileImage} 
                              alt="" 
                            />
                          </div>
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
                        <div className="w-full max-w-xs">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{avgScore.toFixed(1)}%</span>
                          </div>
                          <ProgressBar 
                            value={avgScore} 
                            color={
                              avgScore >= 90 ? 'success' :
                              avgScore >= 80 ? 'primary' :
                              avgScore >= 70 ? 'warning' : 'danger'
                            }
                            size="sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={variant}>{letter}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="ml-2">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Class Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-4">Grade Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>A (90-100%)</span>
                    <span>42%</span>
                  </div>
                  <ProgressBar value={42} color="success" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>B (80-89%)</span>
                    <span>28%</span>
                  </div>
                  <ProgressBar value={28} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>C (70-79%)</span>
                    <span>18%</span>
                  </div>
                  <ProgressBar value={18} color="warning" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>D (60-69%)</span>
                    <span>8%</span>
                  </div>
                  <ProgressBar value={8} color="danger" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>F (0-59%)</span>
                    <span>4%</span>
                  </div>
                  <ProgressBar value={4} color="danger" />
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Average Scores by Subject</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span>82%</span>
                  </div>
                  <ProgressBar value={82} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>English</span>
                    <span>85%</span>
                  </div>
                  <ProgressBar value={85} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span>78%</span>
                  </div>
                  <ProgressBar value={78} color="warning" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>History</span>
                    <span>88%</span>
                  </div>
                  <ProgressBar value={88} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Physical Education</span>
                    <span>94%</span>
                  </div>
                  <ProgressBar value={94} color="success" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;