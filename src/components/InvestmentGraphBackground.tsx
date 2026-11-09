import React from 'react';

interface InvestmentGraphBackgroundProps {
  className?: string;
  variant?: 'hero' | 'full';
}

export const InvestmentGraphBackground: React.FC<InvestmentGraphBackgroundProps> = ({
  className = '',
  variant = 'hero',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* 1. Atmospheric Ambient Radial Glows (matching the glowing bokeh & gradient in the reference image) */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-fuchsia-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-400/15 via-sky-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" />

      {/* 2. Vector Investment Graph & Geometric Wave Ribbon (Pure SVG, no external files) */}
      <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Wave Gradient: Cyan -> Purple -> Magenta (exact reference colors) */}
          <linearGradient id="invWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#8B5CF6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="invWaveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="invChartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="trendLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#D946EF" />
          </linearGradient>

          {/* Dotted Grid Pattern */}
          <pattern id="financialGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#E2E8F0" opacity="0.65" />
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F1F5F9" strokeWidth="0.75" />
          </pattern>
        </defs>

        {/* Subtle Financial Coordinate Grid in Background */}
        <rect width="100%" height="100%" fill="url(#financialGrid)" opacity="0.7" />

        {/* Financial Upward Growth Trend Area (Compound return simulation fill) */}
        <path
          d="M 680,620 Q 820,580 960,490 T 1180,310 T 1360,190 L 1440,150 L 1440,800 L 680,800 Z"
          fill="url(#invChartAreaGrad)"
        />

        {/* Primary Investment Trend Line (Bullish Market Trajectory) */}
        <path
          d="M 680,620 Q 820,580 960,490 T 1180,310 T 1360,190 L 1440,150"
          stroke="url(#trendLineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="0"
          className="drop-shadow-sm"
        />

        {/* Dotted Projection Guideline */}
        <path
          d="M 500,680 L 680,620"
          stroke="#8B5CF6"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.45"
        />

        {/* Financial Data Markers / Nodes along the trend line */}
        <g opacity="0.95">
          <circle cx="960" cy="490" r="5" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="1180" cy="310" r="6" fill="#D946EF" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="1360" cy="190" r="7" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="3" />
        </g>

        {/* Ethereal Sinuous Vector Ribbons / Guilloche Waves (As seen in the right side of the user reference image) */}
        <g opacity="0.75">
          {/* Curve 1 */}
          <path
            d="M 850,750 C 980,600 1020,400 1150,330 C 1280,260 1380,310 1480,220"
            stroke="url(#invWaveGrad1)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Curve 2 */}
          <path
            d="M 865,745 C 995,595 1035,395 1165,325 C 1295,255 1395,305 1495,215"
            stroke="url(#invWaveGrad1)"
            strokeWidth="1"
            fill="none"
            opacity="0.9"
          />
          {/* Curve 3 */}
          <path
            d="M 880,740 C 1010,590 1050,390 1180,320 C 1310,250 1410,300 1510,210"
            stroke="url(#invWaveGrad1)"
            strokeWidth="0.9"
            fill="none"
            opacity="0.8"
          />
          {/* Curve 4 */}
          <path
            d="M 895,735 C 1025,585 1065,385 1195,315 C 1325,245 1425,295 1525,205"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.7"
          />
          {/* Curve 5 */}
          <path
            d="M 910,730 C 1040,580 1080,380 1210,310 C 1340,240 1440,290 1540,200"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          {/* Curve 6 */}
          <path
            d="M 925,725 C 1055,575 1095,375 1225,305 C 1355,235 1455,285 1555,195"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.5"
          />
          {/* Curve 7 */}
          <path
            d="M 940,720 C 1070,570 1110,370 1240,300 C 1370,230 1470,280 1570,190"
            stroke="url(#invWaveGrad1)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.45"
          />
          {/* Curve 8 */}
          <path
            d="M 955,715 C 1085,565 1125,365 1255,295 C 1385,225 1485,275 1585,185"
            stroke="url(#invWaveGrad1)"
            strokeWidth="0.7"
            fill="none"
            opacity="0.4"
          />
          {/* Curve 9 */}
          <path
            d="M 970,710 C 1100,560 1140,360 1270,290 C 1400,220 1500,270 1600,180"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.65"
            fill="none"
            opacity="0.35"
          />
          {/* Curve 10 */}
          <path
            d="M 985,705 C 1115,555 1155,355 1285,285 C 1415,215 1515,265 1615,175"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.3"
          />
        </g>

        {/* Counter-flow harmonic lines (adds mathematical depth to the financial waves) */}
        <g opacity="0.45">
          <path
            d="M 720,680 C 880,590 1020,620 1180,480 C 1300,380 1380,410 1460,330"
            stroke="url(#invWaveGrad2)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 735,675 C 895,585 1035,615 1195,475 C 1315,375 1395,405 1475,325"
            stroke="url(#invWaveGrad1)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 750,670 C 910,580 1050,610 1210,470 C 1330,370 1410,400 1490,320"
            stroke="url(#invWaveGrad1)"
            strokeWidth="0.7"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
