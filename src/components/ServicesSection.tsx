import { ShieldCheck, Wifi, Users, Car, Coffee, HeartHandshake, PhoneCall, Compass, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function ServicesSection() {
  const services = [
    {
      icon: Users,
      title: "SLTDA-Licensed Chauffeur-Guides",
      description: "Our veteran driver-guides are certified by the Sri Lanka Tourism Development Authority, fluent in international languages, and skilled in defensive driving and wildlife tracking.",
      perk: "100% Private Dedicated Chauffeur"
    },
    {
      icon: Car,
      title: "Luxury Air-Conditioned Fleet",
      description: "Spotless modern Toyota Prado 4x4s, luxury KDH high-roof vans, and executive sedans maintained to the highest safety specifications with complete passenger insurance.",
      perk: "Toyota Prado, KDH & Sedans"
    },
    {
      icon: Wifi,
      title: "Complimentary 5G Onboard Wi-Fi & SIM",
      description: "Stay seamlessly connected with loved ones. Every booked tour receives a pre-activated high-speed tourist data SIM card and uninterrupted vehicle Wi-Fi hotspot.",
      perk: "Unlimited Connectivity"
    },
    {
      icon: Coffee,
      title: "VIP Garland Welcome & King Coconuts",
      description: "Step off your flight into authentic Sri Lankan hospitality with fragrant natural orchid or jasmine garlands, cold herbal towels, and fresh sweet king coconuts.",
      perk: "Airport Meet & Greet"
    },
    {
      icon: HeartHandshake,
      title: "Jetwing & Luxury Hotel Partner Rates",
      description: "Through our long-standing relationships with premier Sri Lankan hoteliers (Jetwing, Cinnamon, Heritance, boutique estates), our guests enjoy preferred room upgrades and dining perks.",
      perk: "Exclusive Hotel Upgrades"
    },
    {
      icon: PhoneCall,
      title: "24/7 Dedicated Concierge & Emergency Desk",
      description: "Around-the-clock telephone and WhatsApp concierge support directly supervised by Sunketh Tours management throughout your entire stay.",
      perk: "Hotline: 0767959466 / 0777633059"
    }
  ];

  return (
    <section className="bg-[#f8f3ee] py-16 border-y border-[#e5dece]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c59b27] mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
            The Sunketh Distinction
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#0b1b3d] tracking-tight">
            Comprehensive Services Included With Every Booking
          </h2>
          <p className="mt-3 text-sm text-[#45464e] leading-relaxed">
            When you reserve with {COMPANY_INFO.name}, you never experience hidden fees or unexpected extras. We handle every logistical facet of your Sri Lankan holiday with imperial precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-[6px] border border-[#e5dece] shadow-[0_12px_28px_-6px_rgba(11,27,61,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(11,27,61,0.12)] hover:border-[#c59b27]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-[4px] bg-[#f8f3ee] border border-[#e5dece] flex items-center justify-center text-[#0b1b3d] mb-5">
                    <IconComponent className="w-6 h-6 text-[#c59b27]" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0b1b3d] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f2ede8] flex items-center justify-between text-xs">
                  <span className="text-[#0f5a47] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#0f5a47]" />
                    {item.perk}
                  </span>
                  <span className="text-[#75777f] font-mono text-[10px]">
                    INCLUDED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jetwing-Inspired Guarantee Banner */}
        <div className="mt-12 bg-[#0b1b3d] text-white rounded-[6px] p-6 sm:p-8 border border-[#c59b27]/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs uppercase tracking-widest text-[#eed58a] font-bold">
              100% Carbon-Neutral Travel Commitment
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-semibold text-white">
              Responsible & Regenerative Tourism in Sri Lanka
            </h4>
            <p className="text-xs text-[#f4efea]/80 max-w-2xl">
              We pledge 5% of all expedition profits towards reforestation along the central highlands tea corridor and sea turtle conservation projects along the southern coast.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 rounded-[4px] border border-white/20 text-center">
              <span className="block text-xs font-bold text-[#eed58a]">SLTDA CERTIFIED</span>
              <span className="text-[10px] text-white/70">Govt. Licensed</span>
            </div>
            <div className="px-4 py-2 bg-[#c59b27] text-[#0b1b3d] rounded-[4px] text-center font-bold text-xs uppercase tracking-wider">
              Safe Travels Stamp
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
