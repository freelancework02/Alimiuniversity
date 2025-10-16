import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AddCurriculum() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Static course list for the dropdown (replace with real fetch later)
  const [courses] = useState([
    { id: 1, title: "Intro to Fiqh" },
    { id: 2, title: "Computer Programming 101" },
    { id: 3, title: "Business Ethics" },
  ]);

  const [formData, setFormData] = useState({
    course_id: "",
    subject_name: "",
    academic_year: "",
    faculty: "",
    timings: "",
  });

  // If editing, prefill (mocked here)
  useEffect(() => {
    if (id) {
      const fakeItem = {
        id,
        course_id: "1",
        subject_name: "Usul al-Fiqh Basics",
        academic_year: "2025-2026",
        faculty: "Dr. Ahmad Khan",
        timings: "Mon & Wed • 10:00–11:30",
      };
      setFormData(fakeItem);
    }
  }, [id]);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating curriculum..." : "Creating curriculum...");
    console.log(formData);
    navigate("/curriculum");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Curriculum" : "Add New Curriculum"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "نصاب میں ترمیم کریں" : "نیا نصاب شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingcurriculum")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Curriculum
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course (required dropdown) */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.course_id}
            onChange={(e) => handleChange("course_id", e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Subject Name
          </label>
          <input
            type="text"
            required
            value={formData.subject_name}
            onChange={(e) => handleChange("subject_name", e.target.value)}
            placeholder="e.g., Usul al-Fiqh Basics"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Academic Year */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Academic Year
          </label>
          <input
            type="text"
            value={formData.academic_year}
            onChange={(e) => handleChange("academic_year", e.target.value)}
            placeholder="e.g., 2025-2026"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Faculty
          </label>
          <input
            type="text"
            value={formData.faculty}
            onChange={(e) => handleChange("faculty", e.target.value)}
            placeholder="e.g., Dr. Ahmad Khan"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Timings */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Timings
          </label>
          <input
            type="text"
            value={formData.timings}
            onChange={(e) => handleChange("timings", e.target.value)}
            placeholder="e.g., Mon & Wed • 10:00–11:30"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/curriculum")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Save Changes" : "Save Curriculum"}
          </button>
        </div>
      </form>
    </div>
  );
}
