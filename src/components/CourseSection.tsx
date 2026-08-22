import React, { useState } from 'react';
import { Sparkles, Clock, Users, ArrowRight, Eye, Check } from 'lucide-react';
import { Course, Language } from '../types';
import { coursesData } from '../data/coursesData';
import { translations } from '../data/translations';
import { CourseDetailModal } from './CourseDetailModal';

interface CourseSectionProps {
  lang: Language;
  onBookCourse: (courseId: string) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ lang, onBookCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDetailCourse, setActiveDetailCourse] = useState<Course | null>(null);

  const t = translations[lang];

  const categories = [
    { key: 'all', label: t.courses.categories.all },
    { key: 'trial', label: t.courses.categories.trial },
    { key: 'oil', label: t.courses.categories.oil },
    { key: 'watercolor', label: t.courses.categories.watercolor },
    { key: 'acrylic', label: t.courses.categories.acrylic },
    { key: 'sketch', label: t.courses.categories.sketch },
    { key: 'ceramic', label: t.courses.categories.ceramic },
    { key: 'kids', label: t.courses.categories.kids },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? coursesData
    : coursesData.filter((c) => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C4A31] text-xs font-semibold tracking-wider mb-3">
            <span>{t.courses.tag}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2A2522] leading-tight mb-4">
            {t.courses.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E6359] font-light">
            {t.courses.subtitle}
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedCategory === cat.key
                  ? 'bg-[#B85A3A] text-white shadow-xs font-semibold'
                  : 'bg-white text-[#5E544B] border border-[#E5DACE] hover:border-[#C4B29E] hover:bg-[#F7F0E6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DFC5] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Course Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE2D5]">
                  <img
                    src={course.image}
                    alt={course.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#8C4A31] shadow-2xs">
                      {course.badge[lang]}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration[lang]}</span>
                    </span>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-title text-xl font-semibold text-[#2A2522] group-hover:text-[#B85A3A] transition-colors leading-snug">
                      {course.title[lang]}
                    </h3>
                    <p className="text-xs text-[#7A6F65] mt-1 line-clamp-2">
                      {course.subtitle[lang]}
                    </p>
                  </div>

                  {/* Level & Capacity */}
                  <div className="flex items-center justify-between text-xs text-[#6B6156] py-2 border-y border-[#F3ECE3]">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-[#7A8B7B]" />
                      <span>{course.level[lang]}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-[#A08876]" />
                      <span>{course.maxStudents} {lang === 'zh' ? '人精致班' : '名定員'}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags[lang].map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#8C644E]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Course Card Footer / Price & Actions */}
              <div className="p-5 sm:p-6 pt-0 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs text-[#7A6F65]">
                    {course.trialPrice ? t.courses.trialBadge : t.courses.cardPrice}
                  </div>
                  <div className="text-right">
                    {course.trialPrice ? (
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-xl font-bold text-[#B85A3A] font-serif-title">
                          ¥{course.trialPrice}
                        </span>
                        <span className="text-xs text-[#9E9388] line-through font-light">
                          ¥{course.price}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-[#2A2522] font-serif-title">
                        ¥{course.price}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDetailCourse(course)}
                    className="w-full py-2.5 px-3 rounded-full border border-[#D5C6B5] hover:bg-[#F2ECE4] text-xs font-medium text-[#4D453E] transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#73685E]" />
                    <span>{t.courses.viewDetails}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookCourse(course.id)}
                    className="w-full py-2.5 px-3 rounded-full bg-[#B85A3A] hover:bg-[#9E4326] text-white text-xs font-semibold shadow-2xs transition-all flex items-center justify-center space-x-1"
                  >
                    <span>{t.courses.quickBook}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={activeDetailCourse}
        lang={lang}
        onClose={() => setActiveDetailCourse(null)}
        onBookCourse={onBookCourse}
      />
    </section>
  );
};
