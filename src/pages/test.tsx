import React from 'react';
import { LandingPage } from '../components/Landing';
import ParallelCards from '@/components/ParallelCards';

export default function TestPage() {
  // return <LandingPage enableRevolvingAnimation={true} />;
  return (
  <div className="bg-[#0C0C11]">
    <ParallelCards />
  </div>
);
}

