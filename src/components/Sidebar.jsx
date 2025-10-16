import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  List,
  Gauge,
  FileText,
  PenSquare,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarConfig = [
  { 
    name: "Dashboard", 
    urdu: "ڈیش بورڈ", 
    icon: Gauge, 
    target: "dashboard-content", 
    isDefault: true, 
    color: "blue",
    path: "/",
  },
  {
    name: "Content Management", 
    urdu: "مواد کا انتظام", 
    color: "emerald",
    icon: FileText,
    children: [
      { name: "Pages", urdu: "صفحات", target: "pages-list-content", path: "/Listingpage" },
      { name: "Announcements", urdu: "اعلانات", target: "announcements-list-content", path: "/announcements" },
      { name: "Gallery", urdu: "گیلری", target: "gallery-list-content", path: "/gallery" },
    ],
  },
  {
    name: "Blogs", 
    urdu: "بلاگز", 
    color: "amber",
    icon: PenSquare,
    children: [
      { name: "Articles", urdu: "مضامین", target: "articles-list-content", path: "/Listingarticle" },
      { name: "Categories", urdu: "زمرے", target: "blog-categories-list-content", dataKey: "blogCategories", path: "/listingcategory" },
      { name: "Topics", urdu: "عنوانات", target: "blog-topics-list-content", dataKey: "blogTopics", path: "/listingtopic" },
    ],
  },
  {
    name: "Academics", 
    urdu: "تعلیمی امور", 
    color: "violet",
    icon: GraduationCap,
    children: [
      { name: "Departments", urdu: "شعبہ جات", target: "departments-list-content", path: "/listingdepartment" },
      { name: "Courses", urdu: "کورسز", target: "courses-list-content", path: "/listingcourses" },
      { name: "Curriculum", urdu: "نصاب", target: "curriculum-list-content", path: "/listingcurriculum" },
      { name: "Online Classes", urdu: "آن لائن کلاسز", target: "online-classes-list-content", dataKey: "onlineClasses", path: "/online-classes" },
    ],
  },
  {
    name: "Admissions", 
    urdu: "داخلے", 
    color: "sky",
    icon: BookOpen,
    children: [
      { name: "Admission Info", urdu: "داخلہ معلومات", target: "admission-info-add-content", path: "/admission-info" },
      { name: "Admission Forms", urdu: "داخلہ فارم", target: "admission-forms-list-content", dataKey: "admissionForms", path: "/admission-forms" },
      { name: "All Admissions", urdu: "تمام داخلے", target: "all-admissions-list-content", dataKey: "allAdmissions", path: "/all-admissions" },
    ],
  },
  {
    name: "Fatwas", 
    urdu: "فتویٰ", 
    color: "rose",
    icon: MessageSquare,
    children: [
      { name: "Published Fatwas", urdu: "شائع شدہ فتاویٰ", target: "published-fatwas-list-content", dataKey: "publishedFatwas", path: "/published-fatwas" },
      { name: "Fatwa Requests", urdu: "فتویٰ کی درخواستیں", target: "fatwa-requests-list-content", dataKey: "fatwaRequests", path: "/fatwa-requests" },
    ],
  },
  {
    name: "User Management", 
    urdu: "صارفین کا انتظام", 
    color: "teal",
    icon: Users,
    children: [
      { name: "All Users", urdu: "تمام صارفین", target: "users-list-content", path: "/users" },
      { name: "Roles & Permissions", urdu: "کردار اور اجازتیں", target: "roles-list-content", path: "/roles" },
    ],
  },
  {
    name: "Site Admin", 
    urdu: "سائٹ ایڈمن", 
    color: "slate",
    icon: Settings,
    children: [
      { name: "Languages", urdu: "زبانیں", target: "languages-list-content", path: "/languages" },
      { name: "Search Index", urdu: "سرچ انڈیکس", target: "search-index-manage-content", path: "/search-index" },
      { name: "General Settings", urdu: "عمومی ترتیبات", target: "settings-content", path: "/settings" },
    ],
  },
];

export default function Sidebar({ collapsed }) {
  const [expandedSections, setExpandedSections] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  // Auto-open parent section if child route is active
  useEffect(() => {
    const parentNames = sidebarConfig
      .filter((s) => Array.isArray(s.children) && s.children.some((c) => c.path === currentPath))
      .map((s) => s.name);

    setExpandedSections((prev) => {
      const set = new Set(prev);
      parentNames.forEach((n) => set.add(n));
      return Array.from(set);
    });
  }, [currentPath]);

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((n) => n !== sectionName)
        : [...prev, sectionName]
    );
  };

  const getColorClasses = useMemo(
    () => (color) => {
      const map = {
        blue: "hover:bg-blue-50 text-blue-800",
        emerald: "hover:bg-emerald-50 text-emerald-800",
        amber: "hover:bg-amber-50 text-amber-800",
        violet: "hover:bg-violet-50 text-violet-800",
        sky: "hover:bg-sky-50 text-sky-800",
        rose: "hover:bg-rose-50 text-rose-800",
        teal: "hover:bg-teal-50 text-teal-800",
        slate: "hover:bg-slate-50 text-slate-800",
      };
      return map[color] || "hover:bg-slate-50 text-slate-800";
    },
    []
  );

  const getIconColorClasses = useMemo(
    () => (color) => {
      const map = {
        blue: "text-blue-500",
        emerald: "text-emerald-500",
        amber: "text-amber-500",
        violet: "text-violet-500",
        sky: "text-sky-500",
        rose: "text-rose-500",
        teal: "text-teal-500",
        slate: "text-slate-500",
      };
      return map[color] || "text-slate-500";
    },
    []
  );

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white flex flex-col border-r border-slate-200 transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-200 h-16">
        {!collapsed && (
          <h1 className="text-xl font-bold text-slate-800">
            Alimi University Panel
          </h1>
        )}
        <button className="p-2 rounded-lg hover:bg-slate-100 focus:outline-none hidden lg:block">
          <List className="w-6 h-6 text-slate-600" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {sidebarConfig.map((item) => {
            const IconComponent = item.icon;
            const colorClasses = getColorClasses(item.color);
            const iconColor = getIconColorClasses(item.color);
            const isExpanded = expandedSections.includes(item.name);
            const isActive = currentPath === item.path;

            if (item.children) {
              return (
                <li key={item.name} className="px-4 mb-1">
                  <div>
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`sidebar-link dropdown-toggle flex items-center justify-between p-2 rounded-lg w-full ${colorClasses}`}
                    >
                      <div className="flex items-center">
                        <IconComponent className={`w-5 h-5 ${iconColor} sidebar-icon`} />
                        {!collapsed && (
                          <div className="ml-3 sidebar-text">
                            <span className="font-medium">{item.name}</span>
                            <span
                              className="block text-xs text-slate-400"
                              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                            >
                              {item.urdu}
                            </span>
                          </div>
                        )}
                      </div>
                      {!collapsed && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>

                    {!collapsed && (
                      <ul className={`dropdown-menu ${isExpanded ? "" : "hidden"} mt-1 space-y-1 pl-6`}>
                        {item.children.map((child) => {
                          const activeChild = currentPath === child.path;
                          return (
                            <li key={child.name}>
                              <button
                                onClick={() => navigate(child.path)}
                                className={`sidebar-link flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-sm text-slate-600 w-full ${
                                  activeChild ? "bg-blue-100 text-blue-800 font-semibold" : ""
                                }`}
                              >
                                <span className="sidebar-text">{child.name}</span>
                                <span
                                  className="sidebar-text text-xs text-slate-400"
                                  style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                                >
                                  {child.urdu}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              );
            }

            // Simple item
            return (
              <li key={item.name} className="px-4 mb-1">
                <button
                  onClick={() => navigate(item.path)}
                  className={`sidebar-link flex items-center p-2 rounded-lg w-full ${colorClasses} ${
                    isActive ? "bg-blue-100 text-blue-800 font-semibold" : ""
                  }`}
                >
                  <IconComponent className={`w-5 h-5 ${iconColor} sidebar-icon`} />
                  {!collapsed && (
                    <div className="ml-3 sidebar-text">
                      <span className="font-medium">{item.name}</span>
                      <span
                        className="block text-xs text-slate-400"
                        style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                      >
                        {item.urdu}
                      </span>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
