import { useState } from 'react';
import { Leaf, Droplet, Fish, Egg } from 'lucide-react';

interface Props {
  onChange: (field: string, value: string) => void;
}

export const Preferences: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<string>('');

  const dieratyOptions = [
    { id: 'Vegetarian', icon: <Egg size={20} /> },
    { id: 'Vegan', icon: <Leaf size={20} /> },
    { id: 'Gluten Free', icon: <Droplet size={20} /> },
    { id: 'Keto', icon: <Fish size={20} /> },
  ];

  const handleSelectDiet = (id: string) => {
    setSelected(id);
    onChange('dietType', id); // Gửi lựa chọn lên cha
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#fce7db] flex items-center justify-center text-orange-500">
          <Leaf size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Preferences & Sensitivities</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dieratyOptions.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectDiet(opt.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl gap-3 transition-all ${
                isActive 
                  ? 'bg-[#dff3ae] outline outline-2 outline-[#5f7041] text-[#5f7041]' 
                  : 'bg-[#f6f7f5] text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className={isActive ? 'text-[#5f7041]' : ''}>{opt.icon}</span>
              <span className="text-xs font-bold uppercase tracking-wider">{opt.id}</span>
            </button>
          );
        })}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Thành phần dị ứng</label>
        <textarea 
          placeholder="Đậu phộng, Hải sản, v.v."
          rows={3}
          onChange={(e) => onChange('allergies', e.target.value)} // Gửi lên cha
          className="w-full bg-[#f6f7f5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5f7041]/50 transition-all font-medium resize-none"
        />
      </div>
    </div>
  );
};