import React, { useState } from "react";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Simple placeholder data (replace this with API or props later)
const initialGalleryData = [
  {
    id: 1,
    title: "Campus Front View",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    category: "Campus",
    type: "Image",
  },
  {
    id: 2,
    title: "Library Interior",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    category: "Library",
    type: "Image",
  },
  {
    id: 3,
    title: "Students in Class",
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    category: "Education",
    type: "Image",
  },
  {
    id: 4,
    title: "Annual Event Stage",
    url: "https://images.unsplash.com/photo-1485217988980-11786ced9454",
    category: "Events",
    type: "Image",
  },
];

export default function ListingGallery() {
  const [gallery, setGallery] = useState(initialGalleryData);
  const navigate = useNavigate();

  const handleAdd = () => {
    console.log("Add new media clicked");
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <Image className="w-6 h-6 text-blue-500" />
          Gallery
        </h3>
        <button
          onClick={() => navigate("/addgallery")}
          className="cursor-pointer mt-3 sm:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Media
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.length > 0 ? (
          gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group relative transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-slate-800 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500">
                  {item.category} | {item.type}
                </p>
              </div>

              {/* Hover Action Buttons */}
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-slate-500">
            No media found. Click “Add New Media” to upload your first image or video.
          </div>
        )}
      </div>
    </div>
  );
}
