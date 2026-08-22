import React from 'react';
import { Sparkles, Sun, Coffee, Layers, Compass } from 'lucide-react';
import { Language } from '../types';
import sceneGirlEasel from '../assets/images/scene_girl_easel_1787376177675.jpg';
import sceneStudentCanvas from '../assets/images/scene_student_canvas_1787376192061.jpg';
import sceneClayWorkshop from '../assets/images/scene_clay_workshop_1787376206983.jpg';
import sceneKidsDrawing from '../assets/images/scene_kids_drawing_1787376220297.jpg';

interface StudioEnvironmentSectionProps {
  lang: Language;
}

export const StudioEnvironmentSection: React.FC<StudioEnvironmentSectionProps> = ({ lang }) => {
  const photos = [
    {
      img: sceneKidsDrawing,
      title: lang === 'ja' ? '原木テーブルでの少人数創作' : '实木长桌少儿专注创作',
      desc:
        lang === 'ja'
          ? 'ゆったりとした大きな原木テーブルで、仲間と感性を刺激し合いながらのびのびと描く時間。'
          : '宽敞原木教学长桌，学员围坐专注作画，兼顾沉浸构思与伙伴间的灵感互动。',
      tag: lang === 'ja' ? '少人数クラス' : '小班私享',
    },
    {
      img: sceneClayWorkshop,
      title: lang === 'ja' ? '董先生の立体粘土ワークショップ' : '董老师手把手立体粘土指导',
      desc:
        lang === 'ja'
          ? '先生が手を取り合って形づくりを指導。色鮮やかな粘土で豊かな立体感覚を育みます。'
          : '老师亲自示范揉捏手法与多维海洋浮雕构图，在愉悦互动中激发孩子无限空间想象力。',
      tag: lang === 'ja' ? '立体造形指導' : '立体美育',
    },
    {
      img: sceneGirlEasel,
      title: lang === 'ja' ? 'イーゼルに向かうデッサン・着色' : '独立画架写生与调色',
      desc:
        lang === 'ja'
          ? '卓上木製イーゼルとパレットを用意し、自然光あふれる空間で集中して筆を走らせます。'
          : '配备专业实木桌面画架与多功能调色盘，在自然采光中培养良好的专注作画习惯。',
      tag: lang === 'ja' ? '個別指導' : '专注写生',
    },
    {
      img: sceneStudentCanvas,
      title: lang === 'ja' ? 'キャンバス油絵・アクリル制作' : '布面油画与个性化创作',
      desc:
        lang === 'ja'
          ? '生徒一人ひとりの描きたいテーマに寄り添い、下絵から着色まで丁寧にサポートします。'
          : '针对青少儿与成人学员个性化选题，从线稿起稿到层层平涂着色，提供全流程细致指引。',
      tag: lang === 'ja' ? '油彩・アクリル' : '油画与丙烯',
    },
  ];

  return (
    <section id="studio-tour" className="py-20 md:py-28 bg-[#F5EFEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9D9C9] text-[#B85A3A] text-xs font-semibold tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ja' ? 'ATELIER SCENE' : '教室教学实景'}</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-[#2A2522] leading-tight mb-4">
            {lang === 'ja'
              ? '自然光と温もりに包まれた、実際のレッスンの様子'
              : '充满自然采光与温润木质感的教学实景记录'}
          </h2>
          <p className="text-sm sm:text-base text-[#6E6359] font-light">
            {lang === 'ja'
              ? '少人数制だからできる、一人ひとりの個性と歩幅に寄り添う丁寧な時間'
              : '4~6人小班制精细辅导，记录每一次专注落笔与创意诞生的温暖瞬间'}
          </p>
        </div>

        {/* 4 Photo Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {photos.map((spot, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5DACD] shadow-xs group flex flex-col"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#E2D8CC]">
                <img
                  src={spot.img}
                  alt={spot.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#2A2522] text-xs font-bold shadow-xs">
                    {spot.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif-title text-xl font-semibold text-[#2A2522] mb-2">
                  {spot.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#665B51] leading-relaxed">
                  {spot.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
