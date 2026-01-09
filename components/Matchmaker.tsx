import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { MatchmakerResult, Pet } from '../types';
import { PETS } from '../constants';

const Matchmaker: React.FC = () => {
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchmakerResult | null>(null);
  const [matchedPet, setMatchedPet] = useState<Pet | null>(null);

  const handleMatch = async () => {
    if (!preferences.trim()) return;
    
    setLoading(true);
    setResult(null);
    setMatchedPet(null);
    
    const gemini = new GeminiService();
    const response = await gemini.matchPet(preferences);
    
    if (response) {
      setResult(response);
      const pet = PETS.find(p => p.id === response.recommendedPetId);
      if (pet) {
        setMatchedPet(pet);
      } else {
        // Fallback to first pet if ID matching fails
        setMatchedPet(PETS[0]);
      }
    }
    setLoading(false);
  };

  return (
    <section id="matchmaker" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Matchmaker</span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Our Gemini AI understands the unique personalities of our rescue dogs. Describe your home life, and let's find your soulmate.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="How does it work? Simply describe your life!&#10;&#10;Example: 'I live in a small apartment in San Juan with a cat. I work from home and enjoy calm evening walks, but I'm not a runner. Looking for a gentle companion who loves to cuddle.'"
                  className="w-full h-40 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-[32px] p-6 text-white placeholder-slate-500 focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none text-lg"
                />
                <div className="absolute bottom-4 right-6 text-slate-600 text-xs font-bold uppercase tracking-widest">
                  Powered by Gemini 3 Pro
                </div>
              </div>
              
              <button
                onClick={handleMatch}
                disabled={loading || !preferences.trim()}
                className="group w-full py-5 bg-gradient-to-r from-teal-500 to-emerald-500 disabled:from-slate-700 disabled:to-slate-800 text-slate-950 font-black rounded-[24px] transition-all flex items-center justify-center gap-3 text-xl shadow-xl shadow-teal-500/10 hover:shadow-teal-500/20 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Consulting the Pups...</span>
                  </>
                ) : (
                  <>
                    <span>Find My Match</span>
                    <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative min-h-[500px] flex items-center justify-center">
            {!result && !loading && (
              <div className="text-center p-16 border-2 border-dashed border-slate-800 rounded-[48px] w-full bg-slate-900/40 backdrop-blur-sm">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600">
                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <h3 className="text-slate-400 font-bold text-xl mb-2">Ready to Meet Your Friend?</h3>
                <p className="text-slate-600">Enter your details and let AI do the searching.</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-4 border-teal-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                  <p className="text-teal-400 font-black tracking-widest uppercase text-sm mb-2 animate-pulse">Analyzing Personalities</p>
                  <p className="text-slate-500 text-xs">Scanning available rescues in Puerto Rico...</p>
                </div>
              </div>
            )}

            {result && matchedPet && (
              <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-500 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <div className="bg-teal-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-teal-500/20">
                    AI Selection
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                  <div className="relative">
                    <img 
                      src={matchedPet.image} 
                      alt={matchedPet.name} 
                      className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] object-cover ring-8 ring-teal-50 shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl">
                      🐾
                    </div>
                  </div>
                  <div className="text-center md:text-left pt-2">
                    <h4 className="text-4xl font-black text-slate-900 mb-1">{matchedPet.name}</h4>
                    <p className="text-slate-500 font-bold mb-4">{matchedPet.breed}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-32">
                        <div 
                          className="h-full bg-teal-500 rounded-full transition-all duration-1000" 
                          style={{ width: `${result.compatibilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-teal-600 font-black text-sm whitespace-nowrap">
                        {result.compatibilityScore}% Match
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-3xl p-6 mb-8 relative">
                   <svg className="absolute top-4 left-4 text-teal-100 w-12 h-12 -z-0" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C15.9124 14 15.017 13.1046 15.017 12V10C15.017 8.89543 15.9124 8 17.017 8H19.017V6C19.017 4.89543 18.1216 4 17.017 4H14.017V2H17.017C19.2261 2 21.017 3.79086 21.017 6V11C21.017 11.5523 20.5693 12 20.017 12H17.017V14H19.017C21.2261 14 23.017 15.7909 23.017 18V21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166V14H6.0166C4.91203 14 4.0166 13.1046 4.0166 12V10C4.0166 8.89543 4.91203 8 6.0166 8H8.0166V6C8.0166 4.89543 7.12117 4 6.0166 4H3.0166V2H6.0166C8.22574 2 10.0166 3.79086 10.0166 6V11C10.0166 11.5523 9.56888 12 9.0166 12H6.0166V14H8.0166C10.2257 14 12.0166 15.7909 12.0166 18V21H3.0166Z" /></svg>
                  <p className="relative z-10 text-slate-700 italic leading-relaxed md:text-lg">
                    {result.reasoning}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button className="py-4 bg-teal-600 text-white font-black rounded-2xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2">
                    Meet {matchedPet.name}
                  </button>
                  <button onClick={() => {setResult(null); setPreferences('')}} className="py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all">
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Matchmaker;
