import React from 'react';
import { ArtHouseLogo } from './ArtHouseLogo';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  X,
  Sparkles,
  Palette,
  User,
  BookOpen,
  Image as ImageIcon,
  HelpCircle,
  MapPin,
  Calendar,
  MessageCircle,
  Car,
  Languages,
  ArrowRight,
  Home,
} from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection?: (sectionId: string) => void;
  onReturnToCover: () => void;
  onOpenWebBooking: () => void;
  onOpenLineBooking: () => void;
  onOpenMyBookings?: () => void;
  bookingCount?: number;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  onLanguageChange,
  onNavigateSection,
  onReturnToCover,
  onOpenWebBooking,
  onOpenLineBooking,
  onOpenMyBookings,
  bookingCount = 0,
}) => {
  const t = translations[lang];

  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'about',
      label: t.nav.about,
      badge: lang === 'ja' ? '天白区 少人数制' : '天白区 精致小班',
      summary:
        lang === 'ja'
          ? '天白区小班美術教室 · 中国語メイン/日本語対応 · 駐車場2台完備'
          : '天白区小班美术教室 · 中文为主/日语为辅 · 免费停车场2台',
      icon: Palette,
      color: '#E84A27',
    },
    {
      id: 'teacher',
      label: t.nav.instructors,
      badge: lang === 'ja' ? '美術学修士' : '重点大学硕士',
      summary:
        lang === 'ja'
          ? '中国重点大学美術学修士 · 15年+の美術指導経験'
          : '中国重点大学美术学硕士 · 15年+美术教学经验',
      icon: User,
      color: '#2563EB',
    },
    {
      id: 'courses',
      label: t.nav.courses,
      badge: lang === 'ja' ? '3コース展開' : '3大精选体系',
      summary:
        lang === 'ja'
          ? '成人美術（油絵/デッサン）· 少児創作美術 · 児童手工（粘土立体）'
          : '成人美术（油画/素描）· 少儿创意美术 · 儿童手工（超轻粘土）',
      icon: BookOpen,
      color: '#059669',
    },
    {
      id: 'gallery',
      label: t.nav.gallery,
      badge: lang === 'ja' ? '実例掲載' : '真实实景',
      summary:
        lang === 'ja'
          ? '深海粘土レリーフ、キノコの森、ピエロバッジ、インク少女肖像など'
          : '海底粘土浮雕、梦幻蘑菇、小丑胸针、蓝墨复古肖像与画室实景',
      icon: ImageIcon,
      color: '#D97706',
    },
    {
      id: 'faq',
      label: t.nav.faq,
      badge: 'Q & A',
      summary:
        lang === 'ja'
          ? 'バイリンガル指導、初心者歓迎、画材全完備、受講年齢について'
          : '双语教学、零基础入门、画材全包、适龄范围及常见问题解答',
      icon: HelpCircle,
      color: '#7C3AED',
    },
    {
      id: 'access',
      label: t.nav.access,
      badge: lang === 'ja' ? '植田西' : '天白区',
      summary:
        lang === 'ja'
          ? '名古屋市天白区植田西1丁目707番地1 · 駐車場2台完備'
          : '愛知県名古屋市天白区植田西1丁目707番地1 · 专属车位2台',
      icon: MapPin,
      color: '#DB2777',
    },
  ];

  const handleItemClick = (sectionId: string) => {
    onClose();
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div
      id="menu-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="menu-drawer-panel"
        className="relative w-full max-w-lg h-full bg-[#FAF7F2] text-[#2C2825] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-[#E2D8CC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header of Drawer */}
        <div className="p-6 sm:p-8 pb-4 border-b border-[#EBE3D8] flex items-center justify-between">
          <ArtHouseLogo size="md" />

          <div className="flex items-center gap-3">
            {/* Language Switch */}
            <div className="inline-flex items-center p-0.5 rounded-full bg-[#EDE5DB] border border-[#DDD3C6] text-xs">
              <button
                type="button"
                id="drawer-lang-ja"
                onClick={() => onLanguageChange('ja')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  lang === 'ja' ? 'bg-white text-[#2C2825] shadow-2xs' : 'text-[#7A6E63]'
                }`}
              >
                JP
              </button>
              <button
                type="button"
                id="drawer-lang-zh"
                onClick={() => onLanguageChange('zh')}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  lang === 'zh' ? 'bg-white text-[#2C2825] shadow-2xs' : 'text-[#7A6E63]'
                }`}
              >
                CN
              </button>
            </div>

            <button
              type="button"
              id="menu-drawer-close"
              onClick={onClose}
              className="p-2 rounded-full bg-[#EDE4D8] hover:bg-[#E2D5C6] text-[#4A3F36] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Navigation List */}
        <div className="flex-1 p-6 sm:p-8 py-6 space-y-2.5 overflow-y-auto">
          {/* Quick Return to Cover button */}
          <button
            type="button"
            id="drawer-nav-cover"
            onClick={() => {
              onClose();
              onReturnToCover();
            }}
            className="w-full text-left p-3.5 rounded-2xl bg-white/70 hover:bg-white border border-[#E5DCD0] flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F4EDE4] text-[#B85A3A] flex items-center justify-center">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#2C2825]">{t.nav.cover}</div>
                <div className="text-[11px] text-[#7A6E63]">
                  {lang === 'ja' ? 'トップ封面ページに戻る' : '返回封面欢迎页'}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#A89C91] group-hover:text-[#B85A3A] group-hover:translate-x-0.5 transition-all" />
          </button>

          <div className="pt-2 pb-1 text-[11px] font-semibold text-[#8C7F73] uppercase tracking-wider px-1">
            {lang === 'ja' ? '教室コンテンツ' : '画室专栏导航'}
          </div>

          {/* 6 Required Sub-pages/Sections */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                id={`drawer-nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className="w-full text-left p-4 rounded-2xl bg-white hover:bg-[#FFFDFC] border border-[#E8DFC9] shadow-2xs hover:shadow-xs group transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-sm text-[#2C2825] group-hover:text-[#E84A27] transition-colors">
                        {item.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A6E63] leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-6 sm:p-8 pt-4 bg-[#F5EFEB] border-t border-[#E8DFC9] space-y-3">
          {onOpenMyBookings && (
            <button
              type="button"
              id="drawer-btn-my-bookings"
              onClick={() => {
                onClose();
                onOpenMyBookings();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF5EE] border border-[#D5C6B5] text-xs font-semibold text-[#4A4139] flex items-center justify-between transition-colors shadow-2xs"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-[#B85A3A]" />
                <span>{t.nav.myBookings}</span>
              </div>
              {bookingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B85A3A] text-white text-[10px] font-bold flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {/* LINE Reservation */}
            <button
              type="button"
              id="drawer-btn-line"
              onClick={() => {
                onClose();
                onOpenLineBooking();
              }}
              className="py-3 px-3 rounded-xl bg-[#06C755] hover:bg-[#05B34C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.cover.lineReserve}</span>
            </button>

            {/* WEB Reservation */}
            <button
              type="button"
              id="drawer-btn-web"
              onClick={() => {
                onClose();
                onOpenWebBooking();
              }}
              className="py-3 px-3 rounded-xl bg-[#E84A27] hover:bg-[#D53D1C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.cover.webReserve}</span>
            </button>
          </div>

          <div className="text-[11px] text-center text-[#8C8075] pt-1">
            <span>愛知県名古屋市天白区植田西1丁目707番地1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
