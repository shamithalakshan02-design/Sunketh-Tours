import { useState, useEffect } from 'react';
import Header, { NavScreen } from './components/Header';
import Hero from './components/Hero';
import LiveCounters from './components/LiveCounters';
import ExpeditionsGrid from './components/ExpeditionsGrid';
import ExpeditionModal from './components/ExpeditionModal';
import ExploreDestinationsMap from './components/ExploreDestinationsMap';
import DestinationDetailModal from './components/DestinationDetailModal';
import ToursByDurationView from './components/ToursByDurationView';
import ExperiencesGallery from './components/ExperiencesGallery';
import PlanYourTripPlanner from './components/PlanYourTripPlanner';
import AirportTransfers from './components/AirportTransfers';
import ServicesSection from './components/ServicesSection';
import AboutUsSection from './components/AboutUsSection';
import BespokeCalculator, { CalculatedTrip } from './components/BespokeCalculator';
import ReservationModal from './components/ReservationModal';
import InvoiceModal, { InvoiceData } from './components/InvoiceModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { LocalizationProvider } from './context/LocalizationContext';
import {
  TourPackage,
  TOUR_PACKAGES,
  MainDestinationDistrict,
  ExperienceItem,
  COMPANY_INFO
} from './data/travelData';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<NavScreen>('home');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [selectedDistrictModal, setSelectedDistrictModal] = useState<MainDestinationDistrict | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Confirmed bookings counter that automatically increments live counter
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState<number>(() => {
    const saved = localStorage.getItem('sunketh_confirmed_bookings');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Current generated invoice state
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);
  
  // General custom reservation modal
  const [isGeneralReservationOpen, setIsGeneralReservationOpen] = useState(false);
  const [calculatedTripData, setCalculatedTripData] = useState<CalculatedTrip | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Tour Inquiry / Custom Quote',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Navigate helper
  const handleNavigate = (screen: NavScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Increment counter helper
  const incrementBookings = () => {
    const newCount = confirmedBookingsCount + 1;
    setConfirmedBookingsCount(newCount);
    localStorage.setItem('sunketh_confirmed_bookings', newCount.toString());
    return newCount;
  };

  // Booking a Tour Package -> Generates official invoice & increments counter
  const handleBookTourPackage = (tour: TourPackage) => {
    incrementBookings();
    const randomCode = `ST-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const invoice: InvoiceData = {
      invoiceNumber: randomCode,
      invoiceDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      guestName: "Valued Traveler (Direct Booking)",
      email: COMPANY_INFO.email,
      phone: COMPANY_INFO.phones[0],
      itemTitle: tour.title,
      serviceType: `${tour.daysCount}-Day Private Sri Lanka Tour Package`,
      routeOrDestination: tour.routeDescription,
      totalKm: tour.totalKm,
      travelDates: "Flexible (Coordinated via Dedicated Concierge)",
      passengersCount: 2,
      baseAmountUSD: tour.basePriceUSD * 2,
      vehicleOrTier: "Air-Conditioned Private Chauffeur Vehicle with Licensed National Guide",
      specialNotes: `Confirmation copy dispatched to ${COMPANY_INFO.email}. Free meet & greet with fresh Ceylon king coconut included.`
    };

    setCurrentInvoice(invoice);
  };

  // Booking an Airport Transfer -> Generates official invoice & increments counter
  const handleConfirmAirportTransfer = (details: {
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
  }) => {
    incrementBookings();
    const randomCode = `ST-AIR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const invoice: InvoiceData = {
      invoiceNumber: randomCode,
      invoiceDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      guestName: details.guestName,
      email: details.email,
      phone: details.phone,
      itemTitle: `${details.serviceType}: ${details.airport.split('-')[0].trim()} ➔ ${details.destination}`,
      serviceType: "Private Airport Transfer",
      routeOrDestination: `${details.airport.split('-')[0].trim()} to ${details.destination} (Date: ${details.date} at ${details.time}, Flight: ${details.flightNumber})`,
      travelDates: `${details.date} at ${details.time}`,
      passengersCount: details.passengers,
      baseAmountUSD: details.priceUSD,
      vehicleOrTier: details.vehicleType,
      specialNotes: `Flight ${details.flightNumber} tracked live. Dedicated chauffeur waiting at arrivals terminal with personal name board. Copy sent to ${COMPANY_INFO.email}.`
    };

    setCurrentInvoice(invoice);
  };

  // Booking a custom planned trip
  const handleConfirmCustomPlan = (customData: any) => {
    incrementBookings();
    const randomCode = `ST-CUST-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const invoice: InvoiceData = {
      invoiceNumber: randomCode,
      invoiceDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      guestName: customData.name,
      email: customData.email,
      phone: customData.phone,
      itemTitle: `Bespoke Tailor-Made Journey (${customData.dates})`,
      serviceType: "Custom Tailor-Made Itinerary",
      routeOrDestination: customData.regions.join(' ➔ '),
      totalKm: customData.totalKm,
      travelDates: customData.dates,
      passengersCount: customData.passengers,
      baseAmountUSD: customData.estimatedTotalUSD,
      vehicleOrTier: `${customData.vehicleClass} · ${customData.hotelTier}`,
      specialNotes: `Special Requests: ${customData.specialNotes || 'None specified'}. Formal dossier forwarded to ${COMPANY_INFO.email}.`
    };

    setCurrentInvoice(invoice);
  };

  // Plan custom trip to a destination selected from the Explore Map
  const handlePlanDestinationTrip = (district: MainDestinationDistrict) => {
    setActiveScreen('plan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick search from hero
  const handleHeroQuickSearch = (params: {
    destination: string;
    duration: string;
    travelers: number;
    accommodation: string;
    budget: string;
  }) => {
    setActiveScreen('tours');
    const el = document.getElementById('tours-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit contact inquiry
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Tour Inquiry / Custom Quote',
        message: ''
      });
    }, 4000);
  };

  return (
    <LocalizationProvider>
      <div className="min-h-screen bg-[#fef8f3] text-[#1d1b19] flex flex-col selection:bg-[#fece57] selection:text-[#0b1b3d]">
        
        {/* Concierge Header with Multi-Language / Multi-Currency & Contacts */}
        <Header
          activeScreen={activeScreen}
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsGeneralReservationOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        <main className="flex-1">
          
          {/* SCREEN 1: HOME SCREEN (Hero Video + 2 Live Counters + Featured Tours with Sri Lanka Map + Destinations Map Teaser + Services) */}
          {activeScreen === 'home' && (
            <div>
              {/* Hero with Looping Video of Sri Lanka Beauty & Slogan */}
              <Hero
                onExploreDestinations={() => handleNavigate('destinations')}
                onExploreTours={() => handleNavigate('tours')}
                onCustomizeJourney={() => handleNavigate('plan')}
                onQuickSearch={handleHeroQuickSearch}
              />

              {/* Two Distinct Live Counters as Requested by User:
                  1. Total tourists arrived in Sri Lanka
                  2. Total tourists traveled through Sunketh Tours (auto-updates on booking!) */}
              <LiveCounters confirmedBookingsCount={confirmedBookingsCount} />

              {/* Featured Tour Packages with Real World Prices & Interactive Route Maps */}
              <div id="tours-catalog-section">
                <ExpeditionsGrid
                  onSelectTour={(tour) => setSelectedTour(tour)}
                  onBookTour={handleBookTourPackage}
                />
              </div>

              {/* Sri Lanka Explore Destinations Map Teaser */}
              <div className="bg-[#f2ede8]/60 py-12 border-y border-[#e5dece]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#c59b27] block mb-1">
                      Explore All Sri Lankan Districts
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0b1b3d]">
                      Interactive Sri Lanka Travel Map & Sub-Destinations
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('destinations')}
                    className="cursor-pointer bg-[#0b1b3d] text-white px-5 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider hover:bg-[#00020a] transition-all shrink-0 self-start sm:self-auto"
                  >
                    Open Full District Atlas ➔
                  </button>
                </div>
                <ExploreDestinationsMap
                  onPlanTrip={handlePlanDestinationTrip}
                  onOpenDetailModal={(dist) => setSelectedDistrictModal(dist)}
                />
              </div>

              {/* Passenger Services & Jetwing-Style Hospitality Inclusions */}
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 2: DESTINATIONS & REGIONAL ATLAS */}
          {activeScreen === 'destinations' && (
            <div>
              <ExploreDestinationsMap
                onPlanTrip={handlePlanDestinationTrip}
                onOpenDetailModal={(dist) => setSelectedDistrictModal(dist)}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 3: TOUR PACKAGES (03 - 15 Days with Sri Lankan Map Routes & Kilometers) */}
          {activeScreen === 'tours' && (
            <div>
              <div className="bg-[#0b1b3d] text-white py-12 px-4 sm:px-8 text-center">
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#eed58a] block mb-2">
                  SLTDA Approved Itineraries
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold">
                  Curated Sri Lanka Tour Packages
                </h1>
                <p className="mt-3 text-sm text-[#f4efea]/80 max-w-2xl mx-auto">
                  Every tour displays the exact geographic route on an interactive Sri Lankan map, total journey kilometers, real-world comparative rates, and licensed private chauffeurs.
                </p>
              </div>

              <ExpeditionsGrid
                onSelectTour={(tour) => setSelectedTour(tour)}
                onBookTour={handleBookTourPackage}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 4: TOURS BY DURATION (03 to 15 Days Directory) */}
          {activeScreen === 'duration' && (
            <div>
              <ToursByDurationView
                onSelectTour={(tour) => setSelectedTour(tour)}
                onBookTour={handleBookTourPackage}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 5: EXPERIENCES (Cultural Encounters & Signature Activities) */}
          {activeScreen === 'experiences' && (
            <div>
              <ExperiencesGallery
                onBookExperience={(exp) => {
                  incrementBookings();
                  const invoice: InvoiceData = {
                    invoiceNumber: `ST-EXP-${Math.floor(1000 + Math.random() * 9000)}`,
                    invoiceDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                    guestName: "Valued Traveler",
                    email: COMPANY_INFO.email,
                    phone: COMPANY_INFO.phones[0],
                    itemTitle: exp.title,
                    serviceType: "Curated Sri Lankan Signature Experience",
                    routeOrDestination: exp.location,
                    totalKm: 45,
                    travelDates: "Flexible (Coordinated with Specialist)",
                    passengersCount: 2,
                    baseAmountUSD: exp.priceUSD * 2,
                    vehicleOrTier: "Private Transfer & Expert Host",
                    specialNotes: `Confirmed via ${COMPANY_INFO.email}. Includes entrance permits and local specialist guide.`
                  };
                  setCurrentInvoice(invoice);
                }}
                onPlanCustomTrip={() => handleNavigate('plan')}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 6: PLAN YOUR TRIP (Custom Tailor-Made Builder) */}
          {activeScreen === 'plan' && (
            <div>
              <PlanYourTripPlanner
                onRequestCustomPlan={handleConfirmCustomPlan}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 7: AIRPORT TRANSFERS (Pickups & Drops with Instant Price Calculator) */}
          {activeScreen === 'airport' && (
            <div>
              <AirportTransfers
                onConfirmBooking={handleConfirmAirportTransfer}
              />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 8: ABOUT US (Company, Fleet, Credentials & FAQ) */}
          {activeScreen === 'about' && (
            <div>
              <AboutUsSection />
              <ServicesSection />
            </div>
          )}

          {/* SCREEN 9: CONTACT US */}
          {activeScreen === 'contact' && (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 space-y-12">
              
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#c59b27] block mb-2">
                  Connect with Sunketh Tours
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0b1b3d]">
                  We Are Here for Your Sri Lankan Dream
                </h1>
                <p className="mt-3 text-sm text-[#45464e]">
                  Contact our round-the-clock concierge team via telephone, WhatsApp, or email. We respond to all inquiries within 60 minutes.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Contact Information Cards (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Email */}
                  <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#f8f3ee] border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#75777f] block">
                        Official Company Email
                      </span>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-base font-bold text-[#0b1b3d] hover:text-[#c59b27] transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                      <p className="text-xs text-[#75777f] mt-1">
                        Invoices, customized quotes & itinerary dossiers
                      </p>
                    </div>
                  </div>

                  {/* Telephone / WhatsApp */}
                  <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#f8f3ee] border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#75777f] block">
                        Direct Hotlines & 24/7 WhatsApp
                      </span>
                      <div className="space-y-1 mt-0.5">
                        <div className="text-base font-bold text-[#0b1b3d]">
                          {COMPANY_INFO.phones[0]}
                        </div>
                        <div className="text-base font-bold text-[#0b1b3d]">
                          {COMPANY_INFO.phones[1]}
                        </div>
                      </div>
                      <p className="text-xs text-[#0f5a47] font-semibold mt-1">
                        ● Available 24 Hours / 7 Days a Week
                      </p>
                    </div>
                  </div>

                  {/* Office Headquarters */}
                  <div className="bg-white p-6 rounded-[6px] border border-[#e5dece] shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#f8f3ee] border border-[#c59b27]/40 flex items-center justify-center text-[#c59b27] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#75777f] block">
                        Main Operational Headquarters
                      </span>
                      <p className="text-sm font-semibold text-[#0b1b3d] mt-0.5">
                        {COMPANY_INFO.address}
                      </p>
                      <p className="text-xs text-[#75777f] mt-1">
                        Registration: {COMPANY_INFO.license}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Direct Message Form (7 cols) */}
                <div className="lg:col-span-7 bg-white p-8 rounded-[6px] border border-[#e5dece] shadow-[0_16px_36px_-8px_rgba(11,27,61,0.08)]">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0b1b3d] mb-1">
                    Send Us an Immediate Inquiry
                  </h3>
                  <p className="text-xs text-[#75777f] mb-6">
                    Our Senior Ceylon Travel Specialist will review your request and get in touch with you right away.
                  </p>

                  {contactSubmitted ? (
                    <div className="p-6 bg-[#acf1d7]/20 border border-[#0f5a47] rounded-[4px] text-center space-y-2">
                      <CheckCircle className="w-8 h-8 text-[#0f5a47] mx-auto" />
                      <h4 className="font-serif text-lg font-bold text-[#0b1b3d]">Inquiry Dispatched Successfully</h4>
                      <p className="text-xs text-[#45464e]">
                        A formal copy has been forwarded to <strong>{COMPANY_INFO.email}</strong>. Our concierge will contact you on WhatsApp / phone shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexander Miller"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3.5 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3.5 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1">
                            Phone / WhatsApp (with Country Code) *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 000-0000"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3.5 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1">
                            Topic / Inquiry Type
                          </label>
                          <select
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3.5 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                          >
                            <option value="Tour Inquiry / Custom Quote">03-15 Day Tour Inquiry</option>
                            <option value="Airport Pickup / Drop Booking">Airport Transfer Booking</option>
                            <option value="Bespoke Luxury Itinerary">Bespoke Luxury Itinerary</option>
                            <option value="Chauffeur & Van Rental">Private Chauffeur & Vehicle Only</option>
                            <option value="Hotel Partnership">Hotel or Partner Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1">
                          Message or Travel Requirements *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell us about your expected travel dates, number of travelers, preferred places to visit, or any special requests..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3.5 py-2.5 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="cursor-pointer w-full bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white py-3 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <Send className="w-4 h-4 text-[#c59b27]" />
                        <span>Send Message to sunkethtours@gmail.com</span>
                      </button>
                    </form>
                  )}

                </div>

              </div>

            </div>
          )}

        </main>

        {/* Global Footer with Company Email (sunkethtours@gmail.com) and Phone Numbers */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={() => setIsGeneralReservationOpen(true)}
        />

        {/* Tour Itinerary Details Modal with Interactive Sri Lanka Route Map */}
        <ExpeditionModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onBook={handleBookTourPackage}
        />

        {/* Destination In-Depth Detail Modal */}
        <DestinationDetailModal
          district={selectedDistrictModal}
          onClose={() => setSelectedDistrictModal(null)}
          onPlanTour={(dist) => {
            setSelectedDistrictModal(null);
            handlePlanDestinationTrip(dist);
          }}
        />

        {/* Global Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectTour={(tour) => {
            setIsSearchOpen(false);
            setSelectedTour(tour);
          }}
          onSelectDestination={(dest) => {
            setIsSearchOpen(false);
            setSelectedDistrictModal(dest);
          }}
          onSelectExperience={(exp) => {
            setIsSearchOpen(false);
            handleNavigate('experiences');
          }}
        />

        {/* Official Printable Invoice Modal (Sent to sunkethtours@gmail.com) */}
        <InvoiceModal
          invoice={currentInvoice}
          onClose={() => setCurrentInvoice(null)}
        />

        {/* General Reservation Dossier Modal */}
        <ReservationModal
          isOpen={isGeneralReservationOpen}
          onClose={() => setIsGeneralReservationOpen(false)}
          calculatedTrip={calculatedTripData}
        />

        {/* 24/7 AI Concierge Chatbot */}
        <Chatbot
          onOpenTour={(tourId) => {
            const found = TOUR_PACKAGES.find(t => t.id === tourId);
            if (found) setSelectedTour(found);
          }}
          onOpenAirport={() => handleNavigate('airport')}
        />

      </div>
    </LocalizationProvider>
  );
}
