import { useState } from 'react';
import { ShieldCheck, Check, Plane, Compass, Sparkles, Send } from 'lucide-react';
import { EXPEDITIONS, BESPOKE_ADDONS, Expedition } from '../data/travelData';

interface BespokeCalculatorProps {
  initialExpeditionId?: string;
  onOpenReservation: (summary: CalculatedTrip) => void;
}

export interface CalculatedTrip {
  expedition: Expedition;
  guestsCount: number;
  suiteTier: { name: string; pricePerNightExtra: number };
  transportOption: { name: string; price: number };
  selectedAddOns: string[];
  baseTotal: number;
  suiteSupplementTotal: number;
  transportTotal: number;
  addOnsTotal: number;
  grandTotal: number;
}

export default function BespokeCalculator({ initialExpeditionId, onOpenReservation }: BespokeCalculatorProps) {
  const [selectedExpId, setSelectedExpId] = useState<string>(
    initialExpeditionId || EXPEDITIONS[0].id
  );
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [suiteTierIndex, setSuiteTierIndex] = useState<number>(0);
  const [transportIndex, setTransportIndex] = useState<number>(0);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([
    'tea-master-blending',
    'hot-air-balloon'
  ]);

  const suiteTiers = [
    { name: "Imperial Master Suite", pricePerNightExtra: 0, desc: "Included in baseline expedition rate" },
    { name: "Presidential Royal Pavilion", pricePerNightExtra: 450, desc: "Dedicated plunge pool & private terrace wing" },
    { name: "Full Estate Buyout Privilege", pricePerNightExtra: 1200, desc: "Exclusive closure of entire heritage bungalow" }
  ];

  const transportOptions = [
    { name: "Mercedes-Benz G-Class Private Chauffeur", price: 0, desc: "Included private dedicated vehicle & senior naturalist" },
    { name: "Cessna Amphibian Seaplane Charter", price: 1450, desc: "Point-to-point water takeoff and direct lake landings" },
    { name: "Airbus H125 VIP Helicopter Transfer", price: 2100, desc: "Aerial transfers between all mountain and coastal estates" },
    { name: "Vintage 1948 Rolls-Royce Silver Wraith", price: 950, desc: "Aristocratic colonial transfers for Galle and hill stations" }
  ];

  const currentExpedition = EXPEDITIONS.find((e) => e.id === selectedExpId) || EXPEDITIONS[0];

  // Pricing calculations
  const baseCost = currentExpedition.basePrice * guestsCount;
  const suiteSupplement = suiteTiers[suiteTierIndex].pricePerNightExtra * currentExpedition.daysCount;
  const transportCost = transportOptions[transportIndex].price;

  let addOnsCost = 0;
  selectedAddOnIds.forEach((id) => {
    const item = BESPOKE_ADDONS.find((a) => a.id === id);
    if (item) {
      if (item.unit.includes('per guest')) {
        addOnsCost += item.price * guestsCount;
      } else {
        addOnsCost += item.price;
      }
    }
  });

  const grandTotal = baseCost + suiteSupplement + transportCost + addOnsCost;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
    const tripSummary: CalculatedTrip = {
      expedition: currentExpedition,
      guestsCount,
      suiteTier: suiteTiers[suiteTierIndex],
      transportOption: transportOptions[transportIndex],
      selectedAddOns: selectedAddOnIds,
      baseTotal: baseCost,
      suiteSupplementTotal: suiteSupplement,
      transportTotal: transportCost,
      addOnsTotal: addOnsCost,
      grandTotal
    };
    onOpenReservation(tripSummary);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
      
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.18em] font-semibold text-[#c59b27] mb-2">
          Bespoke Concierge & Expedition Architect
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#0b1b3d] tracking-tight">
          Tailor Your Sovereign Itinerary
        </h2>
        <p className="mt-2 text-sm text-[#45464e] max-w-2xl">
          Customize every parameter of your private Sri Lankan odyssey. Transparent tiered rates with zero hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Configuration Form (8 columns) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Select Expedition */}
          <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              01. Choose Sovereign Expedition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPEDITIONS.map((exp) => {
                const isSelected = exp.id === selectedExpId;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`cursor-pointer text-left p-3.5 rounded-[4px] border transition-all ${
                      isSelected
                        ? 'border-[#c59b27] bg-[#f8f3ee] ring-1 ring-[#c59b27]'
                        : 'border-[#e5dece] hover:border-[#c59b27]/40 bg-white'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-[#c59b27] uppercase tracking-wider">
                      {exp.duration}
                    </div>
                    <div className="font-serif text-sm font-semibold text-[#0b1b3d] mt-1 leading-snug">
                      {exp.title}
                    </div>
                    <div className="text-xs text-[#75777f] mt-1">
                      From ${exp.basePrice.toLocaleString()} / guest
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Traveling Party */}
          <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d]">
                02. Traveling Party & Guests
              </label>
              <span className="text-xs text-[#75777f]">
                {guestsCount} {guestsCount === 1 ? 'Explorer' : 'Guests'} Selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 6, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestsCount(num)}
                  className={`cursor-pointer px-4 py-2 text-xs font-semibold rounded-[4px] border transition-all ${
                    guestsCount === num
                      ? 'bg-[#0b1b3d] text-white border-[#0b1b3d]'
                      : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                  }`}
                >
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Suite Accommodation Tier */}
          <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              03. Private Accommodation Tier
            </label>
            <div className="space-y-2.5">
              {suiteTiers.map((tier, idx) => {
                const isSelected = suiteTierIndex === idx;
                return (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setSuiteTierIndex(idx)}
                    className={`w-full cursor-pointer text-left p-3.5 rounded-[4px] border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#c59b27] bg-[#f8f3ee] ring-1 ring-[#c59b27]'
                        : 'border-[#e5dece] hover:border-[#c59b27]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-sm font-semibold text-[#0b1b3d]">
                        {tier.name}
                      </div>
                      <div className="text-xs text-[#75777f] mt-0.5">
                        {tier.desc}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-[#0b1b3d] tabular-nums">
                        {tier.pricePerNightExtra === 0 ? 'Included' : `+$${tier.pricePerNightExtra}/night`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Transport & Aviation */}
          <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              04. Private Aviation & Fleet
            </label>
            <div className="space-y-2.5">
              {transportOptions.map((opt, idx) => {
                const isSelected = transportIndex === idx;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setTransportIndex(idx)}
                    className={`w-full cursor-pointer text-left p-3.5 rounded-[4px] border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-[#c59b27] bg-[#f8f3ee] ring-1 ring-[#c59b27]'
                        : 'border-[#e5dece] hover:border-[#c59b27]/40 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Plane className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#c59b27]' : 'text-[#75777f]'}`} />
                      <div>
                        <div className="font-serif text-sm font-semibold text-[#0b1b3d]">
                          {opt.name}
                        </div>
                        <div className="text-xs text-[#75777f] mt-0.5">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-[#0b1b3d] tabular-nums">
                        {opt.price === 0 ? 'Included' : `+$${opt.price.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Curated Excursions */}
          <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              05. Bespoke Curated Excursions & Privileges
            </label>
            <div className="space-y-2.5">
              {BESPOKE_ADDONS.map((addon) => {
                const isChecked = selectedAddOnIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3.5 rounded-[4px] border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'border-[#c59b27] bg-[#f8f3ee]'
                        : 'border-[#e5dece] hover:border-[#c59b27]/40 bg-white'
                    }`}
                  >
                    {/* Precision square checkbox with regal tick as per design system */}
                    <div
                      className={`w-4 h-4 rounded-[2px] mt-0.5 flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-[#0b1b3d] border-[#0b1b3d]'
                          : 'border-[#75777f] bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 text-[#eed58a]" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-serif text-sm font-semibold text-[#0b1b3d]">
                          {addon.name}
                        </span>
                        <span className="text-xs font-semibold text-[#c59b27] tabular-nums whitespace-nowrap">
                          +${addon.price.toLocaleString()} ({addon.unit})
                        </span>
                      </div>
                      <p className="text-xs text-[#45464e] mt-0.5 leading-relaxed">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Transparent Tiered Pricing Breakdown (5 columns - Sticky) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          
          <div className="bg-white rounded-[6px] border border-[#c59b27]/40 p-6 sm:p-7 shadow-[0_20px_45px_-10px_rgba(11,27,61,0.12)]">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dece]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#c59b27] block">
                  EXPEDITION DOSSIER ESTIMATE
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0b1b3d]">
                  Transparent Pricing
                </h3>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#0f5a47]" />
            </div>

            {/* Selected Journey Preview */}
            <div className="py-4 border-b border-[#e5dece] flex items-center gap-3">
              <img
                src={currentExpedition.image}
                alt={currentExpedition.title}
                referrerPolicy="no-referrer"
                className="w-16 h-12 rounded-[3px] object-cover"
              />
              <div>
                <div className="text-xs font-serif font-bold text-[#0b1b3d]">
                  {currentExpedition.title}
                </div>
                <div className="text-[11px] text-[#75777f]">
                  {currentExpedition.duration} · {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                </div>
              </div>
            </div>

            {/* Itemized Breakdown cleanly separated by 0.5px stone dividers */}
            <div className="py-4 space-y-3 text-xs text-[#1d1b19]">
              
              <div className="flex justify-between items-center">
                <span className="text-[#45464e]">
                  Baseline Expedition ({guestsCount} × ${currentExpedition.basePrice.toLocaleString()})
                </span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">
                  ${baseCost.toLocaleString()}
                </span>
              </div>

              <div className="pt-2 border-t border-[#f2ede8] flex justify-between items-center">
                <span className="text-[#45464e]">
                  Suite Supplement ({suiteTiers[suiteTierIndex].name})
                </span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">
                  {suiteSupplement === 0 ? '$0' : `+$${suiteSupplement.toLocaleString()}`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#f2ede8] flex justify-between items-center">
                <span className="text-[#45464e]">
                  Private Aviation / Transport
                </span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">
                  {transportCost === 0 ? '$0' : `+$${transportCost.toLocaleString()}`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#f2ede8] flex justify-between items-center">
                <span className="text-[#45464e]">
                  Curated Excursions ({selectedAddOnIds.length} experiences)
                </span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">
                  {addOnsCost === 0 ? '$0' : `+$${addOnsCost.toLocaleString()}`}
                </span>
              </div>

              <div className="pt-2 border-t border-[#f2ede8] flex justify-between items-center">
                <span className="text-[#0f5a47] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#0f5a47]" />
                  Bio-Corridor & Wildlife Stewardship
                </span>
                <span className="text-[#0f5a47] font-semibold">
                  Complimentary
                </span>
              </div>

            </div>

            {/* Total Section with Regal Gold emphasis */}
            <div className="pt-4 border-t-2 border-[#c59b27]/50 mt-2">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0b1b3d]">
                  Total All-Inclusive Estimate
                </span>
                <div className="text-right">
                  <span className="font-serif text-3xl font-extrabold text-[#c59b27] tabular-nums block">
                    ${grandTotal.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#75777f]">
                    Inclusive of luxury taxes & private chauffeur gratuity
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleProceed}
              className="mt-6 w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-3.5 px-4 rounded-[4px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4 text-[#c59b27]" />
              <span>Request Formal Reservation Dossier</span>
            </button>

            <div className="mt-4 text-center">
              <span className="text-[11px] text-[#75777f] italic">
                * A Senior Serendib Concierge will contact you within 4 hours.
              </span>
            </div>

          </div>

          {/* Concierge Guarantee Card */}
          <div className="bg-[#f8f3ee] rounded-[6px] border border-[#e5dece] p-5 text-xs text-[#45464e] space-y-2">
            <div className="font-serif font-bold text-sm text-[#0b1b3d] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c59b27]" />
              The Serendib Sovereign Guarantee
            </div>
            <p>
              Complete date-change flexibility up to 30 days prior. Complimentary 24/7 dedicated private butler coordination and fast-track immigration escort at Colombo airport.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
