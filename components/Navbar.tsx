
import React from 'react';

const Navbar: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-200">
              A
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-800">
              Amigos De Los <span className="text-teal-600">Animales</span>
              <span className="text-xs ml-1 font-medium bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full uppercase tracking-widest">PR</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection(e, 'gallery')}
              className="hover:text-teal-600 transition-colors"
            >
              Adopt
            </a>
            <a 
              href="#matchmaker" 
              onClick={(e) => scrollToSection(e, 'matchmaker')}
              className="hover:text-teal-600 transition-colors"
            >
              Matchmaker AI
            </a>
            <a 
              href="#stats" 
              onClick={(e) => scrollToSection(e, 'stats')}
              className="hover:text-teal-600 transition-colors"
            >
              Our Impact
            </a>
            <a 
              href="#donate" 
              onClick={(e) => scrollToSection(e, 'donate')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md"
            >
              Donate
            </a>
          </div>
          
          <div className="md:hidden">
            <button className="p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
