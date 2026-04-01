export const DailyTracking: React.FC = () => {
  return (
    <div className="bg-[#f6f7f5] rounded-3xl p-6 lg:p-8 shrink-0">
      <h3 className="font-bold text-gray-900 mb-6 text-xl">Theo dõi hàng ngày</h3>

      {/* Circular Progress (Calories) */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#657a44" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="56.54" strokeLinecap="round" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-bold text-2xl text-gray-900 tracking-tight">1,420</span>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Kcal Left</span>
          </div>
        </div>

        {/* Macros */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-gray-900">Protein</span>
              <span className="text-gray-500">62 / 120g</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#8c5230] rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-bold text-gray-900">Carbs</span>
              <span className="text-gray-500">145 / 200g</span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#d4a017] rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Mini Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-5 flex flex-col justify-center gap-1 shadow-sm border border-gray-50">
          <div className="text-[#657a44] font-bold text-xl mb-1">💧</div>
          <span className="font-bold text-xl text-gray-900">1.8 L</span>
          <span className="text-xs text-gray-500 font-medium tracking-wide">Water intake</span>
        </div>
        <div className="bg-white rounded-2xl p-5 flex flex-col justify-center gap-1 shadow-sm border border-gray-50">
          <div className="text-[#8c5230] font-bold text-xl mb-1">🏃‍♂️</div>
          <span className="font-bold text-xl text-gray-900">45 min</span>
          <span className="text-xs text-gray-500 font-medium tracking-wide">Active time</span>
        </div>
      </div>
    </div>
  );
};
