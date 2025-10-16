import React from "react";
import {
  Users,
  FileText,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Calendar,
  Bell,
  Award,
} from "lucide-react";

/**
 * Build an SVG path for a smooth-ish line and a filled area, no external libs.
 * We use a normalized 100x100 viewBox and scale points into it.
 */
function buildPaths(values) {
  // guard
  const data = Array.isArray(values) && values.length ? values : [0];
  const max = Math.max(...data, 1);

  const W = 100;
  const H = 100;
  const padX = 4;
  const padY = 6;

  const n = data.length - 1 || 1;
  const stepX = (W - padX * 2) / n;

  const points = data.map((v, i) => {
    const x = padX + i * stepX;
    const y = padY + (H - padY * 2) * (1 - v / max);
    return { x, y };
  });

  // simple straight-line path (no bezier to keep it lean)
  const lineD =
    "M " +
    points
      .map((p) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" L ");

  // area under the line to x of last, down to baseline, back to first
  const areaD =
    `${lineD} L ${points[points.length - 1].x.toFixed(2)} ${H - padY} ` +
    `L ${points[0].x.toFixed(2)} ${H - padY} Z`;

  return { lineD, areaD, max, H, padY, points };
}

export default function Dashboard({ appData }) {
  // Safe data reads
  const articles = Array.isArray(appData?.articles) ? appData.articles : [];
  const publishedArticles = articles.filter((a) => a?.published).length;

  const fatwaRequests = Array.isArray(appData?.fatwaRequests)
    ? appData.fatwaRequests
    : [];
  const fatwaRequestsCount = fatwaRequests.length;

  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+3%",
      changeType: "positive",
      icon: BookOpen,
      color: "emerald",
    },
    {
      title: "Published Articles",
      value: String(publishedArticles),
      change: "+8%",
      changeType: "positive",
      icon: FileText,
      color: "amber",
    },
    {
      title: "Fatwa Requests",
      value: String(fatwaRequestsCount),
      change: "-2%",
      changeType: "negative",
      icon: MessageSquare,
      color: "rose",
    },
  ];

  const recentActivities = [
    {
      type: "enrollment",
      message: "New student enrolled in Computer Science",
      time: "2 hours ago",
      icon: Users,
    },
    {
      type: "article",
      message: 'Article "AI in Education" was published',
      time: "4 hours ago",
      icon: FileText,
    },
    {
      type: "course",
      message: 'New course "Advanced Algorithms" added',
      time: "6 hours ago",
      icon: BookOpen,
    },
    {
      type: "fatwa",
      message: "Fatwa request submitted by Ali Khan",
      time: "8 hours ago",
      icon: MessageSquare,
    },
  ];

  const upcomingEvents = [
    { title: "Fall Semester Registration", date: "2025-10-15", type: "Registration" },
    { title: "Faculty Meeting", date: "2025-10-10", type: "Meeting" },
    { title: "Student Orientation", date: "2025-10-20", type: "Event" },
  ];

  // Static enrollment series (same as before)
  const enrollmentData = [65, 59, 80, 81, 56, 55, 40];
  const { lineD, areaD, max, H, padY, points } = buildPaths(enrollmentData);

  // Build light grid (5 horizontal lines)
  const gridLines = Array.from({ length: 5 }).map((_, i) => {
    const y =
      padY + ((H - padY * 2) * i) / 4; // 0..4
    const val = Math.round(max - (max * i) / 4);
    return { y, val };
  });

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Alimi University Admin Panel</h2>
        <p className="opacity-90">Manage your university&apos;s digital presence with ease</p>
        <p
          className="text-sm opacity-75 mt-1"
          style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
        >
          علمی ادارے کے انتظام کے لیے جدید ڈیجیٹل پلیٹ فارم
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const colorClasses = {
            blue: "bg-blue-500",
            emerald: "bg-emerald-500",
            amber: "bg-amber-500",
            rose: "bg-rose-500",
          };

          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p
                    className={`text-sm mt-1 ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[stat.color]}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Activities Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart (static SVG) */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Enrollment Trends</h3>
            <TrendingUp className="w-5 h-5 text-slate-500" />
          </div>

          <div className="h-64">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              {/* defs: gradient */}
              <defs>
                <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopOpacity="0.25" stopColor="rgb(58,82,255)" />
                  <stop offset="100%" stopOpacity="0" stopColor="rgb(58,82,255)" />
                </linearGradient>
              </defs>

              {/* grid */}
              {gridLines.map((g, i) => (
                <g key={i}>
                  <line
                    x1="0"
                    x2="100"
                    y1={g.y}
                    y2={g.y}
                    stroke="#e2e8f0"
                    strokeWidth="0.3"
                  />
                  {/* axis label (right side) */}
                  <text
                    x="99"
                    y={g.y - 0.8}
                    textAnchor="end"
                    fontSize="3"
                    fill="#64748b"
                  >
                    {g.val}
                  </text>
                </g>
              ))}

              {/* x labels */}
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((lab, i) => (
                <text
                  key={lab}
                  x={points[i]?.x ?? 0}
                  y={H - padY + 5}
                  textAnchor="middle"
                  fontSize="3"
                  fill="#64748b"
                >
                  {lab}
                </text>
              ))}

              {/* area */}
              <path d={areaD} fill="url(#areaFill)" />

              {/* line */}
              <path d={lineD} fill="none" stroke="rgb(58,82,255)" strokeWidth="1.2" />

              {/* points */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="1.4"
                  fill="rgb(58,82,255)"
                  stroke="#fff"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
            <Bell className="w-5 h-5 text-slate-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-slate-100 rounded-full">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Upcoming Events</h3>
          <Calendar className="w-5 h-5 text-slate-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {event.type}
                </span>
                <Award className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-medium text-slate-800">{event.title}</h4>
              <p className="text-sm text-slate-500">{event.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <span className="text-sm text-slate-700">Add Page</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <BookOpen className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <span className="text-sm text-slate-700">Add Course</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Users className="w-8 h-8 text-violet-500 mx-auto mb-2" />
            <span className="text-sm text-slate-700">Add User</span>
          </button>
          <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <MessageSquare className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <span className="text-sm text-slate-700">View Requests</span>
          </button>
        </div>
      </div>
    </div>
  );
}
