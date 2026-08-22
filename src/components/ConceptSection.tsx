import React from 'react';
import { UserCheck, Sparkles, Languages, Coffee, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ConceptSectionProps {
  lang: Language;
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const featureIcons = [
    <UserCheck className="w-5 h-5 text-[#B85A3A]" key="user" />,
    <Sparkles className="w-5 h-5 text-[#B85A3A]" key="sparkles" />,
    <Languages className="w-5 h-5 text-[#B85A3A]" key="lang" />,
    <Coffee className="w-5 h-5 text-[#B85A3A]" key="coffee" />,
  ];

  return (
    <section id="concept" className="py-20 md:py-28 bg-[#F5EFEB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Conceptual Text & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EAE0D3] text-[#8C4A31] text-xs font-semibold tracking-wider">
              <span>{t.concept.tag}</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2A2522] leading-tight font-normal">
              {t.concept.title}
            </h2>

            <p className="text-base text-[#5A5149] leading-relaxed">
              {t.concept.paragraph1}
            </p>

            <p className="text-base text-[#5A5149] leading-relaxed">
              {t.concept.paragraph2}
            </p>

            {/* Quote callout box */}
            <div className="p-5 rounded-2xl bg-white/70 border-l-4 border-[#B85A3A] text-sm text-[#473F38] italic font-serif-title shadow-2xs">
              {lang === 'zh'
                ? '“在 Art House，没有一幅画会被评判对与错。每一笔涂抹，都是你当下心情最真挚的呼吸。”'
                : '「Art Houseでは、絵の上手い下手は関係ありません。あなたが筆を動かしたそのひとすじが、世界に一つの宝物です。」'}
            </div>
          </div>

          {/* Right Column: 4 Core Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {t.concept.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E3D7C8] shadow-xs hover:border-[#CBB5A1] hover:shadow-sm transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    {featureIcons[idx % featureIcons.length]}
                  </div>
                  <h3 className="text-base font-semibold text-[#2A2522] mb-2 font-serif-title">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6359] leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center text-[11px] font-medium text-[#8C5840]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[#B85A3A]" />
                  <span>{lang === 'zh' ? '贴心保障' : '安心のサポート'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
