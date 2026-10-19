import { useState } from 'react';
import { DESTINATION_DISTRICTS, MainDestinationDistrict } from '../data/travelData';
import { MapPin, Sun, Building, Compass, Sparkles, Navigation, ArrowRight } from 'lucide-react';

interface ExploreDestinationsMapProps {
  onPlanTrip: (district: MainDestinationDistrict) => void;
  onOpenDetailModal?: (district: MainDestinationDistrict) => void;
}

export default function ExploreDestinationsMap({ onPlanTrip, onOpenDetailModal }: ExploreDestinationsMapProps) {
  const [selectedId, setSelectedId] = useState<string>(DESTINATION_DISTRICTS[2].id); // Sigiriya default

  const currentDistrict = DESTINATION_DISTRICTS.find(d => d.id === selectedId) || DESTINATION_DISTRICTS[0];

  const mapWidth = 360;
  const mapHeight = 520;
  const toSvgX = (percentX: number) => (percentX / 100) * mapWidth;
  const toSvgY = (percentY: number) => (percentY / 100) * mapHeight;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Header following Jetwing Travels editorial depth */}
      <div className="mb-10 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c59b27] mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
          The Island Explorer · Sri Lanka Regional Atlas
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
          Destinations & Regional Sub-Wonders
        </h2>
        <p className="mt-3 text-sm text-[#45464e] max-w-2xl leading-relaxed">
          Select any royal district or coastal province on the map to reveal secret sanctuaries, UNESCO archaeological monoliths, and sub-popular hidden attractions curated by our local naturalists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Map & District Selector (5 columns) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)] flex flex-col items-center">
          
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-[#e5dece]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#c59b27]" />
              Interactive District Map
            </span>
            <span className="text-[11px] text-[#75777f]">
              Click a destination pin
            </span>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[320px] aspect-[360/520]">
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full filter drop-shadow-[0_4px_16px_rgba(11,27,61,0.08)]"
            >
              <defs>
                <linearGradient id="islandBase" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f8f3ee" />
                  <stop offset="100%" stopColor="#ece7e2" />
                </linearGradient>
              </defs>

              {/* Sri Lanka Silhouette */}
              <path
                d="M 140,25 
                   C 160,20 180,40 190,65 
                   C 210,85 240,110 260,150 
                   C 275,180 280,220 270,260 
                   C 285,290 295,330 290,365 
                   C 280,400 250,440 215,465 
                   C 185,485 150,490 120,470 
                   C 95,450 85,420 90,390 
                   C 80,360 85,320 90,285 
                   C 85,250 85,210 95,175 
                   C 105,140 120,110 125,75 
                   C 130,50 135,30 140,25 Z"
                fill="url(#islandBase)"
                stroke="#c59b27"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* Northern Jaffna segment */}
              <path
                d="M 125,75 C 120,50 130,20 145,15 C 160,18 165,35 155,50 Z"
                fill="#f2ede8"
                stroke="#c59b27"
                strokeWidth="1"
                strokeOpacity="0.5"
              />

              {/* All Destination District Pins */}
              {DESTINATION_DISTRICTS.map((district) => {
                const isSelected = district.id === selectedId;
                const x = toSvgX(district.x);
                const y = toSvgY(district.y);

                return (
                  <g
                    key={district.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedId(district.id)}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="none"
                        stroke="#c59b27"
                        strokeWidth="1.5"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Pin halo */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? "8" : "6"}
                      fill={isSelected ? "#c59b27" : "#0b1b3d"}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-200 group-hover:scale-125"
                    />

                    {/* Pin center */}
                    <circle
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="#ffffff"
                    />

                    {/* District name label */}
                    <text
                      x={x + 10}
                      y={y + 4}
                      fontSize="9"
                      fontFamily="'Plus Jakarta Sans', sans-serif"
                      fontWeight={isSelected ? "bold" : "600"}
                      fill={isSelected ? "#c59b27" : "#0b1b3d"}
                      className="pointer-events-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
                    >
                      {district.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick Selection List */}
          <div className="w-full mt-6 space-y-1.5">
            {DESTINATION_DISTRICTS.map((d) => {
              const active = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-[4px] border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    active
                      ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-sm'
                      : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${active ? 'text-[#c59b27]' : 'text-[#75777f]'}`} />
                    <span>{d.name}</span>
                  </div>
                  <span className={`text-[10px] font-normal ${active ? 'text-white/70' : 'text-[#75777f]'}`}>
                    {d.subDestinations.length} Attractions
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right: Selected District Deep Dive & Sub-Popular Destinations (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-[6px] border border-[#e5dece] overflow-hidden shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)]">
            
            {/* Visual Banner */}
            <div className="relative aspect-[16/8] w-full bg-[#0b1b3d] overflow-hidden">
              <img
                src={currentDistrict.image}
                alt={currentDistrict.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-black/35 to-transparent" />
              
              <div className="absolute bottom-5 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#eed58a] block">
                    {currentDistrict.province}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {currentDistrict.name}
                  </h3>
                  <p className="text-xs text-[#f4efea]/80 italic mt-0.5">
                    {currentDistrict.sinhalaName}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b1b3d]/80 backdrop-blur-md rounded-[4px] border border-white/20 text-xs">
                  <Sun className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>{currentDistrict.bestSeason}</span>
                </div>
              </div>
            </div>

            {/* District Overview & Tagline */}
            <div className="p-6 border-b border-[#e5dece]">
              <div className="text-xs font-semibold text-[#c59b27] uppercase tracking-wider mb-1">
                District Chronicle & Atmosphere
              </div>
              <p className="font-serif text-base text-[#0b1b3d] italic mb-3">
                "{currentDistrict.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed">
                {currentDistrict.overview}
              </p>
            </div>

            {/* Sub-Popular Destinations & Hidden Gems Grid (As requested by user!) */}
            <div className="p-6 bg-[#f8f3ee]/50">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#0b1b3d] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                  Sub-Popular Destinations & Traveling Highlights in {currentDistrict.name.split(' ')[0]}
                </h4>
                <span className="text-[11px] text-[#75777f]">
                  {currentDistrict.subDestinations.length} Curated Sites
                </span>
              </div>

              <div className="space-y-3">
                {currentDistrict.subDestinations.map((sub, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-[4px] border border-[#e5dece] hover:border-[#c59b27]/60 transition-colors shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                        <h5 className="font-serif text-sm font-bold text-[#0b1b3d]">
                          {sub.name}
                        </h5>
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="px-2 py-0.5 rounded-[3px] bg-[#f8f3ee] text-[#0f5a47] font-semibold border border-[#e5dece]">
                          {sub.category}
                        </span>
                        <span className="text-[#75777f]">
                          {sub.distanceFromHub}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#45464e] leading-relaxed mt-1">
                      {sub.description}
                    </p>

                    <div className="mt-2 pt-2 border-t border-[#f2ede8] text-[11px] text-[#0b1b3d] flex items-center gap-1.5">
                      <span className="font-semibold text-[#c59b27]">Must-See:</span>
                      <span className="text-[#45464e]">{sub.mustSee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Luxury Partner Stays (Jetwing, etc.) */}
            <div className="p-6 border-t border-[#e5dece] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#75777f] block mb-1 flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#c59b27]" />
                  Recommended Partner Stays & Heritage Resorts
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDistrict.recommendedHotels.map((hotel, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#f8f3ee] text-[#0b1b3d] px-2.5 py-1 rounded-[3px] border border-[#e5dece] font-medium"
                    >
                      {hotel}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onPlanTrip(currentDistrict)}
                className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-5 py-2.5 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Curate Tour to {currentDistrict.name.split(' ')[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
