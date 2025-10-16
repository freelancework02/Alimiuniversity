import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function ListingDepartment() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all departments

  const fetchDepartments = async () => {
    try {
      const res = await fetch("https://alim-university-backend.onrender.com/api/departments");
      const data = await res.json();

      // Ensure departments is always an array
      const departmentList = Array.isArray(data) ? data : [data];

      setDepartments(departmentList);
    } catch (error) {
      console.error("❌ Error fetching departments:", error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = () => navigate("/adddepartment");
  const handleEdit = (id) => navigate(`/departments/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const res = await fetch(`https://alim-university-backend.onrender.com/api/departments/delete/${id}`, { method: "DELETE" });
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Failed to delete");

        alert(result.message);
        setDepartments((prev) => prev.filter((d) => d.department_id !== id));
      } catch (error) {
        console.error("❌ Error deleting department:", error);
        alert("Error: " + error.message);
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-slate-500">Loading departments...</p>;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Departments</h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            محکموں کی فہرست
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Under Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Language
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
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept.department_id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {dept.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dept.under_department || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dept.department_teacher || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{dept.language}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {dept.created_at || "—"}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(dept.department_id)}
                      className="inline-flex items-center text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dept.department_id)}
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
                  colSpan={6}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
