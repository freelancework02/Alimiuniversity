import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function AddGallery() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    lang: "English",
    type: "Image",
    category: "",
    url: "",
    description: "",
  });

  // Simulate fetching data when editing
  useEffect(() => {
    if (id) {
      // Replace this with actual API call
      const fakeExistingData = {
        id,
        title: "Existing Gallery Item",
        lang: "English",
        type: "Image",
        category: "Campus",
        url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
        description: "A beautiful view of our university campus.",
      };
      setFormData(fakeExistingData);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id ? "Updating gallery item..." : "Adding new gallery item...");
    console.log(formData);
    navigate("/gallery");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            یہاں آپ گیلری میں نیا میڈیا شامل یا موجودہ میڈیا میں ترمیم کر سکتے ہیں۔
          </p>
        </div>

        <button
          onClick={() => navigate("/gallery")}
          className="cursor-pointer flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Gallery
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter gallery item title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Language
          </label>
          <select
            name="lang"
            value={formData.lang}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Urdu</option>
          </select>
        </div>

        {/* Media Type */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Media Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          >
            <option>Image</option>
            <option>Video</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="e.g., Campus, Library, Events"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            File Path / URL
          </label>
          <input
            type="text"
            name="url"
            placeholder="https://example.com/image.jpg"
            value={formData.url}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-600">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            placeholder="Write a short description about this media item..."
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 sm:text-sm"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="cursor-pointer bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {id ? "Update Item" : "Save Item"}
          </button>
        </div>
      </form>
    </div>
  );
}
