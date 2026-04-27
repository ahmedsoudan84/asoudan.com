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
    const currentMarkers = panoramas[activePano].markers;
    const clickedMarker = currentMarkers.find(m => m.id === markerId);
    
    if (clickedMarker?.targetIdx !== undefined) {
      setActivePano(clickedMarker.targetIdx);
      setHighlightedMarker(null);
    } else {
      setHighlightedMarker(markerId);
      cardsRef.current[markerId]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      window.setTimeout(() => setHighlightedMarker((curr) => (curr === markerId ? null : curr)), 2000);
    }
  };

  // Default panoramas if property doesn't have them
  const panoramas = property.images?.map((img, idx) => ({
    id: `pano-${idx}`,
    imageUrl: img,
    markers: [
      {
        id: `marker-${idx}-0`,
        latitude: 10,
        longitude: 45,
        tooltip: idx === 0 ? 'Living Area' : 'Entrance',
        targetIdx: idx === 0 ? 1 : 0
      },
      {
        id: `marker-${idx}-1`,
        latitude: -15,
        longitude: 180,
        tooltip: idx === 2 ? 'Living Area' : 'Master Suite',
        targetIdx: idx === 2 ? 0 : 2
      },
      {
        id: `marker-${idx}-2`,
        latitude: 25,
        longitude: 290,
        tooltip: 'External View',
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
    <section className="py-12 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--fg)' }}>
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
                className="px-4 py-2 rounded-lg text-sm font-montserrat font-medium transition-all border"
                style={{
                  background: activePano === idx ? 'rgba(var(--accent-rgb), 0.15)' : 'var(--fg-05)',
                  color: activePano === idx ? 'var(--accent)' : 'var(--fg-60)',
                  borderColor: activePano === idx ? 'var(--accent)' : 'var(--border-subtle)'
                }}
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
                onClick={() => handleMarkerClick(marker.id)}
                className="group rounded-xl p-4 transition-all cursor-pointer border"
                style={{
                  background: isHighlighted ? 'rgba(var(--accent-rgb), 0.1)' : 'var(--fg-05)',
                  borderColor: isHighlighted ? 'var(--accent)' : 'var(--border-subtle)',
                  boxShadow: isHighlighted ? '0 0 15px rgba(var(--accent-rgb), 0.2)' : 'none'
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 border"
                  style={{
                    background: isHighlighted ? 'rgba(var(--accent-rgb), 0.3)' : 'rgba(var(--accent-rgb), 0.1)',
                    borderColor: 'var(--accent)'
                  }}
                >
                  <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-montserrat font-semibold text-sm mb-1" style={{ color: 'var(--fg)' }}>{marker.tooltip}</h4>
                <p className="font-montserrat text-xs" style={{ color: 'var(--fg-40)' }}>
                  {marker.targetIdx !== undefined ? 'Teleport to room' : 'Click marker in viewer'}
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
