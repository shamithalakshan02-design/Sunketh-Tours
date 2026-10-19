import { MapWaypoint } from '../data/travelData';
import { MapPin, Navigation, Milestone } from 'lucide-react';

interface SriLankaMapProps {
  waypoints?: MapWaypoint[];
  totalKm?: number;
  tourTitle?: string;
  activeStopIndex?: number;
  onSelectStop?: (index: number) => void;
  className?: string;
  showAllHubs?: boolean;
}

export default function SriLankaMap({
  waypoints = [],
  totalKm,
  tourTitle,
  activeStopIndex,
  onSelectStop,
  className = '',
  showAllHubs = false
}: SriLankaMapProps) {

  // Coordinates converted to SVG 0-400 x 0-600 viewBox
  const mapWidth = 360;
  const mapHeight = 520;

  const toSvgX = (percentX: number) => (percentX / 100) * mapWidth;
  const toSvgY = (percentY: number) => (percentY / 100) * mapHeight;

  // Generate SVG path for waypoints
  const pathString = waypoints.length > 1
    ? waypoints.reduce((acc, wp, idx) => {
        const x = toSvgX(wp.x);
        const y = toSvgY(wp.y);
        return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '')
    : '';

  return (
    <div className={`relative bg-[#f8f3ee] border border-[#c59b27]/30 rounded-[6px] p-4 shadow-sm overflow-hidden flex flex-col items-center justify-between ${className}`}>
      
      {/* Header bar with Tour Title & Kilometers Badge */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-2 border-b border-[#e5dece]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c59b27] flex items-center gap-1">
            <Navigation className="w-3 h-3 text-[#c59b27]" />
            Sri Lanka Journey Route Map
          </span>
          {tourTitle && (
            <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#0b1b3d] truncate max-w-xs">
              {tourTitle}
            </h4>
          )}
        </div>

        {totalKm !== undefined && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b1b3d] text-white rounded-[4px] border border-[#c59b27]/40 shadow-sm shrink-0">
            <Milestone className="w-3.5 h-3.5 text-[#eed58a]" />
            <span className="text-xs font-semibold tabular-nums">
              {totalKm} km
            </span>
            <span className="text-[10px] text-white/70 uppercase">Total Route</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full max-w-[340px] aspect-[360/520] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(11,27,61,0.06)]"
        >
          <defs>
            {/* Sri Lanka subtle terrain gradient */}
            <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f2ede8" />
              <stop offset="100%" stopColor="#ded9d4" />
            </linearGradient>

            {/* Glowing route stroke */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b1b3d" />
              <stop offset="50%" stopColor="#c59b27" />
              <stop offset="100%" stopColor="#0f5a47" />
            </linearGradient>

            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Authentic Stylized Sri Lanka Island Geometry */}
          <path
            d="M 140,25 
               C 160,20 180,40 190,65 
               C 210,85 240,110 260,150 
               C 275,180 280,220 270,260 
               C 285,290 295,330 290,365 
               C 280,400 250,440 215,465 
               C 185,485 150,490 120,470 
               C 95,450 85,420 90,390 
               C 80,360 85,320 90,285 
               C 85,250 85,210 95,175 
               C 105,140 120,110 125,75 
               C 130,50 135,30 140,25 Z"
            fill="url(#islandGradient)"
            stroke="#c59b27"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Jaffna Peninsula and Northern Islands */}
          <path
            d="M 125,75 C 120,50 130,20 145,15 C 160,18 165,35 155,50 Z"
            fill="#f2ede8"
            stroke="#c59b27"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* Internal Elevation / Highlands contour indicator */}
          <path
            d="M 160,280 C 180,270 210,290 205,330 C 190,360 165,350 155,320 Z"
            fill="#0f5a47"
            fillOpacity="0.06"
            stroke="#0f5a47"
            strokeWidth="0.8"
            strokeDasharray="2,3"
          />

          {/* Sea / Ocean Latitude Waterlines */}
          <circle cx="50" cy="50" r="1.5" fill="#75777f" opacity="0.3" />
          <circle cx="310" cy="80" r="1.5" fill="#75777f" opacity="0.3" />
          <circle cx="320" cy="460" r="1.5" fill="#75777f" opacity="0.3" />
          <circle cx="40" cy="480" r="1.5" fill="#75777f" opacity="0.3" />

          {/* Route Path Polyline */}
          {pathString && (
            <>
              {/* Outer Glow */}
              <path
                d={pathString}
                fill="none"
                stroke="#c59b27"
                strokeWidth="5"
                strokeOpacity="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Core Solid Line */}
              <path
                d={pathString}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="2.5"
                strokeDasharray="5,4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </>
          )}

          {/* Waypoints Render */}
          {waypoints.map((wp, idx) => {
            const x = toSvgX(wp.x);
            const y = toSvgY(wp.y);
            const isActive = activeStopIndex === idx;

            return (
              <g
                key={`${wp.name}-${idx}`}
                className="cursor-pointer group"
                onClick={() => onSelectStop && onSelectStop(idx)}
              >
                {/* Ping animation ring if active */}
                {isActive && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#c59b27"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                )}

                {/* Outer Marker Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? "7" : "5"}
                  fill={isActive ? "#c59b27" : "#0b1b3d"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />

                {/* Inner Center Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#ffffff"
                />

                {/* Stop Number Label */}
                <text
                  x={x + 9}
                  y={y + 4}
                  fontSize="9"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontWeight="bold"
                  fill="#0b1b3d"
                  className="pointer-events-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                >
                  {wp.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Compass Rose Accent */}
        <div className="absolute top-2 right-2 text-[10px] text-[#75777f] font-mono tracking-widest pointer-events-none flex flex-col items-center">
          <span className="font-bold text-[#c59b27]">N</span>
          <span className="text-[8px]">▲</span>
        </div>
      </div>

      {/* Footer Navigation Waypoints Pill List */}
      {waypoints.length > 0 && (
        <div className="w-full mt-3 pt-2.5 border-t border-[#e5dece] flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-[#45464e]">
          {waypoints.map((wp, idx) => (
            <button
              key={`pill-${idx}`}
              onClick={() => onSelectStop && onSelectStop(idx)}
              className={`cursor-pointer px-2 py-0.5 rounded-[3px] border transition-colors flex items-center gap-1 ${
                activeStopIndex === idx
                  ? 'bg-[#0b1b3d] text-white border-[#0b1b3d]'
                  : 'bg-white text-[#1d1b19] border-[#e5dece] hover:border-[#c59b27]'
              }`}
            >
              <span className="font-bold text-[#c59b27]">{idx + 1}</span>
              <span>{wp.name}</span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
