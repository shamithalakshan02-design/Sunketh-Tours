import { useState } from 'react';
import { Calendar, Users, Compass, ArrowRight } from 'lucide-react';

interface QuickBookDrawerProps {
  onSearch: (params: { season: string; guests: number; tier: string }) => void;
  onOpenConcierge: () => void;
}

export default function QuickBookDrawer({ onSearch, onOpenConcierge }: QuickBookDrawerProps) {
  const [season, setSeason] = useState('December – April (Peak High Season)');
  const [guests, setGuests] = useState(2);
  const [tier, setTier] = useState('Imperial Sovereign Tier');

  const handleTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ season, guests, tier });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-16 sm:-mt-20 relative z-20 px-4 sm:px-6">
      <div className="bg-[#ffffff]/95 backdrop-blur-md border border-[#c59b27]/30 rounded-[6px] p-4 sm:p-6 shadow-[0_20px_50px_rgba(11,27,61,0.12)]">
        
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5dece] pb-3">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#c59b27]">
            Private Expedition Concierge
          </div>
          <div className="text-xs text-[#45464e]">
            Direct Chauffeur & Air Transfer Coordination
          </div>
        </div>

        <form onSubmit={handleTrigger} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Season / Dates */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-[#0b1b3d] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
              Travel Season
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all cursor-pointer"
            >
              <option value="December – April (Peak High Season)">Dec – Apr (Dry Southern & Highlands)</option>
              <option value="May – September (East Coast & Wild Seas)">May – Sep (Pristine East Coast & Yala)</option>
              <option value="October – November (Inter-Monsoon Solitude)">Oct – Nov (Serene Private Solitude)</option>
              <option value="Bespoke Flexible Date (Inquire Concierge)">Custom Specific Dates</option>
            </select>
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-[#0b1b3d] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#c59b27]" />
              Traveling Party
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all cursor-pointer"
            >
              <option value={1}>1 Solo Explorer (Private Master Suite)</option>
              <option value={2}>2 Guests (Royal Couple Suite)</option>
              <option value={4}>4 Guests (Private Estate Wing)</option>
              <option value={6}>6 Guests (Exclusive Villa Buyout)</option>
              <option value={8}>8+ Guests (Full Private Charter)</option>
            </select>
          </div>

          {/* Tier */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider uppercase text-[#0b1b3d] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
              Curated Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all cursor-pointer"
            >
              <option value="Imperial Sovereign Tier">Imperial Sovereign (Air Transfers + Butler)</option>
              <option value="Royal Heritage Tier">Royal Heritage (Private Chauffeur + Villas)</option>
              <option value="Private Sanctuary Tier">Private Sanctuary (Secluded Wildlife Tents)</option>
            </select>
          </div>

          {/* Action button */}
          <div>
            <button
              type="button"
              onClick={onOpenConcierge}
              className="w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-2.5 px-4 rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Itineraries</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
            </button>
          </div>

        </form>

        <div className="mt-4 pt-3 border-t border-[#e5dece]/70 flex flex-wrap items-center justify-between gap-y-2 text-[11px] text-[#45464e]">
          <span>Includes private VIP airport fast-track at Bandaranaike International</span>
          <span className="text-[#0f5a47] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f5a47]" />
            Chauffeur-Naturalist Guaranteed
          </span>
        </div>

      </div>
    </div>
  );
}
