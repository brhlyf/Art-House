import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { Sparkles, ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
  onOpenLineBooking?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  lang,
  onOpenLineBooking,
}) => {
  const t = translations[lang];
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]); // Open top 3 by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EBE3D8]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.faq.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-4">
            {t.faq.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] font-light max-w-2xl mx-auto leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-12">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndices.includes(index);

            return (
              <div
                key={item.q}
                className="rounded-2xl bg-white border border-[#E8DFC9] shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  id={`faq-toggle-${index}`}
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FAF0E6] text-[#E84A27] text-xs font-bold flex items-center justify-center shrink-0">
                      Q
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#2C2825]">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8075] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#E84A27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#665A4F] leading-relaxed border-t border-[#F5EFEB] flex items-start gap-3 bg-[#FAF8F5]">
                    <span className="w-6 h-6 rounded-full bg-[#EAF2E5] text-[#558B2F] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      A
                    </span>
                    <p className="pt-0.5 whitespace-pre-line">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help / LINE Consultation Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#F5EFEB] to-[#EFE7DD] border border-[#E2D6C6] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#2C2825] mb-1">
              {lang === 'ja'
                ? 'その他にご質問やご相談はございますか？'
                : '还有其他疑问或个性化需求？'}
            </h4>
            <p className="text-xs text-[#7A6E63]">
              {lang === 'ja'
                ? '公式LINEよりお気軽にご質問いただけます。'
                : '欢迎添加官方 LINE 或在线留言，老师将为您详细解答。'}
            </p>
          </div>

          {onOpenLineBooking && (
            <button
              type="button"
              id="faq-line-contact-btn"
              onClick={onOpenLineBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06C755] hover:bg-[#05B34C] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{lang === 'ja' ? 'LINEで質問する' : 'LINE 在线咨询'}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
