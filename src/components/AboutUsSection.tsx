import { useState } from 'react';
import { COMPANY_INFO, CUSTOMER_TESTIMONIALS, FAQ_LIST } from '../data/travelData';
import { ShieldCheck, Award, HeartHandshake, Phone, Mail, MapPin, ChevronDown, ChevronUp, Star, Users, CheckCircle } from 'lucide-react';

export default function AboutUsSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 space-y-20">
      
      {/* 1. Company Origin & Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f3ee] text-[#c59b27] text-xs font-bold uppercase tracking-[0.2em] border border-[#e5dece]">
            <Award className="w-3.5 h-3.5 text-[#c59b27]" />
            Official SLTDA Certified Inbound Tour Operator
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0b1b3d] tracking-tight leading-tight">
            About Sunketh Tours
          </h2>

          <p className="font-serif italic text-base text-[#c59b27]">
            "{COMPANY_INFO.slogan}"
          </p>

          <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed">
            Founded with a passion for authentic Sri Lankan hospitality, Sunketh Tours delivers world-class private journeys combining deep cultural heritage, untamed biodiversity, and flawless ground logistics. 
          </p>

          <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed">
            Whether navigating misty mountain passes on the scenic railway, tracking leopards through Yala’s thorny scrub, or relaxing along colonial Dutch fort bastions, every traveler receives dedicated one-on-one attention from licensed national guides.
          </p>

          {/* Credentials */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e5dece]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                SLTDA REGISTRATION
              </span>
              <span className="text-xs font-bold text-[#0b1b3d]">
                SLTDA/SQA/PRO/01894
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                SAFETY RECORD
              </span>
              <span className="text-xs font-bold text-[#0f5a47]">
                100% Comprehensive Cover
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#75777f] block">
                COMPANY HEADQUARTERS
              </span>
              <span className="text-xs font-bold text-[#0b1b3d]">
                Colombo & Kandy, SL
              </span>
            </div>
          </div>
        </div>

        {/* Visual Card */}
        <div className="lg:col-span-5 relative rounded-[6px] overflow-hidden border border-[#c59b27]/40 shadow-xl">
          <img
            src="/src/assets/images/galle_fort_colonial_villa_1792429747882.jpg"
            alt="Sunketh Tours heritage colonial hospitality"
            referrerPolicy="no-referrer"
            className="w-full h-80 object-cover"
          />
          <div className="bg-[#0b1b3d] text-white p-6 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#eed58a] block">
              The Sunketh Guarantee
            </span>
            <h4 className="font-serif text-lg font-bold text-white">
              Private Vehicles · Real Road Times · Zero Gimmicks
            </h4>
            <p className="text-xs text-[#f4efea]/80 leading-relaxed">
              We never pool strangers in tour buses. Every itinerary is privately operated for you and your travel companions.
            </p>
          </div>
        </div>

      </section>

      {/* 2. Customer Reviews & Trust */}
      <section className="bg-[#f8f3ee] -mx-4 sm:-mx-8 lg:-mx-16 px-4 sm:px-8 lg:px-16 py-16 border-y border-[#e5dece]">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="max-w-2xl mb-10">
            <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27] mb-2 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#c59b27] text-[#c59b27]" />
              Verified Guest Experiences
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#0b1b3d]">
              What Our Explorers Say
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#45464e]">
              Over 14,800 international guests safely guided across all 9 provinces with a 99.8% satisfaction score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#c59b27]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c59b27]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#75777f]">{t.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#45464e] leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f2ede8] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-serif font-bold text-[#0b1b3d] block">
                      {t.author}
                    </span>
                    <span className="text-[11px] text-[#75777f]">
                      {t.flag} {t.country}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#0f5a47] bg-[#f8f3ee] px-2 py-0.5 rounded border border-[#e5dece]">
                    Verified Booking
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27]">
            Clear Answers for Travelers
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-[#0b1b3d]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-[#45464e]">
            Essential planning guidelines for international tourists arriving in Sri Lanka.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-[6px] border border-[#e5dece] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full cursor-pointer text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-bold text-[#0b1b3d] hover:text-[#c59b27] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#c59b27] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#75777f] shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#45464e] leading-relaxed border-t border-[#f2ede8]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contact Desk Details */}
      <section className="bg-[#0b1b3d] text-white rounded-[6px] p-8 sm:p-12 border border-[#c59b27]/40 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#eed58a] font-bold block">
              Direct Senior Concierge Reach
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Connect With Our Colombo & Kandy Teams
            </h4>
            <p className="text-xs sm:text-sm text-[#f4efea]/80 leading-relaxed">
              Have questions about your upcoming flight, child safety seats, or customized routes? We are on call 24 hours a day.
            </p>
          </div>

          <div className="space-y-3 bg-white/5 backdrop-blur-md p-6 rounded-[6px] border border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#c59b27]" />
              <span>Email: <strong className="text-white">{COMPANY_INFO.email}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#c59b27]" />
              <span>Phone / WhatsApp: <strong className="text-white">{COMPANY_INFO.phones[0]} / {COMPANY_INFO.phones[1]}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#c59b27]" />
              <span>{COMPANY_INFO.address}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
