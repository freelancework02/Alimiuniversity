// src/views/CreatePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageBuilder } from "./PageBuilder";

export default function CreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pageData, setPageData] = useState(null);

  // Simulate fetch for edit mode (replace with API call)
  useEffect(() => {
    if (id) {
      const fakePage = {
        id,
        title: "Admissions",
        key: "admissions",
        lang: "English",
        description: "This is the admissions page.",
        components: [
          {
            type: "hero",
            title: "Welcome to Admissions",
            subtitle: "Apply now for 2025",
            btn_text: "Apply Today",
            btn_link: "/apply",
            image_url:
              "https://placehold.co/1200x500/1e293b/ffffff?text=Admissions+Hero",
            rich_content:
              "<p>Find out everything about our admission process.</p>",
          },
          {
            type: "features",
            title: "Why Choose Us",
            rich_content:
              "<p>Strong faculty, excellent facilities, and a vibrant campus life.</p>",
            image_url: "https://placehold.co/640x360/0ea5e9/ffffff?text=Campus",
            features: [
              { icon: "star", title: "Top Faculty", desc: "Expert mentors" },
              { icon: "award", title: "Scholarships", desc: "Merit-based aid" },
              { icon: "book", title: "Resources", desc: "Rich library & labs" },
            ],
          },
        ],
      };
      setPageData(fakePage);
    }
  }, [id]);

  const handleSubmit = (data) => {
    // Replace with POST/PUT request as needed
    console.log(id ? "Updating existing page..." : "Creating new page...");
    console.log(data);
    navigate("/pages");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">
            {id ? "Edit Page" : "Create New Page"}
          </h3>
          <p
            className="text-slate-500 mt-1"
            style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
          >
            {id
              ? "موجودہ صفحہ میں ترمیم کریں"
              : "نیا صفحہ تخلیق کریں اور پیش نظارہ دیکھیں"}
          </p>
        </div>

        <button
          onClick={() => navigate("/pages")}
          className="flex items-center text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Pages
        </button>
      </div>

      <PageBuilder
        pageData={pageData}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pages")}
      />
    </div>
  );
}
