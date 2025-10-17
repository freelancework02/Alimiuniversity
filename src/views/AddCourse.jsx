import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AddCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    department_id: "",
    language: "English",
    duration: "",
    faculty: "",
    description: "",
  });

  // ✅ Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get("https://api.darululoomalimia.com/api/departments");
        console.log("📦 Departments API response:", data);

        const departmentList = Array.isArray(data)
          ? data
          : Array.isArray(data.data)
          ? data.data
          : Object.values(data || {});

        setDepartments(departmentList);
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  // ✅ Fetch Course by ID (Edit Mode)
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`https://api.darululoomalimia.com/api/courses/${id}`);
        if (data && data.length > 0) {
          const course = data[0];
          setFormData({
            title: course.title || "",
            department_id: course.department_id?.toString() || "",
            language: course.language || "English",
            duration: course.duration || "",
            faculty: course.faculty || "",
            description: course.description || "",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching course by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Handle Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // matches PATCH /api/courses/update/:id
        await axios.patch(`https://api.darululoomalimia.com/api/courses/update/${id}`, formData);
        alert("✅ Course updated successfully!");
      } else {
        // matches POST /api/courses/add
        await axios.post("https://api.darululoomalimia.com/api/courses/add", formData);
        alert("✅ Course created successfully!");
      }

      navigate("/listingcourses");
    } catch (error) {
      console.error("❌ Error saving course:", error);
      if (error.response) {
        console.error("🧾 Server Response:", error.response.data);
      }
      alert("❌ Failed to save course. Please check the console for details.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-600">
        Loading course data...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Course" : "Add New Course"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "کورس میں ترمیم کریں" : "نیا کورس شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingcourses")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Course Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., Introduction to Hadith"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Department
          </label>
          <select
            required
            value={formData.department_id}
            onChange={(e) => handleChange("department_id", e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Language
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Duration
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="e.g., 6 Months / 1 Year"
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
            placeholder="e.g., Dr. Ali Raza"
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Write a brief description of the course..."
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/listingcourses")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Save Changes" : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}
