import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
}

export const SEO = ({ title, description, image, article }: SEOProps) => {
    const router = useRouter();

    const siteName = 'Anylayer';
    const defaultTitle = 'Anylayer — The Trust Layer for the Fragmented Web';
    const defaultDescription = 'Anylayer is building a future where identity is human‑readable, reputation is earned, and privacy is respected by default.';
    const siteUrl = 'https://www.anylayer.org';
    const defaultImage = `${siteUrl}/banner.png`; // Default OG image

    const seo = {
        title: title && title !== siteName ? `${title} | ${siteName}` : defaultTitle,
        description: description || defaultDescription,
        image: image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage,
        url: `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`,
    };

    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* Favicon */}
            <link rel="icon" href="/favicon-logo.svg" />
        </Head>
    );
};
