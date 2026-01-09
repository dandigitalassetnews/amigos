
import React from 'react';

const SuccessStories: React.FC = () => {
  return (
    <section id="success-stories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Success Stories</h2>
          <p className="text-lg text-slate-500 font-medium">Heartwarming tales of rescues finding their forever homes.</p>
        </div>

        <div className="bg-slate-50 rounded-[48px] overflow-hidden shadow-sm border border-slate-100 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-teal-500/10 rounded-[40px] blur-2xl group-hover:bg-teal-500/20 transition-all"></div>
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000" 
                alt="Luna in her new home" 
                className="relative rounded-[32px] w-full h-[400px] object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-3xl shadow-lg border border-slate-100 hidden md:block">
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1">Happy Tail</p>
                <p className="text-slate-900 font-extrabold">Luna & The Riveras</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-1 text-teal-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
                "Luna was the missing piece to our family puzzle."
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed italic">
                "When we first met Luna at the Amigos De Los Animales shelter, she was a bit shy, but we immediately felt a connection. Today, she is the heart of our home. Whether we're exploring El Yunque or just lounging in the patio, her joy is infectious. Adoption wasn't just about saving her; she saved us too."
              </p>
              <div>
                <p className="text-slate-900 font-black text-xl">— The Rivera Family</p>
                <p className="text-slate-500 font-medium">Adopted Luna in March 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
