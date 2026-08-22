import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { X, MessageCircle, Copy, Check, ExternalLink, PhoneCall } from 'lucide-react';

interface LineModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const LineModal: React.FC<LineModalProps> = ({ isOpen, onClose, lang }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  if (!isOpen) return null;

  const rawPhone = '08070613354';
  const formattedPhone = '080-7061-3354';
  const lineUrl = `https://line.me/ti/p/~${rawPhone}`;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(rawPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="line-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="line-modal-container"
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5DCD0] text-[#2C2825] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          id="line-modal-close"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EDE4D8] hover:bg-[#E2D6C7] text-[#6B5E53] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with LINE Green Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#06C755] flex items-center justify-center text-white shadow-md">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2C2825]">{t.lineModal.title}</h3>
            <p className="text-xs text-[#7A6E63]">{t.lineModal.subtitle}</p>
          </div>
        </div>

        {/* LINE & Phone Card */}
        <div className="my-5 p-5 rounded-2xl bg-white border border-[#E8DFC9] flex flex-col items-center justify-center shadow-xs text-center">
          {/* QR Code Card */}
          <div className="relative p-3 bg-[#FAF7F2] rounded-xl border border-[#E2D8CC] mb-3">
            <svg
              viewBox="0 0 160 160"
              className="w-32 h-32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="160" height="160" fill="white" rx="8" />
              {/* Corner 1 */}
              <rect x="16" y="16" width="40" height="40" rx="6" fill="#06C755" />
              <rect x="24" y="24" width="24" height="24" rx="3" fill="white" />
              <rect x="30" y="30" width="12" height="12" rx="2" fill="#06C755" />

              {/* Corner 2 */}
              <rect x="104" y="16" width="40" height="40" rx="6" fill="#06C755" />
              <rect x="112" y="24" width="24" height="24" rx="3" fill="white" />
              <rect x="118" y="30" width="12" height="12" rx="2" fill="#06C755" />

              {/* Corner 3 */}
              <rect x="16" y="104" width="40" height="40" rx="6" fill="#06C755" />
              <rect x="24" y="112" width="24" height="24" rx="3" fill="white" />
              <rect x="30" y="118" width="12" height="12" rx="2" fill="#06C755" />

              {/* Pattern Blocks */}
              <rect x="68" y="16" width="10" height="20" fill="#2C2825" />
              <rect x="84" y="16" width="10" height="10" fill="#2C2825" />
              <rect x="68" y="44" width="26" height="10" fill="#2C2825" />
              <rect x="16" y="68" width="20" height="10" fill="#2C2825" />
              <rect x="44" y="68" width="14" height="26" fill="#2C2825" />
              <rect x="68" y="68" width="24" height="24" rx="4" fill="#06C755" />
              <rect x="104" y="68" width="18" height="10" fill="#2C2825" />
              <rect x="130" y="68" width="14" height="20" fill="#2C2825" />
              <rect x="68" y="104" width="10" height="20" fill="#2C2825" />
              <rect x="88" y="104" width="20" height="10" fill="#2C2825" />
              <rect x="116" y="96" width="28" height="10" fill="#2C2825" />
              <rect x="116" y="114" width="14" height="30" fill="#2C2825" />
              <rect x="88" y="124" width="18" height="20" fill="#2C2825" />
              <rect x="68" y="134" width="10" height="10" fill="#2C2825" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white border border-[#06C755] flex items-center justify-center shadow-xs">
                <MessageCircle className="w-4 h-4 fill-[#06C755] text-[#06C755]" />
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#2C2825] mb-1">
            {lang === 'ja' ? 'LINE登録電話番号 / ID' : 'LINE 关联电话号码 / 账号'}:{' '}
            <span className="text-[#06C755] font-mono font-bold text-sm tracking-wide">
              {formattedPhone}
            </span>
          </div>

          <p className="text-[11px] text-[#7A6E63] leading-relaxed max-w-xs">
            {lang === 'ja'
              ? 'LINEの友だち追加で電話番号「080-7061-3354」を検索、または下記のボタンから直接追加できます。'
              : '可在 LINE 搜索电话号码「080-7061-3354」添加好友，或点击下方按钮直接在 LINE 中打开。'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              id="line-modal-copy-phone"
              onClick={handleCopyPhone}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#EFE7DC] hover:bg-[#E5DCCF] text-[#4A3F36] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981]">
                    {lang === 'ja' ? '番号をコピーしました！' : '已复制电话号码！'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{lang === 'ja' ? '電話番号をコピー' : '复制电话号码'}</span>
                </>
              )}
            </button>

            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="line-modal-open-app"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#06C755] hover:bg-[#05B34C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>{t.lineModal.openLineApp}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Direct Phone Call Button */}
          <a
            href={`tel:${rawPhone}`}
            id="line-modal-direct-call"
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF5EE] border border-[#D5C6B5] text-[#2C2825] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E84A27]" />
            <span>
              {lang === 'ja' ? `お電話でのお問い合わせ (${formattedPhone})` : `直接拨打电话咨询 (${formattedPhone})`}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
