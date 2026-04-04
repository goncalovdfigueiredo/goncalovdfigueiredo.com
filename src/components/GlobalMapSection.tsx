"use client";

import React from "react";
import MotionWrapper from "./MotionWrapper";
import { MapPinned } from "lucide-react";
import InteractiveMap, { type MapMarker } from "./InteractiveMap"; 
import { 
  education, 
  workExperience, 
  LeadershipExperience, 
  scientificEvents,
  publications 
} from "@/lib/data";

export default function GlobalMapSection() {
  
  const allMarkers: MapMarker[] = [];

  // 1. Education
  education?.forEach(item => {
    if (item.location && typeof item.location === 'object' && 'lat' in item.location) {
      allMarkers.push({
        id: `edu-${item.degree}`,
        label: item.institution,
        subLabel: item.degree,
        type: "Education",
        lat: item.location.lat,
        lon: item.location.lon
      });
    }
  });

  // 2. Experience
  workExperience?.forEach(item => {
    if (item.location && typeof item.location === 'object' && 'lat' in item.location) {
      allMarkers.push({
        id: `exp-${item.company}-${item.position}`,
        label: item.company,
        subLabel: item.position,
        type: "Experience",
        lat: item.location.lat,
        lon: item.location.lon
      });
    }
  });

  // 3. Leadership
  LeadershipExperience?.forEach(item => {
    if (item.location && typeof item.location === 'object' && 'lat' in item.location) {
      allMarkers.push({
        id: `lead-${item.company}`,
        label: item.company,
        subLabel: item.position,
        type: "Leadership",
        lat: item.location.lat,
        lon: item.location.lon
      });
    }

    const related = (item as any).relatedLocations;
    if (Array.isArray(related)) {
      related.forEach((loc: any, index: number) => {
        if (loc.lat && loc.lon) {
          allMarkers.push({
            id: `lead-related-${item.company}-${index}`,
            label: loc.label, 
            subLabel: `${item.position} Activity`,
            type: "Leadership",
            lat: loc.lat,
            lon: loc.lon
          });
        }
      });
    }
  });
  
  // 4. Publications
  publications?.forEach((pub: any) => {
      if (pub.manuscript?.toLowerCase().includes("conference") && pub.geo) {
        allMarkers.push({
          id: `pub-${pub.title}`,
          label: pub.title,
          subLabel: pub.venue || "Conference Paper",
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
      allMarkers.push({
          id: `evt-${item.title}`,
          label: item.title,
          subLabel: "Scientific Event",
          type: "Scientific Outreach",
          lat: lat,
          lon: lon
      });
    }
  });

  return (
    <section 
      id="map" 
      /* REMOVIDO: bg-gradient-to-b from-muted/10 to-background */
      className="py-16 md:py-20 relative overflow-hidden"
    >
      {/* REMOVIDO: Gradiente via-emerald-500/5 para limpar a mancha visual */}
      <div className="absolute inset-0 pointer-events-none" />
        
      <div className="container max-w-8xl mx-auto px-6 md:px-8 relative z-10">
        
        <MotionWrapper>
          <div className="mb-8 md:mb-12 flex flex-col gap-4">
            <h2 className="text-2xl md:text-4xl font-bold flex items-center justify-center md:justify-start tracking-tight text-zinc-900 dark:text-white">
              <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mr-3 md:mr-4 backdrop-blur-sm">
                <MapPinned className="h-6 w-6 md:h-8 md:w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              Global Impact & Footprint
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-5xl text-sm md:text-lg leading-relaxed text-center md:text-left ml-1">
              An overview of my academic journey, professional experience, 
              scientific outreach, and conference presentations around the world.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          {allMarkers.length > 0 ? (
             <InteractiveMap customMarkers={allMarkers} />
          ) : (
             <div className="flex items-center justify-center h-[500px] bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-white/10">
                <p className="text-zinc-500">Loading Map Data...</p>
             </div>
          )}
        </MotionWrapper>
      </div>
    </section>
  );
}