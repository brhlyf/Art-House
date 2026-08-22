import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  Users,
  Languages,
  Car,
  Palette,
  Sparkles,
  Coffee,
  CheckCircle2,
  Heart,
} from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EBE3D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-5 whitespace-pre-line">
            {t.about.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] leading-relaxed font-light">
            {t.about.lead}
          </p>
        </div>

        {/* 4 Feature Cards (天白区小班 / 中文为主·日语辅助 / 停车场2台 / 画材全包) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {t.about.highlights.map((item, index) => {
            const icons = [Users, Languages, Car, Palette];
            const colors = ['#E84A27', '#558B2F', '#1967D2', '#D97706'];
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];

            return (
              <div
                key={item.title}
                className="p-6 rounded-3xl bg-white border border-[#E8DFC9] shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#2C2825] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#73665A] leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center gap-1.5 text-[11px] font-medium text-[#A39486]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#558B2F]" />
                  <span>
                    {lang === 'ja' ? '安心の個別サポート' : '全方位细致关照'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Atmosphere & Studio Philosophy Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#F5EFEB] to-[#EFE7DD] border border-[#E2D6C6] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B85A3A] mb-2">
              <Coffee className="w-4 h-4" />
              <span>
                {lang === 'ja' ? 'アトリエのこだわり' : '画室初心与舒适氛围'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2C2825] mb-3">
              {t.about.atmosphere.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#665A4F] leading-relaxed mb-4">
              {t.about.atmosphere.desc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-medium text-[#574B40] border border-[#E0D4C5]">
                {lang === 'ja' ? '🌿 自然光あふれるアトリエ' : '🌿 通透自然采光空间'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-medium text-[#574B40] border border-[#E0D4C5]">
                {lang === 'ja' ? '☕ お茶・手淹れ珈琲サービス' : '☕ 现磨咖啡与清香茶歇'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-medium text-[#574B40] border border-[#E0D4C5]">
                {lang === 'ja' ? '🎨 手ぶらで通える専門画材' : '🎨 进口画材免携带'}
              </span>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 p-5 rounded-2xl bg-white/90 border border-[#E8DFC9] text-center shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF0E6] text-[#E84A27] flex items-center justify-center mb-3">
              <Heart className="w-6 h-6 fill-[#E84A27]" />
            </div>
            <div className="text-sm font-bold text-[#2C2825] mb-1">
              {lang === 'ja' ? 'まずはお気軽に体験から' : '欢迎预约一次艺术体验'}
            </div>
            <div className="text-xs text-[#7A6E63] mb-3">
              {lang === 'ja' ? '手ぶらでOK · 道具すべて無料貸出' : '画材全包 · 零基础手布来画'}
            </div>
            <a
              href="#courses"
              className="inline-block w-full py-2.5 px-4 rounded-xl bg-[#2C2825] hover:bg-[#433C37] text-white text-xs font-semibold transition-colors"
            >
              {lang === 'ja' ? 'コース・体験を見る' : '探索课程与体验'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
