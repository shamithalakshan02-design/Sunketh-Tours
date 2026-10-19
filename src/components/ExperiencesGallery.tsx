import { EXPERIENCES_LIST, ExperienceItem } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';
import { Sparkles, Clock, MapPin, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface ExperiencesGalleryProps {
  onBookExperience: (exp: ExperienceItem) => void;
  onPlanCustomTrip: () => void;
}

export default function ExperiencesGallery({ onBookExperience, onPlanCustomTrip }: ExperiencesGalleryProps) {
  const { formatPrice } = useLocalization();

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#e5dece]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            Signature Sri Lankan Experiences
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
            Curated Activities & Cultural Encounters
          </h2>
          <p className="mt-2 text-sm text-[#45464e] max-w-2xl leading-relaxed">
            From reserved observation carriages on scenic mountain railways to private dawn leopard tracking, each experience is coordinated with certified local specialists.
          </p>
        </div>

        <button
          onClick={onPlanCustomTrip}
          className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] text-white px-5 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <span>Design Tailor-Made Itinerary</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
        </button>
      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EXPERIENCES_LIST.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-[6px] border border-[#e5dece] overflow-hidden shadow-[0_12px_30px_-6px_rgba(11,27,61,0.08)] hover:shadow-[0_20px_45px_-8px_rgba(11,27,61,0.14)] hover:border-[#c59b27]/60 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1b3d]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />

                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0b1b3d]/90 text-[#eed58a] backdrop-blur-md border border-[#c59b27]/40 shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/95 text-[#0b1b3d] shadow-sm">
                    <Clock className="w-3 h-3 text-[#c59b27]" />
                    {item.duration}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-[#0f5a47] font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0b1b3d] group-hover:text-[#c59b27] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#45464e] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-[#f2ede8] text-xs">
                  {item.isIncludedInTours ? (
                    <span className="text-[#0f5a47] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                      Included in multi-day tour packages
                    </span>
                  ) : (
                    <span className="text-[#c59b27] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                      Premium add-on / private excursion
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with rate and action */}
            <div className="px-6 py-4 bg-[#f8f3ee] border-t border-[#e5dece] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                  EXPERIENCE RATE
                </span>
                <span className="font-serif text-xl font-bold text-[#0b1b3d] tabular-nums">
                  {formatPrice(item.priceUSD)}
                </span>
                <span className="text-[10px] text-[#75777f]"> / person</span>
              </div>

              <button
                onClick={() => onBookExperience(item)}
                className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm"
              >
                <span>Inquire</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
