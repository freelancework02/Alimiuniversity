import React from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ListingPage() {
  const navigate = useNavigate();

  // Sample mock data (replace with fetched API)
  const pages = [
    { id: 1, title: "Home Page", key: "home", lang: "English", updated: "2025-10-05" },
    { id: 2, title: "Admissions", key: "admissions", lang: "English", updated: "2025-09-22" },
    { id: 3, title: "About Us", key: "about", lang: "Urdu", updated: "2025-08-18" },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      console.log("Deleting page ID:", id);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Pages</h3>
          <p className="text-slate-500" style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}>
            یہاں تمام صفحات کی فہرست ہے۔ آپ نئے صفحات شامل کر سکتے ہیں یا موجودہ کو ترمیم کر سکتے ہیں۔
          </p>
        </div>
        <button
          onClick={() => navigate("/addpage")}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center shadow-sm hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Page
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Page Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {page.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{page.key}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{page.lang}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{page.updated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button
                    onClick={() => navigate(`/pages/edit/${page.id}`)}
                    className="p-2 bg-slate-100 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 bg-slate-100 rounded-lg hover:bg-red-100 text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pages.length === 0 && (
          <div className="text-center text-slate-500 py-10">No pages found.</div>
        )}
      </div>
    </div>
  );
}
