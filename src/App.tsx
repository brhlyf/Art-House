/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, BookingData } from './types';
import { CoverView } from './components/CoverView';
import { Navbar } from './components/Navbar';
import { MenuDrawer } from './components/MenuDrawer';
import { AboutSection } from './components/AboutSection';
import { TeacherSection } from './components/TeacherSection';
import { CoursesSection } from './components/CoursesSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { AccessSection } from './components/AccessSection';
import { Footer } from './components/Footer';
import { LineModal } from './components/LineModal';
import { BookingModal } from './components/BookingModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { translations } from './data/translations';
import { Sparkles, Calendar, MessageCircle } from 'lucide-react';

const STORAGE_KEY_BOOKINGS = 'arthouse_user_bookings';
const STORAGE_KEY_LANG = 'arthouse_preferred_lang';

export default function App() {
  // Default to Japanese as requested
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return saved === 'zh' || saved === 'ja' ? saved : 'ja';
  });

  // State to track whether user has entered inside the site via double-click
  const [isInsideSite, setIsInsideSite] = useState<boolean>(false);

  // Menu Drawer State
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Booking Modals
  const [isLineModalOpen, setIsLineModalOpen] = useState<boolean>(false);
  const [isWebBookingOpen, setIsWebBookingOpen] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  // Saved bookings & My Bookings Drawer
  const [bookings, setBookings] = useState<BookingData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'ja';
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    const msg = newLang === 'ja' ? '日本語に切り替えました' : '已切换至中文模式';
    showToast(msg);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenWebBooking = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsWebBookingOpen(true);
  };

  const handleBookingCreated = (newBooking: BookingData) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(lang === 'ja' ? 'WEB予約を承りました！' : '预约已成功记录并为您锁定席位！');
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showToast(lang === 'ja' ? '予約をキャンセルしました' : '已取消该预约');
  };

  // If not inside site yet, render the Cover Page
  if (!isInsideSite) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] font-sans selection:bg-[#EBE0D0]">
        <CoverView
          lang={lang}
          onEnterSite={() => setIsInsideSite(true)}
          onEnterInterior={() => setIsInsideSite(true)}
          onOpenLineBooking={() => setIsLineModalOpen(true)}
          onOpenWebBooking={() => handleOpenWebBooking()}
          onLanguageChange={handleLanguageChange}
        />

        {/* LINE Modal available from cover */}
        <LineModal
          isOpen={isLineModalOpen}
          onClose={() => setIsLineModalOpen(false)}
          lang={lang}
        />

        {/* Web Booking Modal available from cover */}
        <BookingModal
          isOpen={isWebBookingOpen}
          onClose={() => setIsWebBookingOpen(false)}
          lang={lang}
          initialCourseId={selectedCourseId}
          onBookingCreated={handleBookingCreated}
        />
      </div>
    );
  }

  // Inside Site
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2825] flex flex-col font-sans selection:bg-[#EBE0D0]">
      {/* Top Fixed Header with Logo & Menu */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenWebBooking={() => handleOpenWebBooking()}
        onOpenLineBooking={() => setIsLineModalOpen(true)}
        onReturnToCover={() => setIsInsideSite(false)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pt-20">
        {/* 1. 画室介绍 (About) */}
        <AboutSection
          lang={lang}
          onOpenWebBooking={() => handleOpenWebBooking()}
          onOpenLineBooking={() => setIsLineModalOpen(true)}
        />

        {/* 2. 老师介绍 (Teacher) */}
        <TeacherSection
          lang={lang}
          onOpenWebBooking={() => handleOpenWebBooking()}
          onOpenLineBooking={() => setIsLineModalOpen(true)}
        />

        {/* 3. 课程介绍 (Courses) */}
        <CoursesSection
          lang={lang}
          onBookCourse={(courseId) => handleOpenWebBooking(courseId)}
        />

        {/* 4. 学员作品 (Gallery) */}
        <GallerySection lang={lang} />

        {/* 5. 常见问题 (FAQ) */}
        <FaqSection
          lang={lang}
          onOpenLineBooking={() => setIsLineModalOpen(true)}
        />

        {/* 6. 交通指南 (Access) */}
        <AccessSection
          lang={lang}
          onOpenLineBooking={() => setIsLineModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenWebBooking={() => handleOpenWebBooking()}
        onOpenLineBooking={() => setIsLineModalOpen(true)}
        onReturnToCover={() => setIsInsideSite(false)}
      />

      {/* Slide-out Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenWebBooking={() => handleOpenWebBooking()}
        onOpenLineBooking={() => setIsLineModalOpen(true)}
        onReturnToCover={() => setIsInsideSite(false)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={bookings.length}
      />

      {/* LINE Booking / Contact Modal */}
      <LineModal
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
        lang={lang}
      />

      {/* Web Booking Modal */}
      <BookingModal
        isOpen={isWebBookingOpen}
        onClose={() => setIsWebBookingOpen(false)}
        lang={lang}
        initialCourseId={selectedCourseId}
        onBookingCreated={handleBookingCreated}
      />

      {/* My Bookings Drawer */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        lang={lang}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onOpenBooking={() => {
          setIsMyBookingsOpen(false);
          handleOpenWebBooking();
        }}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#2C2825] text-white text-xs font-medium shadow-2xl border border-[#453D37] flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[#E84A27]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
