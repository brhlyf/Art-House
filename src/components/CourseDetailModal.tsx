import React from 'react';
import { X, Clock, Users, Sparkles, Check, Calendar, ArrowRight, Shield } from 'lucide-react';
import { Course, Language } from '../types';
import { translations } from '../data/translations';

interface CourseDetailModalProps {
  course: Course | null;
  lang: Language;
  onClose: () => void;
  onBookCourse: (courseId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  lang,
  onClose,
  onBookCourse,
}) => {
  if (!course) return null;

  const t = translations[lang];
  const dm = t.courses.detailsModal;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F5] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E3D7C8] overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image banner & close button */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={course.image}
            alt={course.title[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-[#B85A3A] text-white text-xs font-semibold tracking-wider mb-2">
              {course.badge[lang]}
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-semibold tracking-wide leading-tight">
              {course.title[lang]}
            </h2>
            <p className="text-sm text-white/85 mt-1 font-light">
              {course.subtitle[lang]}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Key Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F2ECE4] rounded-2xl text-center border border-[#E4D7C8]">
            <div>
              <div className="text-xs text-[#7A6E63]">{t.courses.cardDuration}</div>
              <div className="text-sm font-semibold text-[#2A2522] mt-0.5">{course.duration[lang]}</div>
            </div>
            <div>
              <div className="text-xs text-[#7A6E63]">{t.courses.cardCapacity}</div>
              <div className="text-sm font-semibold text-[#2A2522] mt-0.5">{course.maxStudents} {lang === 'zh' ? '人/班' : '名/枠'}</div>
            </div>
            <div>
              <div className="text-xs text-[#7A6E63]">{t.courses.cardLevel}</div>
              <div className="text-sm font-semibold text-[#2A2522] mt-0.5 truncate">{course.level[lang]}</div>
            </div>
            <div>
              <div className="text-xs text-[#7A6E63]">{t.courses.cardPrice}</div>
              <div className="text-sm font-bold text-[#A0482B] mt-0.5">
                {course.trialPrice ? (
                  <span>
                    ¥{course.trialPrice}
                    <span className="text-[10px] line-through text-[#8C8176] ml-1 font-normal">¥{course.price}</span>
                  </span>
                ) : (
                  <span>¥{course.price}</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-[#2A2522] uppercase tracking-wider mb-2 font-serif-title">
              {lang === 'zh' ? '课程概述' : 'コース概要'}
            </h3>
            <p className="text-sm text-[#5C534B] leading-relaxed">
              {course.description[lang]}
            </p>
          </div>

          {/* Syllabus Steps */}
          <div>
            <h3 className="text-sm font-bold text-[#2A2522] uppercase tracking-wider mb-3 font-serif-title">
              {dm.syllabusTitle}
            </h3>
            <div className="space-y-3">
              {course.syllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-[#EAE1D4]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FAF0E6] text-[#B85A3A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2A2522]">
                      {item.title[lang]}
                    </h4>
                    <p className="text-xs text-[#6B6157] mt-0.5 leading-normal">
                      {item.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Materials */}
          <div>
            <h3 className="text-sm font-bold text-[#2A2522] uppercase tracking-wider mb-3 font-serif-title">
              {dm.includedMaterialsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.includedMaterials[lang].map((mat, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 text-xs text-[#524942] bg-[#F7F2EB] px-3 py-2 rounded-lg border border-[#E9E0D4]"
                >
                  <Check className="w-3.5 h-3.5 text-[#B85A3A] shrink-0" />
                  <span>{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="p-4 rounded-2xl bg-[#FAF3EC] border border-[#EBDCCF]">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#96472D] mb-1">
              <Calendar className="w-4 h-4" />
              <span>{dm.scheduleTitle}</span>
            </div>
            <p className="text-xs text-[#63554B]">
              {course.scheduleTime[lang]}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#E8DFC5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#7A6F65] hidden sm:block">
            {lang === 'zh' ? '※ 中日双语教学 · 支持零基础' : '※ 日中バイリンガル対応 · 初心者歓迎'}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-[#D5C6B5] text-xs font-medium text-[#5E544B] hover:bg-[#F2ECE4] transition-colors"
            >
              {dm.close}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookCourse(course.id);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>{dm.bookNowBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
