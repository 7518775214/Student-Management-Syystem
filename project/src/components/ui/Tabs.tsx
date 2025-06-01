import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                transition duration-150 ease-in-out
                ${isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && (
                <span className={`mr-2 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

interface TabPanelsProps {
  children: React.ReactNode;
  className?: string;
}

export const TabPanels: React.FC<TabPanelsProps> = ({ children, className = '' }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

interface TabPanelProps {
  children: React.ReactNode;
  id: string;
  activeId: string;
  className?: string;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, id, activeId, className = '' }) => {
  if (id !== activeId) return null;
  return <div className={className}>{children}</div>;
};

export default Tabs;