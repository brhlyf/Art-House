import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import adultCourseImg from '../assets/images/course_adult_art_1787057318060.jpg';
import kidsArtCourseImg from '../assets/images/course_kids_art_1787057335416.jpg';
import kidsClayCourseImg from '../assets/images/course_kids_clay_1787057356208.jpg';
import courseOnlineImg from '../assets/images/course_online_art_1787058843105.jpg';
import {
  Palette,
  Sparkles,
  Scissors,
  Video,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface CoursesSectionProps {
  lang: Language;
  onBookCourse: (courseId?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  lang,
  onBookCourse,
}) => {
  const t = translations[lang];

  const courseIcons = {
    adult: Palette,
    'kids-creative': Sparkles,
    'kids-craft': Scissors,
    'online-live': Video,
  };

  const courseImages = {
    adult: adultCourseImg,
    'kids-creative': kidsArtCourseImg,
    'kids-craft': kidsClayCourseImg,
    'online-live': courseOnlineImg,
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EBE3D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.courses.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-4">
            {t.courses.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] font-light max-w-2xl mx-auto leading-relaxed">
            {t.courses.subtitle}
          </p>
        </div>

        {/* 4 Course Cards in 2 Rows x 2 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-14">
          {t.courses.list.map((course) => {
            const Icon = courseIcons[course.id as keyof typeof courseIcons] || Palette;
            const bgImage = courseImages[course.id as keyof typeof courseImages];

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-white border border-[#E8DFC9] shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                {/* Course Header Banner */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#EAE2D5]">
                  <img
                    src={bgImage}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[#2C2825] text-xs font-bold shadow-xs">
                      {course.badge}
                    </span>
                  </div>

                  {/* Subtitle on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-medium text-white/90 mb-0.5">
                      {course.subtitle}
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow-xs">
                      {course.name}
                    </h3>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#665A4F] leading-relaxed mb-5">
                      {course.desc}
                    </p>

                    {/* Specs Grid */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D8] space-y-2.5 mb-5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8075] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{lang === 'ja' ? 'レッスン時間' : '授课时长'}</span>
                        </span>
                        <span className="font-semibold text-[#2C2825]">{course.duration}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8075] flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{lang === 'ja' ? '定員規模' : '每班席位'}</span>
                        </span>
                        <span className="font-semibold text-[#2C2825]">{course.capacity}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8075] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{lang === 'ja' ? '画材道具' : '画具提供'}</span>
                        </span>
                        <span className="font-semibold text-[#558B2F]">{course.materials}</span>
                      </div>

                      <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between">
                        <span className="text-[#8C8075] font-medium">
                          {lang === 'ja' ? '受講料目安' : '学费参考'}
                        </span>
                        <span className="font-bold text-[#E84A27]">{course.price}</span>
                      </div>
                    </div>

                    {/* Key features */}
                    <div className="space-y-1.5 mb-6">
                      {course.features.map((feat) => (
                        <div
                          key={feat}
                          className="flex items-center gap-2 text-xs text-[#594E44]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E84A27] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Trigger Button for this course */}
                  <button
                    type="button"
                    id={`btn-book-course-${course.id}`}
                    onClick={() => onBookCourse(course.id)}
                    className="w-full py-3 px-4 rounded-xl bg-[#2C2825] hover:bg-[#E84A27] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs group/btn"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.courses.bookThisCourse}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trial note banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF0E6] border border-[#E9D9C9] text-center text-xs sm:text-sm font-medium text-[#823A21] max-w-3xl mx-auto shadow-2xs">
          <div className="flex flex-col items-center justify-center gap-1 leading-relaxed">
            <span>
              {lang === 'ja'
                ? '※ すべてのコースで画材・道具不要、手ぶらでご参加いただけます。'
                : '※ 所有课程均常年设有单次体验课，画材工具全包。'}
            </span>
            <span className="text-[#B85A3A] font-semibold">
              {lang === 'ja'
                ? '「体験レッスン（1回）」を随時受付中！お気軽にご予約ください。'
                : '零基础亦可轻松参与，欢迎随时预约体验！'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
