import React from 'react';
import { ArtHouseLogo } from './ArtHouseLogo';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  MapPin,
  Car,
  Languages,
  Calendar,
  MessageCircle,
  ArrowUp,
  Home,
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  onOpenWebBooking: () => void;
  onOpenLineBooking: () => void;
  onReturnToCover: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenWebBooking,
  onOpenLineBooking,
  onReturnToCover,
}) => {
  const t = translations[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2825] text-[#D8CFCE] pt-14 pb-10 border-t border-[#453E3A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#433B36]">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <ArtHouseLogo size="lg" textColor="#FFFFFF" />

            <p className="text-xs sm:text-sm text-[#B3A6A0] leading-relaxed max-w-md pt-2">
              {t.footer.desc}
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#3B3430] text-[#E0D5CE] border border-[#4E443F]">
                📍 名古屋市天白区植田西
              </span>
              <span className="px-3 py-1 rounded-full bg-[#3B3430] text-[#E0D5CE] border border-[#4E443F]">
                🚗 駐車場2台完備
              </span>
              <span className="px-3 py-1 rounded-full bg-[#3B3430] text-[#E0D5CE] border border-[#4E443F]">
                🗣️ 中文 / 日本語対応
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.links}
            </h4>
            <ul className="space-y-2 text-xs text-[#B3A6A0]">
              <li>
                <button
                  type="button"
                  onClick={onReturnToCover}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{t.nav.cover}</span>
                </button>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#teacher" className="hover:text-white transition-colors">
                  {t.nav.instructors}
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-white transition-colors">
                  {t.nav.courses}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faq}
                </a>
              </li>
              <li>
                <a href="#access" className="hover:text-white transition-colors">
                  {t.nav.access}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Booking Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.contact}
            </h4>

            <div className="text-xs text-[#B3A6A0] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E84A27] shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#1967D2] shrink-0" />
                <span>駐車場2台完備（無料）</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#06C755] shrink-0" />
                <span>LINE / TEL: 080-7061-3354</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E84A27] text-xs">✉️</span>
                <a href="mailto:feidong185@gmail.com" className="hover:text-white transition-colors">
                  feidong185@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                id="footer-btn-line"
                onClick={onOpenLineBooking}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#06C755] hover:bg-[#05B34C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>LINE予約</span>
              </button>

              <button
                type="button"
                id="footer-btn-web"
                onClick={onOpenWebBooking}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#E84A27] hover:bg-[#D53D1C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>WEB予約</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright and language selector */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7C75]">
          <div>{t.footer.legal}</div>

          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-[#3B3430] border border-[#4E443F] text-[11px]">
              <button
                type="button"
                id="footer-lang-ja"
                onClick={() => onLanguageChange('ja')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  lang === 'ja' ? 'bg-[#FAF7F2] text-[#2C2825]' : 'text-[#A39486]'
                }`}
              >
                日本語
              </button>
              <button
                type="button"
                id="footer-lang-zh"
                onClick={() => onLanguageChange('zh')}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  lang === 'zh' ? 'bg-[#FAF7F2] text-[#2C2825]' : 'text-[#A39486]'
                }`}
              >
                中文
              </button>
            </div>

            {/* Back to top button */}
            <button
              type="button"
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#3B3430] hover:bg-[#4E443F] text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
