import React from 'react';
import { X, Calendar, Download, Trash2, Clock, MapPin, User, Sparkles } from 'lucide-react';
import { BookingData, Language } from '../types';
import { translations } from '../data/translations';
import { generateIcsFile } from '../utils/calendar';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  bookings: BookingData[];
  onCancelBooking: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  bookings,
  onCancelBooking,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const mb = t.myBookings;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl border-l border-[#E3D7C8] flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#EAE0D4] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#B85A3A]">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#2A2522]">
              {mb.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6E63] hover:text-[#2A2522] hover:bg-[#F5EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F2ECE4] text-[#8C7A6C] flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-xs sm:text-sm text-[#73675E] max-w-xs mx-auto leading-relaxed">
                {mb.empty}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-6 py-2.5 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {mb.emptyBtn}
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-5 border border-[#E5DACD] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#F5EFEB]">
                  <span className="text-[11px] font-mono font-bold text-[#B85A3A] bg-[#FAF0E6] px-2 py-0.5 rounded-md">
                    {booking.id}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                    {lang === 'zh' ? '已确认锁定' : '予約確定済'}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif-title font-bold text-base text-[#2A2522]">
                    {booking.courseTitle}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-[#63574D]">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A08876]" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#A08876]" />
                      <span className="truncate">{booking.timeSlot}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#A08876]" />
                      <span>{booking.studentName} ({booking.attendeeCount}人)</span>
                    </div>
                    <div className="text-[#A0482B] font-bold">
                      ¥{booking.totalPrice}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F5EFEB] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => generateIcsFile(booking)}
                    className="flex items-center space-x-1 text-xs text-[#54483E] hover:text-[#B85A3A] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics 日历</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(mb.confirmCancel)) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{mb.cancelBtn}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookings.length > 0 && (
          <div className="p-4 bg-[#FAF5EE] border-t border-[#EAE0D4] text-center shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-xl bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFE2D1]" />
              <span>{lang === 'zh' ? '预约更多新课程' : '他のレッスンを予約する'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
