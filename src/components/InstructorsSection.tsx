import React from 'react';
import { GraduationCap, Languages, Sparkles, MessageSquareQuote } from 'lucide-react';
import { Instructor, Language } from '../types';
import { instructorsData } from '../data/instructorsData';
import { translations } from '../data/translations';

interface InstructorsSectionProps {
  lang: Language;
}

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="instructors" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C4A31] text-xs font-semibold tracking-wider mb-3">
            <span>{t.instructors.tag}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2A2522] leading-tight mb-4">
            {t.instructors.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E6359] font-light">
            {t.instructors.subtitle}
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructorsData.map((ins) => (
            <div
              key={ins.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DFC5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#E5DCD0]">
                  <img
                    src={ins.image}
                    alt={ins.name[lang]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Languages spoken badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/50 text-white text-[11px] backdrop-blur-md">
                    <Languages className="w-3 h-3 text-[#FFE2D1]" />
                    <span>{ins.languages.map((l) => l.toUpperCase()).join(' / ')}</span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif-title text-2xl font-semibold tracking-wide">
                      {ins.name[lang]}
                    </h3>
                    <p className="text-xs text-white/80 font-light mt-0.5">
                      {ins.role[lang]}
                    </p>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 space-y-4">
                  {/* Alma mater */}
                  <div className="flex items-start space-x-2 text-xs text-[#6B5F54] bg-[#F7F2EB] p-3 rounded-xl border border-[#EAE0D4]">
                    <GraduationCap className="w-4 h-4 text-[#B85A3A] shrink-0 mt-0.5" />
                    <span>{ins.almaMater[lang]}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#5C5248] leading-relaxed">
                    {ins.bio[lang]}
                  </p>

                  {/* Specialties */}
                  <div>
                    <div className="text-xs font-semibold text-[#3D352F] uppercase tracking-wider mb-2 font-serif-title">
                      {t.instructors.specialties}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {ins.specialties[lang].map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FAF0E6] text-[#8C5A42]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#F2ECE3] flex items-start space-x-2 text-xs text-[#7A6E63] italic">
                  <MessageSquareQuote className="w-4 h-4 text-[#B85A3A] shrink-0 mt-0.5" />
                  <p className="line-clamp-2">{ins.quote[lang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
