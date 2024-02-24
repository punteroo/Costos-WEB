import React, { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  icon: ReactNode; // ReactNode permite cualquier cosa que pueda ser renderizada en React
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon }) => {
  return (
    <div className="h-[120px] flex items-center bg-white border-b mb-4">
      <div className="flex gap-3 items-center mx-12">
        {icon}

        <h1 className='title'>{title}</h1>
      </div>
    </div>
  );
};

export default SectionTitle;
