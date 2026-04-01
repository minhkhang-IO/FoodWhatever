import { Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between py-6 px-12 bg-transparent text-sm font-medium border-b border-transparent">
      <div className="flex items-center gap-1">
        {/* Logo placeholder */}
        <span className="text-xl font-bold tracking-tight text-brand-text">Food<span className="text-brand">Whatever</span></span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-gray-500">
        <NavLink to="/" className={({ isActive }) => `transition-colors ${isActive ? 'text-brand-text border-b-2 border-brand pb-1' : 'hover:text-brand-text'}`}>Home</NavLink>
        <NavLink to="/recipes" className={({ isActive }) => `transition-colors ${isActive ? 'text-brand-text border-b-2 border-brand pb-1' : 'hover:text-brand-text'}`}>Recipes</NavLink>
        <a href="#" className="hover:text-brand-text transition-colors">Tips</a>
        <a href="#" className="hover:text-brand-text transition-colors">Contact</a>
      </nav>

      <div className="flex items-center gap-6 text-brand-text">
        <button className="hover:text-brand transition-colors">
          <Bell size={20} />
        </button>
        <button className="hover:text-brand transition-colors bg-brand/10 p-1.5 rounded-full flex items-center justify-center">
          <User size={18} className="text-brand" />
        </button>
      </div>
    </header>
  );
};
