import { useState } from 'react';
import { Compass, Clock, Milestone, ArrowRight, Sparkles, MapPin, Users, Check } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';
import SriLankaMap from './SriLankaMap';

interface ExpeditionsGridProps {
  onSelectTour: (tour: TourPackage) => void;
  onBookTour: (tour: TourPackage) => void;
}

export default function ExpeditionsGrid({ onSelectTour, onBookTour }: ExpeditionsGridProps) {
  const { formatPrice, t } = useLocalization();

  const [activeDuration, setActiveDuration] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTravelerType, setActiveTravelerType] = useState<string>('all');
  const [expandedMapTourId, setExpandedMapTourId] = useState<string | null>(null);

  // Filter logic
  const filteredTours = TOUR_PACKAGES.filter((tour) => {
    // Days filter
    if (activeDuration !== 'all') {
      const days = parseInt(activeDuration);
      if (tour.daysCount !== days) return false;
    }

    // Category filter
    if (activeCategory !== 'all') {
      if (tour.category.toLowerCase() !== activeCategory.toLowerCase()) return false;
    }

    // Traveler profile filter
    if (activeTravelerType !== 'all') {
      if (!tour.travelerType.toLowerCase().includes(activeTravelerType.toLowerCase()) && tour.travelerType !== 'All Travelers') {
        return false;
      }
    }

    return true;
  });

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#e5dece]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c59b27] mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
            Multi-Day Private Itineraries (03 – 15 Days)
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
            Curated Ceylon Journeys & Route Maps
          </h2>
          <p className="mt-2 text-sm text-[#45464e] max-w-2xl leading-relaxed">
            Every tour includes private dedicated air-conditioned transport, English-speaking tourist chauffeur, fuel, highway tolls, hotel stays, and detailed route map kilometers.
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs text-[#75777f] block font-mono">
            Showing {filteredTours.length} of {TOUR_PACKAGES.length} Tours
          </span>
          <span className="text-xs font-semibold text-[#0f5a47] flex items-center gap-1 justify-end mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#0f5a47]" />
            Guaranteed Real-World Competitive Rates
          </span>
        </div>
      </div>

      {/* Modern Filter Bars */}
      <div className="bg-[#f8f3ee] p-4 sm:p-5 rounded-[6px] border border-[#e5dece] mb-10 space-y-4">
        
        {/* Filter 1: Tour Duration (03 to 15 Days as explicitly requested) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] shrink-0 w-32">
            Tour Duration:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Durations' },
              { id: '3', label: '03-Day' },
              { id: '4', label: '04-Day' },
              { id: '5', label: '05-Day' },
              { id: '7', label: '07-Day' },
              { id: '10', label: '10-Day' },
              { id: '12', label: '12-Day' },
              { id: '15', label: '15-Day Grand' }
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDuration(d.id)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-[4px] border transition-all ${
                  activeDuration === d.id
                    ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-sm'
                    : 'bg-white text-[#45464e] border-[#e5dece] hover:border-[#c59b27]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter 2: Modern Sri Lanka Travel Categories & Trends */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 border-t border-[#e5dece]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] shrink-0 w-32">
            Tourism Trends:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Trends' },
              { id: 'heritage', label: 'Cultural Heritage' },
              { id: 'highlands', label: 'Tea Highlands & Pekoe' },
              { id: 'coastal', label: 'Coastal & Whales' },
              { id: 'grand island', label: 'All-Island Odyssey' },
              { id: 'ramayana', label: 'Ramayana Trail' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-[4px] border transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#c59b27] text-[#0b1b3d] border-[#c59b27] font-bold shadow-sm'
                    : 'bg-white text-[#45464e] border-[#e5dece] hover:border-[#c59b27]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter 3: Tourist Profile / Traveler Type */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 border-t border-[#e5dece]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] shrink-0 w-32 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#c59b27]" />
            Traveler Profile:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Traveler Types' },
              { id: 'solo', label: 'Solo Explorer' },
              { id: 'couples', label: 'Couples & Honeymoon' },
              { id: 'family', label: 'Family with Children' },
              { id: 'adventure', label: 'Adventure Enthusiasts' }
            ].map((tType) => (
              <button
                key={tType.id}
                onClick={() => setActiveTravelerType(tType.id)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-semibold rounded-[4px] border transition-all ${
                  activeTravelerType === tType.id
                    ? 'bg-[#0f5a47] text-white border-[#0f5a47] shadow-sm'
                    : 'bg-white text-[#45464e] border-[#e5dece] hover:border-[#c59b27]'
                }`}
              >
                {tType.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Tour Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredTours.map((tour) => {
          const isMapExpanded = expandedMapTourId === tour.id;

          return (
            <article
              key={tour.id}
              className="group bg-white rounded-[6px] border border-[#e5dece] overflow-hidden shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(11,27,61,0.14)] hover:border-[#c59b27]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                
                {/* Visual Header Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1b3d]">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />

                  {/* Overlaid Duration Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0b1b3d]/90 text-[#eed58a] backdrop-blur-md border border-[#c59b27]/40 shadow-sm">
                      {tour.daysCount} Days
                    </span>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0f5a47]/90 text-white backdrop-blur-md border border-[#13755c]">
                      {tour.category}
                    </span>
                  </div>

                  {/* Overlaid Kilometers Metric */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0b1b3d] shadow-md">
                      <Milestone className="w-3.5 h-3.5 text-[#c59b27]" />
                      {tour.totalKm} km Route
                    </span>
                  </div>

                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Route ribbon at bottom of photo */}
                  <div className="absolute bottom-3 left-4 right-4 text-white text-xs truncate font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#eed58a] shrink-0" />
                    <span className="truncate">{tour.routeDescription}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  
                  <div className="flex items-center justify-between text-xs text-[#75777f] mb-1 font-medium">
                    <span className="text-[#0f5a47] font-semibold">{tour.travelerType}</span>
                    <span className="text-[#c59b27] font-semibold">Private Chauffeur Tour</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0b1b3d] group-hover:text-[#c59b27] transition-colors leading-snug">
                    {tour.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#75777f] italic">
                    {tour.subtitle}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 pt-3 border-t border-[#f2ede8] space-y-1.5">
                    {tour.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="text-xs text-[#1d1b19] flex items-start gap-2 leading-tight">
                        <Sparkles className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Toggle Embedded Sri Lanka Route Map */}
                  <div className="mt-5 pt-3 border-t border-[#f2ede8]">
                    <button
                      type="button"
                      onClick={() => setExpandedMapTourId(isMapExpanded ? null : tour.id)}
                      className="cursor-pointer text-xs font-semibold text-[#0b1b3d] hover:text-[#c59b27] flex items-center gap-1.5 transition-colors"
                    >
                      <Milestone className="w-4 h-4 text-[#c59b27]" />
                      <span>{isMapExpanded ? "Hide Journey Route Map" : `View Route on Sri Lanka Map (${tour.totalKm} km)`}</span>
                    </button>

                    {isMapExpanded && (
                      <div className="mt-3 animate-in fade-in duration-200">
                        <SriLankaMap
                          waypoints={tour.routeWaypoints}
                          totalKm={tour.totalKm}
                          tourTitle={tour.title}
                        />
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* Nested Pricing & Real-World Comparison Footer */}
              <div className="px-6 sm:px-7 py-4 bg-[#f8f3ee] border-t border-[#e5dece] flex items-center justify-between gap-4">
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#75777f]">
                      ALL-INCLUSIVE RATE
                    </span>
                    <span className="text-[10px] text-red-500 line-through">
                      {formatPrice(tour.marketComparePriceUSD)}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#0b1b3d] tabular-nums">
                      {formatPrice(tour.basePriceUSD)}
                    </span>
                    <span className="text-[11px] text-[#75777f]">/ person</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectTour(tour)}
                    className="cursor-pointer px-3 py-2 text-xs font-semibold text-[#0b1b3d] hover:text-[#c59b27] border border-[#c59b27]/30 rounded-[4px] hover:border-[#c59b27] transition-all bg-white"
                  >
                    Itinerary Details
                  </button>
                  <button
                    onClick={() => onBookTour(tour)}
                    className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Book Tour</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                  </button>
                </div>

              </div>

            </article>
          );
        })}
      </div>

    </section>
  );
}
