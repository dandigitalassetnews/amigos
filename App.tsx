import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PetCard from './components/PetCard';
import Matchmaker from './components/Matchmaker';
import Stats from './components/Stats';
import SuccessStories from './components/SuccessStories';
import AdoptionGuide from './components/AdoptionGuide';
import WhatsAppFeed from './components/WhatsAppFeed';
import { PETS } from './constants';
import { Pet } from './types';

// Static facts to avoid API quota usage on page load
const FUN_FACTS = [
  "Puerto Rican Sato dogs are known for their incredible resilience and loyalty!",
  "Satos are often mixed with many breeds, making them genetically healthier.",
  "The term 'Sato' comes from Puerto Rican slang for street dog, now a badge of honor.",
  "Adopting a Sato means saving a life and gaining a best friend forever.",
  "Satos are famous for being street-smart and incredibly trainable."
];

const App: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [funFact, setFunFact] = useState<string>('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Select a random fact from the local list
    const randomFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    setFunFact(randomFact);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPets = filter === 'All' 
    ? PETS 
    : PETS.filter(p => 
        p.size === filter || 
        p.gender === filter || 
        (filter === 'Cat Friendly' && p.tags.includes('Good with Cats'))
      );

  return (
    <div className="min-h-screen selection:bg-teal-100 selection:text-teal-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000" 
            alt="Dogs playing" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 backdrop-blur-xl text-teal-400 font-bold rounded-full text-xs uppercase tracking-widest mb-8 border border-teal-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              #1 Rescue Shelter in Puerto Rico
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
              Rescue a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Friend</span>, change a life.
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed font-medium">
              Every Puerto Rican rescue dog has a story of resilience. We bridge the gap between abandoned dogs and loving homes.
            </p>
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => scrollToSection('gallery')} 
                className="px-10 py-5 bg-teal-500 text-slate-950 font-black rounded-3xl hover:bg-teal-400 transition-all shadow-2xl shadow-teal-500/30 text-lg hover:-translate-y-1"
              >
                Browse Dogs
              </button>
              <button 
                onClick={() => scrollToSection('matchmaker')} 
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-black rounded-3xl hover:bg-white/20 transition-all border border-white/20 text-lg hover:-translate-y-1"
              >
                AI Matchmaker
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating AI Fun Fact */}
        {funFact && (
          <div className="absolute bottom-12 right-12 max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] hidden lg:block animate-in fade-in slide-in-from-right-12 duration-1000 shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-teal-500/20">✨</div>
              <span className="text-teal-400 font-black text-xs uppercase tracking-[0.2em]">Animal Wisdom</span>
            </div>
            <p className="text-white/90 text-lg leading-snug font-medium italic">"{funFact}"</p>
          </div>
        )}
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Eager to meet you</h2>
              <p className="text-xl text-slate-500 font-medium">Filter by personality or size to find your perfect fit.</p>
            </div>
            <div className="flex gap-2 bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-x-auto no-scrollbar">
              {['All', 'Cat Friendly', 'Small', 'Medium', 'Large', 'Female', 'Male'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-2xl text-sm font-black transition-all whitespace-nowrap flex items-center gap-2 ${
                    filter === cat 
                      ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'Cat Friendly' && <span>🐱</span>}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPets.map((pet) => (
              <PetCard 
                key={pet.id} 
                pet={pet} 
                onSelect={setSelectedPet} 
              />
            ))}
          </div>
        </div>
      </section>

      <AdoptionGuide />
      <WhatsAppFeed />
      <Matchmaker />
      <SuccessStories />
      <Stats />

      {/* Donation Banner */}
      <section id="donate" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-700 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Help us rescue more animals.</h2>
            <p className="text-2xl text-teal-50 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              Every dollar helps provide medical care, nutrition, and safe transport to forever homes across the island and beyond.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {[25, 50, 100, 250].map(amount => (
                <button key={amount} className="group py-6 bg-white/10 hover:bg-white text-white hover:text-teal-900 font-black rounded-3xl border border-white/20 transition-all text-3xl backdrop-blur-md shadow-xl hover:-translate-y-2">
                  ${amount}
                </button>
              ))}
            </div>
            <a 
              href="https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=YK6B9NEGG26G4&ssrt=1767783888155"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-16 py-7 bg-slate-950 text-white font-black rounded-[32px] hover:bg-slate-900 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-xl hover:scale-105 active:scale-95"
            >
              Choose Custom Amount
            </a>
        </div>
      </section>

      <footer className="bg-slate-950 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-teal-500/20">A</div>
                <span className="text-4xl font-black text-white tracking-tighter">Amigos De Los Animales</span>
              </div>
              <p className="text-slate-400 max-w-md text-lg leading-relaxed font-medium">
                We are a grassroots organization fighting for the abandoned dogs of Puerto Rico. Every dog we rescue is a life transformed.
              </p>
            </div>
            <div>
              <h5 className="text-white font-black text-xl mb-8">Explore</h5>
              <ul className="space-y-6 text-slate-400 font-bold">
                <li><button onClick={() => scrollToSection('process')} className="hover:text-teal-400 transition-colors">Adoption Process</button></li>
                <li><button onClick={() => scrollToSection('success-stories')} className="hover:text-teal-400 transition-colors">Success Stories</button></li>
                <li><button className="hover:text-teal-400 transition-colors text-left">Foster Program</button></li>
                <li><button className="hover:text-teal-400 transition-colors text-left">Volunteer</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-black text-xl mb-8">Contact</h5>
              <ul className="space-y-6 text-slate-400 font-bold">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-teal-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  +1 (787) 555-AMIGO
                </li>
                <li className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-teal-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  hola@amigosdelosanimalespr.org
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-sm font-bold tracking-widest uppercase">© 2024 Amigos De Los Animales • Built with Love in Puerto Rico</p>
            <div className="flex gap-10">
              <a href="#" className="text-slate-600 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Pet Detail Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={() => setSelectedPet(null)}></div>
          <div className="bg-white rounded-[48px] max-w-6xl w-full max-h-[92vh] overflow-hidden relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
             <button 
              onClick={() => setSelectedPet(null)}
              className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full transition-all z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <div className="md:w-1/2 h-[350px] md:h-auto relative">
              <img src={selectedPet.image} alt={selectedPet.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/20 backdrop-blur-2xl rounded-[32px] border border-white/20 shadow-2xl">
                <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-6">
                   <div className="text-white">
                      <p className="text-[10px] text-teal-300 font-black uppercase tracking-widest mb-1">Energy</p>
                      <p className="font-black text-lg">{selectedPet.energyLevel}</p>
                   </div>
                   <div className="text-white">
                      <p className="text-[10px] text-teal-300 font-black uppercase tracking-widest mb-1">Training</p>
                      <p className="font-black text-lg">{selectedPet.trainingLevel}</p>
                   </div>
                   <div className="text-white">
                      <p className="text-[10px] text-teal-300 font-black uppercase tracking-widest mb-1">House Trained</p>
                      <p className="font-black text-lg">{selectedPet.isHouseTrained}</p>
                   </div>
                   <div className="text-white">
                      <p className="text-[10px] text-teal-300 font-black uppercase tracking-widest mb-1">Ideal For</p>
                      <p className="font-black text-lg truncate">{selectedPet.idealFor}</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-10 md:p-20 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-[10px] font-black uppercase rounded-lg tracking-widest">Available</span>
                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{selectedPet.location}</span>
              </div>
              <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">{selectedPet.name}</h2>
              <p className="text-2xl text-slate-400 mb-12 font-bold">{selectedPet.breed}</p>
              
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Age</p>
                  <p className="text-slate-900 font-black text-xl">{selectedPet.age}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gender</p>
                  <p className="text-slate-900 font-black text-xl">{selectedPet.gender}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Size</p>
                  <p className="text-slate-900 font-black text-xl">{selectedPet.size}</p>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Backstory</h4>
                <p className="text-slate-600 leading-relaxed text-xl font-medium">
                  {selectedPet.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-12">
                {selectedPet.tags.map(tag => {
                  const isCatFriendly = tag === 'Good with Cats';
                  return (
                    <span 
                      key={tag} 
                      className={`px-5 py-2 text-xs font-black rounded-2xl transition-all flex items-center gap-2 ${
                        isCatFriendly 
                          ? 'bg-indigo-100 text-indigo-700 ring-4 ring-indigo-50 shadow-sm' 
                          : 'bg-teal-50 text-teal-600 border border-teal-100'
                      }`}
                    >
                      {isCatFriendly && <span>🐱</span>}
                      #{tag.toUpperCase()}
                    </span>
                  );
                })}
              </div>

              <button className="w-full py-6 bg-teal-600 text-white font-black text-xl rounded-3xl hover:bg-teal-700 transition-all shadow-2xl shadow-teal-100 mb-6 hover:-translate-y-1">
                Start Adoption Application
              </button>
              <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">
                Standard Fee: $150 • Rescue ID: #ADLA-{selectedPet.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
