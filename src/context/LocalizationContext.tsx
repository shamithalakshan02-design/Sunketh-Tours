import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'de' | 'fr' | 'es' | 'it' | 'ja' | 'zh' | 'ar' | 'si';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'LKR' | 'INR' | 'AUD' | 'CAD' | 'JPY' | 'CNY' | 'AED';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromUSD: number; // 1 USD = rate
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateFromUSD: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateFromUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateFromUSD: 0.79 },
  LKR: { code: 'LKR', symbol: 'Rs ', name: 'Sri Lankan Rupee', rateFromUSD: 305.0 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateFromUSD: 83.5 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateFromUSD: 1.52 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rateFromUSD: 1.36 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateFromUSD: 154.0 },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rateFromUSD: 7.24 },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateFromUSD: 3.67 },
};

export const LANGUAGE_CONFIG: Record<LanguageCode, { name: string; nativeName: string; defaultCurrency: CurrencyCode }> = {
  en: { name: 'English', nativeName: 'English', defaultCurrency: 'USD' },
  de: { name: 'German', nativeName: 'Deutsch', defaultCurrency: 'EUR' },
  fr: { name: 'French', nativeName: 'Français', defaultCurrency: 'EUR' },
  es: { name: 'Spanish', nativeName: 'Español', defaultCurrency: 'EUR' },
  it: { name: 'Italian', nativeName: 'Italiano', defaultCurrency: 'EUR' },
  ja: { name: 'Japanese', nativeName: '日本語', defaultCurrency: 'JPY' },
  zh: { name: 'Chinese', nativeName: '中文', defaultCurrency: 'CNY' },
  ar: { name: 'Arabic', nativeName: 'العربية', defaultCurrency: 'AED' },
  si: { name: 'Sinhala', nativeName: 'සිංහල', defaultCurrency: 'LKR' },
};

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    slogan: "Where Every Journey Feels Like a Dream.",
    headline: "Discover Sri Lanka. Experience the Extraordinary.",
    hero_support: "Explore ancient wonders, tropical coastlines, misty mountains and authentic cultural experiences through journeys thoughtfully designed around you.",
    explore_sl: "Explore Sri Lanka",
    discover_tours: "Discover Our Tours",
    customize_journey: "Customize Your Journey",
    book_now: "Book Now",
    nav_home: "Home",
    nav_destinations: "Destinations",
    nav_tours: "Tour Packages",
    nav_duration: "Tours by Duration",
    nav_experiences: "Experiences",
    nav_plan: "Plan Your Trip",
    nav_airport: "Airport Transfers",
    nav_about: "About Us",
    nav_contact: "Contact Us",
    search_placeholder: "Search destinations, tours, or experiences...",
    total_arrivals: "Sri Lanka Tourism Arrivals (Official SLTDA)",
    sunketh_travelers: "Travellers Guided by Sunketh Tours",
    verified_record: "Verified Company Booking Record",
    sl_official_source: "Source: Sri Lanka Tourism Development Authority (Monthly Audit)",
    all_inclusive_guarantee: "100% Private Transport Guarantee · No Hidden Tolls",
  },
  de: {
    slogan: "Wo jede Reise sich wie ein Traum anfühlt.",
    headline: "Entdecken Sie Sri Lanka. Erleben Sie das Außergewöhnliche.",
    hero_support: "Erkunden Sie antike Wunder, tropische Küsten und nebelverhangene Berge auf individuell für Sie gestalteten Reisen.",
    explore_sl: "Sri Lanka Entdecken",
    discover_tours: "Unsere Touren",
    customize_journey: "Reise Anpassen",
    book_now: "Jetzt Buchen",
    nav_home: "Startseite",
    nav_destinations: "Reiseziele",
    nav_tours: "Rundreisen",
    nav_duration: "Touren nach Dauer",
    nav_experiences: "Erlebnisse",
    nav_plan: "Reise Planen",
    nav_airport: "Flughafentransfer",
    nav_about: "Über Uns",
    nav_contact: "Kontakt",
    search_placeholder: "Reiseziele, Touren oder Erlebnisse suchen...",
    total_arrivals: "Internationale Touristenankünfte (SLTDA)",
    sunketh_travelers: "Von Sunketh Tours Begleitete Reisende",
    verified_record: "Verifizierte Buchungsunterlagen",
    sl_official_source: "Quelle: Sri Lanka Tourism Development Authority",
    all_inclusive_guarantee: "100% Private Fahrzeuge · Keine Versteckten Mautgebühren",
  },
  fr: {
    slogan: "Où chaque voyage ressemble à un rêve.",
    headline: "Découvrez le Sri Lanka. Vivez l'Extraordinaire.",
    hero_support: "Explorez des merveilles antiques, des côtes tropicales et des montagnes embrumées grâce à des voyages conçus pour vous.",
    explore_sl: "Explorer le Sri Lanka",
    discover_tours: "Découvrir Nos Circuits",
    customize_journey: "Personnaliser Votre Voyage",
    book_now: "Réserver",
    nav_home: "Accueil",
    nav_destinations: "Destinations",
    nav_tours: "Circuits",
    nav_duration: "Circuits par Durée",
    nav_experiences: "Expériences",
    nav_plan: "Planifier Votre Voyage",
    nav_airport: "Transferts Aéroport",
    nav_about: "À Propos",
    nav_contact: "Contact",
    search_placeholder: "Rechercher destinations, circuits...",
    total_arrivals: "Arrivées Touristiques au Sri Lanka (SLTDA)",
    sunketh_travelers: "Voyageurs Guidés par Sunketh Tours",
    verified_record: "Dossiers de Réservation Vérifiés",
    sl_official_source: "Source: Sri Lanka Tourism Development Authority",
    all_inclusive_guarantee: "Transport Privé Garanti · Zéro Frais Cachés",
  },
  es: {
    slogan: "Donde cada viaje se siente como un sueño.",
    headline: "Descubra Sri Lanka. Viva lo Extraordinario.",
    hero_support: "Explore maravillas antiguas, costas tropicales y montañas nubladas en viajes cuidadosamente diseñados para usted.",
    explore_sl: "Explorar Sri Lanka",
    discover_tours: "Descubrir Rutas",
    customize_journey: "Personalizar Viaje",
    book_now: "Reservar Ahora",
    nav_home: "Inicio",
    nav_destinations: "Destinos",
    nav_tours: "Paquetes Turísticos",
    nav_duration: "Tours por Días",
    nav_experiences: "Experiencias",
    nav_plan: "Planificar Viaje",
    nav_airport: "Traslados de Aeropuerto",
    nav_about: "Sobre Nosotros",
    nav_contact: "Contacto",
    search_placeholder: "Buscar destinos, tours o experiencias...",
    total_arrivals: "Llegadas de Turistas a Sri Lanka (SLTDA)",
    sunketh_travelers: "Viajeros Atendidos por Sunketh Tours",
    verified_record: "Registro Oficial de Reservas",
    sl_official_source: "Fuente: Autoridad de Desarrollo Turístico de Sri Lanka",
    all_inclusive_guarantee: "Vehículo Privado Garantizado · Sin Peajes Ocultos",
  },
  it: {
    slogan: "Dove ogni viaggio sembra un sogno.",
    headline: "Scopri lo Sri Lanka. Vivi lo Straordinario.",
    hero_support: "Esplora antiche meraviglie, coste tropicali e montagne nebbiose con viaggi personalizzati su misura per te.",
    explore_sl: "Esplora lo Sri Lanka",
    discover_tours: "Scopri i Tour",
    customize_journey: "Personalizza Viaggio",
    book_now: "Prenota Ora",
    nav_home: "Home",
    nav_destinations: "Destinazioni",
    nav_tours: "Pacchetti Tour",
    nav_duration: "Tour per Durata",
    nav_experiences: "Esperienze",
    nav_plan: "Pianifica il Viaggio",
    nav_airport: "Transfer Aeroporto",
    nav_about: "Chi Siamo",
    nav_contact: "Contatti",
    search_placeholder: "Cerca destinazioni, tour o esperienze...",
    total_arrivals: "Arrivi Turistici in Sri Lanka (SLTDA)",
    sunketh_travelers: "Viaggiatori Guidati da Sunketh Tours",
    verified_record: "Registri Prenotazioni Verificati",
    sl_official_source: "Fonte: Autorità per lo Sviluppo del Turismo dello Sri Lanka",
    all_inclusive_guarantee: "Trasporto Privato Garantito · Pedaggi Inclusi",
  },
  ja: {
    slogan: "すべての旅がまるで夢のように感じられる場所。",
    headline: "スリランカを発見。特別な体験をあなたに。",
    hero_support: "古代の遺跡、熱帯の海岸線、霧深き茶園の山々。お客様一人ひとりに合わせて丹念に設計されたプライベートな旅へ。",
    explore_sl: "スリランカを探索",
    discover_tours: "ツアーを見る",
    customize_journey: "旅をカスタマイズ",
    book_now: "今すぐ予約",
    nav_home: "ホーム",
    nav_destinations: "観光地",
    nav_tours: "ツアーパッケージ",
    nav_duration: "日数別ツアー (3〜15日間)",
    nav_experiences: "特別な体験",
    nav_plan: "オーダーメイド旅行設計",
    nav_airport: "空港送迎",
    nav_about: "会社概要",
    nav_contact: "お問い合わせ",
    search_placeholder: "目的地、ツアー、体験を検索...",
    total_arrivals: "スリランカ外国人観光客入国総数 (SLTDA公認)",
    sunketh_travelers: "Sunketh Tours 実績",
    verified_record: "確認済み公式予約数",
    sl_official_source: "情報元: スリランカ観光開発局 (SLTDA)",
    all_inclusive_guarantee: "完全専用車・英語ドライバー案内・追加料金なし",
  },
  zh: {
    slogan: "每一次旅行都如梦似幻。",
    headline: "探索斯里兰卡。体验非凡之旅。",
    hero_support: "探访古老文明奇迹、热带海岸线、云雾茶山与地道文化体验，尊享量身定制的私家行旅。",
    explore_sl: "探索斯里兰卡",
    discover_tours: "查看精选行程",
    customize_journey: "定制专属行程",
    book_now: "立即预订",
    nav_home: "首页",
    nav_destinations: "目的地",
    nav_tours: "经典游套餐",
    nav_duration: "按天数游 (3至15天)",
    nav_experiences: "特色体验",
    nav_plan: "定制私人行程",
    nav_airport: "机场专车接送",
    nav_about: "关于我们",
    nav_contact: "联系管家",
    search_placeholder: "搜索目的地、行程或体验...",
    total_arrivals: "斯里兰卡国际游客总抵达量 (官方SLTDA)",
    sunketh_travelers: "Sunketh Tours 接待贵宾量",
    verified_record: "官方确认贵宾记录",
    sl_official_source: "数据来源：斯里兰卡国家旅游局官方审计",
    all_inclusive_guarantee: "100%独立专车专司 · 全程包含高速过桥过路费与燃油",
  },
  ar: {
    slogan: "حيث تبدو كل رحلة وكأنها حلم رائع.",
    headline: "اكتشف سريلانكا. عش تجربة لا تُنسى.",
    hero_support: "استكشف العجائب القديمة والسواحل الاستوائية ومزارع الشاي الخلابة في رحلات خاصة صُممت خصيصاً لتناسبك.",
    explore_sl: "استكشف سريلانكا",
    discover_tours: "اكتشف جولاتنا",
    customize_journey: "صمم رحلتك الخاصة",
    book_now: "احجز الآن",
    nav_home: "الرئيسية",
    nav_destinations: "الوجهات",
    nav_tours: "باقات الجولات",
    nav_duration: "الجولات حسب الأيام",
    nav_experiences: "التجارب السياحية",
    nav_plan: "خطط لرحلتك",
    nav_airport: "توصيل المطار",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    search_placeholder: "ابحث عن وجهات، جولات، تجارب...",
    total_arrivals: "إجمالي السياح الوافدين إلى سريلانكا (SLTDA)",
    sunketh_travelers: "السياح مع سنكيث تورز",
    verified_record: "سجلات حجوزات معتمدة",
    sl_official_source: "المصدر: هيئة تنمية السياحة في سريلانكا",
    all_inclusive_guarantee: "سائق خاص وسيارات حديثة ومكيفة شاملة الرسوم",
  },
  si: {
    slogan: "සෑම ගමනක්ම සිහිනයක් බඳු අසිරිමත් අත්දැකීමක්.",
    headline: "ශ්‍රී ලංකාව ගවේෂණය කරන්න. විශිෂ්ටතම අත්දැකීම විඳගන්න.",
    hero_support: "ඓතිහාසික නටබුන්, මනරම් වෙරළ තීරයන් සහ මිහිදුම්බර තේ කඳුවැටි ඔස්සේ ඔබටම සුවිශේෂී වූ සංචාරයක් භුක්ති විඳින්න.",
    explore_sl: "ශ්‍රී ලංකාව ගවේෂණය",
    discover_tours: "චාරිකා නරඹන්න",
    customize_journey: "ඔබේ චාරිකාව සකසන්න",
    book_now: "වෙන්කරගන්න",
    nav_home: "මුල් පිටුව",
    nav_destinations: "ගමනාන්ත",
    nav_tours: "සංචාරක පැකේජ",
    nav_duration: "දින ගණන අනුව චාරිකා",
    nav_experiences: "සුවිශේෂී අත්දැකීම්",
    nav_plan: "චාරිකාවක් සැලසුම් කරන්න",
    nav_airport: "ගුවන් තොටුපළ ප්‍රවාහනය",
    nav_about: "අප ගැන",
    nav_contact: "අමතන්න",
    search_placeholder: "ගමනාන්ත, චාරිකා හෝ සේවාවන් සොයන්න...",
    total_arrivals: "ශ්‍රී ලංකාවට පැමිණි විදේශීය සංචාරකයින් (SLTDA)",
    sunketh_travelers: "සන්කෙත් ටුවර්ස් මඟින් සේවා සැපයූ සංචාරකයින්",
    verified_record: "තහවුරු කරන ලද වෙන්කිරීම්",
    sl_official_source: "මූලාශ්‍රය: ශ්‍රී ලංකා සංචාරක සංවර්ධන අධිකාරිය",
    all_inclusive_guarantee: "පුද්ගලික රියදුරු සේවාව · අධිවේගී මාර්ග ගාස්තු ඇතුළත්ව",
  }
};

interface LocalizationContextType {
  language: LanguageCode;
  currency: CurrencyCode;
  setLanguage: (lang: LanguageCode) => void;
  setCurrency: (cur: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  t: (key: string) => string;
  fxUpdateTime: string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const fxUpdateTime = "Daily Market Mid-Rate · 2026-10-19 09:30 UTC";

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    const defaultCurr = LANGUAGE_CONFIG[lang].defaultCurrency;
    setCurrencyState(defaultCurr);
  };

  const setCurrency = (cur: CurrencyCode) => {
    setCurrencyState(cur);
  };

  const formatPrice = (amountInUSD: number): string => {
    const curInfo = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(amountInUSD * curInfo.rateFromUSD);

    if (currency === 'LKR') {
      return `LKR ${converted.toLocaleString()}`;
    }
    if (currency === 'AED') {
      return `${converted.toLocaleString()} AED`;
    }
    return `${curInfo.symbol}${converted.toLocaleString()}`;
  };

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  return (
    <LocalizationContext.Provider
      value={{ language, currency, setLanguage, setCurrency, formatPrice, t, fxUpdateTime }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const ctx = useContext(LocalizationContext);
  if (!ctx) throw new Error('useLocalization must be used inside LocalizationProvider');
  return ctx;
};
