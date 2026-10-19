import { Compass, Mail, Phone, MapPin, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { NavScreen } from './Header';

interface FooterProps {
  onNavigate: (screen: NavScreen) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#0b1b3d] text-white border-t-2 border-[#c59b27] pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[4px] bg-[#c59b27] text-[#0b1b3d] font-serif font-black flex items-center justify-center text-sm shadow-md">
                ST
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase text-white block">
                {COMPANY_INFO.name}
              </span>
            </div>

            <p className="font-serif italic text-xs text-[#eed58a] tracking-wide">
              "{COMPANY_INFO.slogan}"
            </p>

            <p className="text-xs text-[#f4efea]/75 leading-relaxed">
              Sri Lanka's trusted inbound tour operator specializing in private chauffeur-guided 03 to 15 day holiday packages, 24/7 airport drops & pickups, and authentic cultural expeditions.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#acf1d7]">
              <HeartHandshake className="w-4 h-4 text-[#0f5a47]" />
              <span>SLTDA Certified · 100% Carbon-Neutral Travel</span>
            </div>
          </div>

          {/* Quick Tour Categories */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#c59b27]">
              Popular Tours (03-15 Days)
            </div>
            <ul className="space-y-2 text-xs text-[#f4efea]/80">
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  03-Day Golden Cultural Express (385 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  04-Day Southern Galle & Whales (340 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  05-Day Highland Tea & Pekoe Trail (530 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  07-Day Classic Heritage & Yala Safari (880 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  10-Day Grand Ceylon Panorama (1,280 km)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  15-Day Ultimate Sovereign Expedition (2,120 km)
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations & Airport Logistics */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#c59b27]">
              Destinations & Airport
            </div>
            <ul className="space-y-2 text-xs text-[#f4efea]/80">
              <li>
                <button
                  onClick={() => onNavigate('airport')}
                  className="hover:text-white transition-colors cursor-pointer text-left text-[#eed58a] font-semibold"
                >
                  ⚡ Airport Drops & Pickups (BIA / MRIA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive Sri Lanka District Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('duration')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Tours by Duration (03 - 15 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Signature Sri Lankan Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Plan Custom Tailor-Made Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Sunketh Tours & Chauffeur Fleet
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (as explicitly specified in prompt) */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#c59b27]">
              Official Company Contacts
            </div>
            
            <div className="space-y-2.5 text-xs text-[#f4efea]/85">
              
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#eed58a] uppercase font-bold">Company Email</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold hover:text-white underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-[#eed58a] uppercase font-bold">24/7 Telephone Hotlines & WhatsApp</span>
                  <div className="font-semibold space-y-0.5">
                    <div>{COMPANY_INFO.phones[0]}</div>
                    <div>{COMPANY_INFO.phones[1]}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span className="text-[11px] text-[#f4efea]/75">
                  {COMPANY_INFO.address}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="cursor-pointer w-full bg-[#c59b27] hover:bg-[#dfb135] text-[#0b1b3d] py-2 px-3 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0b1b3d]" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Quiet Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f4efea]/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0f5a47]" />
            <span>Sri Lanka Tourism Development Authority Certified Tour Operator · {COMPANY_INFO.license}</span>
          </div>
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
