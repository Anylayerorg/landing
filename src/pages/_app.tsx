import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components/layout/Layout';
import { useRouter } from 'next/router';

// Pages that should NOT have the Layout wrapper (landing page handles its own layout)
const PAGES_WITHOUT_LAYOUT = ['/', '/identity', '/manifesto'];

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isStudio = router.pathname.startsWith('/studio');
  const shouldUseLayout = !PAGES_WITHOUT_LAYOUT.includes(router.pathname) && !isStudio;

  if (shouldUseLayout) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  // Render without Layout for landing page
  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }: AppProps) {
  return <AppContent Component={Component} pageProps={pageProps} />;
}