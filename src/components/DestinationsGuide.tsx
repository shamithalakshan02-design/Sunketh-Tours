import { useState } from 'react';
import { Sun, Mountain, Sparkles, MapPin, Compass } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/travelData';

interface DestinationsGuideProps {
  onPlanTripToDestination: (dest: Destination) => void;
}

export default function DestinationsGuide({ onPlanTripToDestination }: DestinationsGuideProps) {
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
      
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#c59b27] mb-2">
          The Serendib Atlas
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#0b1b3d] tracking-tight">
          Kingdoms & Microclimates of Ceylon
        </h2>
        <p className="mt-2 text-sm text-[#45464e] max-w-2xl">
          An island of astonishing biodiversity where misty alpine cloud forests lie merely hours away from sun-bleached coral coasts and ancient rock citadels.
        </p>
      </div>

      {/* Interactive Destination Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Selector (Tabs/List) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#75777f] mb-3">
            Select Royal Realm
          </div>

          {DESTINATIONS.map((dest) => {
            const isSelected = selectedDest.id === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(dest)}
                className={`w-full text-left p-4 rounded-[6px] border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0b1b3d] text-white border-[#c59b27] shadow-lg'
                    : 'bg-white text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono tracking-wider ${isSelected ? 'text-[#eed58a]' : 'text-[#c59b27]'}`}>
                    {dest.region}
                  </span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/60' : 'text-[#75777f]'}`}>
                    {dest.elevation}
                  </span>
                </div>

                <div className="mt-1 font-serif text-lg font-semibold">
                  {dest.name}
                </div>

                <div className={`mt-0.5 text-xs font-light italic truncate ${isSelected ? 'text-white/80' : 'text-[#75777f]'}`}>
                  {dest.nativeTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Destination Feature Showcase Card */}
        <div className="lg:col-span-8 bg-white rounded-[6px] border border-[#e5dece] overflow-hidden shadow-[0_20px_40px_-10px_rgba(11,27,61,0.1)]">
          
          {/* Main Visual */}
          <div className="relative aspect-[16/9] w-full bg-[#0b1b3d] overflow-hidden">
            <img
              src={selectedDest.image}
              alt={selectedDest.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest text-[#eed58a] font-semibold block mb-1">
                {selectedDest.region}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {selectedDest.name}
              </h3>
              <p className="text-xs text-[#f4efea]/80 mt-1 italic">
                {selectedDest.nativeTitle}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Climate & Vibe Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8f3ee] p-4 rounded-[4px] border border-[#e5dece]">
              <div className="flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-[#c59b27] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#75777f] block font-semibold">
                    Prime Season
                  </span>
                  <span className="text-xs font-semibold text-[#0b1b3d]">
                    {selectedDest.bestMonths}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mountain className="w-4 h-4 text-[#0f5a47] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#75777f] block font-semibold">
                    Terrain & Elevation
                  </span>
                  <span className="text-xs font-semibold text-[#0b1b3d]">
                    {selectedDest.elevation}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#45464e] leading-relaxed">
              {selectedDest.description}
            </p>

            {/* Sights */}
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-[#0b1b3d] mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                Key Sovereignty Sights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDest.keySights.map((sight, i) => (
                  <div key={i} className="text-xs text-[#45464e] bg-[#f8f3ee] p-2.5 rounded-[4px] border border-[#e5dece] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                    <span>{sight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sovereign Insider Tip */}
            <div className="bg-[#0b1b3d] text-white p-5 rounded-[4px] border border-[#c59b27]/40">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#eed58a] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                Concierge Insider Secret
              </div>
              <p className="text-xs sm:text-sm text-[#f4efea]/90 leading-relaxed italic">
                "{selectedDest.insiderTip}"
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onPlanTripToDestination(selectedDest)}
                className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-6 py-2.5 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Build Journey to {selectedDest.name.split('&')[0]}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
