import React, { useState, useEffect } from 'react';
import { ArtworkDetail } from '../data/galleryData';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  X,
  Heart,
  Clock,
  Palette,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';

interface GalleryDetailModalProps {
  artwork: ArtworkDetail | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLike: (id: string) => void;
  isLiked?: boolean;
}

export const GalleryDetailModal: React.FC<GalleryDetailModalProps> = ({
  artwork,
  isOpen,
  onClose,
  lang,
  onLike,
  isLiked = false,
}) => {
  const t = translations[lang];
  const [activeSlide, setActiveSlide] = useState(0);

  // Reset slide index when opened or changed
  useEffect(() => {
    setActiveSlide(0);
  }, [artwork?.id, isOpen]);

  if (!isOpen || !artwork) return null;

  const slides = artwork.images && artwork.images.length > 0
    ? artwork.images
    : [{ url: artwork.image, caption: { ja: artwork.title.ja, zh: artwork.title.zh } }];

  const currentSlide = slides[activeSlide] || slides[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      id="gallery-detail-backdrop"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="gallery-detail-container"
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E5DCD0] flex flex-col lg:flex-row text-[#2C2825] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          id="gallery-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C2825] shadow-md transition-all active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Interactive Multi-Image Viewer */}
        <div className="lg:w-7/12 relative bg-[#1E1B18] min-h-[320px] lg:min-h-[520px] flex flex-col justify-between overflow-hidden select-none">
          {/* Main Photo View */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4">
            <img
              key={currentSlide.url}
              src={currentSlide.url}
              alt={currentSlide.caption[lang] || artwork.title[lang]}
              className="max-h-[52vh] lg:max-h-[64vh] w-auto max-w-full object-contain rounded-xl shadow-md transition-opacity duration-300"
            />

            {/* Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  aria-label="Next"
                  onClick={handleNext}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Top Bar Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C2825] text-xs font-bold shadow-xs">
                {artwork.category === 'craft'
                  ? lang === 'ja' ? '立体粘土・手工' : '立体造型与超轻粘土'
                  : artwork.category === 'kids-art'
                  ? lang === 'ja' ? '少児創作絵画' : '少儿创意美术'
                  : artwork.category === 'adult'
                  ? lang === 'ja' ? '成人美術・素描' : '成人美术作品'
                  : lang === 'ja' ? 'アトリエ実景' : '教室教学实录'}
              </span>

              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-xs">
                <ImageIcon className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>{activeSlide + 1} / {slides.length}</span>
              </span>
            </div>
          </div>

          {/* Bottom Bar: Caption & Thumbnails Strip */}
          <div className="bg-black/80 backdrop-blur-md p-3 sm:p-4 text-white flex flex-col gap-2.5 border-t border-white/10 z-10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                {currentSlide.caption[lang]}
              </p>

              <button
                type="button"
                id="modal-like-btn"
                onClick={() => onLike(artwork.id)}
                className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isLiked ? 'fill-[#E84A27] text-[#E84A27]' : 'text-white/80'
                  }`}
                />
                <span>{artwork.likes + (isLiked ? 1 : 0)}</span>
              </button>
            </div>

            {/* Thumbnail Strip */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                {slides.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activeSlide
                        ? 'border-[#E84A27] scale-105 shadow-sm ring-1 ring-[#E84A27]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Story, Creator & Teacher Review */}
        <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[48vh] lg:max-h-full">
          <div>
            {/* Title & Creator */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#2C2825] leading-snug mb-1.5">
                {artwork.title[lang]}
              </h3>
              <div className="text-xs text-[#7A6E63] flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#B85A3A]">
                  {artwork.studentName[lang]}
                </span>
                <span>·</span>
                <span>{artwork.ageOrBio[lang]}</span>
              </div>
            </div>

            {/* Specs Checklist */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFC9] space-y-2 mb-4 text-xs">
              <div className="flex items-start gap-2">
                <Palette className="w-3.5 h-3.5 text-[#B85A3A] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8C8075]">{t.gallery.modal.medium}: </span>
                  <span className="font-medium text-[#2C2825]">{artwork.medium[lang]}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#558B2F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#8C8075]">
                    {lang === 'ja' ? '制作時間' : '完成周期'}:{' '}
                  </span>
                  <span className="font-medium text-[#2C2825]">
                    {artwork.completionTime[lang]}
                  </span>
                </div>
              </div>
            </div>

            {/* Student Comment / Story */}
            <div className="mb-4">
              <div className="text-[11px] font-bold text-[#8C8075] uppercase tracking-wider mb-1.5">
                {t.gallery.modal.comment}
              </div>
              <p className="text-xs sm:text-sm text-[#5C4F44] leading-relaxed italic bg-white/70 p-3.5 rounded-xl border border-[#EAE1D3]">
                {artwork.studentComment[lang]}
              </p>
            </div>

            {/* Teacher Feedback */}
            <div className="mb-4">
              <div className="text-[11px] font-bold text-[#8C8075] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E84A27]" />
                <span>{t.gallery.modal.teacherComment}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4F44] leading-relaxed bg-[#FAF0E6] p-3.5 rounded-xl border border-[#E8D7C6]">
                {artwork.teacherFeedback[lang]}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {artwork.tags[lang].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-[#EDE5DA] text-[10px] font-medium text-[#6E6155]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#EAE1D3] flex justify-end">
            <button
              type="button"
              id="btn-close-gallery-modal"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-[#2C2825] hover:bg-[#433C37] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              {t.gallery.modal.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
