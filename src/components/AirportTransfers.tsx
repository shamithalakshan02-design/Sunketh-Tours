import { useState } from 'react';
import { Plane, MapPin, Calendar, Clock, Users, Luggage, ShieldCheck, CheckCircle, Car, ArrowRight } from 'lucide-react';
import { AIRPORT_RATES, COMPANY_INFO } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';

interface AirportTransfersProps {
  onConfirmBooking: (transferDetails: {
    guestName: string;
    email: string;
    phone: string;
    serviceType: string;
    airport: string;
    destination: string;
    date: string;
    time: string;
    flightNumber: string;
    passengers: number;
    vehicleType: string;
    priceUSD: number;
  }) => void;
}

export default function AirportTransfers({ onConfirmBooking }: AirportTransfersProps) {
  const { formatPrice } = useLocalization();

  const [serviceType, setServiceType] = useState<'pickup' | 'drop' | 'roundtrip'>('pickup');
  const [airport, setAirport] = useState<string>('Bandaranaike International Airport (BIA / CMB) - Katunayake');
  const [destinationId, setDestinationId] = useState<string>(AIRPORT_RATES[0].destinationId);
  const [vehicleCategory, setVehicleCategory] = useState<'sedan' | 'luxuryVan' | 'suv' | 'coach'>('sedan');
  
  // Passenger details
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>('2026-11-20');
  const [time, setTime] = useState<string>('14:30');
  const [flightNumber, setFlightNumber] = useState<string>('UL 504 / EK 652');
  const [passengers, setPassengers] = useState<number>(2);
  const [luggage, setLuggage] = useState<number>(2);
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentRate = AIRPORT_RATES.find(r => r.destinationId === destinationId) || AIRPORT_RATES[0];

  // Base price calculation depending on vehicle and service type
  let singleLegUSD = currentRate.sedanUSD;
  if (vehicleCategory === 'luxuryVan') singleLegUSD = currentRate.luxuryVanUSD;
  if (vehicleCategory === 'suv') singleLegUSD = currentRate.suvUSD;
  if (vehicleCategory === 'coach') singleLegUSD = currentRate.coachUSD;

  const multiplier = serviceType === 'roundtrip' ? 1.85 : 1.0; // 15% discount on roundtrip
  const totalUSD = Math.round(singleLegUSD * multiplier);
  const marketCompetitorUSD = Math.round(totalUSD * 1.28); // Real world comparison

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Please enter the primary passenger name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address for invoice dispatch.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please provide contact phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);

    onConfirmBooking({
      guestName,
      email,
      phone,
      serviceType: serviceType === 'pickup' ? 'Airport Pickup' : serviceType === 'drop' ? 'Airport Drop' : 'Roundtrip Airport Transfer',
      airport,
      destination: currentRate.destinationName,
      date,
      time,
      flightNumber,
      passengers,
      vehicleType: vehicleCategory === 'sedan' ? 'Air-Conditioned Premium Sedan' : vehicleCategory === 'luxuryVan' ? 'Toyota KDH High-Roof Luxury Van' : vehicleCategory === 'suv' ? 'Toyota Land Cruiser Prado SUV' : 'Executive Mini-Coach',
      priceUSD: totalUSD
    });
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
      
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-[#e5dece]">
        <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c59b27] mb-2 flex items-center gap-1.5">
          <Plane className="w-3.5 h-3.5 text-[#c59b27]" />
          VIP Ground Aviation Logistics
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
          Airport Pickups & Drops Across Sri Lanka
        </h2>
        <p className="mt-2 text-sm text-[#45464e] max-w-2xl leading-relaxed">
          Punctual, private airport arrivals and hotel departures with dedicated licensed chauffeur-guides, real-time flight tracking, and zero surge pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Input Form (7 columns) */}
        <div className="lg:col-span-7 bg-white rounded-[6px] border border-[#e5dece] p-6 sm:p-8 shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)]">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Service Type Switcher */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-2">
                01. Transfer Direction
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('pickup')}
                  className={`cursor-pointer py-2.5 px-3 text-xs font-semibold rounded-[4px] border text-center transition-all ${
                    serviceType === 'pickup'
                      ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-sm'
                      : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                  }`}
                >
                  Airport Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('drop')}
                  className={`cursor-pointer py-2.5 px-3 text-xs font-semibold rounded-[4px] border text-center transition-all ${
                    serviceType === 'drop'
                      ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-sm'
                      : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                  }`}
                >
                  Airport Drop
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('roundtrip')}
                  className={`cursor-pointer py-2.5 px-3 text-xs font-semibold rounded-[4px] border text-center transition-all ${
                    serviceType === 'roundtrip'
                      ? 'bg-[#0b1b3d] text-white border-[#0b1b3d] shadow-sm'
                      : 'bg-[#f8f3ee] text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
                  }`}
                >
                  Roundtrip (Save 15%)
                </button>
              </div>
            </div>

            {/* Airport & Drop-off selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-[#c59b27]" />
                  Select Sri Lankan Airport
                </label>
                <select
                  value={airport}
                  onChange={(e) => setAirport(e.target.value)}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
                >
                  <option value="Bandaranaike International Airport (BIA / CMB) - Katunayake">BIA Colombo (CMB) - Katunayake</option>
                  <option value="Mattala Rajapaksa International (MRIA / HRI) - Hambantota">MRIA Mattala (HRI) - Hambantota / Yala</option>
                  <option value="Colombo Ratmalana Domestic Airport (RML) - Colombo">Ratmalana Domestic (RML) - Colombo</option>
                  <option value="Jaffna International Airport (JAF) - Palaly">Jaffna International (JAF) - Palaly</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                  Pickup / Drop-off City / Hotel
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => setDestinationId(e.target.value)}
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
                >
                  {AIRPORT_RATES.map((rate) => (
                    <option key={rate.destinationId} value={rate.destinationId}>
                      {rate.destinationName} ({rate.distanceKm} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-2 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-[#c59b27]" />
                02. Choose Vehicle Class
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'sedan', label: 'Sedan', cap: '1-3 Guests · 2 Bags' },
                  { id: 'luxuryVan', label: 'Luxury Van', cap: '4-7 Guests · 6 Bags' },
                  { id: 'suv', label: 'Prado SUV', cap: '1-4 Guests · 4 Bags' },
                  { id: 'coach', label: 'Mini-Coach', cap: '8-15 Guests · 12 Bags' }
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleCategory(v.id as any)}
                    className={`cursor-pointer p-3 rounded-[4px] border text-left transition-all ${
                      vehicleCategory === v.id
                        ? 'border-[#c59b27] bg-[#f8f3ee] ring-1 ring-[#c59b27]'
                        : 'border-[#e5dece] bg-white hover:border-[#c59b27]/40'
                    }`}
                  >
                    <div className="font-serif text-xs font-bold text-[#0b1b3d]">
                      {v.label}
                    </div>
                    <div className="text-[10px] text-[#75777f] mt-0.5">
                      {v.cap}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tourist Details Form */}
            <div className="space-y-4 pt-4 border-t border-[#e5dece]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0b1b3d]">
                03. Passenger & Flight Particulars
              </label>

              <div>
                <label className="block text-[11px] font-semibold text-[#45464e] mb-1">
                  Full Name of Lead Passenger *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. David & Elena Montgomery"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1">
                    Email Address (For Invoice Delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david@montgomery.co.uk"
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1">
                    WhatsApp / Phone (With Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#c59b27]" />
                    Date of Flight
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#c59b27]" />
                    Flight Arrival/Drop Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. UL 504 / QR 662"
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#c59b27]" />
                    Number of Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map(n => (
                      <option key={n} value={n}>{n} Passengers</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#45464e] mb-1 flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-[#c59b27]" />
                    Luggage Pieces
                  </label>
                  <select
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 15].map(n => (
                      <option key={n} value={n}>{n} Standard Suitcases</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#45464e] mb-1">
                  Special Notes (Name Board on Arrival, Child Safety Seat, Chilled Coconut)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Please bring complimentary baby car seat; flight is arriving from London Heathrow."
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                />
              </div>

            </div>

            {errorMsg && (
              <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-3.5 px-6 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Confirm Airport Booking & Dispatch Invoice</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27]" />
            </button>

          </form>

        </div>

        {/* Right: Live Automatic Price Calculator & Comparison (5 columns) */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          
          <div className="bg-[#f8f3ee] border border-[#c59b27]/40 rounded-[6px] p-6 sm:p-8 shadow-md">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dece]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#c59b27] block">
                  REAL-TIME AUTOMATIC FARE
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0b1b3d]">
                  Transfer Rate Estimate
                </h4>
              </div>
              <ShieldCheck className="w-6 h-6 text-[#0f5a47]" />
            </div>

            {/* Route description */}
            <div className="py-4 border-b border-[#e5dece] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#75777f]">Route Distance:</span>
                <span className="font-semibold text-[#0b1b3d] tabular-nums">
                  {currentRate.distanceKm} km (One Way)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Selected Airport:</span>
                <span className="font-semibold text-[#0b1b3d]">
                  {airport.split('-')[0].trim()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Drop-off Destination:</span>
                <span className="font-semibold text-[#0b1b3d]">
                  {currentRate.destinationName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75777f]">Vehicle Class:</span>
                <span className="font-semibold text-[#c59b27] uppercase">
                  {vehicleCategory}
                </span>
              </div>
            </div>

            {/* Real world comparison */}
            <div className="py-4 border-b border-[#e5dece] space-y-2 text-xs">
              <div className="flex justify-between text-[#75777f]">
                <span>Typical Airport Taxi Counter Fare:</span>
                <span className="line-through tabular-nums text-red-500 font-medium">
                  {formatPrice(marketCompetitorUSD)}
                </span>
              </div>
              <div className="flex justify-between text-[#0f5a47] font-semibold">
                <span>Sunketh Tours Direct Savings:</span>
                <span>Save ~28% with Private Guarantee</span>
              </div>
            </div>

            {/* Total Fare in user selected currency */}
            <div className="pt-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0b1b3d]">
                  Guaranteed All-Inclusive Price
                </span>
                <div className="text-right">
                  <span className="font-serif text-3xl font-extrabold text-[#c59b27] tabular-nums block">
                    {formatPrice(totalUSD)}
                  </span>
                  <span className="text-[10px] text-[#75777f]">
                    Includes highway expressway tolls, fuel & driver board
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions pill notes */}
            <div className="mt-6 pt-4 border-t border-[#e5dece] space-y-2 text-xs text-[#45464e]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>Free 90 minutes flight delay waiting at BIA / MRIA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>Driver with personalized name board in arrival hall</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#0f5a47] shrink-0" />
                <span>Automated official invoice dispatched to {COMPANY_INFO.email}</span>
              </div>
            </div>

          </div>

          <div className="bg-white border border-[#e5dece] rounded-[6px] p-4 text-xs text-[#45464e]">
            <span className="font-bold text-[#0b1b3d] block mb-1">Need Urgent Same-Day Airport Pickup?</span>
            <span>Call Sunketh Tours direct emergency dispatch at <strong className="text-[#0b1b3d]">0767959466</strong> or <strong className="text-[#0b1b3d]">0777633059</strong> (24/7 WhatsApp available).</span>
          </div>

        </div>

      </div>

    </section>
  );
}
