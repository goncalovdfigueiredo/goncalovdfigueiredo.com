"use client";

import React, { useState, useMemo } from "react";
import MotionWrapper from "./MotionWrapper";
import { MapPinned, ChevronRight, Search, Globe } from "lucide-react";
import InteractiveMap, { type MapMarker } from "./InteractiveMap"; 
import { 
  education, 
  workExperience, 
  LeadershipExperience, 
  scientificEvents,
  publications 
} from "@/lib/data";

// Mapeamento de cores para consistência com o Mapa
const COLOR_MAP: Record<string, string> = {
  "Education": "#10b981",           // Emerald
  "Experience": "#3b82f6",          // Blue
  "Leadership": "#a855f7",          // Purple
  "Conference Paper": "#f59e0b",    // Amber
  "Scientific Outreach": "#ef4444", // Red
};

export default function GlobalMapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allMarkers: MapMarker[] = useMemo(() => {
    const markers: MapMarker[] = [];

    // 1. Education: Cargo/Grau -> Entidade
    education?.forEach(item => {
      if (item.location?.lat) {
        markers.push({ 
          id: `edu-${item.degree}`, 
          label: item.degree,         // CARGO/GRAU EM DESTAQUE
          subLabel: item.institution, // Entidade como subLabel
          type: "Education", 
          lat: item.location.lat, 
          lon: item.location.lon 
        });
      }
    });

    // 2. Experience: Cargo -> Entidade
    workExperience?.forEach(item => {
      if (Array.isArray(item.companyLinks) && item.companyLinks.some(link => link.location)) {
        item.companyLinks.forEach((link: any, idx: number) => {
          if (link.location?.lat) {
            markers.push({ 
              id: `exp-${item.position}-${link.name}-${idx}`, 
              label: item.position,   // CARGO EM DESTAQUE
              subLabel: link.name,    // Entidade como subLabel
              type: "Experience", 
              lat: link.location.lat, 
              lon: link.location.lon 
            });
          }
        });
      } else if (item.location?.lat) {
        markers.push({ 
          id: `exp-${item.company}-${item.position}`, 
          label: item.position, 
          subLabel: item.company, 
          type: "Experience", 
          lat: item.location.lat, 
          lon: item.location.lon 
        });
      }
    });

    // 3. Leadership: Cargo -> Entidade
    LeadershipExperience?.forEach(item => {
      if (item.location?.lat) {
        markers.push({ 
          id: `lead-${item.company}`, 
          label: item.position,   // CARGO EM DESTAQUE
          subLabel: item.company, // Entidade como subLabel
          type: "Leadership", 
          lat: item.location.lat, 
          lon: item.location.lon 
        });
      }
    });

    // 4. Conference Paper: Título do Artigo -> Nome da Conferência
    publications?.forEach((pub: any) => {
      if (pub.manuscript?.toLowerCase().includes("conference") && pub.geo) {
        markers.push({ 
          id: `pub-${pub.title}`, 
          label: pub.title,               // TÍTULO DO ARTIGO EM DESTAQUE
          subLabel: pub.venue || "Conference", // Nome da Conferência como subLabel
          type: "Conference Paper", 
          lat: pub.geo.lat, 
          lon: pub.geo.lon 
        });
      }
    });

    // 5. Scientific Outreach
    scientificEvents?.forEach((item: any) => {
      const lat = item.geo?.lat || (typeof item.location === 'object' ? item.location.lat : null);
      const lon = item.geo?.lon || (typeof item.location === 'object' ? item.location.lon : null);
      if (lat && lon) {
        markers.push({ 
          id: `evt-${item.title}`, 
          label: item.title, 
          subLabel: "Scientific Event", 
          type: "Scientific Outreach", 
          lat: lat, 
          lon: lon 
        });
      }
    });

    return markers;
  }, []);

  return (
    <section id="map" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-8xl mx-auto px-6 md:px-8 relative z-10">
        
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-4 backdrop-blur-sm">
                <MapPinned className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Global Impact & Footprint
            </h2>
          </div>
        </MotionWrapper>

        <div className="flex flex-col lg:flex-row gap-6 h-[650px]">
          
          {/* SIDEBAR NAVEGAÇÃO */}
          <div className="hidden lg:flex w-85 flex-col gap-4 h-full">
            <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl backdrop-blur-sm">
              <div className="p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Quick Navigation</span>
                </div>
                <button 
                  onClick={() => setSelectedId("reset")}
                  className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-600 transition-all border border-transparent hover:border-emerald-500/20"
                  title="Reset Map View"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {allMarkers.map((marker) => {
                  const categoryColor = COLOR_MAP[marker.type];
                  const isSelected = selectedId === marker.id;

                  return (
                    <button
                      key={marker.id}
                      onClick={() => setSelectedId(marker.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 group flex items-center gap-3 border
                        ${isSelected 
                          ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 shadow-sm" 
                          : "bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-white/5"}
                      `}
                    >
                      {/* INDICADOR DE COR LATERAL */}
                      <div 
                        className="w-1.5 h-8 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110" 
                        style={{ backgroundColor: categoryColor }}
                      />

                      <div className="flex-1 overflow-hidden">
                        <p className={`text-xs font-bold truncate transition-colors ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-200"}`}>
                          {marker.label}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                           <p className="text-[9px] font-medium uppercase tracking-tighter opacity-60" style={{ color: categoryColor }}>
                             {marker.type}
                           </p>
                           <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                           <p className="text-[9px] text-zinc-500 truncate">{marker.subLabel}</p>
                        </div>
                      </div>

                      <ChevronRight className={`w-3 h-3 transition-all ${isSelected ? "translate-x-1 text-emerald-500" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MAPA */}
          <div className="flex-1 h-full w-full relative">
            <InteractiveMap 
              customMarkers={allMarkers} 
              externalSelectedId={selectedId} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}