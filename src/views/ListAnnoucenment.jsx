import React, { useMemo, useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * ListAnnoucenment.jsx
 * - Standalone table list with mock data (no backend)
 * - Props:
 *    onAdd?: () => void
 *    onEdit?: (item) => void
 *    onDelete?: (item) => void
 *    onPreview?: (item) => void
 */
const MOCK = [
  {
    id: 1,
    title: "Semester Registration Opens",
    type: "General",
    lang: "English",
    published: "2025-01-15 10:00",
    published_status: true,
  },
  {
    id: 2,
    title: "Guest Lecture: Ethics in AI",
    type: "Event",
    lang: "English",
    published: "2025-02-05 16:30",
    published_status: true,
  },
  {
    id: 3,
    title: "تعطیلات کی اطلاع",
    type: "General",
    lang: "Urdu",
    published: "2025-03-20 09:00",
    published_status: false,
  },
];

export default function ListAnnoucenment({
  onAdd,
  onEdit,
  onDelete,
  onPreview,
}) {
  const [rows, setRows] = useState(MOCK);

  const removeRow = (id) => {
    setRows((r) => r.filter((x) => x.id !== id));
    onDelete?.(id);
  };

  const headers = useMemo(
    () => ["Title", "Type", "Language", "Published At", "Status", "Actions"],
    []
  );

  const navigate = useNavigate();


  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h3 className="text-xl font-semibold text-slate-800">Announcements</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/addannouncements")}
            className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {item.title}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {item.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {item.lang}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {item.published}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={[
                      "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                      item.published_status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                    ].join(" ")}
                  >
                    {item.published_status ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                  <div className="flex items-center justify-start gap-1">
                    <button
                      className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                      title="Preview"
                      onClick={() => onPreview?.(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="cursor-pointer rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-green-600"
                      title="Edit"
                       onClick={() => navigate("/addannouncements")}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                      title="Delete"
                      onClick={() => removeRow(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards (mobile) */}
      <div className="space-y-3 md:hidden">
        {rows.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {item.type} • {item.lang}
                </p>
              </div>
              <span
                className={[
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                  item.published_status
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                ].join(" ")}
              >
                {item.published_status ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-xs text-slate-500">Published: {item.published}</p>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                onClick={() => onPreview?.(item)}
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-green-600"
                onClick={() => onEdit?.(item)}
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600"
                onClick={() => removeRow(item.id)}
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            No announcements found.
          </div>
        )}
      </div>
    </div>
  );
}
