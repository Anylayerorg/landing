import dynamic from 'next/dynamic';
import React from 'react';
import { SEO } from '../components/layout/SEO';

const LandingPage = dynamic(() => import('../components/Landing'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <SEO
        title="Anylayer"
        description="The zero-knowledge trust layer that powers capital-efficient applications — from authentication to payments, launches, lending and more."
        image="/banner.png"
      />
      <LandingPage />
    </>
  );
}
