import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Upload, Calendar as CalendarIcon, LayoutList } from 'lucide-react';


const WEEK_DAYS_7 = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const WeeklyCalendar: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    const day = new Date(year, month, 1).getDay();
    // JS getDay() returns 0 for Sunday. We want Monday=0, Sunday=6
    return day === 0 ? 6 : day - 1;
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const getWeekHeader = () => {
    const currentDay = currentDate.getDay();
    const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - distanceToMonday);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
       return `Tuần: ${startOfWeek.getDate()} - ${endOfWeek.getDate()} Thg ${startOfWeek.getMonth() + 1}`;
    } else {
       return `Tuần: ${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;
    }
  };

  const formattedHeader = viewMode === 'month' 
    ? currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' }).replace(/^tháng/, 'Tháng')
    : getWeekHeader();

  const renderWeekView = () => {
    const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday...
    const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1;
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - distanceToMonday);

    const weekDays = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });

    return (
      <div className="grid grid-cols-7 gap-4">
        {/* Headers */}
        {weekDays.map((date, i) => (
          <div key={i} className="text-center font-bold text-xs text-gray-400 tracking-widest mb-2 flex flex-col gap-1.5 items-center">
            <span>{WEEK_DAYS_7[i]}</span>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all ${date.toDateString() === new Date().toDateString() ? 'bg-[#4a5833] text-white shadow-md' : 'text-gray-900 bg-white shadow-sm border border-gray-100'}`}>{date.getDate()}</span>
          </div>
        ))}

        {/* Columns */}
        {weekDays.map((date, i) => {
          const dateNum = date.getDate();
          // Giả lập mock data rải rác để cho thấy sự thay đổi giữa các tuần
          const showMockDay1 = dateNum % 5 === 1;
          const showMockDay2 = dateNum % 5 === 3;
          const showMockDay3 = dateNum % 5 === 0;

          return (
            <div key={i} className="space-y-4">
              {showMockDay1 && (
                <>
                   {/* Breakfast */}
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group cursor-pointer hover:border-[#4a5833]/50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-[#b45d26] uppercase tracking-wider mb-2">Ăn sáng</span>
                    <h4 className="font-bold text-sm text-gray-900 mb-3 leading-tight">Matcha Chia Pudding</h4>
                    <div className="w-full h-20 rounded-xl bg-gray-100 mt-auto overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1490474418585-ba9f52cce4ce?w=300&h=200&fit=crop" alt="Pudding" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </>
              )}

              {showMockDay2 && (
                <>
                   {/* Lunch */}
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group cursor-pointer hover:border-[#4a5833]/50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-[#657a44] uppercase tracking-wider mb-2">Ăn trưa</span>
                    <h4 className="font-bold text-sm text-gray-900 mb-3 leading-tight">Quinoa Avocado Salad</h4>
                    <div className="w-full h-20 rounded-xl bg-gray-100 mt-auto overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop" alt="Salad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                   {/* Dinner */}
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-brand-light flex flex-col relative overflow-hidden group cursor-pointer hover:border-[#4a5833]/50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider mb-2">Ăn tối</span>
                    <h4 className="font-bold text-sm text-gray-900 mb-3 leading-tight">Seared Salmon</h4>
                    <div className="w-full h-20 rounded-xl bg-gray-100 mt-auto overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop" alt="Salmon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </>
              )}

              {showMockDay3 && (
                <>
                  <div className="bg-[#dff3ae]/30 rounded-2xl p-4 border border-[#dff3ae] flex flex-col relative h-[160px]">
                     <span className="text-[10px] font-bold text-[#657a44] uppercase tracking-wider mb-2">Đã lên lịch</span>
                     <h4 className="font-bold text-sm text-gray-900 mb-3 leading-tight">Green Smoothie Bowl</h4>
                  </div>
                </>
              )}

              {/* Default empty slots nếu không có mock data */}
              {!showMockDay1 && !showMockDay2 && !showMockDay3 && (
                <>
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col relative h-[160px] cursor-pointer hover:border-[#4a5833]/50 transition-colors justify-center items-center group"
                  >
                     <span className="absolute top-4 left-4 text-[10px] font-bold text-[#b45d26] uppercase tracking-wider">Lịch trống</span>
                     <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mt-4 group-hover:scale-110 group-hover:bg-[#4a5833] group-hover:text-white transition-all">
                       <Plus size={16} />
                     </div>
                  </div>
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-transparent rounded-2xl p-4 border-2 border-dashed border-gray-300 flex flex-col relative h-[160px] cursor-pointer hover:border-gray-400 hover:bg-white/50 transition-colors justify-center items-center text-2xl opacity-50"
                  >
                    🍴
                  </div>
                </>
              )}
              
              <div 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col relative h-[160px] opacity-70 cursor-pointer hover:border-[#4a5833]/50 transition-colors justify-center items-center group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-transparent group-hover:text-[#4a5833] transition-colors opacity-0 group-hover:opacity-100">
                   <Plus size={16} />
                 </div>
              </div>

            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const blanks = Array.from({ length: firstDay }).map((_, i) => (
      <div key={`blank-${i}`} className="bg-gray-50/50 rounded-2xl border border-gray-50 opacity-50 min-h-[120px]"></div>
    ));

    const days = Array.from({ length: daysInMonth }).map((_, i) => {
      const dayNum = i + 1;
      // Trải nghiệm UI: Random ngẫu nhiên một số ngày có data để thấy UI
      const hasBreakfast = dayNum % 5 === 0;
      const hasLunch = dayNum % 3 === 0;
      const hasDinner = dayNum % 4 === 0;
      
      return (
        <div 
          key={`day-${dayNum}`} 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col relative min-h-[120px] cursor-pointer hover:border-[#4a5833]/50 transition-colors group"
        >
          <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors mb-2">{dayNum}</span>
          
          <div className="mt-auto flex flex-col gap-1.5 w-full">
             {hasBreakfast && <div className="h-2 w-full bg-[#b45d26] rounded-full opacity-80" title="Ăn sáng"></div>}
             {hasLunch && <div className="h-2 w-full bg-[#657a44] rounded-full opacity-80" title="Ăn trưa"></div>}
             {hasDinner && <div className="h-2 w-full bg-yellow-600 rounded-full opacity-80" title="Ăn tối"></div>}
          </div>

          {!hasBreakfast && !hasLunch && !hasDinner && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <Plus size={16} />
              </div>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="grid grid-cols-7 gap-4">
        {WEEK_DAYS_7.map((day) => (
          <div key={day} className="text-center font-bold text-xs text-gray-400 tracking-widest mb-2">
            {day}
          </div>
        ))}
        {blanks}
        {days}
      </div>
    );
  };

  return (
    <div className="bg-[#f6f7f5] rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h3 className="text-2xl font-bold text-gray-900 capitalize">{formattedHeader}</h3>
        
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-1 flex items-center shadow-sm border border-gray-100">
            <button 
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'week' ? 'bg-[#f6f7f5] text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutList size={16} /> Tuần
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${viewMode === 'month' ? 'bg-[#f6f7f5] text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <CalendarIcon size={16} /> Tháng
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-sm transition-all shadow-sm border border-gray-100/50">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-sm transition-all shadow-sm border border-gray-100/50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'week' ? (
        renderWeekView()
      ) : (
        renderMonthView()
      )}

      {/* Add Meal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-md relative shadow-2xl">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#4a5833] transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Thêm lịch ăn mới</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tên món ăn đề xuất</label>
                <input 
                  type="text" 
                  placeholder="VD: Salad gà bơ"
                  className="w-full py-3 px-4 rounded-xl text-sm bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#4a5833] focus:ring-2 focus:ring-[#4a5833]/20 transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Calories</label>
                <input 
                  type="number" 
                  placeholder="VD: 350"
                  className="w-full py-3 px-4 rounded-xl text-sm bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#4a5833] focus:ring-2 focus:ring-[#4a5833]/20 transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thêm hình ảnh món ăn</label>
                <div className="w-full h-32 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 text-gray-400 hover:bg-[#dff3ae]/30 hover:border-[#4a5833]/50 hover:text-[#4a5833] transition-colors cursor-pointer group">
                  <Upload size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Tải ảnh lên (Kéo thả hoặc nhấn vào)</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-full bg-[#4a5833] hover:bg-[#3d482a] text-white font-bold py-4 rounded-xl text-sm shadow-md transition-all mt-4"
              >
                Thêm vào lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
