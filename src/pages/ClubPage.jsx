import React from 'react';
import ClubRiverCanvas from '../components/3d/ClubRiverCanvas';
import ClubNavbar from '../components/club/ClubNavbar';
import ClubHero from '../components/club/ClubHero';
import ClubDisciplines from '../components/club/ClubDisciplines';
import ClubCommunity from '../components/club/ClubCommunity';
import ClubJoinSection from '../components/club/ClubJoinSection';

export default function ClubPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-stone-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* 3D WebGL Canvas: Río Yí & Sol animado reactivo al scroll */}
      <ClubRiverCanvas />

      {/* Navegación Diurna */}
      <ClubNavbar />

      {/* Contenido Principal de El Club */}
      <main className="relative z-10">
        <ClubHero />
        <ClubDisciplines />
        <ClubCommunity />
        <ClubJoinSection />
      </main>
    </div>
  );
}
