"use client";
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const PanoViewer360 = dynamic(() => import('../PanoViewer360'), { ssr: false });
import { Property } from '@/lib/real-estate/properties';

interface PanoSectionProps {
  property: Property;
}

export default function PanoSection({ property }: PanoSectionProps) {
  const [activePano, setActivePano] = useState(0);
  const [highlightedMarker, setHighlightedMarker] = useState<string | null>(null);
  const cardsRef = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMarkerClick = (markerId: string) => {
    setHighlightedMarker(markerId);
    cardsRef.current[markerId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    window.setTimeout(() => setHighlightedMarker((curr) => (curr === markerId ? null : curr)), 2000);
  };

  // Default panoramas if property doesn't have them
  const panoramas = property.images?.map((img, idx) => ({
    id: `pano-${idx}`,
    imageUrl: img,
    markers: [
      {
        id: `marker-${idx}-0`,
        latitude: 10 - idx * 2,
        longitude: 45 + idx * 10,
        tooltip: `${property.beds} bed ${property.type.toLowerCase()}`,
      },
      {
        id: `marker-${idx}-1`,
        latitude: -5 - idx * 2,
        longitude: -20 + idx * 15,
        tooltip: 'Kitchen',
      },
      {
        id: `marker-${idx}-2`,
        latitude: 5 + idx * 2,
        longitude: 80 + idx * 5,
        tooltip: 'Garden View',
      }
    ]
  })) || [{
    id: 'pano-default',
    imageUrl: property.images?.[0] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
    markers: [
      {
        id: 'marker-living',
        latitude: 10,
        longitude: 45,
        tooltip: 'Living Room',
      },
      {
        id: 'marker-kitchen',
        latitude: -5,
        longitude: -20,
        tooltip: 'Kitchen',
      },
      {
        id: 'marker-garden',
        latitude: 5,
        longitude: 80,
        tooltip: 'Garden',
      }
    ]
  }];

  return (
    <section className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-2">
              360° Virtual Tour
            </h2>
            <p className="font-montserrat text-sm" style={{ color: 'var(--fg-50)' }}>
              Explore every corner of this {property.beds} bedroom {property.type.toLowerCase()} in immersive detail
            </p>
          </div>
          <div className="flex gap-2">
            {panoramas.map((pano, idx) => (
              <button
                key={pano.id}
                onClick={() => setActivePano(idx)}
                className={`px-4 py-2 rounded-lg text-sm font-montserrat font-medium transition-all ${ 
                  activePano === idx 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                View {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 360° Viewer */}
        <div className="mb-6">
          <PanoViewer360
            imageUrl={panoramas[activePano].imageUrl}
            markers={panoramas[activePano].markers}
            height={500}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Room Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {panoramas[activePano].markers.map((marker) => {
            const isHighlighted = highlightedMarker === marker.id;
            return (
              <div
                key={marker.id}
                ref={(el) => { cardsRef.current[marker.id] = el; }}
                className={`group rounded-xl p-4 transition-all cursor-pointer border ${
                  isHighlighted
                    ? 'bg-cyan-500/15 border-cyan-400/60 ring-2 ring-cyan-400/40'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform ${
                  isHighlighted
                    ? 'bg-cyan-400/40 border border-cyan-300 scale-110'
                    : 'bg-cyan-500/20 border border-cyan-500/40 group-hover:scale-110'
                }`}>
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-montserrat font-semibold text-sm mb-1">{marker.tooltip}</h4>
                <p className="font-montserrat text-xs" style={{ color: 'var(--fg-50)' }}>
                  Click marker in viewer
                </p>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="font-montserrat text-xs mb-1" style={{ color: 'var(--fg-50)' }}>Bedrooms</p>
              <p className="font-montserrat text-2xl font-bold">{property.beds}</p>
            </div>
            <div>
              <p className="font-montserrat text-xs mb-1" style={{ color: 'var(--fg-50)' }}>Bathrooms</p>
              <p className="font-montserrat text-2xl font-bold">{property.baths}</p>
            </div>
            <div>
              <p className="font-montserrat text-xs mb-1" style={{ color: 'var(--fg-50)' }}>Floor Area</p>
              <p className="font-montserrat text-2xl font-bold">{property.sqft.toLocaleString()} sqft</p>
            </div>
            <div>
              <p className="font-montserrat text-xs mb-1" style={{ color: 'var(--fg-50)' }}>Type</p>
              <p className="font-montserrat text-2xl font-bold">{property.type}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
