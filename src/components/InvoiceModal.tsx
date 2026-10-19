import React from 'react';
import { X, Printer, Mail, Phone, CheckCircle, Shield, Download, FileText, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';
import { useLocalization } from '../context/LocalizationContext';

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  guestName: string;
  email: string;
  phone: string;
  itemTitle: string;
  serviceType: string;
  routeOrDestination: string;
  totalKm?: number;
  travelDates: string;
  passengersCount: number;
  baseAmountUSD: number;
  vehicleOrTier?: string;
  specialNotes?: string;
}

interface InvoiceModalProps {
  invoice: InvoiceData | null;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: InvoiceModalProps) {
  const { formatPrice } = useLocalization();

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Invoice Card Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-[6px] border border-[#c59b27]/40 shadow-2xl overflow-hidden my-6 print:shadow-none print:border-none">
        
        {/* Top Header Bar */}
        <div className="bg-[#0b1b3d] text-white p-6 sm:p-8 flex items-start justify-between border-b-2 border-[#c59b27]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#c59b27] flex items-center justify-center text-[#0b1b3d] font-serif font-black text-sm">
                ST
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-white">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#eed58a] font-serif italic mt-1 tracking-wide">
              "{COMPANY_INFO.slogan}"
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dispatch Confirmation Banner */}
        <div className="bg-[#f8f3ee] border-b border-[#e5dece] px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#0f5a47] font-semibold">
            <CheckCircle className="w-4 h-4 text-[#0f5a47]" />
            <span>Booking Confirmed & Dispatched to Company System</span>
          </div>
          <div className="text-[#45464e] flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Automated Copy sent to: <strong className="text-[#0b1b3d]">{COMPANY_INFO.email}</strong></span>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 text-[#1d1b19]">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#e5dece]">
            
            {/* Bill To */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777f] block">
                PRIMARY TRAVELER (BILL TO)
              </span>
              <div className="font-serif text-base font-bold text-[#0b1b3d]">
                {invoice.guestName}
              </div>
              <div className="text-xs text-[#45464e] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>{invoice.email}</span>
              </div>
              <div className="text-xs text-[#45464e] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>{invoice.phone}</span>
              </div>
            </div>

            {/* Invoice Reference & Company Contacts */}
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#75777f] block">
                OFFICIAL INVOICE VOUCHER
              </span>
              <div className="font-serif text-lg font-bold text-[#c59b27] tabular-nums">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-[#45464e]">
                Date of Issue: <strong>{invoice.invoiceDate}</strong>
              </div>
              <div className="text-xs text-[#45464e]">
                Hotlines: <strong>0767959466 / 0777633059</strong>
              </div>
              <div className="text-[11px] text-[#75777f]">
                {COMPANY_INFO.license}
              </div>
            </div>

          </div>

          {/* Service Details Table */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0b1b3d] mb-3">
              Itinerary & Service Specifications
            </div>

            <div className="bg-[#f8f3ee] rounded-[4px] border border-[#e5dece] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#ece7e2] text-[#0b1b3d] uppercase tracking-wider text-[10px] font-bold border-b border-[#e5dece]">
                  <tr>
                    <th className="py-2.5 px-4">Description</th>
                    <th className="py-2.5 px-4 hidden sm:table-cell">Route / Route Length</th>
                    <th className="py-2.5 px-4 text-center">Party</th>
                    <th className="py-2.5 px-4 text-right">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5dece]">
                  <tr>
                    <td className="py-3 px-4">
                      <div className="font-serif font-bold text-sm text-[#0b1b3d]">
                        {invoice.itemTitle}
                      </div>
                      <div className="text-[11px] text-[#75777f]">
                        Category: {invoice.serviceType}
                      </div>
                      {invoice.vehicleOrTier && (
                        <div className="text-[11px] text-[#0f5a47] font-medium mt-0.5">
                          {invoice.vehicleOrTier}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-xs text-[#45464e]">
                      <div>{invoice.routeOrDestination}</div>
                      {invoice.totalKm !== undefined && (
                        <div className="text-[11px] font-semibold text-[#0b1b3d] mt-0.5">
                          Total Route: {invoice.totalKm} km
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-[#0b1b3d]">
                      {invoice.passengersCount} {invoice.passengersCount === 1 ? 'Guest' : 'Guests'}
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-sm text-[#0b1b3d] tabular-nums">
                      {formatPrice(invoice.baseAmountUSD)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="pt-2 flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs">
              <div className="flex justify-between text-[#45464e]">
                <span>Service Baseline:</span>
                <span className="font-semibold tabular-nums text-[#0b1b3d]">
                  {formatPrice(invoice.baseAmountUSD)}
                </span>
              </div>
              <div className="flex justify-between text-[#45464e]">
                <span>Highway Expressway Tolls & Fuel:</span>
                <span className="font-semibold text-[#0f5a47]">Included (Rs 0)</span>
              </div>
              <div className="flex justify-between text-[#45464e]">
                <span>Passenger Insurance:</span>
                <span className="font-semibold text-[#0f5a47]">Included (Rs 0)</span>
              </div>
              <div className="pt-2 border-t-2 border-[#c59b27] flex justify-between items-baseline">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0b1b3d]">
                  Total All-Inclusive:
                </span>
                <span className="font-serif text-2xl font-bold text-[#c59b27] tabular-nums">
                  {formatPrice(invoice.baseAmountUSD)}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Official Seal */}
          <div className="pt-6 border-t border-[#e5dece] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#75777f]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#0b1b3d] font-semibold">
                <Shield className="w-4 h-4 text-[#c59b27]" />
                <span>Payment Protection & Flexible Date Adjustment Guarantee</span>
              </div>
              <p className="text-[11px] max-w-md">
                No advance payment is charged until your dedicated chauffeur contact and hotel vouchers are re-confirmed via WhatsApp or email.
              </p>
            </div>

            <div className="border border-[#c59b27]/30 rounded-[4px] p-2.5 text-center bg-[#f8f3ee] shrink-0">
              <span className="text-[9px] uppercase tracking-widest text-[#75777f] block font-bold">
                OFFICIAL AUTHORIZED SEAL
              </span>
              <span className="font-serif text-xs font-bold text-[#0b1b3d] block mt-0.5">
                Sunketh Tours Managing Desk
              </span>
              <span className="text-[10px] text-[#0f5a47] font-semibold block">
                Verified & Dispatched
              </span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#f2ede8] border-t border-[#e5dece] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#45464e]">
            For inquiries, reach our desk directly at <strong className="text-[#0b1b3d]">sunkethtours@gmail.com</strong>
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-1/2 sm:w-auto cursor-pointer px-4 py-2 bg-white text-xs font-semibold text-[#0b1b3d] border border-[#c59b27] rounded-[4px] hover:bg-[#f8f3ee] transition-colors flex items-center justify-center gap-1"
            >
              <Printer className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto cursor-pointer px-6 py-2 bg-[#0b1b3d] hover:bg-[#00020a] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
