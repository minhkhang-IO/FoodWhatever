import { useState } from 'react';
import { Clock, Wallet, CheckCircle2, Circle } from 'lucide-react';

interface Props {
  onChange: (field: string, value: string) => void;
}

export const TimeAndBudget: React.FC<Props> = ({ onChange }) => {
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState('');

  const handleSelectTime = (opt: string) => {
    setTime(opt);
    onChange('cookTime', opt); // Gửi lên cha
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setBudget(value);
    onChange('budget', value); // Gửi lên cha
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* ... (Phần UI thời gian giữ nguyên, đổi onClick gọi handleSelectTime) */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#fde9c0] flex items-center justify-center text-yellow-600">
            <Clock size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Thời gian nấu ăn</h2>
        </div>
        
        <div className="space-y-4">
          {['Nhanh (15-30m)', 'Trung bình (45m)', 'Kiểu đầu bếp (1h+)'].map((opt) => (
            <div 
              key={opt}
              onClick={() => handleSelectTime(opt)}
              className="flex items-center justify-between cursor-pointer group"
            >
              <span className={`text-sm font-medium ${time === opt ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {opt}
              </span>
              {time === opt ? (
                <CheckCircle2 size={20} className="text-[#5f7041] fill-[#5f7041] text-white" />
              ) : (
                <Circle size={20} className="text-gray-300 group-hover:text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Phần Budget */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-[#fce7db] flex items-center justify-center text-orange-500">
            <Wallet size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Ngân Sách</h2>
        </div>

        <div className="relative">
          <input
            type="text"
            value={budget ? new Intl.NumberFormat('vi-VN').format(Number(budget)) : ''}
            onChange={handleBudgetChange}
            placeholder="Nhập số tiền..."
            className="w-full py-4 px-6 pr-16 rounded-full text-sm font-semibold text-gray-900 bg-[#f6f7f5] border-2 border-transparent focus:bg-white focus:border-[#5f7041] transition-all outline-none"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
            VNĐ
          </span>
        </div>
      </div>
    </div>
  );
};