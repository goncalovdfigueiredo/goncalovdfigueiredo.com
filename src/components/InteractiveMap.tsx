// src/components/InteractiveMap.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";

export interface MapMarker {
  id: string;
  label: string;
  subLabel?: string;
  type: string;
  lat: number;
  lon: number;
}

const COLOR_MAP: Record<string, string> = {
  "Education": "#10b981",
  "Experience": "#3b82f6",
  "Leadership": "#a855f7",
  "Conference Paper": "#f59e0b",
  "Scientific Outreach": "#ef4444",
};

// Coordenadas iniciais centralizadas
const INITIAL_CENTER: [number, number] = [35, -25];
// ZOOM AINDA MAIS REDUZIDO: de 1.5 para 1.2 para ver o mundo global
const INITIAL_ZOOM = 1.7; 

function ResetViewControl({ onReset }: { onReset: () => void }) {
  const map = useMap();
  useEffect(() => {
    const ResetControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = `
          <button type="button" style="
            display: flex; align-items: center; gap: 8px; padding: 8px 14px; 
            background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(228, 228, 231, 1); 
            border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: 700; 
            text-transform: uppercase; color: #52525b; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
            transition: all 0.2s ease;
          ">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Global View
          </button>`;
        
        L.DomEvent.disableClickPropagation(div);
        L.DomEvent.disableScrollPropagation(div);
        
        const handleAction = (e: any) => {
          L.DomEvent.stopPropagation(e);
          onReset();
          map.flyTo(INITIAL_CENTER, INITIAL_ZOOM, { duration: 1.5 });
        };

        div.ontouchstart = handleAction;
        div.onclick = handleAction;
        return div;
      }
    });

    const control = new ResetControl({ position: 'topright' });
    map.addControl(control);
    return () => { map.removeControl(control); };
  }, [map, onReset]);

  return null;
}

function MapController({ externalSelectedId, markers, onMarkerSelected }: { externalSelectedId: string | null, markers: MapMarker[], onMarkerSelected: (marker: MapMarker | null) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!externalSelectedId) return;
    if (externalSelectedId === "reset") {
      onMarkerSelected(null);
      map.flyTo(INITIAL_CENTER, INITIAL_ZOOM, { duration: 2, easeLinearity: 0.25 });
      return;
    }
    const target = markers.find(m => m.id === externalSelectedId);
    if (target) {
      onMarkerSelected(target);
      map.flyTo([target.lat, target.lon], 12, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [externalSelectedId, markers, map, onMarkerSelected]);

  return null;
}

const createCustomIcon = (type: string, isSelected: boolean, isDimmed: boolean) => {
  const color = COLOR_MAP[type] || "#10b981";
  const opacity = isDimmed ? 0.25 : 1;
  const size = isSelected ? 22 : (isDimmed ? 8 : 14);
  
  const html = `
    <div style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: ${opacity}; transition: opacity 0.3s ease;">
      <style>
        @keyframes pulse-ring-${type.replace(/\s/g, '')} {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(3); opacity: 0; }
        }
      </style>
      ${!isDimmed ? `
        <div style="
          position: absolute; width: ${size}px; height: ${size}px; border-radius: 50%;
          background-color: ${color}; animation: pulse-ring-${type.replace(/\s/g, '')} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        "></div>
      ` : ''}
      <div style="
        position: relative; width: ${size}px; height: ${size}px; background-color: ${color};
        border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.6); transition: all 0.3s ease; z-index: 10;
        border: ${isSelected ? '2px solid white' : 'none'};
      "></div>
    </div>
  `;

  return L.divIcon({ className: "custom-pulse-marker", html: html, iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -20] });
};

function MapBackgroundEvents({ clearSelection }: { clearSelection: () => void }) {
  useMapEvents({ click: () => clearSelection() });
  return null;
}

export interface InteractiveMapProps {
  customMarkers: MapMarker[];
  externalSelectedId?: string | null;
  activeCategory?: string | null;
  hoveredCategory?: string | null;
}

export default function InteractiveMap({ customMarkers, externalSelectedId = null, activeCategory = null, hoveredCategory = null }: InteractiveMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const effectiveFilter = hoveredCategory || activeCategory;
  const activePopup = selectedMarker || hoveredMarker;

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => { setSelectedMarker(null); }, [activeCategory]);

  if (!isMounted) return <div className="h-full w-full bg-[#131315] animate-pulse" />;

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#131315]">
      <div className="relative flex-1 w-full overflow-hidden z-0 bg-[#131315]">
        <MapContainer 
          center={INITIAL_CENTER} 
          zoom={INITIAL_ZOOM} 
          scrollWheelZoom={false} 
          style={{ height: "100%", width: "100%", zIndex: 0, background: "#131315" }} 
          minZoom={1} 
          zoomSnap={0.1} // Permite saltos muito pequenos de zoom (como 1.1, 1.2, 1.3)
          maxZoom={17} 
          maxBounds={[[-85, -180], [85, 180]]} 
          zoomControl={false}
        >
          <MapController externalSelectedId={externalSelectedId} markers={customMarkers} onMarkerSelected={setSelectedMarker} />
          <ZoomControl position="bottomright" />
          <ResetViewControl onReset={() => setSelectedMarker(null)} />
          <TileLayer attribution='Tiles &copy; Esri' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" className="brightness-75 grayscale-[20%] contrast-[1.1]" />
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
          
          <MapBackgroundEvents clearSelection={() => setSelectedMarker(null)} />

          {customMarkers && customMarkers.map((marker) => {
            const isDimmed = effectiveFilter !== null && effectiveFilter !== "All" && marker.type !== effectiveFilter;
            const isSelected = selectedMarker?.id === marker.id;
            
            return (
              <Marker 
                key={`${marker.id}-${effectiveFilter}-${isSelected ? 'sel' : 'unsel'}`} 
                position={[marker.lat, marker.lon]} 
                icon={createCustomIcon(marker.type, isSelected, isDimmed)}
                eventHandlers={{
                  mouseover: () => { if (!selectedMarker && !isDimmed) setHoveredMarker(marker); },
                  mouseout: () => { if (!selectedMarker) setHoveredMarker(null); },
                  click: (e) => { L.DomEvent.stopPropagation(e); if (!isDimmed) setSelectedMarker(marker); },
                }}
                zIndexOffset={isDimmed ? -1000 : (isSelected ? 1000 : 100)}
              />
            );
          })}
        </MapContainer>

        <AnimatePresence mode="wait">
          {activePopup && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute bottom-6 left-6 z-[1000] max-w-xs md:max-w-sm w-full pointer-events-none">
              <div className="pointer-events-auto relative p-5 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-2xl shadow-black/40">
                {selectedMarker && (
                  <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedMarker(null); setHoveredMarker(null); }} className="absolute top-3 right-3 p-1 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 transition-colors cursor-pointer">
                    <X className="h-4 w-4" />
                  </button>
                )}
                <div className="flex items-start gap-4 pr-6">
                  <div className="p-3 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: `${COLOR_MAP[activePopup.type]}20`, color: COLOR_MAP[activePopup.type] }}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: COLOR_MAP[activePopup.type] }}>{activePopup.type}</h4>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-1">{activePopup.label}</h3>
                    {activePopup.subLabel && <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{activePopup.subLabel}</p>}
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