import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const URDU_FONT_CSS = `
@font-face {
  font-family: 'Naat';
  src: url('https://res.cloudinary.com/awescreative/raw/upload/v1749150996/Awes/naatfont.ttf') format('truetype');
}
.urdu, .urdu-label, .urdu-input { font-family: 'Naat', serif; direction: rtl; }
.form-input { display:block; width:100%; border-radius:0.75rem; border:1px solid #d1d5db; padding:0.75rem 1rem; transition: all 150ms ease-in-out; }
.form-input:focus { border-color:#4f46e5; outline:none; box-shadow:0 0 0 3px rgba(79,70,229,0.2); }
.form-container { background:#fff; border-radius:1.5rem; padding:2rem 2.5rem; box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1); margin-top:1.5rem; border:1px solid #e5e7eb; }
`;

export default function AddApplicationCompetition({ onBack, onSave }) {
  const newId = useMemo(() => Date.now(), []);
  const navigate = useNavigate();
  const [model, setModel] = useState({
    id: newId,
    appNo: `COMP-${newId}`,
    name: "",
    fatherName: "",
    address: "",
    dob: "",
    aadhaar: "",
    currentClass: "",
    examSubject: "",
    mobile: "",
    applicantSignature: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setModel((m) => ({ ...m, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const entry = { ...model, createdAt: new Date().toISOString() };
    if (typeof onSave === "function") onSave(entry);
  }

  return (
    <div className="form-container">
      <style>{URDU_FONT_CSS}</style>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Application for Competition</h2>
        <h3 className="text-3xl urdu font-bold">درخواست برائے شرکتِ کمپٹیشن</h3>
      </div>

      <form id="entry-form" className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
          <div>
            <label className="form-label">ID (Auto-Generated)</label>
            <input type="text" id="id" value={model.id} className="form-input bg-gray-200" readOnly />
          </div>
          <div>
            <label className="form-label">Application No.</label>
            <input type="text" id="appNo" value={model.appNo} className="form-input bg-gray-200" readOnly />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field id="name" label={<LabelEnUr en="Name" ur="نام" />} value={model.name} onChange={handleChange} required />
          <Field id="fatherName" label={<LabelEnUr en="Father's Name" ur="ولدیت" />} value={model.fatherName} onChange={handleChange} required />
          <Field id="address" label={<LabelEnUr en="Address" ur="پتہ" />} value={model.address} onChange={handleChange} />
          <Field id="dob" type="date" label={<LabelEnUr en="Date of Birth" ur="تاریخِ پیدائش" />} value={model.dob} onChange={handleChange} />
          <Field id="aadhaar" label={<LabelEnUr en="Aadhaar No." ur="آدھار نمبر" />} value={model.aadhaar} onChange={handleChange} />
          <Field id="currentClass" label={<LabelEnUr en="Current Class" ur="موجودہ درجہ" />} value={model.currentClass} onChange={handleChange} />
          <Field id="examSubject" label={<LabelEnUr en="Subject for Exam" ur="مضمون برائے امتحان" />} value={model.examSubject} onChange={handleChange} />
          <Field id="mobile" label={<LabelEnUr en="Mobile No." ur="موبائل نمبر" />} value={model.mobile} onChange={handleChange} />
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-bold text-lg urdu">بیان</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Field
            id="applicantSignature"
            label={<LabelEnUr en="Applicant's Signature" ur="دستخط امیدوار" />}
            value={model.applicantSignature}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button type="button" className="cursor-pointer bg-gray-300 font-bold py-2 px-6 rounded-lg" onClick={() => navigate("/listapplicationcompt")}>
            Back to List
          </button>
          <button type="submit" className="cursor-pointer bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} type={type} className="form-input" value={value} onChange={onChange} required={required} />
    </div>
  );
}

function LabelEnUr({ en, ur }) {
  return (
    <span>
      {en} / <span className="urdu">{ur}</span>
    </span>
  );
}
