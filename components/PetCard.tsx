import React, { useState, useEffect } from 'react';
import { Pet } from '../types';

interface PetCardProps {
  pet: Pet;
  onSelect: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onSelect }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when pet changes so we try to load the new image
    setHasError(false);
  }, [pet.image]);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="sato-card group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer" onClick={() => onSelect(pet)}>
      <div className="relative h-64 overflow-hidden bg-slate-200">
        {!hasError ? (
          <img 
            src={pet.image} 
            alt={pet.name} 
            onError={handleImageError}
            className={`w-full h-full object-cover ${pet.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2 opacity-50"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Photo Coming Soon</span>
            <span className="text-[10px] text-slate-300 mt-1">Check file path: {pet.image}</span>
          </div>
        )}
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-full shadow-sm">
            {pet.location}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="p-3 bg-teal-600 text-white rounded-2xl shadow-lg hover:bg-teal-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900 leading-none">{pet.name}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{pet.breed}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{pet.age}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {pet.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded-md border border-slate-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
