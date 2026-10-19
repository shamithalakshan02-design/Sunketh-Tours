import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/travelData';
import { useLocalization, LANGUAGE_CONFIG, LanguageCode, CurrencyCode, CURRENCIES } from '../context/LocalizationContext';
import { Globe, DollarSign, Phone, Compass, Menu, X, Search, ArrowRight } from 'lucide-react';

export type NavScreen = 'home' | 'destinations' | 'tours' | 'duration' | 'experiences' | 'plan' | 'airport' | 'about' | 'contact';

interface HeaderProps {
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
}

export default function Header({
  activeScreen,
  onNavigate,
  onOpenBooking,
  onOpenSearch
}: HeaderProps) {
  const { language, currency, setLanguage, setCurrency, t } = useLocalization();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#c59b27]/30 transition-all duration-200 shadow-sm">
      
      {/* Top micro bar with contact & emergency phone numbers */}
      <div className="bg-[#0b1b3d] text-white text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#c59b27]/30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#eed58a] font-serif italic hidden md:inline">
              "{COMPANY_INFO.slogan}"
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#c59b27]" />
              <strong className="text-white">Hotline / WhatsApp:</strong> {COMPANY_INFO.phones[0]} / {COMPANY_INFO.phones[1]}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#f4efea]/75 hidden lg:inline">Email: {COMPANY_INFO.email}</span>
            <span className="text-[#eed58a] font-semibold text-[10px] bg-white/10 px-2 py-0.5 rounded">
              SLTDA Certified Operator
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Wordmark */}
        <button
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-3 shrink-0"
        >
          {/* Logo Emblem preserving royal Ceylon crest */}
          <div className="w-10 h-10 rounded-[6px] bg-gradient-to-br from-[#0b1b3d] to-[#00020a] border border-[#c59b27] flex items-center justify-center text-[#c59b27] shadow-md group-hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="font-serif font-black text-sm tracking-tighter leading-none block">ST</span>
              <span className="text-[7px] text-[#eed58a] uppercase tracking-widest block font-bold">1998</span>
            </div>
          </div>

          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] uppercase text-[#0b1b3d] group-hover:text-[#c59b27] transition-colors whitespace-nowrap block leading-tight">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#c59b27] block">
              Sri Lanka Tours & Transfers
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-[#45464e]">
          {[
            { id: 'home', label: t('nav_home') },
            { id: 'destinations', label: t('nav_destinations') },
            { id: 'tours', label: t('nav_tours') },
            { id: 'duration', label: t('nav_duration') },
            { id: 'experiences', label: t('nav_experiences') },
            { id: 'plan', label: t('nav_plan') },
            { id: 'airport', label: t('nav_airport') },
            { id: 'about', label: t('nav_about') },
            { id: 'contact', label: t('nav_contact') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as NavScreen)}
              className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 relative py-2 ${
                activeScreen === item.id ? 'text-[#0b1b3d] font-bold' : 'hover:text-[#0b1b3d]'
              }`}
            >
              {item.label}
              {activeScreen === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Global Search, Language, Currency & Book Now CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="cursor-pointer p-2 rounded-[4px] bg-[#f8f3ee] hover:bg-[#f2ede8] border border-[#e5dece] text-[#0b1b3d] transition-colors"
            title="Search destinations and tours"
          >
            <Search className="w-4 h-4 text-[#c59b27]" />
          </button>

          {/* Multi-Language & Multi-Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-[#f8f3ee] hover:bg-[#f2ede8] border border-[#e5dece] text-xs font-semibold text-[#0b1b3d] transition-colors"
              title="Select Language & Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="uppercase">{language}</span>
              <span className="text-[#75777f]">·</span>
              <span className="text-[#c59b27]">{currency}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-[6px] border border-[#c59b27]/40 shadow-2xl p-3.5 z-50 animate-in fade-in duration-150">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#75777f] mb-2 px-1">
                  Select Language (Auto-Converts Currency)
                </div>
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {(Object.keys(LANGUAGE_CONFIG) as LanguageCode[]).map((code) => {
                    const cfg = LANGUAGE_CONFIG[code];
                    const isSelected = language === code;
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setIsLangOpen(false);
                        }}
                        className={`cursor-pointer text-left px-2 py-1.5 rounded-[3px] text-xs transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#0b1b3d] text-white font-bold'
                            : 'hover:bg-[#f8f3ee] text-[#1d1b19]'
                        }`}
                      >
                        <span className="truncate">{cfg.nativeName}</span>
                        <span className="text-[10px] text-[#c59b27] uppercase">{code}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[10px] uppercase font-bold tracking-wider text-[#75777f] mb-1.5 px-1 pt-2 border-t border-[#e5dece]">
                  Override Currency
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setIsLangOpen(false);
                      }}
                      className={`cursor-pointer px-2 py-1 text-[11px] rounded-[3px] border transition-colors ${
                        currency === cur
                          ? 'bg-[#c59b27] text-[#0b1b3d] font-bold border-[#c59b27]'
                          : 'bg-[#f8f3ee] text-[#45464e] border-[#e5dece] hover:border-[#c59b27]'
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prominent Book Now Button */}
          <button
            onClick={onOpenBooking}
            className="cursor-pointer px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#0b1b3d] rounded-[4px] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            {t('book_now')}
          </button>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden cursor-pointer p-2 rounded-[4px] bg-[#f8f3ee] text-[#0b1b3d]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#e5dece] px-4 py-4 space-y-2">
          {[
            { id: 'home', label: t('nav_home') },
            { id: 'destinations', label: t('nav_destinations') },
            { id: 'tours', label: t('nav_tours') },
            { id: 'duration', label: t('nav_duration') },
            { id: 'experiences', label: t('nav_experiences') },
            { id: 'plan', label: t('nav_plan') },
            { id: 'airport', label: t('nav_airport') },
            { id: 'about', label: t('nav_about') },
            { id: 'contact', label: t('nav_contact') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id as NavScreen);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-bold text-[#0b1b3d] hover:bg-[#f8f3ee] rounded-[4px]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

    </header>
  );
}
