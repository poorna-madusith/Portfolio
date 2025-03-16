import React from 'react';

interface MediaButtonProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
}

const MediaButton: React.FC<MediaButtonProps> = ({ href, icon, label }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </a>
  );
};

export default MediaButton;
