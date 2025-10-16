import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

/**
 * AddAnnoucenment.jsx
 * - Standalone add/edit form for an announcement (no backend)
 * - Props:
 *    onCancel?: () => void
 *    onSave?: (payload) => void
 *    initialData?: object (for edit mode)
 */
export default function AddAnnoucenment({
  onCancel,
  onSave,
  initialData = null,
}) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      lang: "English",
      type: "",
      published: "",
      content: "",
      published_status: true,
    }
  );

  const handleChange = (name, value) =>
    setForm((s) => ({ ...s, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, id: initialData?.id ?? Date.now() };
    console.log("Save Announcement →", payload);
    onSave?.(payload);
  };

  const handleCancel = () => {
    if (typeof onCancel === "function") {
      onCancel();
      return;
    }
    if (typeof window !== "undefined" && window.history && window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {initialData ? "Edit Announcement" : "Add Announcement"}
          </h3>
          <p
            className="text-slate-500"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            یہاں سے اعلان شامل/ترمیم کریں۔
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(onCancel || true) && (
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer pointer-events-auto appearance-none"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            form="announcement-form"
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 shadow-sm hover:shadow-md cursor-pointer pointer-events-auto appearance-none"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        id="announcement-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Title */}
        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Title
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              عنوان
            </span>
          </div>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., Semester Registration Opens"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />
        </div>

        {/* Language */}
        <div>
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Language
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              زبان
            </span>
          </div>
          <select
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={form.lang}
            onChange={(e) => handleChange("lang", e.target.value)}
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Type
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              قسم
            </span>
          </div>
          <input
            type="text"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="e.g., General, Event"
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </div>

        {/* Published At */}
        <div>
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Published At
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              اشاعت کی تاریخ
            </span>
          </div>
          <input
            type="datetime-local"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={form.published}
            onChange={(e) => handleChange("published", e.target.value)}
          />
        </div>

        {/* Published status */}
        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              checked={form.published_status}
              onChange={(e) =>
                handleChange("published_status", e.target.checked)
              }
            />
            <span className="text-slate-700">Published</span>
          </label>
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <div className="flex items-baseline justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Content
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              مواد
            </span>
          </div>
          <textarea
            rows={8}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Write announcement content here..."
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </div>

        {/* Mobile Save/Back duplicated at bottom for usability */}
        <div className="md:hidden flex justify-end gap-2">
          {(onCancel || true) && (
            <button
              type="button"
              onClick={handleCancel}
              className="!cursor-pointer pointer-events-auto appearance-none rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="!cursor-pointer pointer-events-auto appearance-none rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
