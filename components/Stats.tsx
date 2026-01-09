
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SHELTER_STATS } from '../constants';

const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">Our Growing Impact</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Thanks to the Puerto Rican community and supporters abroad, we've increased our adoption rate by 40% this year.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              Monthly Adoption Trends
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SHELTER_STATS}>
                  <defs>
                    <linearGradient id="colorAdoptions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="adoptions" 
                    stroke="#0D9488" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorAdoptions)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="bg-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-teal-100 flex flex-col justify-center">
              <p className="text-teal-100 text-sm font-bold uppercase tracking-wider mb-2">Total Adoptions 2024</p>
              <h4 className="text-5xl font-black mb-1">1,248+</h4>
              <p className="text-teal-100/80 text-sm">Lives transformed across the island.</p>
            </div>
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Successful Rescues</p>
              <h4 className="text-5xl font-black mb-1">2,500+</h4>
              <p className="text-slate-400 text-sm">From the streets of San Juan to Mayagüez.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
