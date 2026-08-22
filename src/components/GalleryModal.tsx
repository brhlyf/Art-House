import React from 'react';
import { X, Heart, Clock, User, Sparkles, MessageCircle } from 'lucide-react';
import { StudentArtwork, Language } from '../types';
import { translations } from '../data/translations';

interface GalleryModalProps {
  artwork: StudentArtwork | null;
  lang: Language;
  onClose: () => void;
  onLike: (id: string) => void;
  isLiked: boolean;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  artwork,
  lang,
  onClose,
  onLike,
  isLiked,
}) => {
  if (!artwork) return null;

  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E3D7C8] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Left: High-resolution artwork photo */}
          <div className="lg:col-span-7 bg-[#231F1D] flex items-center justify-center p-4 sm:p-6 relative min-h-[300px]">
            <img
              src={artwork.image}
              alt={artwork.title[lang]}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-full bg-black/60 text-white/90 text-xs font-light backdrop-blur-md">
                {artwork.medium[lang]}
              </span>
            </div>
          </div>

          {/* Right: Story, student quote & teacher review */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF8F5]">
            <div className="space-y-5">
              <div>
                <span className="inline-block text-[11px] px-2.5 py-0.5 rounded bg-[#FAF0E6] text-[#8C4A31] font-semibold mb-2">
                  {lang === 'zh' ? '学员原创习作' : '受講生オリジナル作品'}
                </span>
                <h3 className="font-serif-title text-2xl font-semibold text-[#2A2522] leading-snug">
                  {artwork.title[lang]}
                </h3>
              </div>

              {/* Student info */}
              <div className="flex items-center space-x-3 p-3.5 bg-white rounded-2xl border border-[#EBE3D7]">
                <div className="w-10 h-10 rounded-full bg-[#FAF0E6] border border-[#DFCFC0] flex items-center justify-center text-[#B85A3A] font-serif-title font-bold text-sm">
                  {artwork.studentName[lang].charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#2A2522]">
                    {artwork.studentName[lang]}
                  </div>
                  <div className="text-xs text-[#7A6F65]">
                    {artwork.studentBio[lang]}
                  </div>
                </div>
              </div>

              {/* Completion time */}
              <div className="flex items-center space-x-2 text-xs text-[#6B6156]">
                <Clock className="w-4 h-4 text-[#A08876]" />
                <span>{t.gallery.completion}: {artwork.completionTime[lang]}</span>
              </div>

              {/* Student reflection */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#2A2522] uppercase tracking-wider font-serif-title">
                  <MessageCircle className="w-4 h-4 text-[#B85A3A]" />
                  <span>{t.gallery.studentVoice}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C5248] italic bg-[#F5EFEB] p-3.5 rounded-xl leading-relaxed border-l-2 border-[#B85A3A]">
                  {artwork.studentComment[lang]}
                </p>
              </div>

              {/* Teacher review */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#2A2522] uppercase tracking-wider font-serif-title">
                  <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t.gallery.teacherReview}</span>
                </div>
                <p className="text-xs text-[#63584F] bg-white p-3.5 rounded-xl leading-relaxed border border-[#EAE2D6]">
                  {artwork.teacherFeedback[lang]}
                </p>
              </div>
            </div>

            {/* Like & appreciation bar */}
            <div className="pt-4 border-t border-[#EAE1D5] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onLike(artwork.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isLiked
                    ? 'bg-[#B85A3A] text-white shadow-xs scale-105'
                    : 'bg-white border border-[#D5C6B5] text-[#544B43] hover:border-[#B85A3A] hover:text-[#B85A3A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? (lang === 'zh' ? '已赞赏' : 'いいね済') : t.gallery.likes} ({artwork.likes + (isLiked ? 1 : 0)})</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#7A6F65] hover:text-[#2A2522] underline underline-offset-4"
              >
                {lang === 'zh' ? '返回画廊' : 'ギャラリーへ戻る'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
