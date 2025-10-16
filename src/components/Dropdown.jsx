import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Dropdown({ title, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="select-none">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-100"
      >
        <span className="text-sm font-medium">{title}</span>
        <FiChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="mt-1 space-y-1 pl-2">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href || "#"}
                className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
