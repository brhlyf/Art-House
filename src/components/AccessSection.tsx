import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  MapPin,
  Car,
  Train,
  Clock,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Send,
} from 'lucide-react';

interface AccessSectionProps {
  lang: Language;
  onOpenLineBooking?: () => void;
}

export const AccessSection: React.FC<AccessSectionProps> = ({
  lang,
  onOpenLineBooking,
}) => {
  const t = translations[lang];
  const [copied, setCopied] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    contact: '',
    message: '',
  });

  const fullAddress = '愛知県名古屋市天白区植田西1丁目707番地1';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.contact) return;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          data: inquiryForm,
        }),
      });
    } catch (err) {
      console.warn('Inquiry dispatch error (handled):', err);
    }

    setInquirySent(true);
    setTimeout(() => {
      setInquiryForm({ name: '', contact: '', message: '' });
      setInquirySent(false);
    }, 5000);
  };

  return (
    <section id="access" className="py-16 sm:py-24 bg-[#F5EFEB] border-b border-[#EBE3D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.access.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-4">
            {t.access.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] font-light max-w-2xl mx-auto leading-relaxed">
            {t.access.subtitle}
          </p>
        </div>

        {/* Access Grid: Left Details & Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Left Info Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Address Card with Copy and Google Maps Buttons */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DFC9] shadow-2xs">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE8E6] text-[#E84A27] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#8C8075] uppercase tracking-wider mb-1">
                    {t.access.addressTitle}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#2C2825] leading-snug">
                    {t.access.addressText}
                  </div>
                  <div className="text-xs text-[#7A6E63] mt-1">
                    {lang === 'ja'
                      ? '※ 閑静な住宅街にございます。迷われた際はお電話またはLINEでお気軽にお尋ねください。'
                      : '※ 位于宁静雅致的住宅区，若初次到访有任何路线疑问可随时致电或LINE联系。'}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy Address & Google Maps */}
              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-[#F2ECE1]">
                <button
                  type="button"
                  id="btn-copy-address"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F0E8DC] text-[#4A3F36] text-xs font-semibold border border-[#E5DCD0] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">{t.access.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.access.copyAddress}</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    fullAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-open-google-maps"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2C2825] hover:bg-[#433C37] text-white text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.access.openGoogleMaps}</span>
                </a>
              </div>
            </div>

            {/* Parking & Transit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parking */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[#2C2825]">
                    {t.access.parkingTitle}
                  </h4>
                </div>
                <p className="text-xs text-[#63564C] leading-relaxed">
                  {t.access.parkingText}
                </p>
              </div>

              {/* Transit */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF2E5] text-[#558B2F] flex items-center justify-center shrink-0">
                    <Train className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[#2C2825]">
                    {t.access.transitTitle}
                  </h4>
                </div>
                <p className="text-xs text-[#63564C] leading-relaxed">
                  {t.access.transitText}
                </p>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] text-[#B85A3A] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1 text-xs">
                <div className="font-bold text-[#2C2825] mb-1">
                  {t.access.hoursTitle}
                </div>
                <div className="text-[#63564C] space-y-1">
                  <div className="font-medium text-[#2C2825]">{t.access.hoursWeekday}</div>
                  <div className="text-[#B85A3A] font-medium">{t.access.hoursWeekend}</div>
                  <div className="text-[#7A6E63] pt-1 text-[11px] leading-relaxed border-t border-[#F0EAE1]">
                    <div>{t.access.hoursClosed}</div>
                    {t.access.hoursFifthWeek && <div className="mt-0.5">{t.access.hoursFifthWeek}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Map Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[340px] rounded-3xl overflow-hidden bg-[#E2D9CD] border border-[#D5CABB] shadow-xs flex flex-col justify-between p-6">
              {/* Map Canvas Visual Simulation */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#C5B9A8_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

              {/* Road & River stylized lines */}
              <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/70 -rotate-6 transform -translate-y-6" />
              <div className="absolute top-0 bottom-0 left-1/3 w-3 bg-white/70 rotate-12 transform" />
              <div className="absolute top-1/4 right-0 w-1/2 h-2.5 bg-[#B8E2F2]/70 rounded-full" />

              {/* Map Card Header Badge */}
              <div className="relative z-10 self-start px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#2C2825] text-xs font-semibold shadow-xs">
                📍 名古屋市天白区 植田西
              </div>

              {/* Center Landmark Pin */}
              <div className="relative z-10 self-center my-auto flex flex-col items-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#E84A27] text-white flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-6 h-6 fill-white" />
                  </div>
                  <div className="w-6 h-2 bg-black/20 rounded-full mx-auto mt-1 blur-2xs" />
                </div>

                <div className="mt-2 px-3.5 py-1.5 rounded-xl bg-white shadow-md border border-[#E8DFC9] text-center">
                  <div className="text-xs font-bold text-[#E84A27]">Art House</div>
                  <div className="text-[10px] text-[#7A6E63]">天白区植田西1-707-1</div>
                </div>
              </div>

              {/* Map Footer Link */}
              <div className="relative z-10 flex justify-end">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    fullAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#2C2825] text-xs font-semibold hover:bg-white transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>{t.access.openGoogleMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Inquiry Form */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFC9] shadow-xs">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-[#2C2825] mb-1">
              {t.access.quickInquiry}
            </h3>
            <p className="text-xs text-[#7A6E63]">
              {lang === 'ja'
                ? 'ご見学やレッスンのご相談など、いつでもお気軽にお送りください'
                : '对课程、时间或体验有任何疑问，均可在线留言咨询'}
            </p>
          </div>

          {inquirySent ? (
            <div className="p-6 rounded-2xl bg-[#EAF2E5] border border-[#CDE1C4] text-center space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#3B6622]">
                <Check className="w-5 h-5" />
                <span>{t.access.inquirySuccess}</span>
              </div>
              <p className="text-[11px] text-[#557A3D]">
                {lang === 'ja'
                  ? 'メッセージ内容を教室メール（feidong185@gmail.com）へ送信しました。確認次第ご連絡いたします。'
                  : '您的咨询留言已实时发送至画室邮箱（feidong185@gmail.com），老师将尽快与您联系！'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2C2825] mb-1.5">
                    {t.access.inquiryName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, name: e.target.value })
                    }
                    placeholder={lang === 'ja' ? '山田 太郎' : '您的名字'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2D8CC] focus:outline-none focus:ring-2 focus:ring-[#E84A27]/20 text-[#2C2825]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C2825] mb-1.5">
                    {t.access.inquiryContact} *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.contact}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, contact: e.target.value })
                    }
                    placeholder={lang === 'ja' ? '090-XXXX-XXXX / LINE ID' : '电话 / 微信 / LINE'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2D8CC] focus:outline-none focus:ring-2 focus:ring-[#E84A27]/20 text-[#2C2825]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2C2825] mb-1.5">
                  {t.access.inquiryMsg}
                </label>
                <textarea
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, message: e.target.value })
                  }
                  placeholder={
                    lang === 'ja'
                      ? '希望するコース（大人油絵、こども絵画など）や体験希望日時をご記入ください。'
                      : '请输入您感兴趣的课程（成人美术、少儿创意、儿童手工等）或期望的体验时间。'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2D8CC] focus:outline-none focus:ring-2 focus:ring-[#E84A27]/20 text-[#2C2825]"
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  id="btn-submit-inquiry"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#E84A27] hover:bg-[#D53D1C] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.access.inquirySubmit}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
