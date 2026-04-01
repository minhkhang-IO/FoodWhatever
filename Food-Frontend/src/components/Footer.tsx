import { ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EAEBE8] py-16 px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold mb-4">FoodWhatever</h3>
          <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
            Redefining health through the lens of editorial elegance and biological precision.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-sm">Company</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-text transition-colors">Cookie Settings</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-sm">Newsletter</h4>
          <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm">
            <input 
              type="email" 
              placeholder="Email" 
              className="px-4 py-2 bg-transparent text-sm outline-none flex-1 w-full"
            />
            <button className="bg-brand text-white p-2 rounded-full hover:bg-brand/90 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-6 mt-auto">
            © 2024 My Food Editorial Vitality
          </p>
        </div>
      </div>
    </footer>
  );
};
