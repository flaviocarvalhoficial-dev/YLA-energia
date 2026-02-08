
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-20 h-20" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Rays of the sun over the 'A' */}
        <g stroke="#FF9800" strokeWidth="6" strokeLinecap="round">
          <line x1="180" y1="25" x2="180" y2="10" />
          <line x1="160" y1="35" x2="152" y2="25" />
          <line x1="200" y1="35" x2="208" y2="25" />
          <line x1="150" y1="55" x2="135" y2="55" />
          <line x1="210" y1="55" x2="225" y2="55" />
        </g>
        
        {/* YLA Letters as Paths for perfect rendering */}
        <g fill="#92E32B">
          {/* Letter Y */}
          <path d="M20 45 L50 85 L50 115 H70 L70 85 L100 45 H75 L60 65 L45 45 H20Z" />
          {/* Letter L */}
          <path d="M110 45 V115 H155 V95 H130 V45 H110Z" />
          {/* Letter A with specific shape */}
          <path d="M180 45 L145 115 H168 L173 100 H187 L192 115 H215 L180 45ZM178 85 L180 78 L182 85 H178Z" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
