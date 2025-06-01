import React, { useState } from 'react';
import StudentList from '../components/students/StudentList';
import StudentProfile from '../components/students/StudentProfile';
import { Student } from '../types';

const Students: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
  };
  
  const handleBackToList = () => {
    setSelectedStudent(null);
  };
  
  return (
    <div>
      {selectedStudent ? (
        <StudentProfile 
          student={selectedStudent}
          onBack={handleBackToList}
        />
      ) : (
        <StudentList onViewStudent={handleViewStudent} />
      )}
    </div>
  );
};

export default Students;