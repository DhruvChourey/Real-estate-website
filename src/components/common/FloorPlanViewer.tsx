import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import type { Property } from '../../types';

interface FloorPlanViewerProps {
  floorPlans: Property['floorPlans'];
  propertyTitle: string;
}

export const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ floorPlans, propertyTitle }) => {
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const [hoveredRoom, setHoveredRoom] = useState<{ name: string; dims: string } | null>(null);

  if (!floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[activeLevelIdx] || floorPlans[0];

  return (
    <div className="bg-white border border-stone-200 p-4 sm:p-8 space-y-6">
      {/* Top Controls: Level Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-[11px] uppercase tracking-luxury text-bronze font-medium block">
            Architectural Schematics
          </span>
          <h3 className="font-serif text-2xl text-charcoal">{currentPlan.title}</h3>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Internal Net Usable Area: <span className="font-medium text-charcoal">{currentPlan.areaSqM} m²</span> ({Math.round(currentPlan.areaSqM * 10.764)} sq ft)
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex flex-wrap gap-1 bg-stone-100 p-1 border border-stone-200">
          {floorPlans.map((plan, idx) => (
            <button
              key={idx}
              id={`floor-plan-tab-${idx}`}
              type="button"
              onClick={() => {
                setActiveLevelIdx(idx);
                setHoveredRoom(null);
              }}
              className={`px-3 py-1.5 text-xs font-sans tracking-wide transition-all cursor-pointer ${
                idx === activeLevelIdx
                  ? 'bg-charcoal text-white font-medium shadow-sm'
                  : 'text-stone-600 hover:text-charcoal hover:bg-stone-200/50'
              }`}
            >
              {plan.level.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Blueprint Canvas */}
      <div className="relative bg-parchment-50 border border-stone-200 p-3 sm:p-8 flex items-center justify-center min-h-[280px] sm:min-h-[380px] overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#C4BAA9 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* North Arrow and Scale Legend */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 border border-stone-200 px-3 py-1.5 text-[10px] text-stone-600 font-mono shadow-sm">
          <Compass className="w-3.5 h-3.5 text-bronze animate-pulse" />
          <span>NORTH 1:100 SCALE</span>
        </div>

        <div className="relative w-full max-w-2xl aspect-[16/10] bg-white border border-stone-300 shadow-sm p-4">
          <svg viewBox="0 0 100 100" className="w-full h-full select-none">
            {/* Outer perimeter structural walls */}
            <rect
              x="5"
              y="5"
              width="90"
              height="90"
              fill="none"
              stroke="#121315"
              strokeWidth="1.5"
            />
            {/* Wall hatch pattern representation */}
            <rect
              x="6"
              y="6"
              width="88"
              height="88"
              fill="none"
              stroke="#D1C7B7"
              strokeWidth="0.5"
              strokeDasharray="2 1"
            />

            {/* Interior division lines */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="#2B2D31" strokeWidth="0.8" />
            <line x1="5" y1="55" x2="95" y2="55" stroke="#2B2D31" strokeWidth="0.8" />
            <line x1="5" y1="20" x2="50" y2="20" stroke="#2B2D31" strokeWidth="0.5" strokeDasharray="1 1" />
            <line x1="50" y1="75" x2="95" y2="75" stroke="#2B2D31" strokeWidth="0.5" strokeDasharray="1 1" />

            {/* Interactive Room Zones */}
            {currentPlan.rooms.map((room, rIdx) => {
              const isHovered = hoveredRoom?.name === room.name;
              return (
                <g
                  key={rIdx}
                  onClick={() => setHoveredRoom(hoveredRoom?.name === room.name ? null : { name: room.name, dims: room.dims })}
                  onMouseEnter={() => setHoveredRoom({ name: room.name, dims: room.dims })}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={room.x}
                    cy={room.y}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? '#91714E' : '#2B2D31'}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={room.x}
                    cy={room.y}
                    r={isHovered ? 11 : 7}
                    fill="none"
                    stroke={isHovered ? '#91714E' : '#A39988'}
                    strokeWidth="0.5"
                    className="transition-all duration-300"
                  />
                  <text
                    x={room.x}
                    y={room.y - 7}
                    textAnchor="middle"
                    className="text-[3.2px] font-sans fill-charcoal font-semibold uppercase tracking-wider"
                  >
                    {room.name}
                  </text>
                  <text
                    x={room.x}
                    y={room.y + 11}
                    textAnchor="middle"
                    className="text-[2.6px] font-mono fill-stone-500"
                  >
                    {room.dims}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover inspector badge */}
        {hoveredRoom && (
          <div className="absolute bottom-4 left-4 bg-charcoal text-white px-4 py-2 text-xs font-sans shadow-lg border border-stone-700 animate-fadeIn flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span className="font-medium">{hoveredRoom.name}</span>
            <span className="text-stone-400 font-mono">({hoveredRoom.dims})</span>
          </div>
        )}
      </div>

      {/* Room Dimensions Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {currentPlan.rooms.map((room, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredRoom({ name: room.name, dims: room.dims })}
            onMouseLeave={() => setHoveredRoom(null)}
            className={`p-3 border text-xs transition-colors cursor-pointer ${
              hoveredRoom?.name === room.name
                ? 'bg-stone-100 border-bronze'
                : 'bg-white border-stone-200 hover:border-stone-400'
            }`}
          >
            <p className="font-medium text-charcoal">{room.name}</p>
            <p className="text-stone-500 font-mono text-[11px] mt-0.5">{room.dims}</p>
          </div>
        ))}
      </div>

      {/* Demo blueprint note */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
        <p>Architectural schematics are provided for spatial conceptualization. Official CAD plans available under NDA.</p>
        <span className="uppercase tracking-widest text-[10px] text-bronze-dark font-mono whitespace-nowrap">
          Ref: {propertyTitle.slice(0, 3).toUpperCase()}-DWG
        </span>
      </div>
    </div>
  );
};
