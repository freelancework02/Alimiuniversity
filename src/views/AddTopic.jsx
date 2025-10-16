import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Image as ImageIcon, X, Loader2 } from "lucide-react";
import axios from "axios";

export default function AddTopic() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    topic_title: "",
    slug: "",
    description: "",
    image: "", // base64 preview or image_url
  });

  const [loading, setLoading] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(false);

  // ✅ Fetch topic data if editing
  useEffect(() => {
    if (id) {
      const fetchTopic = async () => {
        try {
          setLoadingTopic(true);
          const res = await axios.get(`https://alim-university-backend.onrender.com/api/topics/${id}`);
          const topic = res.data;

          setFormData({
            topic_title: topic.topic_title || "",
            slug: topic.slug || "",
            description: topic.description || "",
            image: topic.image_url || "",
          });
        } catch (err) {
          console.error("❌ Error fetching topic:", err);
          alert("Failed to load topic details.");
        } finally {
          setLoadingTopic(false);
        }
      };
      fetchTopic();
    }
  }, [id]);

  const handleChange = (key, val) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => handleChange("image", e.target.result || "");
    reader.readAsDataURL(file);
  };

  const removeImage = () => handleChange("image", "");

  // ✅ Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("topic_title", formData.topic_title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("description", formData.description);

      // ✅ Convert base64 to File if it's a new image upload
      if (formData.image && formData.image.startsWith("data:image")) {
        const blob = await fetch(formData.image).then((r) => r.blob());
        formDataToSend.append("image", blob, "topic-image.jpg");
      }

      if (id) {
        formDataToSend.append("topic_id", id);
        await axios.patch("https://alim-university-backend.onrender.com/api/topics/update", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Topic updated successfully!");
      } else {
        await axios.post("https://alim-university-backend.onrender.com/api/topics/add", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Topic added successfully!");
      }

      navigate("/listingtopic");
    } catch (err) {
      console.error("❌ Error saving topic:", err);
      alert("Failed to save topic. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingTopic) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Topic" : "Add New Topic"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "موضوع میں ترمیم کریں" : "نئے موضوع کا اضافہ کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/listingtopic")}
          className="flex items-center text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Topics
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Title */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Topic Title
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              موضوع کا عنوان
            </span>
          </div>
          <input
            type="text"
            value={formData.topic_title}
            onChange={(e) => handleChange("topic_title", e.target.value)}
            placeholder="e.g., Hadith Sciences"
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              URL Slug
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              سلگ (یو آر ایل)
            </span>
          </div>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="e.g., hadith-sciences"
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              تفصیل
            </span>
          </div>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Write a short description for this topic..."
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
        </div>

        {/* Image */}
        <div>
          <div className="flex justify-between items-baseline">
            <label className="block text-sm font-medium text-slate-700">
              Image (optional)
            </label>
            <span
              className="text-xs text-slate-500"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
            >
              تصویر
            </span>
          </div>

          {!formData.image ? (
            <label className="mt-1 flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-xl py-10 cursor-pointer hover:border-slate-400 transition">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="hidden"
              />
              <ImageIcon className="w-10 h-10 text-slate-400 mb-2" />
              <span className="text-sm text-slate-600">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-slate-400 mt-1">
                PNG, JPG up to ~2MB
              </span>
            </label>
          ) : (
            <div className="mt-2 relative inline-block">
              <img
                src={formData.image}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-slate-200 shadow-sm"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-1 shadow hover:bg-slate-50"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/listingtopic")}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
            ) : null}
            {id ? "Save Changes" : "Save Topic"}
          </button>
        </div>
      </form>
    </div>
  );
}
