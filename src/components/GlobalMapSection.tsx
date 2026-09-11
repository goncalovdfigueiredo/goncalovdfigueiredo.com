// src/components/GlobalMapSection.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import MotionWrapper from "./MotionWrapper";
import { MapPinned, ChevronRight, Search, Globe, ChartGantt, Layers, Filter } from "lucide-react";
import InteractiveMap, { type MapMarker } from "./InteractiveMap"; 
import GanttTimeline from "@/components/GanttTimeline"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  education, workExperience, LeadershipExperience, scientificEvents, publications 
} from "@/lib/data";

const COLOR_MAP: Record<string, string> = {
  "Education": "#10b981",           
  "Experience": "#3b82f6",          
  "Leadership": "#a855f7",          
  "Conference Paper": "#f59e0b",    
  "Scientific Outreach": "#ef4444", 
};

export const FilterPill = ({ type, color, count, isActive, onClick, onMouseEnter, onMouseLeave, isAll = false }: any) => {
  return (
    <button
      onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
        ${isActive 
          ? "bg-zinc-200 dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-600 shadow-sm" 
          : "bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/60 hover:bg-zinc-100 hover:dark:bg-zinc-800/60 hover:border-zinc-300 hover:dark:border-zinc-700"
        }`}
    >
      {isAll ? (
        <Filter className="w-3.5 h-3.5 text-emerald-500" />
      ) : (
        <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
      )}
      <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-zinc-800 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}>
        {type}
      </span>
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isActive ? "bg-black/10 dark:bg-black/50 text-zinc-800 dark:text-zinc-300" : "bg-black/5 dark:bg-black/30 text-zinc-500 dark:text-zinc-500"}`}>
        {count}
      </span>
    </button>
  );
};

export default function GlobalMapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"map" | "timeline" | "both">("map");
  
  const [mapFilter, setMapFilter] = useState<string>("All"); 
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#timeline") setActiveView("timeline");
      else if (hash === "#map") setActiveView("map");
    };
    handleHashChange();
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target && target.hash) {
        if (target.hash === "#timeline") setActiveView("timeline");
        else if (target.hash === "#map") setActiveView("map");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    document.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const allMarkers: MapMarker[] = useMemo(() => {
    const markers: MapMarker[] = [];
    const seen = new Set<string>();

    const addUniqueMarker = (marker: MapMarker) => {
      const uniqueKey = `${marker.type}-${marker.label}-${marker.subLabel}-${marker.lat}-${marker.lon}`;
      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);
        markers.push(marker);
      }
    };

    education?.forEach((item, idx) => {
      if (item.location?.lat) {
        addUniqueMarker({ id: `edu-${idx}`, label: item.degree, subLabel: item.institution, type: "Education", lat: item.location.lat, lon: item.location.lon });
      }
    });

    workExperience?.forEach((item, idx) => {
      if (Array.isArray(item.companyLinks) && item.companyLinks.some(link => link.location)) {
        item.companyLinks.forEach((link: any, linkIdx: number) => {
          if (link.location?.lat) {
            addUniqueMarker({ id: `exp-${idx}-${linkIdx}`, label: item.position, subLabel: link.name, type: "Experience", lat: link.location.lat, lon: link.location.lon });
          }
        });
      } else if (item.location?.lat) {
        addUniqueMarker({ id: `exp-${idx}`, label: item.position, subLabel: item.company, type: "Experience", lat: item.location.lat, lon: item.location.lon });
      }
    });

    LeadershipExperience?.forEach((item, idx) => {
      if (item.location?.lat) {
        addUniqueMarker({ id: `lead-${idx}`, label: item.position, subLabel: item.company, type: "Leadership", lat: item.location.lat, lon: item.location.lon });
      }
      if (item.relatedLocations && Array.isArray(item.relatedLocations)) {
        item.relatedLocations.forEach((loc: any, locIdx: number) => {
          if (loc.lat && loc.lon) {
            addUniqueMarker({ id: `lead-loc-${idx}-${locIdx}`, label: loc.label, subLabel: item.company, type: "Leadership", lat: loc.lat, lon: loc.lon });
          }
        });
      }
    });

    publications?.forEach((pub: any, idx) => {
      if (pub.manuscript?.toLowerCase().includes("conference") && pub.geo) {
        addUniqueMarker({ id: `pub-${idx}`, label: pub.title, subLabel: pub.venue || "Conference", type: "Conference Paper", lat: pub.geo.lat, lon: pub.geo.lon });
      }
    });

    scientificEvents?.forEach((item: any, idx) => {
      const lat = item.geo?.lat || (typeof item.location === 'object' ? item.location.lat : null);
      const lon = item.geo?.lon || (typeof item.location === 'object' ? item.location.lon : null);
      if (lat && lon) {
        addUniqueMarker({ id: `evt-${idx}`, label: item.title, subLabel: "Scientific Event", type: "Scientific Outreach", lat: lat, lon: lon });
      }
    });

    return markers;
  }, []);

  const mapFilterCounts = useMemo(() => {
    const counts: Record<string, number> = { "Education": 0, "Experience": 0, "Leadership": 0, "Scientific Outreach": 0, "Conference Paper": 0 };
    allMarkers.forEach(m => { if (counts[m.type] !== undefined) counts[m.type]++; });
    return counts;
  }, [allMarkers]);

  const filteredMarkers = useMemo(() => {
    if (mapFilter === "All") return allMarkers;
    return allMarkers.filter(m => m.type === mapFilter);
  }, [allMarkers, mapFilter]);

  const RenderMapFilters = () => (
    <div className="flex flex-wrap items-center gap-3">
      <FilterPill 
        type="ALL" count={allMarkers.length} isActive={mapFilter === "All"} 
        onClick={() => setMapFilter("All")} onMouseEnter={() => setHoveredFilter("All")} onMouseLeave={() => setHoveredFilter(null)} isAll 
      />
      {Object.entries(COLOR_MAP).map(([type, color]) => {
        if(mapFilterCounts[type] === 0) return null;
        return (
          <FilterPill 
            key={type} type={type} color={color} count={mapFilterCounts[type]} isActive={mapFilter === type} 
            onClick={() => setMapFilter(mapFilter === type ? "All" : type)} onMouseEnter={() => setHoveredFilter(type)} onMouseLeave={() => setHoveredFilter(null)}
          />
        )
      })}
    </div>
  );

  return (
    <section id="map" className="py-16 md:py-24 relative overflow-hidden scroll-mt-24">
      <div id="timeline" className="relative -top-24" />

      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase">
                  MODULE // 08_NAVIGATION_NODES
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold flex items-center tracking-tight text-zinc-900 dark:text-white gap-3">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="relative p-2.5 md:p-3 rounded-2xl bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md group" >
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MapPinned className="relative z-10 h-5 w-5 md:h-7 md:w-7 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <div className="relative inline-block">
                  <span>Timeline & Global Footprint</span>
                  <div className="absolute left-0 -bottom-1 w-16 h-[3px] bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
              </h2>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-200/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md shrink-0">
              <button onClick={() => setActiveView("map")} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${activeView === "map" ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}>
                <MapPinned className="w-3.5 h-3.5" /> Global Map
              </button>
              <button onClick={() => setActiveView("timeline")} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${activeView === "timeline" ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}>
                <ChartGantt className="w-3.5 h-3.5" /> Timeline
              </button>
              <button onClick={() => setActiveView("both")} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${activeView === "both" ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}>
                <Layers className="w-3.5 h-3.5" /> Dual View
              </button>
            </div>
          </div>
        </MotionWrapper>

        <AnimatePresence mode="wait">
          
          {activeView === "map" && (
            <motion.div key="map-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6" >
              <RenderMapFilters />

              <div className="flex flex-col lg:flex-row gap-6 h-[650px]">
                <div className="hidden lg:flex w-85 flex-col gap-4 h-full">
                  <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl backdrop-blur-sm">
                    <div className="p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Quick Navigation</span>
                      </div>
                      <button onClick={() => setSelectedId("reset")} className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-600 transition-all border border-transparent hover:border-emerald-500/20" title="Reset Map View" >
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {filteredMarkers.map((marker) => {
                        const categoryColor = COLOR_MAP[marker.type];
                        const isSelected = selectedId === marker.id;
                        return (
                          <button key={marker.id} onClick={() => setSelectedId(marker.id)} className={`w-full text-left p-3 rounded-xl transition-all duration-300 group flex items-center gap-3 border ${isSelected ? "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 shadow-sm" : "bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-white/5"}`} >
                            <div className="w-1.5 h-8 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: categoryColor }} />
                            <div className="flex-1 overflow-hidden">
                              <p className={`text-xs font-bold truncate transition-colors ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-200"}`}>{marker.label}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <p className="text-[9px] font-medium uppercase tracking-tighter opacity-60" style={{ color: categoryColor }}>{marker.type}</p>
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

                <div className="flex-1 h-full w-full relative">
                  <InteractiveMap customMarkers={allMarkers} externalSelectedId={selectedId} activeCategory={mapFilter === "All" ? null : mapFilter} hoveredCategory={hoveredFilter} />
                </div>
              </div>
            </motion.div>
          )}

          {activeView === "timeline" && (
            <motion.div key="timeline-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full flex flex-col gap-6" >
              <div className="w-full">
                  <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
              </div>
            </motion.div>
          )}

          {activeView === "both" && (
            <motion.div key="both-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-16" >
              <div className="w-full flex flex-col gap-6">
                <div className="w-full">
                  <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
                </div>
              </div>

              <div className="w-full h-px bg-zinc-200 dark:bg-white/10" />

              <div className="flex flex-col gap-6">
                <RenderMapFilters />
                <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                  <div className="hidden lg:flex w-85 flex-col gap-4 h-full">
                    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl backdrop-blur-sm">
                      <div className="p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-zinc-400" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Quick Navigation</span>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {filteredMarkers.map((marker) => {
                          const categoryColor = COLOR_MAP[marker.type];
                          return (
                            <button key={`dual-${marker.id}`} onClick={() => setSelectedId(marker.id)} className="w-full text-left p-2.5 rounded-xl transition-all hover:bg-zinc-50 dark:hover:bg-white/5 flex items-center gap-3 border border-transparent" >
                              <div className="w-1.5 h-6 rounded-full shrink-0" style={{ backgroundColor: categoryColor }} />
                              <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold truncate text-zinc-700 dark:text-zinc-200">{marker.label}</p>
                                <p className="text-[9px] opacity-60 uppercase" style={{ color: categoryColor }}>{marker.type}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 h-full w-full relative">
                    <InteractiveMap customMarkers={allMarkers} externalSelectedId={selectedId} activeCategory={mapFilter === "All" ? null : mapFilter} hoveredCategory={hoveredFilter} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}