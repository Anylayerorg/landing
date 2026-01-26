import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin, Clock } from 'lucide-react';
import { client, urlFor } from '@/sanity/lib/client';

interface ProtocolEvent {
    _id: string;
    title: string;
    slug: { current: string };
    eventDate: string;
    location: string;
    rsvpLink?: string;
    mainImage: any;
    excerpt: string;
}

interface EventsSectionProps {
    limit?: number;
    title?: string;
    subtitle?: string;
    dark?: boolean;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
    limit = 3,
    title = "Protocol Events",
    subtitle = "Join us at upcoming hackathons, conferences, and community gatherings.",
    dark = false
}) => {
    const [events, setEvents] = useState<ProtocolEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch upcoming events first, ordered by date
                const query = `*[_type == "protocolEvent"] | order(eventDate asc) [0...${limit}] {
          _id,
          title,
          slug,
          eventDate,
          location,
          rsvpLink,
          mainImage,
          excerpt
        }`;

                const data = await client.fetch(query);
                if (data && data.length > 0) {
                    setEvents(data);
                } else {
                    // Fallback for the 10k ANS Event if Sanity is empty
                    setEvents([{
                        _id: 'default-airdrop',
                        title: '10,000 ANS Airdrop Sequence',
                        slug: { current: '10k-ans-minting-event' },
                        eventDate: new Date().toISOString(),
                        location: 'Universal Identity Layer',
                        excerpt: 'Claim your free Anylayer Name Service (ANS) identity and start your reputation journey. First 10,000 users only.',
                        mainImage: null,
                        rsvpLink: '/events/10k-ans-minting-event'
                    }]);
                }
            } catch (error) {
                console.error('Error fetching protocol events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [limit]);

    if (loading) return (
        <section className={`py-24 ${dark ? 'bg-[#08080C] text-white' : 'bg-white text-[#08080C]'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="animate-pulse space-y-8">
                    <div className="h-10 w-64 bg-current opacity-10 rounded-lg" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-80 bg-current opacity-5 rounded-2xl" />)}
                    </div>
                </div>
            </div>
        </section>
    );

    if (events.length === 0) return null;

    return (
        <section className={`py-24 ${dark ? 'bg-[#08080C] text-white' : 'bg-white text-[#08080C]'} border-y ${dark ? 'border-white/5' : 'border-black/5'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'} border backdrop-blur-sm`}>
                            <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
                            <span className={`font-mono text-[9px] uppercase tracking-[0.5em] ${dark ? 'text-white/40' : 'text-black/40'}`}>
                                Calendar
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className={`${dark ? 'text-white/40' : 'text-black/40'} text-lg font-medium leading-relaxed max-w-xl`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, i) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={`group h-full border ${dark ? 'bg-black border-white/10 hover:border-white/20' : 'bg-[#F5F5F7] border-black/5 hover:border-black/10'} rounded-[32px] overflow-hidden transition-all flex flex-col`}>
                                {event.mainImage && (
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <img
                                            src={urlFor(event.mainImage).width(800).url()}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}

                                <div className="p-8 flex-1 flex flex-col">
                                    {/* Event Meta */}
                                    <div className={`flex flex-wrap items-center gap-4 mb-6 text-[10px] font-mono uppercase tracking-widest ${dark ? 'text-white/40' : 'text-black/40'}`}>
                                        <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg">
                                            <Calendar size={12} className="text-lightblueprimary" />
                                            <span>{new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-lg">
                                            <MapPin size={12} className="text-lightblueprimary" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black tracking-tight leading-tight mb-4 group-hover:text-lightblueprimary transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className={`text-sm leading-relaxed mb-8 font-medium line-clamp-2 ${dark ? 'text-white/40' : 'text-black/40'}`}>
                                        {event.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                                        {event.rsvpLink ? (
                                            <a
                                                href={event.rsvpLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-lightblueprimary hover:text-lightblueprimary/80 transition-colors"
                                            >
                                                RSVP Now
                                                <ArrowUpRight size={16} />
                                            </a>
                                        ) : (
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-black/20">Coming Soon</span>
                                        )}

                                        <div className={`text-[10px] font-mono ${dark ? 'text-white/20' : 'text-black/20'}`}>
                                            {new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
