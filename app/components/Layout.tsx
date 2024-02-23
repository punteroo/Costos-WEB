import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row overflow-hidden h-screen">

      <Sidebar />

      <div className="w-full bg-slate-50 h-full overflow-auto">
        {children}
      </div>

    </div>
  );
};

export default Layout;

