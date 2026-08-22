import React, { useState } from 'react';
import { ArtHouseLogo } from './ArtHouseLogo';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  MessageCircle,
  Calendar,
  Sparkles,
  ChevronDown,
  Car,
  Languages,
  Users,
  Palette,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface CoverViewProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  onEnterSite?: () => void;
  onEnterInterior?: () => void;
  onOpenWebBooking: () => void;
  onOpenLineBooking: () => void;
}

export const CoverView: React.FC<CoverViewProps> = ({
  lang,
  onLanguageChange,
  onEnterSite,
  onEnterInterior,
  onOpenWebBooking,
  onOpenLineBooking,
}) => {
  const t = translations[lang];
  const [doubleClickHintAnim, setDoubleClickHintAnim] = useState(false);

  const handleEnter = () => {
    if (onEnterSite) {
      onEnterSite();
    } else if (onEnterInterior) {
      onEnterInterior();
    }
  };

  const handleContainerDoubleClick = () => {
    setDoubleClickHintAnim(true);
    setTimeout(() => {
      handleEnter();
    }, 200);
  };

  return (
    <div
      id="cover-landing"
      onDoubleClick={handleContainerDoubleClick}
      className={`relative min-h-screen w-full bg-[#FAF7F2] text-[#2C2825] flex flex-col justify-between select-none overflow-hidden transition-opacity duration-500 ${
        doubleClickHintAnim ? 'scale-[0.99] opacity-90' : ''
      }`}
      style={{
        backgroundImage: `radial-gradient(#E5DCD0 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Soft Ambient Light Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F8E9DC]/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#E7EFE0]/50 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      {/* Top Header Bar on Cover */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Left Top Logo (Image 1 replica) */}
        <div className="flex items-center gap-3">
          <ArtHouseLogo size="lg" />
          <div className="hidden md:flex flex-col border-l border-[#E2D8CC] pl-3 py-0.5 whitespace-nowrap">
            <span className="text-[11px] font-medium text-[#7A6E63] tracking-wide whitespace-nowrap">
              {lang === 'ja' ? '天白区 少人数制絵画教室' : '天白区 精致小班美术空间'}
            </span>
            <span className="text-[10px] text-[#A3978B] whitespace-nowrap">
              {lang === 'ja' ? '中国語メイン · 日本語対応 · 駐車場2台' : '中文为主 · 日语辅助 · 免费车位2台'}
            </span>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#EFE9DF] border border-[#E0D5C7] text-xs">
            <button
              type="button"
              id="cover-lang-ja"
              onClick={() => onLanguageChange('ja')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'ja'
                  ? 'bg-white text-[#2C2825] shadow-xs'
                  : 'text-[#7A6E63] hover:text-[#2C2825]'
              }`}
            >
              日本語
            </button>
            <button
              type="button"
              id="cover-lang-zh"
              onClick={() => onLanguageChange('zh')}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                lang === 'zh'
                  ? 'bg-white text-[#2C2825] shadow-xs'
                  : 'text-[#7A6E63] hover:text-[#2C2825]'
              }`}
            >
              中文
            </button>
          </div>

          {/* Direct Enter Interior Button */}
          <button
            type="button"
            id="cover-enter-interior-top"
            onClick={handleEnter}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2C2825] text-white text-xs font-medium hover:bg-[#433C37] transition-all shadow-xs"
          >
            <span>{t.cover.enterButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Center Cover Hero Area */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12 flex-1 flex flex-col items-center justify-center text-center">
        {/* Subtle Decorative Atelier Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3EC] border border-[#E9DCD0] text-[#B85A3A] text-xs font-medium mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Art House Atelier · Nagoya Tempaku</span>
        </div>

        {/* Center Main Slogan / Catchphrase */}
        <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-normal text-[#2C2825] tracking-tight leading-[1.3] sm:leading-[1.25] max-w-4xl mx-auto mb-5 drop-shadow-2xs">
          {lang === 'ja' ? (
            <>
              <span className="inline-block">自分だけの色彩に出会う、</span>
              <span className="inline-block">穏やかな時間。</span>
            </>
          ) : (
            <>
              <span className="inline-block">在自然光与木香中，</span>
              <span className="inline-block">绘出内心的纯粹与宁静</span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-lg text-[#685D54] max-w-2xl mx-auto font-light leading-relaxed mb-8">
          {lang === 'ja' ? (
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span className="inline-block">少人数制 · 日中バイリンガル対応</span>
              <span className="hidden sm:inline text-[#B85A3A]">·</span>
              <span className="inline-block">手ぶらで通える天白区のアトリエ</span>
            </span>
          ) : (
            <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span className="inline-block">精致小班 · 中日双语教学</span>
              <span className="hidden sm:inline text-[#B85A3A]">·</span>
              <span className="inline-block">画材全包 · 名古屋市天白区艺术工坊</span>
            </span>
          )}
        </p>

        {/* Studio Core Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl w-full mb-8">
          <div className="p-3 rounded-2xl bg-white/85 border border-[#E8DFC9] shadow-2xs flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-[#F4EDE4] text-[#B85A3A] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#2C2825]">
                {t.cover.quickSpecs.location}
              </div>
              <div className="text-[10px] text-[#7A6E63]">{t.cover.quickSpecs.locationSub}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/85 border border-[#E8DFC9] shadow-2xs flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-[#EAF2E5] text-[#558B2F] flex items-center justify-center shrink-0">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#2C2825]">
                {t.cover.quickSpecs.language}
              </div>
              <div className="text-[10px] text-[#7A6E63]">{t.cover.quickSpecs.languageSub}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/85 border border-[#E8DFC9] shadow-2xs flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#2C2825]">
                {t.cover.quickSpecs.parking}
              </div>
              <div className="text-[10px] text-[#7A6E63]">{t.cover.quickSpecs.parkingSub}</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/85 border border-[#E8DFC9] shadow-2xs flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#2C2825]">
                {t.cover.quickSpecs.materials}
              </div>
              <div className="text-[10px] text-[#7A6E63]">
                {t.cover.quickSpecs.materialsSub}
              </div>
            </div>
          </div>
        </div>

        {/* Double Click / Tap Hint Bar */}
        <div
          onClick={handleEnter}
          className="group cursor-pointer inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#DDD3C4] shadow-xs text-[#5D5248] text-xs font-medium transition-all hover:scale-102"
        >
          <span className="w-2 h-2 rounded-full bg-[#E84A27] animate-ping" />
          <span>{t.cover.enterHint}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#E84A27] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </main>

      {/* Bottom Cover Action Links (LINE & WEB Reservation) */}
      <footer className="relative z-20 w-full max-w-5xl mx-auto px-5 sm:px-8 pb-8 pt-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E5DCD0] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs sm:text-sm font-semibold text-[#2C2825] tracking-wide">
              {lang === 'ja' ? '体験レッスン・ご見学 随時受付中' : '常年开放体验课与参观预约'}
            </span>
            <span className="text-[11px] sm:text-xs text-[#7A6E63] mt-0.5">
              {lang === 'ja'
                ? '画材完備・手ぶらOK · 中国語・日本語どちらでもお気軽にどうぞ'
                : '画材全包 · 零基础轻松来画 · 中日双语随时咨询'}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* LINE Reservation Link */}
            <button
              type="button"
              id="cover-btn-line-reserve"
              onClick={onOpenLineBooking}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#06C755] hover:bg-[#05B34C] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>{t.cover.lineReserve}</span>
            </button>

            {/* WEB Reservation Link */}
            <button
              type="button"
              id="cover-btn-web-reserve"
              onClick={onOpenWebBooking}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#E84A27] hover:bg-[#D53D1C] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.cover.webReserve}</span>
            </button>
          </div>
        </div>

        {/* Access snippet in footer */}
        <div className="mt-3 flex items-center justify-center text-center text-[11px] text-[#8C8075] gap-2">
          <span>愛知県名古屋市天白区植田西1丁目707番地1</span>
          <span>·</span>
          <span>駐車場2台完備</span>
        </div>
      </footer>
    </div>
  );
};
