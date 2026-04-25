"use client";
import { useState } from 'react';
import PanoViewer360, { PanoMarker } from '../PanoViewer360';
import { Property } from '@/lib/real-estate/properties';

interface Room {
  id: string;
  label: string;
  imageUrl: string;
  markers: PanoMarker[];
}

// Curated wide-format interior photos (1800×600 panoramic crop)
const ROOMS: Room[] = [
  {
    id: 'living-room',
    label: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&h=600&fit=crop',
    markers: [
      { id: 'lr-kitchen',  latitude:  4, longitude:  55, tooltip: 'Kitchen',         navigatesTo: 'kitchen'        },
      { id: 'lr-bedroom',  latitude: -6, longitude: -40, tooltip: 'Master Bedroom',   navigatesTo: 'master-bedroom' },
      { id: 'lr-dining',   latitude:  3, longitude: 115, tooltip: 'Dining Room',      navigatesTo: 'dining-room'    },
    ],
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&h=600&fit=crop',
    markers: [
      { id: 'k-living',  latitude:  0, longitude: -55, tooltip: 'Living Room',  navigatesTo: 'living-room' },
      { id: 'k-dining',  latitude:  5, longitude:  70, tooltip: 'Dining Room',  navigatesTo: 'dining-room' },
    ],
  },
  {
    id: 'master-bedroom',
    label: 'Master Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1505693416361-9b28b3b39870?w=1800&h=600&fit=crop',
    markers: [
      { id: 'mb-bathroom', latitude:  5, longitude: -65, tooltip: 'En-suite',    navigatesTo: 'bathroom'    },
      { id: 'mb-living',   latitude: -4, longitude:  50, tooltip: 'Living Room', navigatesTo: 'living-room' },
    ],
  },
  {
    id: 'bathroom',
    label: 'En-suite',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1800&h=600&fit=crop',
    markers: [
      { id: 'b-bedroom', latitude: 0, longitude: -70, tooltip: 'Master Bedroom', navigatesTo: 'master-bedroom' },
    ],
  },
  {
    id: 'dining-room',
    label: 'Dining Room',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1800&h=600&fit=crop',
    markers: [
      { id: 'dr-living',  latitude:  2, longitude: -50, tooltip: 'Living Room', navigatesTo: 'living-room' },
      { id: 'dr-kitchen', latitude:  6, longitude:  40, tooltip: 'Kitchen',     navigatesTo: 'kitchen'     },
    ],
  },
];

interface PanoSectionProps {
  property: Property;
}

export default function PanoSection({ property }: PanoSectionProps) {
  const [activeRoomId, setActiveRoomId] = useState<string>(ROOMS[0].id);

  const activeRoom = ROOMS.find((r) => r.id === activeRoomId) ?? ROOMS[0];

  return (
    <section className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
              360° Virtual Tour
            </h2>
            <p className="font-montserrat text-sm" style={{ color: 'var(--fg-50)' }}>
              Explore every corner of this {property.beds} bedroom {property.type.toLowerCase()}
            </p>
          </div>

          {/* Room selector tabs */}
          <div className="flex flex-wrap gap-2">
            {ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`px-4 py-2 rounded-lg text-sm font-montserrat font-medium transition-all border ${
                  activeRoomId === room.id
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border-white/10'
                }`}
              >
                {room.label}
              </button>
            ))}
          </div>
        </div>

        {/* 360° Viewer */}
        <div className="mb-6">
          <PanoViewer360
            imageUrl={activeRoom.imageUrl}
            markers={activeRoom.markers}
            height={500}
            onNavigate={setActiveRoomId}
          />
        </div>

        {/* Room grid — clicking navigates there */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {ROOMS.map((room) => {
            const isActive = room.id === activeRoomId;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`group rounded-xl p-4 text-left transition-all border ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500/40'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                  isActive ? 'bg-cyan-500/30 border border-cyan-400/60' : 'bg-cyan-500/15 border border-cyan-500/30'
                }`}>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className={`font-montserrat font-semibold text-xs leading-tight ${isActive ? 'text-cyan-300' : 'text-white/80'}`}>
                  {room.label}
                </h4>
                <p className="font-montserrat text-[10px] mt-1" style={{ color: 'var(--fg-40)' }}>
                  {isActive ? 'Viewing now' : `${room.markers.length} connections`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Property stats */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Bedrooms',   value: property.beds },
              { label: 'Bathrooms',  value: property.baths },
              { label: 'Floor Area', value: `${property.sqft.toLocaleString()} sqft` },
              { label: 'Type',       value: property.type },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-montserrat text-xs mb-1" style={{ color: 'var(--fg-50)' }}>{label}</p>
                <p className="font-montserrat text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
