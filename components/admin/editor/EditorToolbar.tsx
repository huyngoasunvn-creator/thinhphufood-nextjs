
import React from 'react';
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  Image as ImageIcon, Video, Link, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify, Type,
  LucideIcon
} from 'lucide-react';

export interface EditorTool {
  icon: LucideIcon;
  label: string;
  command?: string;
  value?: string;
  specialAction?: 'link' | 'image' | 'video';
}

const TOOLS: EditorTool[] = [
  { icon: Bold, label: 'Đậm', command: 'bold' },
  { icon: Italic, label: 'Nghiêng', command: 'italic' },
  { icon: Underline, label: 'Gạch chân', command: 'underline' },
  { icon: Type, label: 'Tiêu đề', command: 'formatBlock', value: '<h3>' },
  { icon: AlignLeft, label: 'Trái', command: 'justifyLeft' },
  { icon: AlignCenter, label: 'Giữa', command: 'justifyCenter' },
  { icon: AlignRight, label: 'Phải', command: 'justifyRight' },
  { icon: AlignJustify, label: 'Căn đều', command: 'justifyFull' },
  { icon: List, label: 'Danh sách', command: 'insertUnorderedList' },
  { icon: ListOrdered, label: 'Số', command: 'insertOrderedList' },
  { icon: Link, label: 'Liên kết', specialAction: 'link' },
  { icon: ImageIcon, label: 'Chèn ảnh', specialAction: 'image' },
  { icon: Video, label: 'Chèn Video', specialAction: 'video' },
];

interface EditorToolbarProps {
  onAction: (tool: EditorTool) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ onAction }) => (
  <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-100 sticky top-0 z-10 shadow-sm backdrop-blur-sm">
    {TOOLS.map((tool, idx) => (
      <button
        key={idx}
        type="button"
        title={tool.label}
        className="p-2 hover:bg-white hover:text-green-600 rounded-lg text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500/20"
        onClick={() => onAction(tool)}
      >
        <tool.icon className="h-4 w-4" />
      </button>
    ))}
  </div>
);

export default EditorToolbar;
