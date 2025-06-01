import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className={`relative inline-block rounded-full overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling!.style.display = 'flex';
          }}
        />
      ) : null}
      <div 
        className={`absolute inset-0 flex items-center justify-center text-gray-700 font-medium ${src ? 'hidden' : 'flex'}`}
        style={{ fontSize: size === 'sm' ? '0.75rem' : size === 'md' ? '0.875rem' : '1rem' }}
      >
        {initials}
      </div>
    </div>
  );
};

export default Avatar;