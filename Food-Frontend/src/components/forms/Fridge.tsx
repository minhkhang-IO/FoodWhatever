import { useState } from 'react';
import { Package, Plus, X } from 'lucide-react';

interface Props {
  onChange: (field: string, value: string[]) => void;
}

export const Fridge: React.FC<Props> = ({ onChange }) => {
  const [ingredients, setIngredients] = useState<string[]>(['Broccoli', 'Chicken Breast', 'Eggs', 'Yogurt']);
  const [newVal, setNewVal] = useState('');

  const removeIng = (ing: string) => {
    const updated = ingredients.filter(i => i !== ing);
    setIngredients(updated);
    onChange('fridgeItems', updated); // Gửi mảng mới lên cha
  }

  // Thêm hàm xử lý khi nhấn Enter để thêm nguyên liệu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newVal.trim() !== '') {
      const updated = [...ingredients, newVal.trim()];
      setIngredients(updated);
      onChange('fridgeItems', updated); // Gửi mảng mới lên cha
      setNewVal(''); // Xóa ô input sau khi thêm
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50 relative overflow-hidden">
      <div className="absolute inset-2 border-2 border-dashed border-gray-200 rounded-2xl pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#dff3ae] flex items-center justify-center text-[#5f7041]">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tủ lạnh nhà bạn đã có gì rồi</h2>
              <p className="text-xs text-gray-500 mt-1">Chúng tôi sẽ ưu tiên những thứ này để giảm lãng phí thực phẩm.</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#f6f7f5] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          {ingredients.map(ing => (
            <div key={ing} className="bg-[#dff3ae] text-[#5f7041] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
              {ing}
              <button onClick={() => removeIng(ing)} className="hover:text-red-500 transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
          <input 
            type="text" 
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={handleKeyDown} // Bắt sự kiện Enter
            placeholder="Thêm món ăn (Enter)..." 
            className="bg-transparent text-sm italic text-gray-500 ml-2 outline-none w-40"
          />
        </div>
      </div>
    </div>
  );
};