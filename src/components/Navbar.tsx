import React, { useState, useEffect } from 'react';
import { ArtHouseLogo } from './ArtHouseLogo';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  Menu,
  MessageCircle,
  Calendar,
  Home,
  CheckCircle2,
  Phone,
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (newLang: Language) => void;
  onOpenWebBooking: () => void;
  onOpenLineBooking: () => void;
  onOpenMenu: () => void;
  onReturnToCover: () => void;
  bookingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenWebBooking,
  onOpenLineBooking,
  onOpenMenu,
  onReturnToCover,
  bookingCount = 0,
}) => {
  const t = translations[lang];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      href: '#about',
      label: lang === 'ja' ? '教室紹介' : '画室介绍',
      enLabel: 'ABOUT',
    },
    {
      href: '#teacher',
      label: lang === 'ja' ? '講師紹介' : '师资介绍',
      enLabel: 'TEACHER',
    },
    {
      href: '#courses',
      label: lang === 'ja' ? 'コース案内' : '课程体系',
      enLabel: 'COURSES',
    },
    {
      href: '#gallery',
      label: lang === 'ja' ? '生徒作品' : '学员作品',
      enLabel: 'GALLERY',
    },
    {
      href: '#faq',
      label: lang === 'ja' ? 'Ｑ＆Ａ' : '常见问题',
      enLabel: 'FAQ',
    },
    {
      href: '#access',
      label: lang === 'ja' ? 'アクセス' : '画室地址',
      enLabel: 'ACCESS',
    },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFC9] py-2.5'
          : 'bg-[#FAF7F2] border-b border-[#EBE3D8] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Art House Logo (matching Image 1) */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            id="nav-logo-link"
            className="hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArtHouseLogo size="md" />
          </a>

          {/* Symmetrical Subtitle Badge beside Logo */}
          <div className="hidden xl:flex flex-col border-l border-[#E2D8CC] pl-3 py-0.5 whitespace-nowrap">
            <span className="text-[11px] font-semibold text-[#2C2825] tracking-wide">
              {lang === 'ja' ? '天白区 少人数制アトリエ' : '天白区 精致小班画室'}
            </span>
            <span className="text-[10px] text-[#7A6E63] whitespace-nowrap">
              {lang === 'ja' ? '中国語メイン · 日本語対応' : '中文为主 · 日语辅助'}
            </span>
          </div>

          {/* Quick Return to Cover Button */}
          <button
            type="button"
            id="nav-return-cover-btn"
            onClick={onReturnToCover}
            className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFE8DE] hover:bg-[#E5DCCF] text-[#63574D] text-xs font-medium transition-colors"
            title="Return to Cover landing screen"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.nav.cover}</span>
          </button>
        </div>

        {/* Center: Desktop Navigation Links with Symmetrical 2-Line Typesetting */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center px-3 xl:px-3.5 py-1.5 rounded-xl text-[#3A322B] hover:text-[#E84A27] hover:bg-[#F3ECE0]/80 transition-all text-center group"
            >
              {/* Top Line: Japanese (e.g. 教室紹介, 講師紹介, 生徒作品) */}
              <span className="text-xs xl:text-[13px] font-bold text-[#2C2825] group-hover:text-[#E84A27] transition-colors leading-tight tracking-wider whitespace-nowrap">
                {link.label}
              </span>
              {/* Bottom Line: English sub-label, perfectly aligned and symmetrical */}
              <span className="text-[9px] xl:text-[10px] font-semibold text-[#8C8075] group-hover:text-[#B85A3A] uppercase tracking-widest mt-0.5 leading-none transition-colors whitespace-nowrap">
                {link.enLabel}
              </span>
            </a>
          ))}
        </nav>

        {/* Right: Quick Action Buttons & Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#EFE8DE] border border-[#DDD3C6] text-xs">
            <button
              type="button"
              id="navbar-lang-ja"
              onClick={() => onLanguageChange('ja')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                lang === 'ja'
                  ? 'bg-white text-[#2C2825] shadow-2xs font-semibold'
                  : 'text-[#7A6E63] hover:text-[#2C2825]'
              }`}
            >
              日本語
            </button>
            <button
              type="button"
              id="navbar-lang-zh"
              onClick={() => onLanguageChange('zh')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                lang === 'zh'
                  ? 'bg-white text-[#2C2825] shadow-2xs font-semibold'
                  : 'text-[#7A6E63] hover:text-[#2C2825]'
              }`}
            >
              中文
            </button>
          </div>

          {/* Quick LINE Reservation Button */}
          <button
            type="button"
            id="navbar-btn-line"
            onClick={onOpenLineBooking}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#06C755] hover:bg-[#05B34C] text-white text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
            <span className="whitespace-nowrap">{t.cover.lineReserve}</span>
          </button>

          {/* Quick WEB Reservation Button */}
          <button
            type="button"
            id="navbar-btn-web"
            onClick={onOpenWebBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E84A27] hover:bg-[#D53D1C] text-white text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">{t.nav.bookTrialBtn}</span>
          </button>

          {/* Menu Trigger Button (Menu右上角) */}
          <button
            type="button"
            id="navbar-menu-btn"
            onClick={onOpenMenu}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#2C2825] hover:bg-[#453D37] text-white text-xs font-semibold transition-all shadow-xs active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
            <span className="tracking-wide">MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
};
