import { Bookmark, Clock, ShoppingCart } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <>
      {/* Promo Card */}
      <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden min-h-[420px] flex flex-col justify-end">
        {/* Placeholder for background image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        <img 
          src="/images/rap_xiec_it_avt.jpg"
          alt="Pantry" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20">
          <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase mb-4 inline-block">
            Rạp Xiếc IT
          </span>
          <h3 className="text-2xl font-bold mb-3 leading-tight">
            Sustainable Eating starts in your pantry.
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed max-w-[90%]">
            Our engine 
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-[#f6f7f5] rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#2d3323] rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-white text-sm">JS</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900">FoodWhatever</h4>
            <p className="text-xs text-gray-500">Premium Member</p>
          </div>
        </div>

        <nav className="space-y-1 mb-8">
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all">
            <Bookmark size={18} /> Saved Recipes
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all">
            <Clock size={18} /> Meal History
          </a>
          <a href="#" className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-gray-900 p-3 rounded-xl hover:bg-white transition-all">
            <ShoppingCart size={18} /> Shopping List
          </a>
        </nav>

        <button className="w-full bg-[#e8f6c5] text-brand-text font-bold text-sm py-4 rounded-xl hover:bg-[#dff3ae] transition-colors">
          Start AI Plan
        </button>
      </div>
    </>
  );
};
