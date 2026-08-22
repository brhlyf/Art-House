import React from 'react';

interface ArtHouseLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
}

export const ArtHouseLogo: React.FC<ArtHouseLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor,
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base' },
    md: { icon: 44, text: 'text-xl' },
    lg: { icon: 58, text: 'text-2xl' },
    xl: { icon: 76, text: 'text-3xl' },
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Handcrafted Vector recreation of Image 1 Logo */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Yellow/Lime Drop Shadow offset */}
          <path
            d="M92 22 L36 78 C28 86 34 100 45 100 H52 V162 C52 170 58 176 66 176 H134 C142 176 148 170 148 162 V100 H155 C166 100 172 86 164 78 L108 22 C103 17 97 17 92 22 Z"
            fill="#D4E627"
            transform="translate(-6, 4)"
          />

          {/* Red Heart on Roof / Chimney */}
          <g transform="translate(112, 14) scale(0.9)">
            <path
              d="M24 10 C18 0, 0 0, 0 16 C0 30, 24 44, 24 44 C24 44, 48 30, 48 16 C48 0, 30 0, 24 10 Z"
              fill="#E84A27"
              transform="rotate(18, 24, 22)"
            />
          </g>

          {/* Main Green House Body */}
          <path
            d="M94 24 C97 21 103 21 106 24 L164 80 C171 87 166 98 156 98 H146 V158 C146 167 139 174 130 174 H70 C61 174 54 167 54 158 V98 H44 C34 98 29 87 36 80 L94 24 Z"
            fill="#7CB342"
          />

          {/* Inner Light Green Gradient Shading */}
          <path
            d="M95 28 L158 82 C162 86 159 92 153 92 H142 V156 C142 163 136 168 128 168 H72 C64 168 58 163 58 156 V92 H47 C41 92 38 86 42 82 L95 28 Z"
            fill="#8BC34A"
          />

          {/* Center Round Orange Window / Door Circle */}
          <circle cx="100" cy="102" r="23" fill="#E84A27" />
          <circle cx="97" cy="99" r="21" fill="#F4511E" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif-title font-black tracking-tight leading-none ${textSize} text-[#E84A27] drop-shadow-2xs`}
            style={{
              fontFamily: "'Fredoka', 'Comfortaa', 'Montserrat', 'M PLUS Rounded 1c', sans-serif",
              color: textColor || '#E84A27',
              letterSpacing: '-0.02em',
            }}
          >
            Art House
          </span>
          <span className="text-[10px] tracking-widest text-[#7A6E63] font-medium uppercase mt-0.5">
            Atelier & Studio
          </span>
        </div>
      )}
    </div>
  );
};
