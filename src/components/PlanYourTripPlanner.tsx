import { useState } from 'react';
import { Calendar, Users, MapPin, Compass, Car, Hotel, Check, Send, ShieldCheck, Sparkles, Milestone } from 'lucide-react';
import { COMPANY_INFO, DESTINATION_DISTRICTS } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';

interface PlanYourTripPlannerProps {
  onRequestCustomPlan: (customData: any) => void;
}

export default function PlanYourTripPlanner({ onRequestCustomPlan }: PlanYourTripPlannerProps) {
  const { formatPrice } = useLocalization();

  const [startDate, setStartDate] = useState('2026-12-10');
  const [daysCount, setDaysCount] = useState<number>(7);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [travelPace, setTravelPace] = useState<'Relaxed' | 'Moderate' | 'Active Explorer'>('Moderate');
  const [travelerType, setTravelerType] = useState('Couples & Honeymoon');
  const [hotelCategory, setHotelCategory] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [transportType, setTransportType] = useState<'sedan' | 'van' | 'suv'>('van');

  // Selected regions
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    'Cultural Triangle & Sigiriya',
    'Kandy Hill Capital',
    'Nuwara Eliya Tea Valleys',
    'Galle Southern Coast'
  ]);

  // Guest Contact
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleRegion = (reg: string) => {
    setSelectedRegions(prev =>
      prev.includes(reg) ? prev.filter(r => r !== reg) : [...prev, reg]
    );
  };

  // Dynamic realistic cost estimate
  const baseDailyPerPerson = hotelCategory === 'standard' ? 110 : hotelCategory === 'premium' ? 145 : 220;
  const vehicleDailyCost = transportType === 'sedan' ? 55 : transportType === 'van' ? 75 : 120;
  
  const estimatedTotalUSD = Math.round(
    (baseDailyPerPerson * (adults + children * 0.6) * daysCount) + (vehicleDailyCost * daysCount)
  );
  const estimatedKm = Math.min(daysCount * 130, 2150);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const planSummary = {
      name: name || "Valued Explorer",
      email: email || COMPANY_INFO.email,
      phone: phone || COMPANY_INFO.phones[0],
      dates: `${startDate} for ${daysCount} Days`,
      party: `${adults} Adults, ${children} Children (${travelerType})`,
      hotelTier: hotelCategory === 'standard' ? '3-Star Standard' : hotelCategory === 'premium' ? '4-Star Premium' : '5-Star Luxury & Heritage',
      vehicle: transportType === 'sedan' ? 'Private Sedan' : transportType === 'van' ? 'Luxury KDH Van' : 'Toyota Prado 4x4 SUV',
      regions: selectedRegions.join(', '),
      estimatedTotalUSD,
      specialNotes
    };

    onRequestCustomPlan(planSummary);
    setSubmitted(true);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27] mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
          Section 8 · Interactive Itinerary Architect
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
          Plan Your Custom Sri Lankan Journey
        </h2>
        <p className="mt-2 text-sm text-[#45464e] max-w-2xl leading-relaxed">
          Design an itinerary shaped around your personal passions. Choose your pace, regions, and accommodation standards, with instant live price estimates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Interactive Customization Wizard (7 columns) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-[6px] border border-[#e5dece] p-6 sm:p-8 shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)] space-y-7">
          
          {/* Step 1: Duration & Dates */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              01. Duration & Target Travel Date
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">
                  Start Date
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold text-[#45464e]">
                    Total Days
                  </span>
                  <span className="text-xs font-bold text-[#c59b27]">{daysCount} Days / {daysCount - 1} Nights</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full accent-[#c59b27] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#75777f] mt-1 font-mono">
                  <span>03 Days</span>
                  <span>07 Days</span>
                  <span>10 Days</span>
                  <span>15 Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Party & Profile */}
          <div className="pt-4 border-t border-[#e5dece]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              02. Party Composition & Travel Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">Adults</span>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                    <option key={n} value={n}>{n} Adults</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">Children</span>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                >
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} Children</option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">Traveler Type</span>
                <select
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value)}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                >
                  <option value="Solo Explorer">Solo Explorer</option>
                  <option value="Couples & Honeymoon">Couples & Honeymoon</option>
                  <option value="Family with Children">Family with Children</option>
                  <option value="Small Friends Group">Friends Group</option>
                  <option value="Luxury VIP">Luxury VIP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Destinations of Interest */}
          <div className="pt-4 border-t border-[#e5dece]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              03. Select Desired Sri Lankan Regions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Cultural Triangle & Sigiriya',
                'Kandy Hill Capital',
                'Nuwara Eliya Tea Valleys',
                'Ella & Scenic Rail',
                'Yala & Leopard Wilderness',
                'Galle Southern Coast & Whales',
                'Trincomalee East Coast',
                'Wilpattu Safari National Park'
              ].map((reg) => {
                const isSelected = selectedRegions.includes(reg);
                return (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => toggleRegion(reg)}
                    className={`cursor-pointer text-left p-2.5 rounded-[4px] border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0b1b3d] text-white border-[#0b1b3d]'
                        : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                    }`}
                  >
                    <span>{reg}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#eed58a]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Accommodation Standards & Transport */}
          <div className="pt-4 border-t border-[#e5dece] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-2 flex items-center gap-1">
                <Hotel className="w-3.5 h-3.5 text-[#c59b27]" />
                Accommodation Standard
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'standard', label: '3-Star Standard Comfort' },
                  { id: 'premium', label: '4-Star Premium & Boutique' },
                  { id: 'luxury', label: '5-Star Luxury & Heritage' }
                ].map(tier => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setHotelCategory(tier.id as any)}
                    className={`w-full cursor-pointer text-left p-2 rounded-[4px] border text-xs font-medium transition-colors ${
                      hotelCategory === tier.id
                        ? 'bg-[#f8f3ee] border-[#c59b27] ring-1 ring-[#c59b27] text-[#0b1b3d]'
                        : 'bg-white border-[#e5dece] text-[#45464e]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-2 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-[#c59b27]" />
                Vehicle Category
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'sedan', label: 'Toyota Sedan (1-3 Guests)' },
                  { id: 'van', label: 'Toyota KDH Luxury Van (4-7)' },
                  { id: 'suv', label: 'Toyota Prado 4x4 SUV' }
                ].map(v => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setTransportType(v.id as any)}
                    className={`w-full cursor-pointer text-left p-2 rounded-[4px] border text-xs font-medium transition-colors ${
                      transportType === v.id
                        ? 'bg-[#f8f3ee] border-[#c59b27] ring-1 ring-[#c59b27] text-[#0b1b3d]'
                        : 'bg-white border-[#e5dece] text-[#45464e]'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 5: Contact Info */}
          <div className="pt-4 border-t border-[#e5dece] space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d]">
              05. Your Direct Contact Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">Your Full Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">Email (For Itinerary Delivery)</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@jenkins.com"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#45464e] block mb-1">WhatsApp / Phone</span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7911 234567"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-3.5 px-6 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Send className="w-4 h-4 text-[#c59b27]" />
            <span>Request My Custom Itinerary & Quotation</span>
          </button>

        </form>

        {/* Right: Live Quotation Summary (5 columns) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          
          <div className="bg-[#f8f3ee] border border-[#c59b27]/40 rounded-[6px] p-6 sm:p-7 shadow-md">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dece]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c59b27] block">
                  REAL-TIME ESTIMATE
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0b1b3d]">
                  Bespoke Trip Quotation
                </h4>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#0f5a47]" />
            </div>

            <div className="py-4 space-y-2 text-xs border-b border-[#e5dece]">
              <div className="flex justify-between">
                <span className="text-[#75777f]">Target Duration:</span>
                <span className="font-semibold text-[#0b1b3d]">{daysCount} Days ({daysCount - 1} Nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Party:</span>
                <span className="font-semibold text-[#0b1b3d]">{adults} Adults, {children} Kids</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Road Distance:</span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">~{estimatedKm} km Road Route</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Selected Regions:</span>
                <span className="font-semibold text-[#0b1b3d] text-right">{selectedRegions.length} Regions</span>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                INDICATIVE TOTAL ALL-INCLUSIVE QUOTATION
              </span>
              <div className="font-serif text-3xl font-extrabold text-[#c59b27] tabular-nums mt-1">
                {formatPrice(estimatedTotalUSD)}
              </div>
              <span className="text-[11px] text-[#75777f] block mt-0.5">
                Includes private chauffeur, vehicle fuel, expressway tolls & hotel board.
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e5dece] text-xs text-[#45464e] space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                <span>Zero deposit required to draft your proposal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                <span>Direct dispatch to {COMPANY_INFO.email}</span>
              </div>
            </div>

          </div>

          <div className="bg-white border border-[#e5dece] rounded-[6px] p-5 text-xs text-[#45464e] space-y-1">
            <div className="font-serif font-bold text-sm text-[#0b1b3d]">
              Prefer to Speak Directly With a Curator?
            </div>
            <p>
              Our senior director is reachable right now on WhatsApp at <strong className="text-[#0b1b3d]">0767959466</strong> or <strong className="text-[#0b1b3d]">0777633059</strong>.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
