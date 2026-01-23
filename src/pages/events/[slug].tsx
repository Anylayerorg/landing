import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, MapPin, ArrowLeft, Share2, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

const EventDetailPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchEvent = async () => {
            try {
                const query = `*[_type == "protocolEvent" && slug.current == $slug][0] {
          title,
          excerpt,
          mainImage,
          eventDate,
          location,
          rsvpLink,
          body
        }`;
                const data = await client.fetch(query, { slug });
                setEvent(data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [slug]);

    if (loading) {
        return (
            <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-lightblueprimary animate-spin" />
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/20">Opening File...</span>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black">Event Not Found</h1>
                    <Link href="/events" className="text-lightblueprimary hover:underline">
                        ← Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    const portableTextComponents = {
        block: {
            h2: ({ children }: any) => <h2 className="text-3xl font-black text-white mt-12 mb-6 tracking-tight leading-tight uppercase">{children}</h2>,
            h3: ({ children }: any) => <h3 className="text-2xl font-black text-white mt-10 mb-5 tracking-tight uppercase">{children}</h3>,
            normal: ({ children }: any) => <p className="my-6 font-light leading-[1.8] text-white/50">{children}</p>,
        },
        list: {
            bullet: ({ children }: any) => <ul className="space-y-3 my-8 pl-6 list-disc marker:text-lightblueprimary">{children}</ul>,
        },
        listItem: {
            bullet: ({ children }: any) => <li className="text-white/40 font-light">{children}</li>,
        },
    };

    const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const formattedTime = new Date(event.eventDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <>
            <Head>
                <title>{event.title} | Anylayer Events</title>
                <meta name="description" content={event.excerpt} />
            </Head>

            <div className="bg-[#08080C] min-h-screen font-geist text-white">
                <Header />

                <main className="pt-32 pb-24">
                    {/* Breadcrumb */}
                    <div className="px-6 md:px-12 mb-12">
                        <div className="max-w-4xl mx-auto">
                            <Link href="/events" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to All Events
                            </Link>
                        </div>
                    </div>

                    <article className="px-6 md:px-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid lg:grid-cols-12 gap-12">
                                {/* Main Content */}
                                <div className="lg:col-span-8 space-y-12">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-lightblueprimary/10 text-lightblueprimary border border-lightblueprimary/20 rounded-full font-black uppercase tracking-[0.15em] text-[10px]">
                                                Protocol Session
                                            </span>
                                        </div>

                                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase">
                                            {event.title}
                                        </h1>

                                        <p className="text-xl text-white/50 leading-relaxed font-light">
                                            {event.excerpt}
                                        </p>
                                    </motion.div>

                                    {/* Featured Image */}
                                    {event.mainImage && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8 }}
                                            className="aspect-video bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl"
                                        >
                                            <img
                                                src={urlFor(event.mainImage).url()}
                                                alt={event.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent opacity-60" />
                                        </motion.div>
                                    )}

                                    <div className="prose prose-invert max-w-none">
                                        <PortableText value={event.body} components={portableTextComponents} />
                                    </div>
                                </div>

                                {/* Sidebar Details */}
                                <aside className="lg:col-span-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="sticky top-40 space-y-6"
                                    >
                                        <div className="bg-[#0D0D12] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                        <Calendar size={20} className="text-lightblueprimary" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-mono uppercase tracking-widest text-white/30">Date</p>
                                                        <p className="text-sm font-bold text-white/90">{formattedDate}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                        <Clock size={20} className="text-lightblueprimary" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-mono uppercase tracking-widest text-white/30">Time</p>
                                                        <p className="text-sm font-bold text-white/90">{formattedTime}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                                        <MapPin size={20} className="text-lightblueprimary" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-mono uppercase tracking-widest text-white/30">Location</p>
                                                        <p className="text-sm font-bold text-white/90">{event.location}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                {event.rsvpLink ? (
                                                    <a
                                                        href={event.rsvpLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block w-full py-4 bg-white text-black text-center font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-lightblueprimary transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                                    >
                                                        RSVP NOW
                                                        <ExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <div className="w-full py-4 bg-white/5 text-white/20 text-center font-black uppercase text-xs tracking-[0.2em] rounded-2xl cursor-not-allowed border border-white/5">
                                                        Registration Closed
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4 flex items-center justify-center gap-6 border-t border-white/5">
                                                <button className="text-xs font-mono uppercase tracking-widest text-white/20 hover:text-white transition-colors flex items-center gap-2">
                                                    <Share2 size={14} />
                                                    Share
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-lightblueprimary/5 border border-lightblueprimary/10 rounded-3xl space-y-4">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-lightblueprimary">Protocol Note</h4>
                                            <p className="text-xs text-white/40 leading-relaxed font-light">
                                                Events are subject to change. Please ensure you are subscribed to our official channels for real-time schedule updates.
                                            </p>
                                        </div>
                                    </motion.div>
                                </aside>
                            </div>
                        </div>
                    </article>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default EventDetailPage;
