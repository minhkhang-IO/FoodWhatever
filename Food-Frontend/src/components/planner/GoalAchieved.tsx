export const GoalAchieved: React.FC = () => {
  return (
    <div className="bg-[#657a44] rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden mt-6 shrink-0 shadow-sm">
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-3 tracking-tight">Mục tiêu đã đạt được!</h3>
        <p className="text-sm text-gray-100 leading-relaxed mb-6 opacity-95 max-w-[95%]">
          Bạn đã duy trì mức thâm hụt calo trong 5 ngày liên tiếp. Điểm sức khỏe của bạn đang tăng lên.
        </p>
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
             <span className="text-sm">💎</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
             <span className="text-sm text-yellow-900">⭐</span>
          </div>
        </div>
      </div>
      {/* Background Graphic */}
      <svg className="absolute -bottom-8 -right-8 w-40 h-40 text-white opacity-5 rotate-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z"/>
      </svg>
    </div>
  );
};
