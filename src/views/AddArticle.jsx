import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";
import { RichTextEditor } from "./ui/RichTextEditor";

export default function AddArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    lang: "English",
    category: "",
    topic: "",
    content: "",
    slug: "",
    metaTitle: "",
    published: false,
    imageFile: null,
    imagePreview: "",
  });

  // ✅ Fetch single article for edit mode
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchArticle = async () => {
      try {
        const res = await axios.get(`https://alim-university-backend.onrender.com/api/articles/${id}`);
        const a = Array.isArray(res.data) ? res.data[0] : res.data;

        if (!a) {
          alert("❌ Article not found!");
          navigate("/articles");
          return;
        }

        setFormData({
          title: a.title || "",
          lang: a.lang || "English",
          category: a.category || "",
          topic: a.topic || "",
          content: a.content || "",
          slug: a.slug || a.url_slug || "",
          metaTitle: a.meta_title || "",
          published: a.is_published === 1 || a.is_published === true,
          imageFile: null,
          imagePreview: a.image_url || "",
        });
      } catch (err) {
        console.error("❌ Error fetching article:", err);
        alert("Failed to load article details.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, navigate]);

  // ✅ Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (formData.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }
    };
  }, [formData.imagePreview]);

  // ✅ Handle form input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Handle image file change
  // ✅ Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      // Revoke old preview URL if any
      if (formData.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }
      return setFormData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreview: prev.imagePreview || "", // keep existing preview if no new file
      }));
    }

    const previewUrl = URL.createObjectURL(file);
    if (formData.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };


  // ✅ Handle form submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("category", formData.category);
      form.append("topic", formData.topic);
      form.append("content", formData.content);
      form.append("is_published", formData.published ? "true" : "false");
      form.append("url_slug", formData.slug);
      form.append("slug", formData.slug);
      form.append("meta_title", formData.metaTitle);

      if (formData.imageFile) {
        form.append("image", formData.imageFile);
      }

      if (id) {
        // ✅ Important: include article_id for backend
        form.append("article_id", id);

        await axios.patch("https://alim-university-backend.onrender.com/api/articles/update", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("✅ Article updated successfully!");
      } else {
        await axios.post("https://alim-university-backend.onrender.com/api/articles/add", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("✅ Article added successfully!");
      }

      navigate("/articles");
    } catch (err) {
      console.error("❌ Error saving article:", err);
      alert("❌ Failed to save article. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loader while fetching article in edit mode
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Article" : "Add New Article"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id ? "یہاں مضمون میں ترمیم کریں" : "یہاں نیا مضمون شامل کریں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/Listingarticle")}
          className="cursor-pointer flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Articles
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            required
          />
        </div>

        {/* Category & Topic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="e.g., Fiqh, History"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Topic
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              placeholder="e.g., Sharia Law, Education"
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Content
          </label>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Feature Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
          />
          {formData.imagePreview && (
            <div className="mt-2">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="h-28 w-auto rounded-lg border border-slate-200 object-cover"
              />
            </div>
          )}
        </div>

        {/* SEO / Meta */}
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h4 className="text-lg font-semibold text-slate-700">SEO / AEO</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="h-4 w-4 text-blue-600 border-slate-300 rounded"
            />
            <label className="text-sm text-slate-700">Published?</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200 mt-6">
          <button
            type="button"
            onClick={() => navigate("/Listingarticle")}
            className="cursor-pointer bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
          >
            {id ? "Update Article" : "Save Article"}
          </button>
        </div>
      </form>
    </div>
  );
}
