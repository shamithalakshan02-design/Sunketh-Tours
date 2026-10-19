import { X, MapPin, Sun, Building, Utensils, Compass, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { MainDestinationDistrict } from '../data/travelData';

interface DestinationDetailModalProps {
  district: MainDestinationDistrict | null;
  onClose: () => void;
  onPlanTour: (district: MainDestinationDistrict) => void;
}

export default function DestinationDetailModal({
  district,
  onClose,
  onPlanTour
}: DestinationDetailModalProps) {
  if (!district) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 cursor-pointer p-2 rounded-full bg-white/90 hover:bg-white text-[#0b1b3d] hover:text-[#c59b27] transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0b1b3d]">
          <img
            src={district.image}
            alt={district.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-[#0b1b3d]/45 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#eed58a] mb-1">
                <span>{district.province}</span>
                <span>·</span>
                <span>{district.district}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                {district.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#f4efea]/80 italic mt-0.5">
                {district.sinhalaName}
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b1b3d]/80 backdrop-blur-md rounded-[4px] border border-white/20 text-xs">
              <Sun className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{district.bestSeason}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-7 text-[#1d1b19]">
          
          {/* Quick Travel Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8f3ee] p-4 rounded-[4px] border border-[#e5dece] text-xs">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#c59b27] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                  TRAVEL TIME FROM COLOMBO
                </span>
                <span className="font-semibold text-[#0b1b3d]">
                  {district.travelTimeFromColombo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-[#0f5a47] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                  BEST CLIMATIC WINDOW
                </span>
                <span className="font-semibold text-[#0b1b3d]">
                  {district.bestSeason}
                </span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-[#c59b27] block mb-1">
              Atmosphere & Geographical Setting
            </span>
            <p className="font-serif text-base text-[#0b1b3d] italic mb-2">
              "{district.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed">
              {district.overview}
            </p>
          </div>

          {/* Sub-Popular Destinations & Hidden Gems in District */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#0b1b3d] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              Main Attractions & Lesser-Known Attractions in {district.name.split(' ')[0]}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {district.subDestinations.map((sub, i) => (
                <div
                  key={i}
                  className="bg-[#f8f3ee] p-3.5 rounded-[4px] border border-[#e5dece] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-[#0b1b3d]">
                      {sub.name}
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#e5dece] text-[#0f5a47] font-semibold">
                      {sub.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#45464e] leading-relaxed">
                    {sub.description}
                  </p>

                  <div className="pt-1.5 border-t border-[#e5dece]/60 text-[11px] text-[#75777f] flex justify-between">
                    <span>{sub.distanceFromHub}</span>
                    <span className="text-[#c59b27] font-semibold">Must-See: {sub.mustSee}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural & Wildlife Activities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-[4px] border border-[#e5dece]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b1b3d] block mb-2">
                Cultural & Heritage Experiences
              </span>
              <ul className="space-y-1.5 text-xs text-[#45464e]">
                {district.culturalExperiences.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-[4px] border border-[#e5dece]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f5a47] block mb-2">
                Wildlife & Nature Opportunities
              </span>
              <ul className="space-y-1.5 text-xs text-[#45464e]">
                {district.wildlifeActivities.map((w, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0f5a47]" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Partner Hotels (Jetwing, Cinnamon, etc.) & Dining */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#e5dece]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777f] block mb-2 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#c59b27]" />
                Recommended Partner Hotels & Resorts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {district.recommendedHotels.map((h, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#f8f3ee] text-[#0b1b3d] px-2.5 py-1 rounded-[3px] border border-[#e5dece] font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777f] block mb-2 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-[#0f5a47]" />
                Recommended Local Dining
              </span>
              <div className="flex flex-wrap gap-1.5">
                {district.recommendedDining.map((d, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#f8f3ee] text-[#45464e] px-2.5 py-1 rounded-[3px] border border-[#e5dece]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#f2ede8] border-t border-[#e5dece] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#45464e]">
            * Private chauffeur transfer available directly from Colombo airport or any city.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto cursor-pointer px-4 py-2 text-xs font-semibold text-[#45464e] border border-[#c59b27]/30 rounded-[4px] bg-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onPlanTour(district);
              }}
              className="w-1/2 sm:w-auto cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] text-white px-5 py-2 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Explore Tours to {district.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
