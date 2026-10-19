import { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Printer, Calendar, User, Mail, Phone, Compass, FileText } from 'lucide-react';
import { CalculatedTrip } from './BespokeCalculator';
import { EXPEDITIONS } from '../data/travelData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatedTrip?: CalculatedTrip | null;
}

export default function ReservationModal({ isOpen, onClose, calculatedTrip }: ReservationModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('2026-12-15');
  const [dietary, setDietary] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const expedition = calculatedTrip?.expedition || EXPEDITIONS[0];
  const guests = calculatedTrip?.guestsCount || 2;
  const grandTotal = calculatedTrip?.grandTotal || (expedition.basePrice * guests);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Please enter the lead guest full name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email address';
    if (!phone.trim()) newErrors.phone = 'Please provide contact telephone with country code';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const randomCode = `SS-CEYLON-${Math.floor(1000 + Math.random() * 9000)}`;
    setDossierRef(randomCode);
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#0b1b3d] text-white p-6 sm:p-7 flex items-center justify-between border-b border-[#c59b27]/40">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#eed58a] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
              Serendib Sovereign Concierge
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
              {submitted ? "Sovereign Reservation Dossier" : "Expedition Enquiry & Reservation"}
            </h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="cursor-pointer p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Dossier */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Success Banner */}
            <div className="bg-[#f8f3ee] border border-[#c59b27]/50 rounded-[4px] p-5 text-center">
              <div className="w-12 h-12 bg-[#0f5a47] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <CheckCircle className="w-6 h-6 text-[#acf1d7]" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c59b27] block">
                RESERVATION DOSSIER ISSUED
              </span>
              <h4 className="font-serif text-2xl font-bold text-[#0b1b3d] mt-1">
                Ref: {dossierRef}
              </h4>
              <p className="text-xs text-[#45464e] mt-1 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-[#0b1b3d]">{fullName}</span>. Your private itinerary allocation is held with priority status.
              </p>
            </div>

            {/* Dossier Specs */}
            <div className="bg-white border border-[#e5dece] rounded-[4px] p-5 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#f2ede8]">
                <span className="text-[#75777f]">Curated Journey</span>
                <span className="font-semibold text-[#0b1b3d]">{expedition.title}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f2ede8]">
                <span className="text-[#75777f]">Target Departure Date</span>
                <span className="font-semibold text-[#0b1b3d]">{startDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f2ede8]">
                <span className="text-[#75777f]">Traveling Party</span>
                <span className="font-semibold text-[#0b1b3d]">{guests} Guests (Private Allocation)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f2ede8]">
                <span className="text-[#75777f]">Estimated Total Investment</span>
                <span className="font-serif text-base font-bold text-[#c59b27] tabular-nums">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f2ede8]">
                <span className="text-[#75777f]">Assigned Curator</span>
                <span className="font-semibold text-[#0b1b3d]">Devinda Wickramasinghe (Executive Concierge)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#75777f]">Contact Target</span>
                <span className="font-semibold text-[#0b1b3d]">{email} · {phone}</span>
              </div>
            </div>

            {/* Notice */}
            <div className="text-xs text-[#45464e] bg-[#f8f3ee] p-4 rounded-[4px] border border-[#e5dece] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0f5a47] shrink-0 mt-0.5" />
              <span>
                Our concierge desk will telephone or email you within 4 hours to review private aviation landing coordinates, villa suite choices, and custom culinary preferences.
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="cursor-pointer w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#0b1b3d] border border-[#c59b27] rounded-[4px] hover:bg-[#f8f3ee] transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Print Dossier Summary</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="cursor-pointer w-full sm:w-auto bg-[#0b1b3d] hover:bg-[#00020a] text-white px-6 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Done
              </button>
            </div>

          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            
            {/* Quick Trip Preview */}
            <div className="bg-[#f8f3ee] p-4 rounded-[4px] border border-[#e5dece] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c59b27]">
                  Selected Journey
                </span>
                <div className="font-serif text-sm font-bold text-[#0b1b3d]">
                  {expedition.title}
                </div>
                <div className="text-xs text-[#75777f]">
                  {expedition.duration} · {guests} Guests
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-[#75777f] block">
                  Est. Total
                </span>
                <span className="font-serif text-lg font-bold text-[#0b1b3d] tabular-nums">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Lead Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-[#c59b27]" />
                Lead Guest Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Lord / Lady / Dr. / Mr. / Ms. Alexander Sterling"
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all"
              />
              {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#c59b27]" />
                  Direct Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@sterlingholdings.com"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all"
                />
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#c59b27]" />
                  Telephone (with Country Code) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 20 7946 0912 / +1 212 555 0198"
                  className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all"
                />
                {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#c59b27]" />
                Desired Departure Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all cursor-pointer"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0b1b3d] mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3 text-[#c59b27]" />
                Private Preferences (Dietary, Aviation, Estate Buyout)
              </label>
              <textarea
                rows={2}
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="e.g. Vintage Dom Pérignon on seaplane arrival, organic gluten-free dining, quiet garden suite preference..."
                className="w-full bg-[#f8f3ee] border border-[#e5dece] rounded-[4px] px-3 py-2 text-xs text-[#1d1b19] focus:outline-none focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27] transition-all resize-none"
              />
            </div>

            {/* Bottom Submit */}
            <div className="pt-3 border-t border-[#e5dece] flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#75777f]">
                No payment charged at this stage.
              </span>
              <button
                type="submit"
                className="cursor-pointer bg-[#0b1b3d] hover:bg-[#00020a] hover:ring-1 hover:ring-[#dfb135] text-white px-7 py-3 rounded-[4px] text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                Submit Dossier Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
