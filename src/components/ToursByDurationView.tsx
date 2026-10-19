import { useState } from 'react';
import { Clock, Milestone, ArrowRight, CheckCircle, Bed, Utensils, MapPin, Sparkles, Compass } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';
import SriLankaMap from './SriLankaMap';

interface ToursByDurationViewProps {
  onSelectTour: (tour: TourPackage) => void;
  onBookTour: (tour: TourPackage) => void;
}

export default function ToursByDurationView({ onSelectTour, onBookTour }: ToursByDurationViewProps) {
  const { formatPrice } = useLocalization();
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  // Available duration tabs 3 to 15 days
  const durations = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  // Find tour closest to or matching selected duration
  const currentTour = TOUR_PACKAGES.find(t => t.daysCount === selectedDuration) ||
    TOUR_PACKAGES.find(t => Math.abs(t.daysCount - selectedDuration) <= 1) ||
    TOUR_PACKAGES[0];

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27] mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
          Section 6 · Complete Duration Directory (03 – 15 Days)
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
          Sri Lanka Tours by Duration
        </h2>
        <p className="mt-2 text-sm text-[#45464e] max-w-2xl leading-relaxed">
          Select any duration from 3 to 15 days to inspect the complete road-routed itinerary, overnight stays, exact driving times between destinations, and total journey kilometers.
        </p>
      </div>

      {/* 3 to 15 Days Duration Ribbon */}
      <div className="mb-10 p-2 bg-[#f8f3ee] rounded-[6px] border border-[#e5dece] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {durations.map((d) => {
          const isActive = selectedDuration === d;
          return (
            <button
              key={d}
              onClick={() => {
                setSelectedDuration(d);
                setActiveStopIndex(0);
              }}
              className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-[4px] border transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-md ring-1 ring-[#c59b27]'
                  : 'bg-white text-[#45464e] border-[#e5dece] hover:border-[#c59b27]'
              }`}
            >
              <span>{d < 10 ? `0${d}` : d} Days Tour</span>
              {isActive && <Sparkles className="w-3 h-3 text-[#eed58a]" />}
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Day-by-day itinerary & specs (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Card Header */}
          <div className="bg-white rounded-[6px] border border-[#e5dece] p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#c59b27]">
                {currentTour.category} · {currentTour.daysCount} Days / {currentTour.daysCount - 1} Nights
              </span>
              <span className="text-xs font-semibold text-[#0f5a47] flex items-center gap-1">
                <Milestone className="w-3.5 h-3.5" />
                {currentTour.totalKm} km Road Route
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0b1b3d] leading-snug">
              {currentTour.title}
            </h3>

            <p className="mt-1 text-xs text-[#75777f] italic">
              {currentTour.subtitle}
            </p>

            <div className="mt-4 pt-4 border-t border-[#f2ede8] text-xs text-[#45464e] leading-relaxed">
              <strong>Route Sequence:</strong> {currentTour.routeDescription}
            </div>
          </div>

          {/* Day by Day Chronicle with driving times and stops */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#0b1b3d]">
              Day-by-Day Timeline & Travel Durations
            </h4>

            {currentTour.itinerary.map((day, idx) => {
              const isSelectedStop = activeStopIndex === idx;

              return (
                <div
                  key={day.day}
                  onClick={() => setActiveStopIndex(idx)}
                  className={`p-5 rounded-[6px] border transition-all cursor-pointer ${
                    isSelectedStop
                      ? 'bg-white border-[#c59b27] ring-1 ring-[#c59b27] shadow-md'
                      : 'bg-[#f8f3ee] border-[#e5dece] hover:border-[#c59b27]/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#c59b27] uppercase">
                        Day 0{day.day}
                      </span>
                      <span className="text-xs text-[#75777f]">·</span>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-[#0b1b3d]">
                        {day.title}
                      </h5>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#75777f]">
                      <span className="font-bold text-[#0b1b3d]">
                        {day.distanceKm} km
                      </span>
                      <span>·</span>
                      <span className="text-[#0f5a47] font-semibold">
                        Est. Drive: {day.drivingTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed mb-3">
                    {day.description}
                  </p>

                  <div className="pt-2 border-t border-[#e5dece]/60 flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-[#0b1b3d]">
                      <Bed className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span className="text-[#75777f]">Stay:</span>
                      <span className="font-medium">{day.stay}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0b1b3d]">
                      <Utensils className="w-3.5 h-3.5 text-[#0f5a47]" />
                      <span className="text-[#75777f]">Meals:</span>
                      <span className="font-medium">{day.dining}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Interactive Sri Lanka Route Map & Booking Card (5 columns - Sticky) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          
          {/* Map Display */}
          <div className="bg-white rounded-[6px] border border-[#c59b27]/40 p-4 shadow-md">
            <SriLankaMap
              waypoints={currentTour.routeWaypoints}
              totalKm={currentTour.totalKm}
              tourTitle={`${currentTour.daysCount}-Day Tour Road Route`}
              activeStopIndex={activeStopIndex}
              onSelectStop={(idx) => setActiveStopIndex(idx)}
            />
          </div>

          {/* Pricing & Booking Action */}
          <div className="bg-[#f8f3ee] rounded-[6px] border border-[#e5dece] p-6 shadow-sm space-y-4">
            
            <div className="flex items-baseline justify-between border-b border-[#e5dece] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                  ALL-INCLUSIVE REAL PRICE
                </span>
                <span className="font-serif text-3xl font-extrabold text-[#c59b27] tabular-nums">
                  {formatPrice(currentTour.basePriceUSD)}
                </span>
                <span className="text-xs text-[#75777f]"> / person</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-red-500 line-through tabular-nums block">
                  {formatPrice(currentTour.marketComparePriceUSD)}
                </span>
                <span className="text-[11px] font-semibold text-[#0f5a47]">
                  Best Price Direct
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#45464e]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>Private dedicated air-conditioned vehicle & licensed chauffeur</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>All vehicle fuel, highway expressway tolls, and parking included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>4-Star & Heritage hotel accommodation with daily breakfast</span>
              </div>
            </div>

            <button
              onClick={() => onBookTour(currentTour)}
              className="w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-3.5 px-6 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book This {currentTour.daysCount}-Day Tour</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27]" />
            </button>

            <button
              onClick={() => onSelectTour(currentTour)}
              className="w-full cursor-pointer bg-white text-[#0b1b3d] hover:text-[#c59b27] border border-[#c59b27]/40 py-2.5 px-4 rounded-[4px] text-xs font-semibold transition-colors"
            >
              View Full PDF-Style Itinerary
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
