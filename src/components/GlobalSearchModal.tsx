import { useState, useMemo } from 'react';
import { Search, X, MapPin, Compass, ArrowRight, Milestone } from 'lucide-react';
import { TOUR_PACKAGES, DESTINATION_DISTRICTS, EXPERIENCES_LIST, TourPackage, MainDestinationDistrict, ExperienceItem } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTour: (tour: TourPackage) => void;
  onSelectDestination: (dest: MainDestinationDistrict) => void;
  onSelectExperience: (exp: ExperienceItem) => void;
}

export default function GlobalSearchModal({
  isOpen,
  onClose,
  onSelectTour,
  onSelectDestination,
  onSelectExperience
}: GlobalSearchModalProps) {
  const { formatPrice } = useLocalization();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return {
        tours: TOUR_PACKAGES.slice(0, 3),
        destinations: DESTINATION_DISTRICTS.slice(0, 3),
        experiences: EXPERIENCES_LIST.slice(0, 2)
      };
    }

    const term = searchTerm.toLowerCase();

    return {
      tours: TOUR_PACKAGES.filter(
        t => t.title.toLowerCase().includes(term) ||
             t.routeDescription.toLowerCase().includes(term) ||
             t.category.toLowerCase().includes(term)
      ),
      destinations: DESTINATION_DISTRICTS.filter(
        d => d.name.toLowerCase().includes(term) ||
             d.overview.toLowerCase().includes(term) ||
             d.subDestinations.some(s => s.name.toLowerCase().includes(term))
      ),
      experiences: EXPERIENCES_LIST.filter(
        e => e.title.toLowerCase().includes(term) ||
             e.location.toLowerCase().includes(term)
      )
    };
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-[#f8f3ee] border-b border-[#e5dece] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c59b27] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tours, Sigiriya, Kandy, airport transfers, whale watching..."
            className="w-full bg-transparent text-sm text-[#1d1b19] placeholder-[#75777f] focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="cursor-pointer text-xs text-[#75777f] hover:text-[#0b1b3d]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-full hover:bg-[#e5dece] text-[#0b1b3d]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-6 text-xs">
          
          {/* Tours Section */}
          {filteredResults.tours.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27] block mb-2">
                Tour Packages ({filteredResults.tours.length})
              </span>
              <div className="space-y-2">
                {filteredResults.tours.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTour(t);
                      onClose();
                    }}
                    className="p-3 bg-[#f8f3ee] hover:bg-[#f2ede8] rounded-[4px] border border-[#e5dece] cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="font-serif text-sm font-bold text-[#0b1b3d]">
                        {t.title}
                      </div>
                      <div className="text-[11px] text-[#75777f] flex items-center gap-2 mt-0.5">
                        <span>{t.daysCount} Days</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[#0f5a47]">
                          <Milestone className="w-3 h-3" />
                          {t.totalKm} km
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-serif text-sm font-bold text-[#c59b27] tabular-nums block">
                        {formatPrice(t.basePriceUSD)}
                      </span>
                      <span className="text-[10px] text-[#75777f]">per person</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destinations Section */}
          {filteredResults.destinations.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f5a47] block mb-2">
                Destinations & Districts ({filteredResults.destinations.length})
              </span>
              <div className="space-y-2">
                {filteredResults.destinations.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDestination(d);
                      onClose();
                    }}
                    className="p-3 bg-[#f8f3ee] hover:bg-[#f2ede8] rounded-[4px] border border-[#e5dece] cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#c59b27] shrink-0" />
                      <div>
                        <div className="font-serif text-sm font-bold text-[#0b1b3d]">
                          {d.name}
                        </div>
                        <div className="text-[11px] text-[#75777f]">
                          {d.province} · {d.subDestinations.length} Attractions
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#75777f]" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experiences Section */}
          {filteredResults.experiences.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0b1b3d] block mb-2">
                Curated Experiences ({filteredResults.experiences.length})
              </span>
              <div className="space-y-2">
                {filteredResults.experiences.map(e => (
                  <div
                    key={e.id}
                    onClick={() => {
                      onSelectExperience(e);
                      onClose();
                    }}
                    className="p-3 bg-[#f8f3ee] hover:bg-[#f2ede8] rounded-[4px] border border-[#e5dece] cursor-pointer flex items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <div className="font-serif text-sm font-bold text-[#0b1b3d]">
                        {e.title}
                      </div>
                      <div className="text-[11px] text-[#75777f]">
                        {e.location} · {e.duration}
                      </div>
                    </div>
                    <span className="font-serif text-xs font-bold text-[#c59b27] tabular-nums">
                      {formatPrice(e.priceUSD)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredResults.tours.length === 0 &&
           filteredResults.destinations.length === 0 &&
           filteredResults.experiences.length === 0 && (
            <div className="text-center py-8 text-[#75777f]">
              No exact matches found for "{searchTerm}". Try searching "Sigiriya", "Kandy", "7 Days", or "Yala".
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
