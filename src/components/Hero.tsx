import { useState } from 'react';
import { Compass, Sparkles, ShieldCheck, ArrowRight, Volume2, VolumeX, Search, Calendar, Users, MapPin, Clock, Hotel, DollarSign } from 'lucide-react';
import { COMPANY_INFO, DESTINATION_DISTRICTS } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';

interface HeroProps {
  onExploreDestinations: () => void;
  onExploreTours: () => void;
  onCustomizeJourney: () => void;
  onQuickSearch: (params: {
    destination: string;
    duration: string;
    travelers: number;
    accommodation: string;
    budget: string;
  }) => void;
}

export default function Hero({
  onExploreDestinations,
  onExploreTours,
  onCustomizeJourney,
  onQuickSearch
}: HeroProps) {
  const { t } = useLocalization();
  const [isMuted, setIsMuted] = useState(true);

  // Quick Trip-Search panel states
  const [selectedDest, setSelectedDest] = useState('All Sri Lanka Highlights');
  const [duration, setDuration] = useState('7'); // 7 days default
  const [travelers, setTravelers] = useState(2);
  const [accommodation, setAccommodation] = useState('4-Star Premium Resorts');
  const [budget, setBudget] = useState('Standard ($1,000 - $2,000)');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch({
      destination: selectedDest,
      duration,
      travelers,
      accommodation,
      budget
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0b1b3d]">
      
      {/* Hero Visual Container */}
      <div className="relative min-h-[660px] lg:min-h-[760px] flex items-center justify-center">
        
        {/* Background Video displaying the beauty of Sri Lanka (Auto-play, loop, muted) */}
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.74] contrast-[1.08]"
          poster="/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-misty-mountains-and-a-valley-in-sri-lanka-41484-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* High-quality fallback photograph in case video is loading */}
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url('/src/assets/images/hero_ceylon_tea_trails_1792429745601.jpg')` }}
        />

        {/* Measured dark gradient scrim for 4.5:1 WCAG AA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b3d] via-[#0b1b3d]/55 to-[#00020a]/65" />
        <div className="absolute inset-0 bg-radial from-transparent to-[#00020a]/70" />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-28 text-center flex flex-col items-center">
          
          {/* Slogan Pill Banner */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#0b1b3d]/90 backdrop-blur-md border border-[#c59b27]/60 text-[#eed58a] text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>{COMPANY_INFO.name} · {COMPANY_INFO.slogan}</span>
          </div>

          {/* Main Headline as specified in prompt */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.12] max-w-5xl [text-wrap:balance]">
            {t('headline')}
          </h1>

          {/* Supporting Text as specified in prompt */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#f4efea]/90 font-light max-w-3xl leading-relaxed">
            {t('hero_support')}
          </p>

          {/* Three Elegant CTAs as requested */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreDestinations}
              className="cursor-pointer bg-[#c59b27] hover:bg-[#dfb135] text-[#0b1b3d] px-7 py-3.5 rounded-[4px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>{t('explore_sl')}</span>
              <ArrowRight className="w-4 h-4 text-[#0b1b3d]" />
            </button>

            <button
              onClick={onExploreTours}
              className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-[#eed58a]/50 text-white px-7 py-3.5 rounded-[4px] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-150 flex items-center gap-2"
            >
              <span>{t('discover_tours')}</span>
            </button>

            <button
              onClick={onCustomizeJourney}
              className="cursor-pointer bg-[#0f5a47]/85 hover:bg-[#0f5a47] backdrop-blur-md border border-[#acf1d7]/40 text-white px-7 py-3.5 rounded-[4px] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-150 flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-[#eed58a]" />
              <span>{t('customize_journey')}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 pt-5 border-t border-white/20 w-full max-w-3xl flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#f4efea]/80">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
              SLTDA-Certified Private Tour Operator
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0f5a47]" />
              Dedicated 24/7 Concierge Hotline: 0767959466
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>Zero Hidden Expressway Tolls or Fuel Extras</span>
          </div>

        </div>

        {/* Ambient video sound toggle */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-[#0b1b3d]/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-xs shadow-md">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="cursor-pointer hover:text-[#c59b27] transition-colors flex items-center gap-1.5"
            title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="text-[10px] text-white/80">Cinematic Video</span>
          </button>
        </div>

      </div>

      {/* Premium Trip-Search Panel below headline as explicitly requested in Section 3 */}
      <div className="w-full max-w-6xl mx-auto -mt-16 relative z-20 px-4 sm:px-6 mb-8">
        <div className="bg-[#ffffff] rounded-[6px] border border-[#c59b27]/40 p-5 sm:p-7 shadow-[0_24px_50px_rgba(11,27,61,0.18)]">
          
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5dece] pb-3">
            <div className="text-xs uppercase tracking-[0.16em] font-bold text-[#c59b27] flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-[#c59b27]" />
              Find Your Ideal Sri Lankan Journey
            </div>
            <div className="text-[11px] text-[#75777f]">
              Guaranteed Best Local Operator Rates · Private Chauffeurs
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 items-end">
            
            {/* Destination */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#c59b27]" />
                Destination
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-2.5 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                <option value="All Sri Lanka Highlights">All Sri Lanka</option>
                {DESTINATION_DISTRICTS.map(d => (
                  <option key={d.id} value={d.name}>{d.name.split(' ')[0]}</option>
                ))}
              </select>
            </div>

            {/* Tour Duration */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#c59b27]" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-2.5 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                <option value="3">03 Days (Express)</option>
                <option value="4">04 Days (Coast)</option>
                <option value="5">05 Days (Highlands)</option>
                <option value="6">06 Days (Heritage)</option>
                <option value="7">07 Days (Classic)</option>
                <option value="8">08 Days (Tea & Whales)</option>
                <option value="10">10 Days (Panorama)</option>
                <option value="12">12 Days (East Coast)</option>
                <option value="14">14 Days (Comprehensive)</option>
                <option value="15">15 Days (Grand Island)</option>
              </select>
            </div>

            {/* Number of Travellers */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1">
                <Users className="w-3 h-3 text-[#c59b27]" />
                Travellers
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-2.5 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                <option value={1}>1 Solo Explorer</option>
                <option value={2}>2 Couple / Pair</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Family / Group</option>
                <option value={6}>6+ Small Group</option>
              </select>
            </div>

            {/* Accommodation Category */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1">
                <Hotel className="w-3 h-3 text-[#c59b27]" />
                Hotel Tier
              </label>
              <select
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-2.5 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                <option value="3-Star Standard Comfort">3-Star Standard</option>
                <option value="4-Star Premium Resorts">4-Star Premium</option>
                <option value="5-Star Luxury & Heritage">5-Star Luxury</option>
                <option value="Boutique Villas & Glamping">Boutique Villas</option>
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#c59b27]" />
                Budget Expectation
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-2.5 py-2 text-xs font-medium text-[#1d1b19] focus:outline-none focus:border-[#c59b27] cursor-pointer"
              >
                <option value="Value ($500 - $1,000)">Value ($500 - $1k)</option>
                <option value="Standard ($1,000 - $2,000)">Standard ($1k - $2k)</option>
                <option value="Luxury ($2,000+)">Luxury ($2k+)</option>
              </select>
            </div>

            {/* Action Search Button */}
            <div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-2 px-3 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm h-[34px]"
              >
                <Search className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Search Tours</span>
              </button>
            </div>

          </form>

        </div>
      </div>

    </section>
  );
}
