import React from 'react';
import { Sparkles, ArrowRight, Heart, Coffee, ShieldCheck, Palette } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-canvas-texture">
      {/* Subtle organic gradient blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#F7E7D5]/40 via-[#F3DECB]/30 to-[#EAD4C0]/40 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-5 w-72 h-72 bg-[#FAF0E6]/60 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E8D9C8] text-[#9E4A2E] text-xs font-semibold tracking-wider uppercase mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B85A3A]" />
            <span>{t.hero.eyebrow}</span>
          </div>

          {/* Display Headings */}
          <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-normal text-[#2A2522] tracking-tight leading-[1.2] mb-6">
            <span className="block">{t.hero.titleLine1}</span>
            <span className="block font-italic text-[#A0482B] italic mt-1 sm:mt-2">
              {t.hero.titleLine2}
            </span>
          </h1>

          {/* Description Body */}
          <p className="text-base sm:text-lg text-[#61574F] font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-16">
            <button
              type="button"
              id="hero-book-now-btn"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white font-medium text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-2.5 active:scale-98"
            >
              <span>{t.hero.ctaBook}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#courses"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F7EFE6] text-[#4A423B] border border-[#DDD0C0] font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 shadow-2xs"
            >
              <Palette className="w-4 h-4 text-[#8C6D58]" />
              <span>{t.hero.ctaCourses}</span>
            </a>

            <a
              href="#gallery"
              className="w-full sm:w-auto px-6 py-4 rounded-full text-[#73675E] hover:text-[#2A2522] hover:bg-[#F2E8DC]/60 text-sm font-medium transition-all"
            >
              <span>{t.hero.ctaGallery}</span>
            </a>
          </div>
        </div>

        {/* Hero Atelier Visual Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
          {/* Left large photo */}
          <div className="md:col-span-7 relative group rounded-2xl overflow-hidden shadow-md border border-[#E8DFD3] bg-white aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1400&auto=format&fit=crop"
              alt="Art House Atelier interior"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/20 backdrop-blur-md mb-1.5">
                {lang === 'zh' ? '日光绘画大厅 · 榉木画架' : '自然光アトリエ · 木製イーゼル'}
              </span>
              <p className="text-sm font-serif-title font-light text-white/90">
                {lang === 'zh' ? '阳光倾洒的午后，一杯茶，一幅画' : 'やわらかな光が満ちる、穏やかな午後'}
              </p>
            </div>
          </div>

          {/* Right 2 stacked photos */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6">
            <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD3] bg-white aspect-[16/10] md:aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop"
                alt="Oil painting and palette"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                {lang === 'zh' ? '进口好宾油彩与调色板' : 'ホルベイン油絵具とパレット'}
              </div>
            </div>

            <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD3] bg-white aspect-[16/10] md:aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=800&auto=format&fit=crop"
                alt="Ceramics wheel workshop"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                {lang === 'zh' ? '和风手作陶艺与拉胚体验' : '和の陶芸手びねり＆電動ろくろ'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Stats Bar */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xs border border-[#E8DFD3] rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:border-[#D5C1AE] hover:shadow-xs"
            >
              <div className="font-serif-title text-2xl sm:text-3xl font-semibold text-[#A0482B] mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-[#2A2522] mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-[#7D7267] font-light">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
