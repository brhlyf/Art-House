import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  Languages,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BookingData, Course, Language } from '../types';
import { coursesData } from '../data/coursesData';
import { translations } from '../data/translations';
import { generateIcsFile } from '../utils/calendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialCourseId?: string;
  onBookingCreated: (booking: BookingData) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialCourseId,
  onBookingCreated,
}) => {
  const t = translations[lang];
  const b = t.booking || t.bookingModal;

  const [step, setStep] = useState<number>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    initialCourseId || coursesData[0].id
  );

  // Calendar Date calculation
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    () => b?.timeSlots?.afternoon || '14:00 - 16:00'
  );
  const [languagePref, setLanguagePref] = useState<'zh' | 'ja' | 'both'>('zh');
  const [attendeeCount, setAttendeeCount] = useState<number>(1);

  // Sync selected time slot if language changes
  useEffect(() => {
    if (b?.timeSlots?.afternoon && !selectedTimeSlot) {
      setSelectedTimeSlot(b.timeSlots.afternoon);
    }
  }, [lang, b]);

  // Contact form state
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<'wechat' | 'line' | 'phone'>('wechat');
  const [contactAccount, setContactAccount] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [specialNotes, setSpecialNotes] = useState('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  if (!isOpen) return null;

  const selectedCourse =
    coursesData.find((c) => c.id === selectedCourseId) || coursesData[0];

  const currentPricePerPerson = selectedCourse.trialPrice || selectedCourse.price;
  const totalPrice = currentPricePerPerson * attendeeCount;

  // Calendar helpers
  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    const dayNames = lang === 'zh'
      ? ['日', '一', '二', '三', '四', '五', '六']
      : ['日', '月', '火', '水', '木', '金', '土'];

    // Header day names
    const header = (
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#8A7C6F] mb-1">
        {dayNames.map((d, i) => (
          <div key={i} className={i === 0 || i === 6 ? 'text-[#B85A3A]' : ''}>
            {d}
          </div>
        ))}
      </div>
    );

    // Padding empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />);
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dateObj = new Date(year, month, day);
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected = selectedDate === dateString;
      const isToday =
        dateObj.toDateString() ===
        new Date(today.getFullYear(), today.getMonth(), today.getDate()).toDateString();

      days.push(
        <button
          key={dateString}
          type="button"
          disabled={isPast}
          onClick={() => setSelectedDate(dateString)}
          className={`h-9 rounded-xl text-xs font-medium transition-all flex flex-col items-center justify-center relative ${
            isSelected
              ? 'bg-[#B85A3A] text-white shadow-xs font-bold scale-105'
              : isPast
              ? 'text-[#C7BCB0] cursor-not-allowed'
              : 'text-[#3D362F] hover:bg-[#F2ECE4]'
          }`}
        >
          <span>{day}</span>
          {isToday && !isSelected && (
            <span className="w-1 h-1 rounded-full bg-[#B85A3A] absolute bottom-1" />
          )}
        </button>
      );
    }

    return (
      <div>
        {header}
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim() || !email.trim()) {
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `AH-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${randomSuffix}`;

    const newBooking: BookingData = {
      id: bookingId,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title[lang],
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      languagePreference: languagePref,
      attendeeCount,
      studentName,
      email,
      phone,
      contactMethod,
      contactAccount,
      experienceLevel,
      specialNotes,
      createdAt: new Date().toISOString(),
      totalPrice,
      status: 'confirmed',
    };

    // Send automated email notification to feidong185@gmail.com
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          data: newBooking,
        }),
      });
    } catch (err) {
      console.warn('Booking notification dispatch error (handled):', err);
    }

    setIsSubmitting(false);
    setConfirmedBooking(newBooking);
    onBookingCreated(newBooking);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B85A3A', '#D4A373', '#7A8B7B', '#FAF0E6'],
      });
    } catch (err) {
      // Safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F5] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E3D7C8] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-6 pb-4 bg-white border-b border-[#EAE0D4] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#8C4A31] uppercase">
              {b.tag}
            </span>
            <h2 className="font-serif-title text-2xl font-bold text-[#2A2522]">
              {confirmedBooking ? b.successTitle : b.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#7A6E63] hover:text-[#2A2522] hover:bg-[#F5EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        {!confirmedBooking && (
          <div className="px-6 py-3 bg-[#FAF3EC] border-b border-[#EBDCCF] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className={`font-semibold ${step >= 1 ? 'text-[#B85A3A]' : 'text-[#A09386]'}`}>
                {b.step1}
              </span>
              <span className="text-[#D4C3B2]">/</span>
              <span className={`font-semibold ${step >= 2 ? 'text-[#B85A3A]' : 'text-[#A09386]'}`}>
                {b.step2}
              </span>
              <span className="text-[#D4C3B2]">/</span>
              <span className={`font-semibold ${step >= 3 ? 'text-[#B85A3A]' : 'text-[#A09386]'}`}>
                {b.step3}
              </span>
            </div>
            <div className="text-[11px] text-[#7A6E63] hidden sm:block">
              {lang === 'zh' ? '※ 画材全包 · 零基础友好' : '※ 画材完備 · 手ぶらOK'}
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {confirmedBooking ? (
            /* Booking Confirmed Screen */
            <div className="text-center py-4 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h3 className="font-serif-title text-2xl font-bold text-[#2A2522]">
                  {b.successTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#665B51] mt-2 max-w-md mx-auto leading-relaxed">
                  {b.successDesc}
                </p>
              </div>

              {/* Booking Ticket Box */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2D5C5] shadow-xs max-w-lg mx-auto text-left space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
                  <span className="text-xs text-[#7A6E63]">{b.bookingId}</span>
                  <span className="text-sm font-mono font-bold text-[#B85A3A]">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#7A6E63] block">{t.courses.all}:</span>
                    <span className="font-semibold text-[#2A2522]">{confirmedBooking.courseTitle}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">{b.selectDate}:</span>
                    <span className="font-semibold text-[#2A2522]">{confirmedBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">{b.selectTime}:</span>
                    <span className="font-semibold text-[#2A2522]">{confirmedBooking.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">{b.attendees}:</span>
                    <span className="font-semibold text-[#2A2522]">{confirmedBooking.attendeeCount} {b.personUnit}</span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">{b.languagePref}:</span>
                    <span className="font-semibold text-[#2A2522]">
                      {confirmedBooking.languagePreference === 'zh'
                        ? '中文'
                        : confirmedBooking.languagePreference === 'ja'
                        ? '日本語'
                        : '中日双语'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#7A6E63] block">{t.courses.cardPrice}:</span>
                    <span className="font-bold text-[#B85A3A] text-sm">¥{confirmedBooking.totalPrice}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#8C7A6D] border-t border-[#F0E6D8] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#2C2825] font-medium">
                    <Mail className="w-3.5 h-3.5 text-[#E84A27] shrink-0" />
                    <span>
                      {lang === 'ja'
                        ? '予約通知を管理者メール（feidong185@gmail.com）へ自動送信しました。'
                        : '预约通知已自动发送至画室管理员邮箱（feidong185@gmail.com）。'}
                    </span>
                  </div>
                  <div>{b.cancelNotice}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => generateIcsFile(confirmedBooking)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#D5C6B5] bg-white text-xs font-semibold text-[#4A4139] hover:bg-[#FAF5EE] flex items-center justify-center space-x-2 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-[#B85A3A]" />
                  <span>{b.addToCalendar}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  {b.close}
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            /* Step 1: Course Selection */
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#2A2522] font-serif-title">
                {b.selectCourse}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {coursesData.map((c) => {
                  const isSelected = selectedCourseId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCourseId(c.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white border-[#B85A3A] ring-2 ring-[#B85A3A]/20 shadow-xs'
                          : 'bg-white/70 border-[#E5DACD] hover:border-[#CBB5A1]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C4A31] font-medium">
                          {c.badge[lang]}
                        </span>
                        <div className="text-right">
                          <span className="font-serif-title font-bold text-sm text-[#A0482B]">
                            ¥{c.trialPrice || c.price}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif-title font-bold text-sm text-[#2A2522] mb-1">
                        {c.title[lang]}
                      </h4>
                      <p className="text-xs text-[#7A6F65] line-clamp-1">
                        {c.subtitle[lang]}
                      </p>

                      <div className="mt-3 pt-2 border-t border-[#F2ECE3] flex items-center justify-between text-[11px] text-[#8C7E72]">
                        <span>{c.duration[lang]}</span>
                        <span>{c.level[lang]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : step === 2 ? (
            /* Step 2: Date & Time Selection */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Calendar picker */}
                <div className="md:col-span-7 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DACD] shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-[#2A2522] uppercase tracking-wider font-serif-title">
                      {currentMonth.getFullYear()} 年 {currentMonth.getMonth() + 1} 月
                    </h4>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-lg hover:bg-[#F2ECE4] text-[#6B5F54]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg hover:bg-[#F2ECE4] text-[#6B5F54]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {renderCalendarDays()}
                </div>

                {/* Time slot & Attendees selection */}
                <div className="md:col-span-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2A2522] uppercase tracking-wider mb-2 font-serif-title">
                      {b.selectTime}
                    </label>
                    <div className="space-y-2">
                      {Object.entries(b?.timeSlots || {}).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedTimeSlot(label)}
                          className={`w-full p-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                            selectedTimeSlot === label
                              ? 'bg-white border-[#B85A3A] ring-2 ring-[#B85A3A]/20 text-[#2A2522] font-semibold'
                              : 'bg-white/80 border-[#E5DACD] text-[#5C534B] hover:bg-white'
                          }`}
                        >
                          <span>{label}</span>
                          {selectedTimeSlot === label && (
                            <Check className="w-3.5 h-3.5 text-[#B85A3A]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A2522] uppercase tracking-wider mb-2 font-serif-title">
                      {b.attendees}
                    </label>
                    <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl border border-[#E5DACD]">
                      <Users className="w-4 h-4 text-[#8C6D58] ml-1" />
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setAttendeeCount(num)}
                            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                              attendeeCount === num
                                ? 'bg-[#B85A3A] text-white font-bold'
                                : 'bg-[#FAF5EE] text-[#544A41] hover:bg-[#EFE8DD]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-[#7A6E63]">{b.personUnit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 3: Contact & Language Preference */
            <form id="booking-details-form" onSubmit={handleSubmitBooking} className="space-y-4">
              {/* Language selection */}
              <div>
                <label className="block text-xs font-bold text-[#2A2522] uppercase tracking-wider mb-2 font-serif-title">
                  {b.languagePref}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguagePref('zh')}
                    className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all ${
                      languagePref === 'zh'
                        ? 'bg-white border-[#B85A3A] ring-2 ring-[#B85A3A]/20 text-[#2A2522] font-semibold'
                        : 'bg-white/70 border-[#E5DACD] text-[#5C534B]'
                    }`}
                  >
                    {b?.languages?.zh || (lang === 'zh' ? '中文为主' : '中国語メイン')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguagePref('ja')}
                    className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all ${
                      languagePref === 'ja'
                        ? 'bg-white border-[#B85A3A] ring-2 ring-[#B85A3A]/20 text-[#2A2522] font-semibold'
                        : 'bg-white/70 border-[#E5DACD] text-[#5C534B]'
                    }`}
                  >
                    {b?.languages?.ja || (lang === 'zh' ? '日语为主' : '日本語メイン')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguagePref('both')}
                    className={`p-2.5 rounded-xl text-xs font-medium text-center border transition-all ${
                      languagePref === 'both'
                        ? 'bg-white border-[#B85A3A] ring-2 ring-[#B85A3A]/20 text-[#2A2522] font-semibold'
                        : 'bg-white/70 border-[#E5DACD] text-[#5C534B]'
                    }`}
                  >
                    {b?.languages?.both || (lang === 'zh' ? '中日双语均可' : 'どちらでもOK')}
                  </button>
                </div>
              </div>

              {/* Student details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-[#524941] mb-1 font-medium">
                    {b.studentName} <span className="text-[#B85A3A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={b.studentNamePlaceholder}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#524941] mb-1 font-medium">
                    {b.phone} <span className="text-[#B85A3A]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={b.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-[#524941] mb-1 font-medium">
                    {b.email} <span className="text-[#B85A3A]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={b.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#524941] mb-1 font-medium">
                    {b.contactAccount}
                  </label>
                  <input
                    type="text"
                    placeholder={b.contactAccountPlaceholder}
                    value={contactAccount}
                    onChange={(e) => setContactAccount(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-xs text-[#524941] mb-1 font-medium">
                  {b.experienceLevel}
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                >
                  <option value="beginner">{b?.levels?.beginner || '初学者'}</option>
                  <option value="intermediate">{b?.levels?.intermediate || '中级'}</option>
                  <option value="advanced">{b?.levels?.advanced || '进阶'}</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-[#524941] mb-1 font-medium">
                  {b.notes}
                </label>
                <input
                  type="text"
                  placeholder={b.notesPlaceholder}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-white focus:outline-hidden focus:border-[#B85A3A]"
                />
              </div>

              {/* Summary Price bar */}
              <div className="p-4 bg-[#F2ECE4] rounded-2xl border border-[#E2D5C5] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7A6E63] block">{selectedCourse.title[lang]}</span>
                  <span className="text-xs font-semibold text-[#2A2522]">{selectedDate} · {selectedTimeSlot} ({attendeeCount}人)</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#7A6E63]">{t.courses.cardPrice}</div>
                  <div className="text-lg font-bold text-[#B85A3A] font-serif-title">
                    ¥{totalPrice}
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Bottom Stepper Navigation */}
        {!confirmedBooking && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#EAE0D4] flex items-center justify-between shrink-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-full border border-[#D5C6B5] text-xs font-semibold text-[#544A41] hover:bg-[#F5EFEB] transition-colors"
              >
                {lang === 'zh' ? '上一步' : '戻る'}
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-7 py-2.5 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-all"
              >
                <span>{lang === 'zh' ? '下一步' : '次へ進む'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-details-form"
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{b.submitting}</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#FFE2D1]" />
                    <span>{b.confirmBtn} (¥{totalPrice})</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
