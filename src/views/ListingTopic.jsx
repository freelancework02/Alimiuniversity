import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ListingTopic() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("https://api.darululoomalimia.com/api/topics");
        setTopics(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching topics:", err);
        setError("Failed to load topics. Please try again later.");
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleAdd = () => navigate("/addtopic");
  const handleEdit = (id) => navigate(`/topics/edit/${id}`);

  // ✅ Delete topic from backend
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      try {
        await axios.delete(`https://api.darululoomalimia.com/api/topics/delete/${id}`);
        setTopics((prev) => prev.filter((t) => t.topic_id !== id));
      } catch (err) {
        console.error("❌ Error deleting topic:", err);
        alert("Failed to delete topic. Try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8 text-sm font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Topics</h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            موضوعات کی فہرست
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Topic
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Topic Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <tr key={topic.topic_id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {topic.image_url ? (
                      <img
                        src={topic.image_url}
                        alt={topic.topic_title}
                        className="h-12 w-12 rounded object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200 grid place-items-center text-xs text-slate-400">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {topic.topic_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {topic.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="line-clamp-2">
                      {topic.description || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => handleEdit(topic.topic_id)}
                      className="inline-flex items-center text-green-600 hover:bg-green-50 px-2 py-1 rounded-md transition"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(topic.topic_id)}
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
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-500 text-sm"
                >
                  No topics found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
