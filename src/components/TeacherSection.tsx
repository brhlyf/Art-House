import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import teacherPortraitImg from '../assets/images/regenerated_image_1786801356488.jpg';
import {
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle,
  Quote,
  Languages,
  BookOpen,
  Calendar,
} from 'lucide-react';

interface TeacherSectionProps {
  lang: Language;
  onOpenWebBooking?: () => void;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({
  lang,
  onOpenWebBooking,
}) => {
  const t = translations[lang];

  return (
    <section id="teacher" className="py-16 sm:py-24 bg-[#F5EFEB] border-b border-[#EBE3D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.teacher.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-4">
            {t.teacher.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] font-light max-w-2xl mx-auto leading-relaxed">
            {t.teacher.subtitle}
          </p>
        </div>

        {/* Teacher Profile Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-[#E8DFC9] shadow-sm overflow-hidden flex flex-col lg:flex-row">
          {/* Left: Teacher Portrait & Visual Card */}
          <div className="lg:w-2/5 relative bg-[#FAF7F2] p-8 flex flex-col items-center justify-between text-center border-b lg:border-b-0 lg:border-r border-[#EBE3D8]">
            <div className="w-full flex justify-end">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EAF2E5] text-[#558B2F] text-[11px] font-semibold">
                <Languages className="w-3.5 h-3.5" />
                <span>{lang === 'ja' ? '日中バイリンガル' : '中日双语指导'}</span>
              </span>
            </div>

            <div className="my-6">
              {/* Elegant Profile Avatar */}
              <div className="relative w-40 h-40 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-[#E84A27] via-[#D97706] to-[#558B2F] shadow-md">
                <img
                  src={teacherPortraitImg}
                  alt={t.teacher.name}
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h3 className="text-2xl font-bold text-[#2C2825] mt-4 mb-1">
                {t.teacher.name}
              </h3>
              <p className="text-xs font-semibold text-[#B85A3A] tracking-wide">
                {t.teacher.role}
              </p>
            </div>

            {/* Academic Credential Pills */}
            <div className="w-full space-y-2 text-left">
              <div className="p-3 rounded-xl bg-white border border-[#E8DFC9] flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#C5221F] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#8C8075] font-medium">
                    {lang === 'ja' ? '学歴・専攻' : '最高学历'}
                  </div>
                  <div className="font-semibold text-[#2C2825]">{t.teacher.academic}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#E8DFC9] flex items-center gap-3 text-xs">
                <div className="w-8 h-8 rounded-lg bg-[#FAF0E6] text-[#D97706] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-[#8C8075] font-medium">
                    {lang === 'ja' ? '指導実績' : '教学资历'}
                  </div>
                  <div className="font-semibold text-[#2C2825]">{t.teacher.experience}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio, Pedagogy & Strengths */}
          <div className="lg:w-3/5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#8C8075] uppercase tracking-wider mb-3">
                {lang === 'ja' ? '講師メッセージ・教育理念' : '教学初心与师资背景'}
              </h4>

              {/* Bio Paragraphs */}
              <div className="text-xs sm:text-sm text-[#5D5146] leading-relaxed space-y-3 mb-6 whitespace-pre-line">
                {t.teacher.bio}
              </div>

              {/* Key Strengths Checklist */}
              <div className="mb-6">
                <h5 className="text-xs font-bold text-[#2C2825] mb-3">
                  {lang === 'ja' ? '専門分野・レッスンの特徴' : '教学专长与核心特色'}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {t.teacher.strengths.map((str) => (
                    <div
                      key={str}
                      className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE3D8] flex items-start gap-2 text-xs text-[#52463D]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#558B2F] shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher Quote */}
            <div className="p-4 rounded-2xl bg-[#FAF0E6] border border-[#E8D6C4] relative">
              <Quote className="w-6 h-6 text-[#E84A27]/20 absolute top-3 right-3" />
              <p className="text-xs sm:text-sm font-medium text-[#7C351E] italic leading-relaxed">
                {t.teacher.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
