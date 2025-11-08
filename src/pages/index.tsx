import dynamic from 'next/dynamic';
import React from 'react';

const LandingPage = dynamic(() => import('../components/Landing'), { ssr: false });

export default function HomePage() {
  return <LandingPage />;
}
