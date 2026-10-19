import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Compass, Phone, Mail, Bot, User } from 'lucide-react';
import { COMPANY_INFO, TOUR_PACKAGES } from '../data/travelData';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickAction?: { label: string; action: () => void };
}

interface ChatbotProps {
  onOpenTour: (tourId: string) => void;
  onOpenAirport: () => void;
}

export default function Chatbot({ onOpenTour, onOpenAirport }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Ayubowan! 🙏 Welcome to ${COMPANY_INFO.name}. Our slogan is "${COMPANY_INFO.slogan}". How may I assist your Sri Lankan dream journey today?`,
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickPrompts = [
    "Best season to visit Sri Lanka?",
    "Recommend a 7-day tour for family",
    "How much is an airport pickup to Colombo / Galle?",
    "What is the Pekoe Trail in the tea country?",
    "Are driver meals and highway tolls included?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Generate smart context-aware response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let botResponse = "";

      if (lower.includes('season') || lower.includes('weather') || lower.includes('when to visit') || lower.includes('month')) {
        botResponse = "Sri Lanka is a year-round paradise! The South and West coasts (Galle, Bentota, Colombo) and Central Tea Highlands are in prime dry season from December through April. The East Coast (Trincomalee, Passikudah, Arugam Bay) is glorious and calm from May through September. You can visit anytime and our chauffeur will guide you to optimal microclimates!";
      } else if (lower.includes('airport') || lower.includes('pickup') || lower.includes('drop') || lower.includes('transfer')) {
        botResponse = `We provide private airport pickups and drops from Bandaranaike (BIA Colombo), Mattala (MRIA), and Jaffna. Prices start from just $35 for Colombo, $68 for Kandy, and $78 for Galle with dedicated air-conditioned cars, free Wi-Fi, and luggage assistance. All highway tolls and driver charges are included!`;
      } else if (lower.includes('family') || lower.includes('children') || lower.includes('kids')) {
        botResponse = "For families with children, our '07-Day Classic Heritage & Wildlife Odyssey' or '10-Day Island Panorama' are the absolute top favorites! They include Pinnawala elephant river bathing, gentle train rides across Nine Arch Bridge, open-jeep wildlife safaris in Yala/Minneriya, and golden child-friendly beaches in Bentota.";
      } else if (lower.includes('pekoe') || lower.includes('hike') || lower.includes('tea') || lower.includes('train')) {
        botResponse = "The Pekoe Trail is Sri Lanka's world-famous 300km walking trail through the Central Highlands. Our 05-Day and 10-Day packages include sections through Bogawantalawa and Ella, paired with reserved 1st-class observation carriages on the scenic mountain train!";
      } else if (lower.includes('included') || lower.includes('price') || lower.includes('toll') || lower.includes('driver')) {
        botResponse = "With Sunketh Tours, 100% of driver accommodation, meals, vehicle fuel, highway expressway tolls, and passenger insurance are completely included. There are zero hidden extras!";
      } else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone') || lower.includes('email')) {
        botResponse = `You can reach our senior directors 24/7 directly at: \n📞 0767959466 or 0777633059 (WhatsApp ready)\n✉️ Email: ${COMPANY_INFO.email}`;
      } else {
        botResponse = `Thank you for asking! With Sunketh Tours, every tour from 03 to 15 days is 100% private and customizable. We also provide instant airport drops and pickups across the island. Would you like to view our tour packages or configure an airport transfer?`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Action Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0b1b3d] text-white border border-[#c59b27] shadow-[0_12px_32px_rgba(11,27,61,0.25)] hover:bg-[#00020a] hover:scale-105 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-[#c59b27] flex items-center justify-center text-[#0b1b3d] font-bold">
            <Bot className="w-5 h-5 text-[#0b1b3d]" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold uppercase tracking-wider text-white">
              Sunketh Assistant
            </span>
            <span className="block text-[10px] text-[#eed58a]">
              Ayubowan! Ask anything
            </span>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[540px] bg-white rounded-[8px] border border-[#c59b27]/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#0b1b3d] text-white p-4 flex items-center justify-between border-b border-[#c59b27]/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c59b27] flex items-center justify-center text-[#0b1b3d] font-bold">
                <Bot className="w-4 h-4 text-[#0b1b3d]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Sunketh Concierge AI
                </span>
                <span className="text-[10px] text-[#eed58a] block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f5a47] animate-pulse" />
                  Online · Official Guest Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Help Strip */}
          <div className="bg-[#f8f3ee] px-4 py-2 border-b border-[#e5dece] flex items-center justify-between text-[11px] text-[#45464e]">
            <span>Direct WhatsApp: <strong>0767959466</strong></span>
            <span className="text-[#0f5a47] font-semibold">24/7 Response</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fef8f3]/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#c59b27] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-[#0b1b3d]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-[6px] p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0b1b3d] text-white rounded-tr-none'
                      : 'bg-white text-[#1d1b19] border border-[#e5dece] shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span className={`block text-[9px] mt-1 text-right ${m.sender === 'user' ? 'text-white/60' : 'text-[#75777f]'}`}>
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#0b1b3d] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-[#eed58a]" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chips suggestions */}
          <div className="p-2 bg-white border-t border-[#e5dece] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="cursor-pointer text-[10px] px-2.5 py-1 rounded-full bg-[#f8f3ee] hover:bg-[#c59b27]/20 border border-[#e5dece] text-[#0b1b3d] whitespace-nowrap shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#e5dece] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about tours, routes, weather, visas..."
              className="flex-1 bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27]"
            />
            <button
              type="submit"
              className="cursor-pointer p-2 rounded-[4px] bg-[#0b1b3d] hover:bg-[#00020a] text-[#eed58a] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
