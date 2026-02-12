
import React from 'react';

const EditorStyles: React.FC = () => (
  <style>{`
    /* Style cho Editor trực quan */
    .prose b, .prose strong { font-weight: 700 !important; color: inherit; }
    .prose i, .prose em { font-style: italic !important; }
    .prose h3 { margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; color: #0f172a; }
    .prose p { margin-bottom: 1em; }
    .prose img { border-radius: 1.25rem; margin: 1.5rem 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1em; }
    .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1em; }
    .prose [style*="text-align: justify"] { text-align: justify !important; }
    .prose [style*="text-align: center"] { text-align: center !important; }
    .prose [style*="text-align: right"] { text-align: right !important; }
    
    [contenteditable]:empty:before {
      content: "Nhập nội dung bài viết tại đây...";
      color: #94a3b8;
    }
    
    /* Custom scrollbar cho vùng soạn thảo nếu cần */
    .rich-editor-content::-webkit-scrollbar { width: 4px; }
    .rich-editor-content::-webkit-scrollbar-track { background: transparent; }
    .rich-editor-content::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
  `}</style>
);

export default EditorStyles;
