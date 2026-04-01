import { Activity } from 'lucide-react';

interface Props {
  onChange: (field: string, value: string) => void;
}

export const PhysicalFoundation: React.FC<Props> = ({ onChange }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#dff3ae] flex items-center justify-center text-[#5f7041]">
          <Activity size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Physical Foundation</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Cân nặng hiện tại (KG)</label>
          <input 
            type="text" 
            placeholder="e.g. 70" 
            onChange={(e) => onChange('weight', e.target.value)} // Gửi lên cha
            className="w-full bg-[#f6f7f5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f7041]/50 transition-all font-medium"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Chiều cao (CM)</label>
          <input 
            type="text" 
            placeholder="e.g. 175" 
            onChange={(e) => onChange('height', e.target.value)} // Gửi lên cha
            className="w-full bg-[#f6f7f5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f7041]/50 transition-all font-medium"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Mục tiêu</label>
          <div className="relative">
            <select 
              onChange={(e) => onChange('goal', e.target.value)} // Gửi lên cha
              className="w-full bg-[#f6f7f5] rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#5f7041]/50 transition-all font-medium text-gray-700"
            >
              <option value="">Chọn mục tiêu...</option>
              <option value="Giảm cân">Giảm cân</option>
              <option value="Duy trì">Duy trì</option>
              <option value="Tăng cơ">Tăng cơ</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
          </div>
        </div>
      </div>
    </div>
  );
};