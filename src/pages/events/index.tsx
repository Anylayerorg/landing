import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogWidget } from '@/components/BlogWidget';
import { MapPin, Calendar, ArrowRight, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '@/sanity/lib/client';

const EventsPage = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const query = `*[_type == "protocolEvent"] | order(eventDate desc) {
          _id,
          title,
          "slug": slug.current,
          eventDate,
          location,
          excerpt,
          mainImage,
          featured
        }`;
                const data = await client.fetch(query);
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-lightblueprimary animate-spin" />
                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/20">Syncing Events...</span>
                </div>
            </div>
        );
    }

    const featuredEvent = events.find(e => e.featured) || events[0];
    const regularEvents = events.filter(e => e._id !== featuredEvent?._id);

    return (
        <>
            <Head>
                <title>Protocol Events | Anylayer</title>
                <meta name="description" content="Join Anylayer at global blockchain events, hackathons, and conferences." />
            </Head>

            <div className="bg-[#08080C] min-h-screen font-geist text-white">
                <Header />

                <main className="pt-32 pb-24">
                    {/* Hero Section */}
                    <section className="px-6 md:px-12 mb-20 text-center">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lightblueprimary/10 border border-lightblueprimary/20 mb-4"
                            >
                                <Radio size={12} className="text-lightblueprimary animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-lightblueprimary">Protocol Events</span>
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                                Network <span className="text-lightblueprimary">Convergance.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
                                Connect with the Anylayer team and community at global summits, developer hackathons, and exclusive protocol workshops.
                            </p>
                        </div>
                    </section>

                    {/* Featured Event */}
                    {featuredEvent && (
                        <section className="px-6 md:px-12 mb-24">
                            <div className="max-w-6xl mx-auto">
                                <Link href={`/events/${featuredEvent.slug}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="group relative bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all cursor-pointer shadow-2xl"
                                    >
                                        <div className="grid lg:grid-cols-2">
                                            <div className="p-10 md:p-16 space-y-8 flex flex-col justify-center">
                                                <div className="flex items-center gap-4">
                                                    <span className="px-4 py-1.5 bg-lightblueprimary text-black rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        Upcoming
                                                    </span>
                                                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                                                        <Calendar size={14} />
                                                        {new Date(featuredEvent.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>

                                                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] group-hover:text-lightblueprimary transition-colors uppercase">
                                                    {featuredEvent.title}
                                                </h2>

                                                <div className="flex items-center gap-2 text-white/60 font-medium">
                                                    <MapPin size={18} className="text-lightblueprimary" />
                                                    {featuredEvent.location}
                                                </div>

                                                <p className="text-white/40 leading-relaxed text-lg font-light max-w-md">
                                                    {featuredEvent.excerpt}
                                                </p>

                                                <div className="pt-4">
                                                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-full group-hover:scale-105 transition-all">
                                                        Event Details
                                                        <ArrowRight size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative aspect-video lg:aspect-auto bg-white/[0.02] border-l border-white/5 overflow-hidden">
                                                {featuredEvent.mainImage && (
                                                    <img
                                                        src={urlFor(featuredEvent.mainImage).url()}
                                                        alt={featuredEvent.title}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-80"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-transparent to-transparent lg:hidden" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Regular Events Grid */}
                    <section className="px-6 md:px-12 pb-32">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Historical & Future Sessions</h2>
                                <div className="h-px flex-1 bg-white/5 mx-8" />
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularEvents.map((event, i) => (
                                    <motion.div
                                        key={event._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link href={`/events/${event.slug}`}>
                                            <div className="group h-full bg-[#0D0D12] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/[0.02] transition-all p-8 flex flex-col justify-between">
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-mono text-lightblueprimary uppercase tracking-widest bg-lightblueprimary/10 px-2 py-0.5 rounded">
                                                            Session {i + 1}
                                                        </span>
                                                        <Calendar size={14} className="text-white/20" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-lightblueprimary transition-colors">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                                                            {event.location}
                                                        </p>
                                                    </div>

                                                    <p className="text-white/30 text-xs leading-relaxed line-clamp-3 font-light">
                                                        {event.excerpt}
                                                    </p>
                                                </div>

                                                <div className="pt-8 flex items-center justify-between">
                                                    <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
                                                        {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </span>
                                                    <ArrowRight size={16} className="text-lightblueprimary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {events.length === 0 && (
                                <div className="text-center py-32 border border-dashed border-white/5 rounded-3xl">
                                    <p className="text-white/20 font-mono text-sm uppercase tracking-widest">No protocol events scheduled at this time.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Event Related News */}
                    <div className="border-t border-white/5">
                        <BlogWidget
                            category="Events"
                            title="Event Insights"
                            subtitle="The latest recaps, keynotes, and announcements from our protocol events."
                            dark={true}
                            limit={3}
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default EventsPage;
