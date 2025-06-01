import React from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  user: {
    name: string;
    avatar?: string;
  };
  type: 'attendance' | 'grade' | 'enrollment' | 'note';
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'New student enrolled',
    description: 'Emma Johnson has been enrolled in 10th grade',
    time: '2 hours ago',
    user: {
      name: 'Admin User',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    type: 'enrollment'
  },
  {
    id: '2',
    title: 'Attendance updated',
    description: 'Marked 25 students present in Mathematics class',
    time: '3 hours ago',
    user: {
      name: 'Jane Smith',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    type: 'attendance'
  },
  {
    id: '3',
    title: 'Grades posted',
    description: 'Final grades for Science class have been posted',
    time: 'Yesterday',
    user: {
      name: 'Robert Johnson',
    },
    type: 'grade'
  },
  {
    id: '4',
    title: 'Parent meeting scheduled',
    description: 'Meeting with Liam Williams parents at 3:00 PM',
    time: '2 days ago',
    user: {
      name: 'Michelle Lee',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    type: 'note'
  },
];

const ActivityIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  const iconClasses = "w-5 h-5";
  
  switch (type) {
    case 'attendance':
      return (
        <div className="p-2 bg-blue-100 rounded-full">
          <svg className={`${iconClasses} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    case 'grade':
      return (
        <div className="p-2 bg-green-100 rounded-full">
          <svg className={`${iconClasses} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      );
    case 'enrollment':
      return (
        <div className="p-2 bg-amber-100 rounded-full">
          <svg className={`${iconClasses} text-amber-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
      );
    case 'note':
      return (
        <div className="p-2 bg-purple-100 rounded-full">
          <svg className={`${iconClasses} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <ActivityIcon type={activity.type} />
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{activity.description}</p>
                <div className="mt-2 flex items-center">
                  <Avatar 
                    src={activity.user.avatar} 
                    alt={activity.user.name} 
                    size="sm" 
                  />
                  <span className="ml-2 text-xs text-gray-500">{activity.user.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;