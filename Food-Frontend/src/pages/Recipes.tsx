import { Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { PlannerSidebar } from '../components/planner/PlannerSidebar';
import { WeeklyCalendar } from '../components/planner/WeeklyCalendar';
import { DailyTracking } from '../components/planner/DailyTracking';
import { GoalAchieved } from '../components/planner/GoalAchieved';

export const Recipes = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9f6]">
      <Header />
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 h-full">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0">
            <PlannerSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col xl:flex-row gap-8 xl:gap-12">
            
            {/* Center: Weekly Planner */}
            <div className="flex-1 min-w-0">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
                <div>
                  <h1 className="text-4xl tracking-tight font-bold mb-3 text-gray-900">Weekly Planner</h1>
                  <p className="text-gray-500 max-w-md leading-relaxed text-sm">
                    Tổ chức hành trình dinh dưỡng của bạn bằng cách chỉnh sửa. Nguyên liệu tươi, macro cân bằng.
                  </p>
                </div>
                <button className="mt-4 sm:mt-0 bg-[#4a5833] hover:bg-[#3d482a] text-white font-bold py-3 pr-6 pl-5 rounded-full text-sm shadow-md flex items-center gap-2 transition-all">
                  <Plus size={18} /> Thêm kế hoạch mới
                </button>
              </div>

              {/* Weekly Grid */}
              <WeeklyCalendar />
            </div>

            {/* Right: Daily Tracking */}
            <aside className="w-full xl:w-[320px] flex-shrink-0 flex flex-col">
              <div className="xl:mt-[104px]">
                <DailyTracking />
                <GoalAchieved />
              </div>
            </aside>
            
          </div>

        </div>
      </main>
    </div>
  );
};
