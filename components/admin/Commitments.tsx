import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
} from "lucide-react";
import { Commitment } from "../../types";

const ICON_MAP: Record<string, any> = {
  Leaf,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Star,
  Heart,
  CheckCircle,
};

interface AdminCommitmentsProps {
  commitments: Commitment[];
  onUpdate: (commitments: Commitment[]) => void;
}

const AdminCommitments: React.FC<AdminCommitmentsProps> = ({
  commitments,
  onUpdate,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Commitment>({
    id: "",
    iconName: "Leaf",
    title: "",
    description: "",
    colorScheme: "green",
  });

  const handleEdit = (c: Commitment) => {
    setFormData(c);
    setEditingId(c.id);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) return;

    try {
      if (editingId) {
        await fetch("/api/commitments", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        onUpdate(
          commitments.map((c) => (c.id === editingId ? formData : c))
        );
      } else {
        const res = await fetch("/api/commitments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        onUpdate([
          ...commitments,
          {
            ...formData,
            id: data.id,
          },
        ]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      id: "",
      iconName: "Leaf",
      title: "",
      description: "",
      colorScheme: "green",
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa cam kết này?")) return;

    try {
      await fetch("/api/commitments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      onUpdate(commitments.filter((c) => c.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ========= ORGANIC COLOR SYSTEM ========= */

  const getColorClasses = (scheme: string) => {
    switch (scheme) {
      case "green":
        return "bg-emerald-50 text-emerald-600";
      case "blue":
        return "bg-sky-50 text-sky-600";
      case "orange":
        return "bg-amber-50 text-amber-600";
      case "purple":
        return "bg-violet-50 text-violet-600";
      case "red":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const inputBaseClass =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 font-semibold transition-all placeholder:text-slate-400";

  return (
    <div className="space-y-10 animate-in fade-in duration-500">

      {/* FORM CARD */}
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-md shadow-slate-100/40">
        <h3 className="text-xl font-extrabold text-slate-900 mb-8 flex items-center">
          <Heart className="h-5 w-5 mr-3 text-rose-400" />
          {editingId ? "Chỉnh sửa cam kết" : "Thêm cam kết mới"}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <input
            type="text"
            placeholder="Tiêu đề"
            className={inputBaseClass}
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Mô tả ngắn"
            className={inputBaseClass}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <select
            className={`${inputBaseClass} cursor-pointer`}
            value={formData.iconName}
            onChange={(e) =>
              setFormData({ ...formData, iconName: e.target.value })
            }
          >
            {Object.keys(ICON_MAP).map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>

          <select
            className={`${inputBaseClass} cursor-pointer`}
            value={formData.colorScheme}
            onChange={(e) =>
              setFormData({
                ...formData,
                colorScheme: e.target.value as any,
              })
            }
          >
            <option value="green">Xanh lá</option>
            <option value="blue">Xanh dương</option>
            <option value="orange">Cam</option>
            <option value="purple">Tím</option>
            <option value="red">Đỏ</option>
          </select>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          {editingId && (
            <button
              onClick={resetForm}
              className="px-6 py-3 rounded-2xl text-slate-400 hover:text-slate-800 transition"
            >
              Hủy
            </button>
          )}
          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold tracking-wide flex items-center space-x-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
          >
            <Save className="h-4 w-4" />
            <span>{editingId ? "Cập nhật" : "Lưu mới"}</span>
          </button>
        </div>
      </div>

      {/* GRID CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commitments.map((c) => {
          const IconComp = ICON_MAP[c.iconName] || Heart;

          return (
            <div
              key={c.id}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 relative group"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-4 rounded-2xl ${getColorClasses(
                    c.colorScheme
                  )} transition-all duration-500 group-hover:scale-105`}
                >
                  <IconComp className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h4 className="font-extrabold text-slate-900 text-sm truncate">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(c)}
                  className="p-2 text-slate-400 hover:text-sky-600 bg-white border border-slate-100 rounded-xl shadow-md transition"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 bg-white border border-slate-100 rounded-xl shadow-md transition"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminCommitments;