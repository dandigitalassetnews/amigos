
import React from 'react';

const AdoptionGuide: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Browse & Connect",
      desc: "Explore our available rescues online. Use our AI Matchmaker to find your perfect personality fit."
    },
    {
      number: "02",
      title: "Submit Application",
      desc: "Fill out our digital adoption form. It helps us ensure a safe and loving match for the dog."
    },
    {
      number: "03",
      title: "Shelter Visit",
      desc: "Visit our San Juan facility to meet the pups in person and see the environment they've been in."
    },
    {
      number: "04",
      title: "Meet & Greet",
      desc: "If you have other pets or kids, we'll schedule a supervised interaction to ensure compatibility."
    },
    {
      number: "05",
      title: "Final Adoption",
      desc: "Complete the paperwork and pay the adoption fee ($150 local / $250 with travel crate)."
    }
  ];

  return (
    <section id="process" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-24">
            <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">The Path to <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">Adoption</span></h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We make the process transparent and straightforward. Our goal is a successful, long-term bond between you and your new companion.
            </p>
            <div className="p-6 bg-teal-600 rounded-3xl text-white shadow-xl shadow-teal-100">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Required for PR Residents:
              </h4>
              <ul className="space-y-2 text-sm text-teal-50">
                <li className="flex items-start gap-2">• Valid ID (DTOP / Passport)</li>
                <li className="flex items-start gap-2">• Proof of residence (Utility bill)</li>
                <li className="flex items-start gap-2">• Landlord's consent (If renting)</li>
                <li className="flex items-start gap-2">• All family members must meet the dog</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="text-4xl font-black text-slate-100 group-hover:text-teal-100 transition-colors leading-none">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionGuide;
