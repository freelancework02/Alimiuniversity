import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ListingCurriculum() {
  const navigate = useNavigate();

  // Static course map for display (id -> title)
  const courses = useMemo(
    () => ({
      1: "Intro to Fiqh",
      2: "Computer Programming 101",
      3: "Business Ethics",
    }),
    []
  );

  const [rows, setRows] = useState([
    {
      id: 1,
      course_id: 1,
      subject_name: "Usul al-Fiqh Basics",
      academic_year: "2025-2026",
      faculty: "Dr. Ahmad Khan",
      timings: "Mon & Wed • 10:00–11:30",
      created_at: "2025-10-08 10:30 AM",
    },
    {
      id: 2,
      course_id: 2,
      subject_name: "Intro to Algorithms",
      academic_year: "2025-2026",
      faculty: "Prof. Ali Raza",
      timings: "Tue & Thu • 09:00–10:30",
      created_at: "2025-09-25 09:00 AM",
    },
  ]);

  const handleAdd = () => navigate("/addcurriculum");
  const handleEdit = (id) => navigate(`/curriculum/edit/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this curriculum item?")) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Curriculum</h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            نصاب کی فہرست
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Curriculum
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Academic Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Faculty
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Timings
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {row.subject_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {courses[row.course_id] || `Course #${row.course_id}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {row.academic_year || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {row.faculty || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {row.timings || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {row.created_at || "-"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="inline-flex items-center text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="inline-flex items-center text-red-600 hover:bg-red-50 px-2 py-1 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  No curriculum items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
