// src/components/GlobalMapSection.tsx
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import MotionWrapper from "./MotionWrapper";
import { MapPinned, ChevronRight, Search, Globe, ChartGantt, Layers, Filter } from "lucide-react";
import InteractiveMap, { type MapMarker } from "./InteractiveMap"; 
import GanttTimeline from "@/components/GanttTimeline";
import { motion, AnimatePresence } from "framer-motion";
import { education, workExperience, LeadershipExperience, scientificEvents, publications } from "@/lib/data";

const COLOR_MAP: Record<string, string> = {
  "Education": "#10b981",
  "Experience": "#3b82f6",
  "Leadership": "#a855f7",
  "Conference Paper": "#f59e0b",
  "Scientific Outreach": "#ef4444",
};

const safeGetCoords = (item: any): { lat: number, lon: number } | null => {
  if (!item) return null;
  if (item.location && typeof item.location === 'object' && 'lat' in item.location) {
    return { lat: item.location.lat, lon: item.location.lon };
  }
  if (item.geo && typeof item.geo === 'object' && 'lat' in item.geo) {
    return { lat: item.geo.lat, lon: item.geo.lon };
  }
  return null;
};

export const FilterPill = ({ type, color, count, isActive, onClick, onMouseEnter, onMouseLeave, isAll = false }: any) => {
  return (
    <div className="relative py-1 pr-2 shrink-0">
      <button 
        type="button"
        onClick={onClick} 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-[1.5px] transition-all duration-200 cursor-pointer select-none touch-manipulation z-50 relative ${
          isActive 
            ? "bg-[#18181b] border-white text-white shadow-lg scale-[1.02]" 
            : "bg-[#131315] border-zinc-800 hover:border-zinc-700 text-zinc-400"
        }`}
      >
        {isAll ? (
          <Filter className={`w-3.5 h-3.5 shrink-0 pointer-events-none ${isActive ? 'text-emerald-500' : 'text-emerald-500/70'}`} />
        ) : (
          <span className="w-2.5 h-2.5 rounded-full shadow-sm shrink-0 pointer-events-none" style={{ backgroundColor: color }} />
        )}
        <span className={`text-[11px] font-bold uppercase tracking-wider whitespace-nowrap pointer-events-none ${isActive ? "text-white" : "text-zinc-400"}`}>
          {type}
        </span>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md pointer-events-none ${isActive ? "bg-white/10 text-white" : "bg-white/5 text-zinc-500"}`}>
          {count}
        </span>
      </button>
    </div>
  );
};

const RenderMapFilters = ({ allMarkers, mapFilterCounts, mapFilter, onFilterChange, setHoveredFilter }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Estados para controlar a barra de scroll azul
  const [thumbWidth, setThumbWidth] = useState(30);
  const [thumbLeft, setThumbLeft] = useState(0);
  const [showBar, setShowBar] = useState(false);

  // Calcula a posição e tamanho da barra azul
  const updateScrollMetrics = () => {
    const target = scrollContainerRef.current;
    if (!target) return;

    const { scrollWidth, clientWidth, scrollLeft } = target;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const ratio = clientWidth / scrollWidth;
      const calculatedWidth = Math.max(ratio * 100, 20);
      setThumbWidth(calculatedWidth);

      const travelDistance = 100 - calculatedWidth;
      const currentProgress = (scrollLeft / maxScroll) * travelDistance;
      setThumbLeft(currentProgress);
      setShowBar(true);
    } else {
      setShowBar(false);
    }
  };

  useEffect(() => {
    updateScrollMetrics();
    window.addEventListener("resize", updateScrollMetrics);
    return () => window.removeEventListener("resize", updateScrollMetrics);
  }, [allMarkers, mapFilter]);

  const handleFilterClick = (filterName: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onFilterChange(filterName);
    const buttonElement = e.currentTarget;
    if (buttonElement && scrollContainerRef.current) {
      buttonElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="relative w-full mb-0 flex flex-col">
      <div 
        ref={scrollContainerRef} 
        onScroll={updateScrollMetrics} // Atualiza a barra azul ao fazer scroll
        className="flex items-center overflow-x-auto pb-1 pt-1 no-scrollbar w-full relative touch-pan-x"
      >
        <FilterPill 
          type="ALL" count={allMarkers.length} isActive={mapFilter === "All"} 
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFilterClick("All", e)} 
          onMouseEnter={() => setHoveredFilter("All")} onMouseLeave={() => setHoveredFilter(null)} isAll 
        />
        {Object.entries(COLOR_MAP).map(([type, color]) => {
          if (mapFilterCounts[type] === 0) return null;
          return (
            <FilterPill 
              key={type} type={type} color={color} count={mapFilterCounts[type]} isActive={mapFilter === type} 
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFilterClick(type, e)} 
              onMouseEnter={() => setHoveredFilter(type)} onMouseLeave={() => setHoveredFilter(null)} 
            />
          );
        })}
      </div>

      {/* A BARRA DE SCROLL AZUL MAIS GROSSINHA (h-[4px]) E FANTASMA (pointer-events-none) */}
      {showBar && (
        <div className="px-1 mt-1 mb-2 pointer-events-none w-full">
          <div className="h-[4px] w-full bg-zinc-800 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-75 ease-out"
              style={{ width: `${thumbWidth}%`, left: `${thumbLeft}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function GlobalMapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"map" | "timeline" | "both">("map");
  const [mapFilter, setMapFilter] = useState<string>("All");
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [mapForceKey, setMapForceKey] = useState(0);

  const handleFilterChange = (filterName: string) => {
    setMapFilter(filterName);
    setMapForceKey(prev => prev + 1);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#timeline") setActiveView("timeline");
      else if (hash === "#map") setActiveView("map");
    };
    handleHashChange();
  }, []);

  const allMarkers: MapMarker[] = useMemo(() => {
    const markers: MapMarker[] = [];
    const seen = new Set<string>();
    const addUniqueMarker = (marker: MapMarker) => {
      const uniqueKey = `${marker.type}-${marker.label}-${marker.subLabel}-${marker.lat}-${marker.lon}`;
      if (!seen.has(uniqueKey)) { seen.add(uniqueKey); markers.push(marker); }
    };

    education?.forEach((item, idx) => {
      const coords = safeGetCoords(item);
      if (coords) addUniqueMarker({ ...coords, id: `edu-${idx}`, label: item.degree, subLabel: item.institution, type: "Education" });
    });
    workExperience?.forEach((item, idx) => {
      if (Array.isArray(item.companyLinks)) {
        item.companyLinks.forEach((link: any, linkIdx: number) => {
          const coords = safeGetCoords(link);
          if (coords) addUniqueMarker({ ...coords, id: `exp-${idx}-${linkIdx}`, label: item.position, subLabel: link.name, type: "Experience" });
        });
      } else {
        const coords = safeGetCoords(item);
        if (coords) addUniqueMarker({ ...coords, id: `exp-${idx}`, label: item.position, subLabel: item.company, type: "Experience" });
      }
    });
    LeadershipExperience?.forEach((item, idx) => {
      const coords = safeGetCoords(item);
      if (coords) addUniqueMarker({ ...coords, id: `lead-${idx}`, label: item.position, subLabel: item.company, type: "Leadership" });
      if (Array.isArray(item.relatedLocations)) {
        item.relatedLocations.forEach((loc: any, locIdx: number) => {
          if (loc.lat && loc.lon) addUniqueMarker({ id: `lead-loc-${idx}-${locIdx}`, label: loc.label, subLabel: item.company, type: "Leadership", lat: loc.lat, lon: loc.lon });
        });
      }
    });
    publications?.forEach((pub: any, idx) => {
      const coords = safeGetCoords(pub);
      if (pub.manuscript?.toLowerCase().includes("conference") && coords) {
        addUniqueMarker({ ...coords, id: `pub-${idx}`, label: pub.title, subLabel: pub.venue || "Conference", type: "Conference Paper" });
      }
    });
    scientificEvents?.forEach((item: any, idx) => {
      const coords = safeGetCoords(item);
      if (coords) addUniqueMarker({ ...coords, id: `evt-${idx}`, label: item.title, subLabel: "Scientific Event", type: "Scientific Outreach" });
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

  return (
    <section id="map" className="py-10 md:py-20 relative overflow-hidden scroll-mt-24">
      <div id="timeline" className="relative -top-24" />
      <div className="container max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <MotionWrapper>
          <div className="mb-3 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-emerald-500 uppercase"> 
                  MODULE // 08_NAVIGATION_NODES 
                </span>
              </div>
              
              <h2 className="text-2xl md:text-4xl font-extrabold flex items-center tracking-tight text-white gap-3">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="p-2 md:p-3 rounded-full bg-[#131315] border border-zinc-800 shadow-sm" >
                  <MapPinned className="h-5 w-5 md:h-6 md:w-6 text-emerald-500" />
                </motion.div>
                <span>Timeline & Global Footprint</span>
              </h2>
            </div>

            <div className="flex items-center p-1 rounded-full bg-[#131315] border border-zinc-800 backdrop-blur-md shrink-0 w-max">
              <button type="button" onClick={() => setActiveView("map")} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] md:text-xs font-bold transition-all cursor-pointer ${activeView === "map" ? "bg-[#27272a] text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                <MapPinned className="w-3.5 h-3.5" /> Map
              </button>
              <button type="button" onClick={() => setActiveView("timeline")} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] md:text-xs font-bold transition-all cursor-pointer ${activeView === "timeline" ? "bg-[#27272a] text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                <ChartGantt className="w-3.5 h-3.5" /> Timeline
              </button>
              <button type="button" onClick={() => setActiveView("both")} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] md:text-xs font-bold transition-all cursor-pointer ${activeView === "both" ? "bg-[#27272a] text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                <Layers className="w-3.5 h-3.5" /> Dual
              </button>
            </div>
          </div>
        </MotionWrapper>

        <AnimatePresence mode="wait">
          {activeView === "map" && (
            <motion.div key="map-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-1" >
              
              <RenderMapFilters allMarkers={allMarkers} mapFilterCounts={mapFilterCounts} mapFilter={mapFilter} onFilterChange={handleFilterChange} setHoveredFilter={setHoveredFilter} />
              
              <div className="flex flex-col lg:flex-row gap-4 h-[360px] md:h-[650px] mt-0">
                <div className="hidden lg:flex w-85 flex-col gap-4 h-full">
                  <div className="bg-[#131315] border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl">
                    <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Search className="w-4 h-4 text-zinc-500" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Quick Navigation</span>
                      </div>
                      <button type="button" onClick={() => setSelectedId("reset")} className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-500 transition-all cursor-pointer" >
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
                      {filteredMarkers.map((marker) => {
                        const categoryColor = COLOR_MAP[marker.type];
                        const isSelected = selectedId === marker.id;
                        return (
                          <button type="button" key={marker.id} onClick={() => setSelectedId(marker.id)} className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 group flex items-center gap-3.5 border cursor-pointer ${isSelected ? "bg-zinc-800 border-zinc-700 shadow-md" : "bg-transparent border-transparent hover:bg-zinc-800/50"}`} >
                            <div className="w-1.5 h-10 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: categoryColor }} />
                            <div className="flex-1 overflow-hidden">
                              <p className={`text-[13px] font-bold truncate transition-colors ${isSelected ? "text-emerald-400" : "text-zinc-200"}`}>{marker.label}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80" style={{ color: categoryColor }}>{marker.type}</p>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <p className="text-[10px] text-zinc-500 truncate">{marker.subLabel}</p>
                              </div>
                            </div>
                            <ChevronRight className={`w-3.5 h-3.5 transition-all ${isSelected ? "translate-x-1 text-emerald-500" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex-1 h-full w-full relative rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl bg-[#131315]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={`anim-map-${mapForceKey}`}
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <InteractiveMap customMarkers={allMarkers} externalSelectedId={selectedId} activeCategory={mapFilter === "All" ? null : mapFilter} hoveredCategory={hoveredFilter} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="lg:hidden flex overflow-x-auto gap-3 pb-4 pt-2 no-scrollbar touch-pan-x snap-x snap-mandatory">
                {filteredMarkers.map((marker) => {
                  const categoryColor = COLOR_MAP[marker.type];
                  const isSelected = selectedId === marker.id;
                  return (
                    <button 
                      type="button" 
                      key={marker.id} 
                      onClick={() => setSelectedId(marker.id)} 
                      className={`min-w-[250px] max-w-[280px] snap-center text-left p-4 rounded-3xl transition-all duration-300 flex items-start gap-3.5 border cursor-pointer ${isSelected ? "bg-[#1f1f22] border-zinc-600 shadow-xl scale-[1.02]" : "bg-[#131315] border-zinc-800 hover:bg-zinc-800"}`} 
                    >
                      <div className="w-1.5 h-12 rounded-full shrink-0" style={{ backgroundColor: categoryColor }} />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-90 mb-1.5" style={{ color: categoryColor }}>{marker.type}</p>
                        <p className={`text-[13px] font-bold leading-tight truncate mb-1 ${isSelected ? "text-white" : "text-zinc-200"}`}>{marker.label}</p>
                        <p className="text-[11px] text-zinc-500 truncate">{marker.subLabel}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeView === "timeline" && (
            <motion.div key="timeline-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-full flex flex-col gap-6" >
              <div className="w-full overflow-x-auto">
                <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
              </div>
            </motion.div>
          )}

          {activeView === "both" && (
            <motion.div key="both-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-8" >
              <div className="w-full flex flex-col gap-6">
                <div className="w-full overflow-x-auto">
                  <GanttTimeline rowHeight={28} barHeight={20} fontSize={13} />
                </div>
              </div>
              <div className="w-full h-px bg-zinc-800" />
              <div className="flex flex-col gap-1">
                <RenderMapFilters allMarkers={allMarkers} mapFilterCounts={mapFilterCounts} mapFilter={mapFilter} onFilterChange={handleFilterChange} setHoveredFilter={setHoveredFilter} />
                <div className="flex flex-col lg:flex-row gap-4 h-[360px] md:h-[600px] mt-0">
                  <div className="hidden lg:flex w-85 flex-col gap-4 h-full">
                    <div className="bg-[#131315] border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl">
                      <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Search className="w-4 h-4 text-zinc-500" />
                          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Quick Navigation</span>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
                        {allMarkers.map((marker) => {
                          const categoryColor = COLOR_MAP[marker.type];
                          if (mapFilter !== "All" && marker.type !== mapFilter) return null;
                          return (
                            <button type="button" key={`dual-${marker.id}`} onClick={() => setSelectedId(marker.id)} className="w-full text-left p-3.5 rounded-2xl transition-all hover:bg-zinc-800/50 flex items-center gap-3.5 border border-transparent cursor-pointer" >
                              <div className="w-1.5 h-8 rounded-full shrink-0" style={{ backgroundColor: categoryColor }} />
                              <div className="flex-1 overflow-hidden">
                                <p className="text-[13px] font-bold truncate text-zinc-200">{marker.label}</p>
                                <p className="text-[9px] font-bold opacity-80 uppercase mt-1" style={{ color: categoryColor }}>{marker.type}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 h-full w-full relative rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl bg-[#131315]">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={`anim-dual-map-${mapForceKey}`}
                        initial={{ opacity: 0, filter: "blur(2px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        <InteractiveMap customMarkers={allMarkers} externalSelectedId={selectedId} activeCategory={mapFilter === "All" ? null : mapFilter} hoveredCategory={hoveredFilter} />
                      </motion.div>
                    </AnimatePresence>
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