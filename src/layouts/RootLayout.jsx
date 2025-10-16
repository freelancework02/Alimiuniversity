import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard-content");

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar
          currentView={currentView}
          onToggleSidebar={() => setCollapsed((c) => !c)}
          onViewChange={setCurrentView}
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}  
