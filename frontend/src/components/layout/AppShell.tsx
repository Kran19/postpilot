'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#18181B] flex font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar className="hidden md:flex shrink-0" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} description={description} />
        <main className="flex-1 p-5 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
