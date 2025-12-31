"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // 👈 IMPORTANTE
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

export type MapMarker = {
  id: string;
  label: string;
  subLabel?: string;
  type: string;
  lat: number;
  lon: number;
};

const COLOR_MAP: Record<string, string> = {
  "Education": "#10b981",           // Emerald
  "Experience": "#3b82f6",          // Blue
  "Leadership": "#a855f7",          // Purple
  "Conference Paper": "#f59e0b",    // Amber
  "Scientific Outreach": "#ef4444", // Red
};

const FILTER_CATEGORIES = [
  "Education",
  "Experience",
  "Leadership",
  "Scientific Outreach",
  "Conference Paper"
];

const createCustomIcon = (type: string, isSelected: boolean, isDimmed: boolean) => {
  const color = COLOR_MAP[type] || "#10b981";
  const opacity = isDimmed ? 0.2 : 1;
  const scale = isSelected ? 1.5 : (isDimmed ? 0.7 : 1);

  const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" class="w-full h-full drop-shadow-md">
      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
  `;

  return L.divIcon({
    className: isDimmed ? "marker-dimmed" : "marker-active",
    html: `<div style="transform: scale(${scale}); opacity: ${opacity}; transition: all 0.3s ease;">${svgHtml}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

function MapBackgroundEvents({ clearSelection }: { clearSelection: () => void }) {
  useMapEvents({
    click: () => clearSelection(),
  });
  return null;
}

export default function InteractiveMap({ customMarkers }: { customMarkers: MapMarker[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null); 
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null); 

  const effectiveFilter = hoveredFilter || activeFilter;
  const activePopup = selectedMarker || hoveredMarker;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[600px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl animate-pulse" />;

  const handleFilterClick = (category: string) => {
    setActiveFilter(prev => prev === category ? null : category);
    setSelectedMarker(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-6 relative z-10">
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          const isHovered = hoveredFilter === cat;
          const color = COLOR_MAP[cat];
          const isDimmedButton = effectiveFilter !== null && effectiveFilter !== cat;

          return (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              onMouseEnter={() => setHoveredFilter(cat)}
              onMouseLeave={() => setHoveredFilter(null)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300
                ${(isActive || isHovered)
                  ? "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 shadow-md scale-105" 
                  : "bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400"}
                ${isDimmedButton && !isHovered ? "opacity-50" : "opacity-100"}
              `}
            >
              <span 
                className="w-2.5 h-2.5 rounded-full transition-shadow duration-300" 
                style={{ 
                  backgroundColor: color, 
                  boxShadow: (isActive || isHovered) ? `0 0 8px ${color}` : 'none' 
                }} 
              />
              <span className={(isActive || isHovered) ? "text-zinc-900 dark:text-white" : ""}>
                {cat}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative h-[550px] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-xl z-0 bg-zinc-900">
        <MapContainer
          center={[25, 10]} 
          zoom={2}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          minZoom={2}
          maxZoom={17}
          maxBounds={[[-85, -180], [85, 180]]}
          maxBoundsViscosity={1.0}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          
          <TileLayer
            attribution='Tiles &copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            className="brightness-75 grayscale-[20%] contrast-[1.1]"
          />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />

          <MapBackgroundEvents clearSelection={() => setSelectedMarker(null)} />

          {customMarkers.map((marker) => {
            const isDimmed = effectiveFilter !== null && marker.type !== effectiveFilter;
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <Marker
                key={marker.id}
                position={[marker.lat, marker.lon]}
                icon={createCustomIcon(marker.type, isSelected, isDimmed)}
                eventHandlers={{
                  mouseover: () => { if (!selectedMarker && !isDimmed) setHoveredMarker(marker); },
                  mouseout: () => { if (!selectedMarker) setHoveredMarker(null); },
                  click: (e) => {
                    L.DomEvent.stopPropagation(e);
                    if (!isDimmed) setSelectedMarker(marker);
                  },
                }}
                zIndexOffset={isDimmed ? -1000 : 100}
              />
            );
          })}
        </MapContainer>

        <AnimatePresence mode="wait">
          {activePopup && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-6 left-6 z-[1000] max-w-xs md:max-w-sm w-full pointer-events-none"
            >
              <div className="pointer-events-auto relative p-5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-2xl shadow-black/40">
                {selectedMarker && (
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-start gap-4 pr-6">
                  <div 
                    className="p-3 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${COLOR_MAP[activePopup.type]}20`, color: COLOR_MAP[activePopup.type] }}
                  >
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: COLOR_MAP[activePopup.type] }}>
                      {activePopup.type}
                    </h4>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-1">
                      {activePopup.label}
                    </h3>
                    {activePopup.subLabel && (
                      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{activePopup.subLabel}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}