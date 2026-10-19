import { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Bed, Utensils, ArrowRight, Milestone, Phone, Mail } from 'lucide-react';
import { TourPackage, COMPANY_INFO } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';
import SriLankaMap from './SriLankaMap';

interface ExpeditionModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBook: (tour: TourPackage) => void;
}

export default function ExpeditionModal({ tour, onClose, onBook }: ExpeditionModalProps) {
  const { formatPrice } = useLocalization();
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#fef8f3] rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden my-8">
        
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
            src={tour.image}
            alt={tour.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-[#0b1b3d]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#eed58a] mb-2">
              <span>{tour.daysCount} Days Tour</span>
              <span>·</span>
              <span>{tour.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Milestone className="w-3.5 h-3.5 text-[#c59b27]" />
                {tour.totalKm} Total Kilometers
              </span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
              {tour.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#f4efea]/90 mt-1 max-w-2xl">
              {tour.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-8 text-[#1d1b19]">
          
          {/* Quick Stats & Rate Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-[4px] border border-[#e5dece] shadow-sm">
            <div className="md:col-span-2 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#c59b27]">
                FULL ROUTE OUTLINE
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#0b1b3d]">
                {tour.routeDescription}
              </p>
              <div className="text-xs text-[#45464e]">
                Includes dedicated air-conditioned vehicle, SLTDA-licensed driver-guide, fuel, expressway tolls, and parking throughout.
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-[#e5dece] pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#75777f]">
                  ALL-INCLUSIVE REAL RATE
                </span>
                <div className="font-serif text-2xl font-bold text-[#0b1b3d] tabular-nums">
                  {formatPrice(tour.basePriceUSD)}
                </div>
                <span className="text-[11px] text-[#0f5a47] font-semibold block">
                  Best Price Guarantee vs {formatPrice(tour.marketComparePriceUSD)} Market
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBook(tour);
                }}
                className="mt-3 w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-2 px-3 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Book This Tour</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
              </button>
            </div>
          </div>

          {/* Embedded Interactive Route Map on Sri Lanka Silhouette */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#0b1b3d] mb-3 flex items-center gap-2">
              <Milestone className="w-4 h-4 text-[#c59b27]" />
              Route Map & Waypoints Across Sri Lanka ({tour.totalKm} km)
            </h3>
            <SriLankaMap
              waypoints={tour.routeWaypoints}
              totalKm={tour.totalKm}
              tourTitle={tour.title}
              activeStopIndex={activeStopIndex}
              onSelectStop={(idx) => setActiveStopIndex(idx)}
            />
          </div>

          {/* Inclusions & Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#f8f3ee] p-5 rounded-[4px] border border-[#e5dece]">
              <h4 className="font-serif text-base font-bold text-[#0b1b3d] mb-3">
                Tour Highlights
              </h4>
              <ul className="space-y-2">
                {tour.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#45464e] leading-snug">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#f8f3ee] p-5 rounded-[4px] border border-[#e5dece]">
              <h4 className="font-serif text-base font-bold text-[#0b1b3d] mb-3">
                Included in Your Package
              </h4>
              <ul className="space-y-2">
                {tour.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#45464e] leading-snug">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Day-by-Day Chronicle with Kilometers */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0b1b3d] mb-4 pb-2 border-b border-[#e5dece]">
              Day-by-Day Detailed Itinerary
            </h3>

            <div className="space-y-4">
              {tour.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="bg-white p-5 rounded-[4px] border border-[#e5dece] hover:border-[#c59b27]/60 transition-colors shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#c59b27] uppercase">
                        Day 0{day.day}
                      </span>
                      <span className="text-xs text-[#75777f]">·</span>
                      <h4 className="font-serif text-base font-bold text-[#0b1b3d]">
                        {day.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-[#75777f]">
                      <span className="flex items-center gap-1 font-semibold text-[#0b1b3d]">
                        <Milestone className="w-3.5 h-3.5 text-[#c59b27]" />
                        {day.distanceKm} km
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#0f5a47]" />
                        {day.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed mb-3">
                    {day.description}
                  </p>

                  <div className="pt-2 border-t border-[#f2ede8] flex flex-wrap gap-4 text-xs text-[#1d1b19]">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span className="text-[#75777f]">Stay:</span>
                      <span className="font-medium">{day.stay}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#0f5a47]" />
                      <span className="text-[#75777f]">Dining:</span>
                      <span className="font-medium">{day.dining}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#f2ede8] border-t border-[#e5dece] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#45464e]">
            * Dates fully flexible. Chauffeur meets you at airport or any Sri Lanka hotel.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto cursor-pointer px-4 py-2.5 text-xs font-semibold text-[#45464e] hover:text-[#0b1b3d] border border-[#c59b27]/30 rounded-[4px] transition-colors"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(tour);
              }}
              className="w-1/2 sm:w-auto cursor-pointer bg-[#c59b27] hover:bg-[#dfb135] text-[#0b1b3d] px-6 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Book This Tour ({tour.daysCount} Days)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
