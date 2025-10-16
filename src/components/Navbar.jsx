import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, List, ChevronDown } from "lucide-react";

export default function Navbar({ currentView, onToggleSidebar, onViewChange }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageTitles = {
    "dashboard-content": "Dashboard",
    "pages-list-content": "Pages",
    "articles-list-content": "Articles",
  };

  const getPageTitle = (view) => pageTitles[view] || "Dashboard";

  const getBreadcrumbs = (view) => {
    const crumbs = {
      "dashboard-content": [{ name: "Dashboard", active: true }],
      "pages-list-content": [
        { name: "Content Management", active: false },
        { name: "Pages", active: true },
      ],
    };
    return crumbs[view] || [{ name: "Dashboard", active: true }];
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 shadow-sm">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 lg:hidden"
          >
            <List className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-slate-800">
            {getPageTitle(currentView)}
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Global Search..."
              className="h-10 w-64 rounded-lg border border-slate-300 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>

          <button className="grid h-10 w-10 place-items-center rounded-lg hover:bg-slate-100 text-slate-600">
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen((s) => !s)}
              className="flex items-center gap-2 rounded-lg hover:bg-slate-100 px-2 py-1"
            >
              <img
                src="https://placehold.co/40x40/64748b/ffffff?text=U"
                alt="User Avatar"
                className="h-9 w-9 rounded-full"
              />
              <span className="hidden md:inline text-slate-700 font-medium">
                Admin User
              </span>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100">
                  Profile
                </button>
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100">
                  Settings
                </button>
                <button className="block w-full border-t border-slate-100 px-4 py-2 text-left text-sm hover:bg-slate-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 px-6 py-2 text-sm text-slate-500">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => onViewChange("dashboard-content")}
            className="hover:text-indigo-600"
          >
            Home
          </button>
          {getBreadcrumbs(currentView).map((crumb, i) => (
            <span key={i} className="flex items-center space-x-2">
              <span>/</span>
              {crumb.active ? (
                <span className="font-semibold text-slate-700">
                  {crumb.name}
                </span>
              ) : (
                <button
                  onClick={() =>
                    crumb.target && onViewChange(crumb.target)
                  }
                  className="hover:text-indigo-600"
                >
                  {crumb.name}
                </button>
              )}
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
