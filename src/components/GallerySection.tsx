import React, { useState } from 'react';
import { galleryData, ArtworkDetail } from '../data/galleryData';
import { GalleryDetailModal } from './GalleryDetailModal';
import { translations } from '../data/translations';
import { Language } from '../types';
import {
  Sparkles,
  Heart,
  Eye,
  Filter,
  Palette,
  Scissors,
  Camera,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'adult' | 'kids-art' | 'craft' | 'scene'>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkDetail | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  
  // Independent slide index for each card by card id
  const [currentSlideMap, setCurrentSlideMap] = useState<Record<string, number>>({});

  const filterTabs = [
    { id: 'all', label: t.gallery.filterAll, icon: Filter },
    { id: 'adult', label: t.gallery.filterAdult, icon: Palette },
    { id: 'kids-art', label: t.gallery.filterKidsArt, icon: Sparkles },
    { id: 'craft', label: t.gallery.filterCraft, icon: Scissors },
    { id: 'scene', label: t.gallery.filterScene, icon: Camera },
  ];

  const filteredArtworks =
    activeFilter === 'all'
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrevSlide = (e: React.MouseEvent, artworkId: string, totalSlides: number) => {
    e.stopPropagation();
    setCurrentSlideMap((prev) => {
      const current = prev[artworkId] || 0;
      const next = (current - 1 + totalSlides) % totalSlides;
      return { ...prev, [artworkId]: next };
    });
  };

  const handleNextSlide = (e: React.MouseEvent, artworkId: string, totalSlides: number) => {
    e.stopPropagation();
    setCurrentSlideMap((prev) => {
      const current = prev[artworkId] || 0;
      const next = (current + 1) % totalSlides;
      return { ...prev, [artworkId]: next };
    });
  };

  const handleSelectSlide = (e: React.MouseEvent, artworkId: string, index: number) => {
    e.stopPropagation();
    setCurrentSlideMap((prev) => ({
      ...prev,
      [artworkId]: index,
    }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F5EFEB] border-b border-[#EBE3D8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.tag}</span>
          </div>

          <h2 className="font-serif-title text-2xl sm:text-4xl md:text-5xl font-normal text-[#2C2825] leading-tight mb-4">
            {t.gallery.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6B5E53] font-light max-w-2xl mx-auto leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                id={`gallery-filter-${tab.id}`}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#2C2825] text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#63564B] border border-[#E5DCD0]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4 Multi-Image Gallery Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredArtworks.map((artwork) => {
            const isLiked = !!likedMap[artwork.id];
            const slideCount = artwork.images?.length || 1;
            const currentSlideIndex = (currentSlideMap[artwork.id] || 0) % slideCount;
            const currentSlide = artwork.images?.[currentSlideIndex] || {
              url: artwork.image,
              caption: { ja: artwork.title.ja, zh: artwork.title.zh },
            };

            return (
              <div
                key={artwork.id}
                onClick={() => setSelectedArtwork(artwork)}
                className="group cursor-pointer rounded-3xl bg-white border border-[#E8DFC9] shadow-2xs hover:shadow-md transition-all flex flex-col overflow-hidden"
              >
                {/* Carousel Image Container */}
                <div className="relative aspect-16/10 w-full bg-[#EAE2D5] overflow-hidden select-none">
                  <img
                    key={currentSlide.url}
                    src={currentSlide.url}
                    alt={currentSlide.caption[lang] || artwork.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />

                  {/* Gradient Overlay for Top Badges & Bottom Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2C2825] text-xs font-bold shadow-xs">
                      {artwork.category === 'craft'
                        ? lang === 'ja' ? '立体粘土・手工' : '立体造型与粘土'
                        : artwork.category === 'kids-art'
                        ? lang === 'ja' ? '少児創作絵画' : '儿童创意画'
                        : artwork.category === 'adult'
                        ? lang === 'ja' ? '成人絵画・素描' : '成人美术作品'
                        : lang === 'ja' ? 'アトリエ実景' : '教室教学实景'}
                    </span>

                    {/* Image Counter Pill */}
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 shadow-xs">
                      <ImageIcon className="w-3 h-3 text-[#FBBF24]" />
                      <span>{currentSlideIndex + 1} / {slideCount}</span>
                    </span>
                  </div>

                  {/* Carousel Left / Right Arrows */}
                  {slideCount > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(e) => handlePrevSlide(e, artwork.id, slideCount)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 hover:bg-white text-[#2C2825] shadow-md transition-all hover:scale-110 active:scale-95 z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={(e) => handleNextSlide(e, artwork.id, slideCount)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/85 hover:bg-white text-[#2C2825] shadow-md transition-all hover:scale-110 active:scale-95 z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Bottom Info & Dot Indicators on the image */}
                  <div className="absolute bottom-3 left-4 right-4 flex flex-col gap-1.5 text-white pointer-events-none">
                    <p className="text-xs font-medium text-white/95 line-clamp-1 drop-shadow-xs">
                      {currentSlide.caption[lang]}
                    </p>

                    {/* Dots indicator */}
                    {slideCount > 1 && (
                      <div className="flex items-center gap-1.5 pointer-events-auto pt-0.5">
                        {artwork.images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            aria-label={`Go to slide ${idx + 1}`}
                            onClick={(e) => handleSelectSlide(e, artwork.id, idx)}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === currentSlideIndex
                                ? 'w-5 bg-white'
                                : 'w-1.5 bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#2C2825] leading-snug group-hover:text-[#E84A27] transition-colors">
                        {artwork.title[lang]}
                      </h3>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleLike(artwork.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFC9] text-xs text-[#7A6E63] hover:text-[#E84A27] transition-colors shrink-0"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isLiked ? 'fill-[#E84A27] text-[#E84A27]' : ''
                          }`}
                        />
                        <span>{artwork.likes + (isLiked ? 1 : 0)}</span>
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#665A4F] leading-relaxed mb-4">
                      {artwork.subtitle[lang]}
                    </p>

                    {/* Meta Spec Bar */}
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EBE3D8] text-xs text-[#7A6E63] space-y-1 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8075]">{lang === 'ja' ? '対象・クラス' : '受众 / 班级'}:</span>
                        <span className="font-semibold text-[#2C2825]">{artwork.studentName[lang]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8075]">{lang === 'ja' ? '画材・媒介' : '材料与媒介'}:</span>
                        <span className="font-medium text-[#2C2825]">{artwork.medium[lang]}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {artwork.tags[lang].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[11px] font-medium text-[#8C583E] border border-[#EBDCCF]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link to open modal */}
                  <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#B85A3A] font-semibold group-hover:text-[#E84A27]">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'ja' ? '全写真と指導解説を見る' : '查看完整相册与教学解析'}</span>
                    </span>
                    <span className="text-[11px] text-[#9E9083]">
                      {artwork.completionTime[lang]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Detail Modal */}
        <GalleryDetailModal
          artwork={selectedArtwork}
          isOpen={!!selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          lang={lang}
          onLike={handleToggleLike}
          isLiked={selectedArtwork ? !!likedMap[selectedArtwork.id] : false}
        />
      </div>
    </section>
  );
};
