import React from 'react';
import { NavItem } from '../../types';
import { Users, BookOpen, Calendar, BarChart, Settings, LogOut, Home } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Students', href: '/students', icon: Users },
  { title: 'Attendance', href: '/attendance', icon: BookOpen },
  { title: 'Grades', href: '/grades', icon: BarChart },
  { title: 'Calendar', href: '/calendar', icon: Calendar },
  { title: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">EduTrack</h1>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;
          
          return (
            <button
              key={item.href}
              onClick={() => onNavigate(item.href)}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-md w-full transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
              {item.title}
            </button>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200">
        <div className="flex items-center">
          <Avatar 
            src={currentUser.profileImage} 
            alt={currentUser.name} 
            size="sm"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-500">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;