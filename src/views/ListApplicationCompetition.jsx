import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const URDU_FONT_CSS = `
@font-face {
  font-family: 'Naat';
  src: url('https://res.cloudinary.com/awescreative/raw/upload/v1749150996/Awes/naatfont.ttf') format('truetype');
}
.urdu, .urdu-label, .urdu-input { font-family: 'Naat', serif; direction: rtl; }
.preview-field { border-bottom:1px solid #e5e7eb; padding-bottom:0.5rem; margin-bottom:1rem; }
.preview-label { font-size:0.875rem; color:#6b7280; }
.preview-value { font-weight:600; color:#111827; }
`;

// Columns from your HTML for competition list
const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "fatherName", label: "Father's Name" },
  { key: "examSubject", label: "Exam Subject" },
  { key: "mobile", label: "Mobile" },
];

// Build preview markup with ALL fields (for view/print/pdf)
function generatePreviewHTML(data) {
  const camelToLabel = (key) => key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  let fieldsHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    fieldsHTML += `
      <div class="preview-field">
        <p class="preview-label">${camelToLabel(key)}</p>
        <p class="preview-value">${value ?? "-"}</p>
      </div>`;
  });

  return `
    <div id="preview-content-inner">
      <div class="p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-indigo-800">Competition Form</h2>
          <h3 class="text-3xl urdu font-bold">درخواست برائے کمپٹیشن</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          ${fieldsHTML}
        </div>
      </div>
    </div>
  `;
}

function printHTML(markup) {
  const win = window.open("", "", "height=800,width=800");
  if (!win) return;
  win.document.write("<html><head><title>Print Form</title>");
  win.document.write(`<style>${URDU_FONT_CSS} body{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }</style>`);
  win.document.write("<script src='https://cdn.tailwindcss.com'><\/script>");
  win.document.write("</head><body class='p-8'>");
  win.document.write(markup);
  win.document.write("</body></html>");
  win.document.close();
  setTimeout(() => {
    win.print();
    win.close();
  }, 400);
}

async function exportPdf(markup, filename) {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "800px";
  container.innerHTML = markup;
  document.body.appendChild(container);

  const node = container.querySelector("#preview-content-inner");
  const canvas = await html2canvas(node, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = (canvas.height * pdfW) / canvas.width;
  pdf.addImage(img, "PNG", 0, 0, pdfW, pdfH);
  pdf.save(filename);

  document.body.removeChild(container);
}

function PreviewModal({ open, onClose, html }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh]">
        <div
          className="overflow-y-auto max-h-[90vh] rounded-2xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="p-6 bg-gray-50 border-t flex justify-end">
          <button className="bg-gray-300 text-gray-700 font-bold py-2 px-5 rounded-lg" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * ListApplicationCompetition
 * Props:
 * - data: optional array of competition applications. If omitted, seeds from your HTML example.
 * - onCreateNew: callback to open AddApplicationCompetition.
 */
export default function ListApplicationCompetition({ data: rowsProp = [], onCreateNew }) {
    const navigate = useNavigate();
  const seed = useMemo(
    () =>
      rowsProp.length
        ? rowsProp
        : [
            {
              id: 201,
              appNo: "COMP-201",
              name: "Sana Khan",
              fatherName: "Rehan Khan",
              address: "Gandhi Nagar",
              dob: "2006-06-15",
              aadhaar: "345678901234",
              currentClass: "Foqania",
              examSubject: "Hifz",
              mobile: "9988776655",
              applicantSignature: "S. Khan",
              createdAt: "2025-10-15T12:00:00Z",
            },
          ],
    [rowsProp]
  );

  const [rows] = useState(seed);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", direction: "descending" });
  const [preview, setPreview] = useState({ open: false, html: "" });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = rows;

    if (term) {
      list = list.filter((r) =>
        Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(term))
      );
    }
    if (sort.key) {
      list = [...list].sort((a, b) => {
        const va = a[sort.key] ?? "";
        const vb = b[sort.key] ?? "";
        if (va < vb) return sort.direction === "ascending" ? -1 : 1;
        if (va > vb) return sort.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rows, search, sort]);

  function handleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "ascending" ? "descending" : "ascending" }
        : { key, direction: "ascending" }
    );
  }

  // Actions — full-entry for all
  function handleView(row) {
    const html = generatePreviewHTML(row);
    setPreview({ open: true, html });
  }
  function handlePrint(row) {
    const html = generatePreviewHTML(row);
    printHTML(html);
  }
  function handleDownloadPdf(row) {
    const html = generatePreviewHTML(row);
    exportPdf(html, `competition-form-${row.id}.pdf`);
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <style>{URDU_FONT_CSS}</style>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Competition Submissions</h2>
        <button
          className="cursor-pointer bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
         onClick={() => navigate("/addapplicationcompt")}
        >
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 form-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(c.key)}
                  title="Sort"
                >
                  {c.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 ? (
              <tr>
                <td className="text-center text-gray-500 py-8" colSpan={COLUMNS.length + 1}>
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr className="hover:bg-gray-50" key={row.id}>
                  {COLUMNS.map((c) => (
                    <td className="px-6 py-4 whitespace-nowrap text-sm" key={c.key}>
                      {row[c.key] ?? ""}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleView(row)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                        title="View full entry"
                      >
                        <i className="bi bi-eye-fill" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => handlePrint(row)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-200 text-green-700 hover:bg-green-50"
                        title="Print all fields"
                      >
                        <i className="bi bi-printer-fill" />
                        <span>Print (All Fields)</span>
                      </button>

                      <button
                        onClick={() => handleDownloadPdf(row)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                        title="Download PDF (entire entry)"
                      >
                        <i className="bi bi-file-earmark-pdf-fill" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PreviewModal
        open={preview.open}
        onClose={() => setPreview((p) => ({ ...p, open: false }))}
        html={preview.html}
      />
    </div>
  );
}
