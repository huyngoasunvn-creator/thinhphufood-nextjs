
import React, { useRef, useEffect, useCallback } from 'react';
import EditorToolbar, { EditorTool } from './editor/EditorToolbar';
import EditorStyles from './editor/EditorStyles';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Đồng bộ giá trị từ props vào DOM contentEditable (chỉ khi giá trị thay đổi từ bên ngoài hoặc reset)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (value === '' || value === '<p><br></p>') {
        editorRef.current.innerHTML = '';
      } else {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value === '']);

  const execCommand = useCallback((command: string, val: string = '') => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleToolAction = (tool: EditorTool) => {
    if (tool.specialAction === 'link') {
      const url = prompt('Nhập liên kết (URL):');
      if (url) execCommand('createLink', url);
    } else if (tool.specialAction === 'image') {
      const url = prompt('Nhập URL hình ảnh:');
      if (url) execCommand('insertImage', url);
    } else if (tool.specialAction === 'video') {
      const url = prompt('Nhập URL Video (Youtube Embed URL):');
      if (url) {
        const videoHtml = `<div class="aspect-video my-4"><iframe src="${url}" class="w-full h-full rounded-2xl" frameborder="0" allowfullscreen></iframe></div><p><br></p>`;
        execCommand('insertHTML', videoHtml);
      }
    } else if (tool.command) {
      execCommand(tool.command, tool.value || '');
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-2">
      <EditorStyles />
      {label && (
        <label className="text-xs font-bold text-slate-500 uppercase block tracking-wider px-1">
          {label}
        </label>
      )}
      
      <div className="border border-slate-200 rounded-[2rem] overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all relative">
        <EditorToolbar onAction={handleToolAction} />
        
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="rich-editor-content w-full px-8 py-8 min-h-[400px] max-h-[600px] overflow-y-auto outline-none bg-white text-slate-800 leading-relaxed font-sans prose prose-slate max-w-none"
        />

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-[10px] text-green-600 font-black uppercase tracking-[0.15em] flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Visual Editor Mode
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            {value.replace(/<[^>]*>?/gm, '').length} ký tự
          </span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
