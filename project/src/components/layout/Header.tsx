import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">{title}</h1>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block mr-4 max-w-md w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>

          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <Bell className="h-6 w-6" />
          </button>

          <div className="ml-4 flex items-center">
            <Avatar
              src={currentUser.profileImage}
              alt={currentUser.name}
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;