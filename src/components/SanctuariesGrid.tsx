import { useState } from 'react';
import { Bed, MapPin, Sparkles, Check, ArrowRight, Shield } from 'lucide-react';
import { SANCTUARIES, Sanctuary } from '../data/travelData';

interface SanctuariesGridProps {
  onReserveSanctuary: (sanctuary: Sanctuary) => void;
}

export default function SanctuariesGrid({ onReserveSanctuary }: SanctuariesGridProps) {
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary | null>(null);

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#e5dece]">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#c59b27] mb-2">
            Private Estates & Wilderness Retreats
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#0b1b3d] tracking-tight">
            Sanctuaries of Sovereign Serenity
          </h2>
          <p className="mt-2 text-sm text-[#45464e] max-w-2xl">
            From 1888 tea master bungalows with working hearths to ocean-facing tented cocoons, every sanctuary preserves authentic heritage with uncompromised five-star privacy.
          </p>
        </div>

        <div className="text-xs text-[#75777f] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0f5a47]" />
          <span>Exclusive Buyouts & Single-Party Estate Charters Available</span>
        </div>
      </div>

      {/* Grid of Sanctuaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {SANCTUARIES.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-[6px] border border-[#e5dece] overflow-hidden shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)] hover:shadow-[0_24px_48px_-12px_rgba(11,27,61,0.14)] hover:border-[#c59b27]/60 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1b3d]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />

                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0b1b3d]/90 text-[#eed58a] backdrop-blur-md border border-[#c59b27]/40 shadow-sm">
                    {item.type}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-[#0b1b3d] backdrop-blur-md shadow-sm">
                    <Bed className="w-3.5 h-3.5 text-[#c59b27]" />
                    {item.suitesCount}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-1.5 text-xs text-[#0f5a47] font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0b1b3d] group-hover:text-[#c59b27] transition-colors leading-snug">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-[#75777f] italic">
                  {item.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-[#45464e] leading-relaxed">
                  {item.description}
                </p>

                {/* Amenities pills */}
                <div className="mt-4 pt-4 border-t border-[#f2ede8]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#75777f] mb-2">
                    Estate Amenities
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#f8f3ee] text-[#1d1b19] px-2.5 py-1 rounded-[3px] border border-[#e5dece]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sovereign Features */}
                <div className="mt-4 space-y-1.5">
                  {item.features.map((feat, i) => (
                    <div key={i} className="text-xs text-[#45464e] flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-[#c59b27] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-7 py-4 bg-[#f8f3ee] border-t border-[#e5dece] flex items-center justify-between gap-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#75777f]">
                  EXCLUSIVE SUITE RATE
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#0b1b3d] tabular-nums">
                    ${item.pricePerNight.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#75777f]">/ night</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSanctuary(item)}
                  className="cursor-pointer px-3.5 py-2 text-xs font-semibold text-[#0b1b3d] hover:text-[#c59b27] border border-[#c59b27]/30 rounded-[4px] hover:border-[#c59b27] transition-all bg-white"
                >
                  Estate Specs
                </button>
                <button
                  onClick={() => onReserveSanctuary(item)}
                  className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Inquire Suite</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Sanctuary Detail Modal */}
      {selectedSanctuary && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#c59b27]">
                  {selectedSanctuary.type}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0b1b3d]">
                  {selectedSanctuary.name}
                </h3>
                <div className="text-xs text-[#0f5a47] font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedSanctuary.location}
                </div>
              </div>
              <button
                onClick={() => setSelectedSanctuary(null)}
                className="cursor-pointer text-[#75777f] hover:text-[#0b1b3d] p-1.5"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-[4px] overflow-hidden mb-6 bg-[#0b1b3d]">
              <img
                src={selectedSanctuary.image}
                alt={selectedSanctuary.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#45464e] leading-relaxed mb-6">
              {selectedSanctuary.description}
            </p>

            <div className="space-y-3 mb-6 bg-[#f8f3ee] p-4 rounded-[4px] border border-[#e5dece]">
              <div className="text-xs font-semibold text-[#0b1b3d] uppercase tracking-wider">
                Included Sanctuary Services
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#45464e]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                  Dedicated Private Estate Butler
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                  Executive Chef & Sommelier Pairing
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                  Roundtrip Chauffeur or Helipad Transfer
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                  Daily Laundry & Garment Pressing
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#e5dece]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#75777f] block font-bold">
                  RATE PER NIGHT
                </span>
                <span className="font-serif text-2xl font-bold text-[#0b1b3d] tabular-nums">
                  ${selectedSanctuary.pricePerNight}
                </span>
              </div>
              <button
                onClick={() => {
                  const s = selectedSanctuary;
                  setSelectedSanctuary(null);
                  onReserveSanctuary(s);
                }}
                className="cursor-pointer bg-[#c59b27] hover:bg-[#dfb135] text-[#0b1b3d] px-6 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Inquire This Sanctuary
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
