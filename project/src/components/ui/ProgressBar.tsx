import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  size = 'md',
  color = 'primary',
  showValue = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };
  
  const colorClasses = {
    primary: 'bg-blue-600',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  // Determine text color based on the progress color
  const getValueColor = () => {
    switch (color) {
      case 'primary': return 'text-blue-700';
      case 'success': return 'text-green-700';
      case 'warning': return 'text-amber-700';
      case 'danger': return 'text-red-700';
      default: return 'text-blue-700';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className={`text-sm font-medium ${getValueColor()}`}>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div 
          className={`${colorClasses[color]} rounded-full transition-all duration-500 ease-out`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;