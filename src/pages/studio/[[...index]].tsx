import Head from 'next/head';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity/sanity.config';

export default function StudioPage() {
  return (
    <>
      <Head>
        <title>Anylayer Studio</title>
      </Head>
      <div className="h-screen min-h-screen">
        <NextStudio config={config} />
      </div>
    </>
  );
}
