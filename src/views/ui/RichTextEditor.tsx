import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Link, Image, ChevronDown } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [isRtl, setIsRtl] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value || '');
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    updateContent();
  };

  const handleLinkClick = () => {
    const url = prompt('Enter the link URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleImageClick = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const toggleDirection = () => {
    if (editorRef.current) {
      const newDirection = !isRtl;
      setIsRtl(newDirection);
      editorRef.current.dir = newDirection ? 'rtl' : 'ltr';
      editorRef.current.style.textAlign = newDirection ? 'right' : 'left';
      updateContent();
    }
  };

  const urduFonts = {
    'Jameel Noori Nastaleeq': 'Jameel, serif',
    'Fajer Noori Nastaleeq': 'Fajer, serif',
    'Gulzar': 'Gulzar, serif',
    'Noto Nastaliq Urdu': 'Noto Nastaliq Urdu, serif'
  };

  return (
    <div className="border border-slate-300 rounded-lg bg-white focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-200 transition-all">
      {/* Toolbar */}
      <div className="p-2 border-b border-slate-200 bg-slate-50 flex flex-wrap gap-1">
        {/* Format Block */}
        <select 
          className="px-2 py-1 text-sm border border-transparent rounded hover:bg-slate-200"
          onChange={(e) => executeCommand('formatBlock', e.target.value)}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="blockquote">Quote</option>
        </select>

        {/* Font Family */}
        <select 
          className="px-2 py-1 text-sm border border-transparent rounded hover:bg-slate-200 max-w-32"
          onChange={(e) => {
            if (editorRef.current) {
              editorRef.current.style.fontFamily = e.target.value;
              updateContent();
            }
          }}
        >
          <option value="Inter">Sans Serif</option>
          {Object.entries(urduFonts).map(([key, value]) => (
            <option key={key} value={value} style={{ fontFamily: value }}>
              {key}
            </option>
          ))}
        </select>

        {/* Font Size */}
        <select 
          className="px-2 py-1 text-sm border border-transparent rounded hover:bg-slate-200"
          onChange={(e) => executeCommand('fontSize', e.target.value)}
        >
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Heading</option>
        </select>

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="List"
        >
          <List className="w-4 h-4" />
        </button>

        {/* Text Alignment */}
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => executeCommand('justifyRight')}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        {/* Insert Elements */}
        <button
          type="button"
          onClick={handleLinkClick}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleImageClick}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Insert Image"
        >
          <Image className="w-4 h-4" />
        </button>

        {/* Text Direction */}
        <button
          type="button"
          onClick={toggleDirection}
          className="p-2 rounded hover:bg-slate-200 text-slate-600"
          title="Toggle Text Direction"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="p-3 min-h-40 outline-none text-slate-800"
        onInput={handleInput}
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{ textAlign: isRtl ? 'right' : 'left' }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};