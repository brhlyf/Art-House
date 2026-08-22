import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Copy,
  Check,
  Send,
  Sparkles,
  Car,
  Train,
  MessageSquare,
  Instagram,
  QrCode,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface MapAndContactSectionProps {
  lang: Language;
}

export const MapAndContactSection: React.FC<MapAndContactSectionProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'directions'>('map');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const t = translations[lang];
  const access = t.access;

  const currentAddress = lang === 'zh' ? access.addressZh : access.addressJa;
  const currentStation = lang === 'zh' ? access.stationExitZh : access.stationExitJa;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim() || !inquiryMessage.trim()) {
      return;
    }
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryContact('');
      setInquiryMessage('');
    }, 1000);
  };

  return (
    <section id="access" className="py-20 md:py-28 bg-[#F5EFEB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8DDD0] text-[#8C4A31] text-xs font-semibold tracking-wider mb-3">
            <span>{access.tag}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2A2522] leading-tight mb-4">
            {access.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E6359] font-light">
            {access.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Interactive Map & Step Directions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tab switch between Styled Map and Photo Route Steps */}
            <div className="bg-white rounded-2xl p-1.5 border border-[#E2D6C6] inline-flex space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('map')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'map'
                    ? 'bg-[#B85A3A] text-white shadow-2xs font-semibold'
                    : 'text-[#61564C] hover:text-[#2A2522]'
                }`}
              >
                {access.mapTabTitle}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('directions')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'directions'
                    ? 'bg-[#B85A3A] text-white shadow-2xs font-semibold'
                    : 'text-[#61564C] hover:text-[#2A2522]'
                }`}
              >
                {access.directionTabTitle}
              </button>
            </div>

            {/* Main Interactive Map Canvas Simulator */}
            {activeTab === 'map' ? (
              <div className="bg-[#FAF8F5] rounded-3xl border border-[#E2D6C6] overflow-hidden shadow-xs relative aspect-[16/11] flex flex-col">
                {/* Simulated Stylized Map UI */}
                <div
                  className="relative w-full h-full bg-[#EFE9DF] overflow-hidden p-6 select-none transition-transform duration-300 origin-center"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  {/* Grid / Roads SVG overlay */}
                  <svg className="absolute inset-0 w-full h-full text-[#DFD5C6]" xmlns="http://www.w3.org/2000/svg">
                    {/* Background avenues and green parks */}
                    <rect x="10%" y="10%" width="30%" height="25%" rx="12" fill="#E2EADF" />
                    <text x="12%" y="18%" fill="#7A8F7B" fontSize="11" fontWeight="bold">
                      {lang === 'zh' ? '银杏林艺术公园' : 'イチョウ並木公園'}
                    </text>

                    {/* Main Avenue */}
                    <path
                      d="M 0 160 Q 200 150, 450 200 T 800 220"
                      stroke="#FFFFFF"
                      strokeWidth="24"
                      fill="none"
                    />
                    <path
                      d="M 280 0 L 280 400"
                      stroke="#FFFFFF"
                      strokeWidth="20"
                      fill="none"
                    />
                    <path
                      d="M 460 80 L 460 400"
                      stroke="#FFFFFF"
                      strokeWidth="16"
                      fill="none"
                    />

                    {/* Route Walking Trail with Dotted Line */}
                    <path
                      d="M 140 280 L 280 200 L 460 200 L 460 140"
                      stroke="#B85A3A"
                      strokeWidth="4"
                      strokeDasharray="6,6"
                      fill="none"
                    />
                  </svg>

                  {/* Subway Station Landmark Pin */}
                  <div className="absolute bottom-[24%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full shadow-md border border-[#D5C6B5] z-10">
                    <div className="w-5 h-5 rounded-full bg-[#2C62B0] text-white flex items-center justify-center">
                      <Train className="w-3 h-3" />
                    </div>
                    <div className="text-[11px] font-bold text-[#2A2522]">
                      {lang === 'zh' ? '地铁团结湖站 A口' : '地下鉄 大手町駅 A2'}
                    </div>
                  </div>

                  {/* Coffee Shop Landmark */}
                  <div className="absolute top-[48%] left-[38%] transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-2.5 py-1 rounded-lg text-[10px] text-[#736357] shadow-2xs border border-[#E0D4C5]">
                    ☕ Art & Coffee
                  </div>

                  {/* ART HOUSE Destination Pin */}
                  <div className="absolute top-[28%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                    <div className="animate-bounce">
                      <div className="bg-[#B85A3A] text-white p-2.5 rounded-full shadow-xl ring-4 ring-[#B85A3A]/30">
                        <MapPin className="w-6 h-6 fill-current text-white" />
                      </div>
                    </div>
                    <div className="mt-1 bg-[#2A2522] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                      ART HOUSE 3F
                    </div>
                  </div>

                  {/* Compass */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-xl border border-[#D5C6B5] text-[10px] font-bold text-[#63554A] flex flex-col items-center shadow-2xs">
                    <span>N</span>
                    <div className="w-0.5 h-3 bg-[#B85A3A] my-0.5" />
                    <span>S</span>
                  </div>
                </div>

                {/* Map Control overlay */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#D5C6B5] shadow-xs">
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.min(prev + 0.15, 1.45))}
                    className="p-1.5 text-[#54483E] hover:text-[#B85A3A] hover:bg-[#FAF0E6] rounded-lg transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.max(prev - 0.15, 0.85))}
                    className="p-1.5 text-[#54483E] hover:text-[#B85A3A] hover:bg-[#FAF0E6] rounded-lg transition-colors"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Step-by-Step Directions Guide */
              <div className="space-y-4">
                {access.routeSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-[#E5DACD] flex items-start space-x-4 shadow-2xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#B85A3A] font-serif-title font-bold text-base flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2A2522]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#63574D] mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Parking & transit callout */}
            <div className="p-4 bg-white rounded-2xl border border-[#E5DACD] flex items-center space-x-3 text-xs text-[#63574D]">
              <Car className="w-5 h-5 text-[#B85A3A] shrink-0" />
              <span>{access.parkingInfo}</span>
            </div>
          </div>

          {/* Right Column: Contact Details, Socials & Quick Inquiry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Copy box */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DACD] shadow-xs space-y-4">
              <div>
                <div className="text-xs font-bold text-[#8C4A31] uppercase tracking-wider mb-1 font-serif-title flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#B85A3A]" />
                  <span>{access.addressTitle}</span>
                </div>
                <p className="text-sm font-semibold text-[#2A2522] leading-snug">
                  {currentAddress}
                </p>
                <p className="text-xs text-[#7A6F65] mt-1">
                  {currentStation}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FAF0E6] hover:bg-[#F3E2D0] text-[#8C4A31] text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{access.copySuccess}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{lang === 'zh' ? '一键复制画室地址' : '住所をコピーする'}</span>
                  </>
                )}
              </button>

              <hr className="border-[#F0E8DC]" />

              {/* Hours */}
              <div className="space-y-1 text-xs">
                <div className="font-bold text-[#2A2522] flex items-center space-x-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B85A3A]" />
                  <span>{access.hoursTitle}</span>
                </div>
                <p className="text-[#63574D]">{access.hoursWeekday}</p>
                <p className="text-[#63574D]">{access.hoursWeekend}</p>
                <p className="text-[#96472D] font-medium">{access.hoursClosed}</p>
              </div>

              <hr className="border-[#F0E8DC]" />

              {/* Phone & Email */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-[#4A423A]">
                  <Phone className="w-3.5 h-3.5 text-[#B85A3A]" />
                  <span className="font-semibold">{access.phoneValue}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#4A423A]">
                  <Mail className="w-3.5 h-3.5 text-[#B85A3A]" />
                  <span>{access.emailValue}</span>
                </div>
              </div>

              {/* WeChat & LINE & IG */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE0D4]">
                  <div className="font-semibold text-[#2A2522]">{access.wechatTitle}</div>
                  <div className="text-[11px] text-[#7A6E63] mt-0.5">{access.wechatValue}</div>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE0D4]">
                  <div className="font-semibold text-[#2A2522]">{access.lineTitle}</div>
                  <div className="text-[11px] text-[#7A6E63] mt-0.5">{access.lineValue}</div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DACD] shadow-xs">
              <h3 className="font-serif-title text-lg font-semibold text-[#2A2522] mb-3 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#B85A3A]" />
                <span>{access.quickInquiryTitle}</span>
              </h3>

              {inquirySubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start space-x-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">{lang === 'zh' ? '留言已成功送达' : '送信完了'}</div>
                    <p className="mt-0.5 text-emerald-700">{access.inquirySuccess}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={access.inquiryName}
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#B85A3A] transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={access.inquiryContact}
                      value={inquiryContact}
                      onChange={(e) => setInquiryContact(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#B85A3A] transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder={access.inquiryMessage}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D5C6B5] bg-[#FAF8F5] focus:bg-white focus:outline-hidden focus:border-[#B85A3A] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2A2522] hover:bg-[#B85A3A] text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <span>{access.inquirySubmit}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
