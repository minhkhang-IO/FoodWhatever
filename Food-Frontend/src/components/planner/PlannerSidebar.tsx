import { Bookmark, Clock, ShoppingCart } from 'lucide-react';

export const PlannerSidebar: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 h-full min-h-[600px]">
      {/* Profile Card */}
      <div className="bg-[#f6f7f5] rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#2d3323] rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-white text-sm">JS</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">My Nutrition</h4>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
        </div>

        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all">
            <Bookmark size={18} /> Saved Recipes
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-900 p-3 rounded-xl bg-[#e8f6c5]/50 transition-all">
            <Clock size={18} /> Meal History
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all">
            <ShoppingCart size={18} /> Shopping List
          </a>
        </nav>
      </div>

      <div className="flex-1"></div>

      {/* AI Assistance Promo */}
      <div className="bg-[#657a44] rounded-3xl p-6 text-white text-center flex flex-col items-center justify-center relative overflow-hidden mt-auto">
        <div className="relative z-10 w-full">
          <p className="text-sm font-medium leading-relaxed mb-6 text-left">
            Optimize your diet with AI assistance.
          </p>
          <button className="w-full bg-[#f8f9f6] text-[#2d3323] font-bold text-sm py-3.5 px-6 rounded-xl hover:bg-white transition-colors">
            Start AI Plan
          </button>
        </div>
        {/* Subtle background flair */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};
