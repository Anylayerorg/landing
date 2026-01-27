'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Loader2,
    CheckCircle2,
    Mail,
    Zap
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { SEO } from '../components/layout/SEO';

const CATEGORIES = [
    "Partnership & Collaboration",
    "Technical Support",
    "Investment Opportunities",
    "General Inquiry"
];

const CONTACT_EMAILS = [
    { label: "General", email: "contact@anylayer.org", icon: <Mail size={14} /> },
    { label: "Build", email: "build@anylayer.org", icon: <Zap size={14} /> }
];

const SectionLabel = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full backdrop-blur-sm border bg-[#0A0A0E] border-white/5 text-white/40 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-lightblueprimary" />
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-medium">
            {text}
        </span>
    </div>
);

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.category) {
            setErrorMessage("Please select a category");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', category: '', message: '' });
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="bg-[#08080C] min-h-screen font-geist text-white selection:bg-lightblueprimary/30">
            <SEO
                title="Contact Us | Anylayer"
                description="Get in touch with the Anylayer team for partnerships, technical support, or investment opportunities."
                image="/banner.png"
            />

            <Header />

            <main className="relative pt-48 pb-60 px-6">
                <div className="max-w-4xl mx-auto space-y-32">

                    {/* Header Section */}
                    <section className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <SectionLabel text="Collaboration" />

                            <h1 className="text-6xl md:text-[90px] font-black uppercase tracking-tighter leading-[0.85]">
                                Get in <br />
                                <span className="text-lightblueprimary">Contact.</span>
                            </h1>

                            <div className="max-w-2xl pt-4">
                                <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed">
                                    We're building the infrastructure of verifiable truth. Reach out to discuss integrations, partnerships, or technical deployment.
                                </p>
                            </div>
                        </motion.div>

                        {/* Simple Email Links - Minimal List */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/5"
                        >
                            {CONTACT_EMAILS.map((item, i) => (
                                <a
                                    key={i}
                                    href={`mailto:${item.email}`}
                                    className="group flex flex-col gap-1 transition-all"
                                >
                                    <span className="text-[8px] uppercase font-mono tracking-widest text-white/20">{item.label}</span>
                                    <span className="text-sm font-bold text-white/60 group-hover:text-lightblueprimary transition-colors flex items-center gap-2">
                                        {item.email}
                                        <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </span>
                                </a>
                            ))}
                        </motion.div>
                    </section>

                    {/* Form Section - Minimalist & Integrated */}
                    <section className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-16">
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] ml-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your full name"
                                            className="w-full bg-transparent border-b border-white/20 px-1 py-4 text-xl font-light focus:outline-none focus:border-lightblueprimary transition-all placeholder:text-white/20"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="email@example.com"
                                            className="w-full bg-transparent border-b border-white/20 px-1 py-4 text-xl font-light focus:outline-none focus:border-lightblueprimary transition-all placeholder:text-white/20"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] ml-1">Category</label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="w-full text-left border-b border-white/20 px-1 py-4 text-xl font-light focus:outline-none focus:border-lightblueprimary transition-all flex items-center justify-between group"
                                            >
                                                <span className={formData.category ? 'text-white/90' : 'text-white/20'}>
                                                    {formData.category || "Select a category"}
                                                </span>
                                                <ArrowRight
                                                    size={18}
                                                    className={`transition-transform duration-500 ${isDropdownOpen ? '-rotate-90' : 'rotate-90 text-white/20 group-hover:text-lightblueprimary'}`}
                                                />
                                            </button>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <>
                                                        {/* Backdrop to close */}
                                                        <div
                                                            className="fixed inset-0 z-40"
                                                            onClick={() => setIsDropdownOpen(false)}
                                                        />
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                                            className="absolute top-full left-0 w-full mt-4 bg-[#0F0F14] border border-white/5 rounded-2xl overflow-hidden z-50 shadow-2xl backdrop-blur-3xl"
                                                        >
                                                            {CATEGORIES.map((cat) => (
                                                                <button
                                                                    key={cat}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, category: cat });
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-6 py-4 text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.03] transition-all flex items-center justify-between group"
                                                                >
                                                                    {cat}
                                                                    {formData.category === cat && (
                                                                        <CheckCircle2 size={14} className="text-lightblueprimary" />
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    </>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-8">
                                    <label className="text-[10px] font-mono text-white/50 uppercase tracking-[0.4em] ml-1">Message</label>
                                    <textarea
                                        required
                                        rows={1}
                                        placeholder="Tell us about your project or inquiry"
                                        className="w-full bg-transparent border-b border-white/20 px-1 py-4 text-xl md:text-2xl font-light focus:outline-none focus:border-lightblueprimary transition-all placeholder:text-white/20 resize-none min-h-[60px]"
                                        value={formData.message}
                                        onChange={(e) => {
                                            setFormData({ ...formData, message: e.target.value });
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                    />
                                </div>

                                <div className="pt-12 flex flex-col items-center gap-8">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading' || status === 'success'}
                                        className="group relative inline-flex items-center gap-6 px-16 py-6 rounded-full overflow-hidden transition-all bg-white text-black font-black uppercase tracking-[0.4em] text-[12px] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                    >
                                        <AnimatePresence mode="wait">
                                            {status === 'loading' ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    Processing <Loader2 className="animate-spin" size={16} />
                                                </motion.div>
                                            ) : status === 'success' ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    Sent <CheckCircle2 size={16} />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    Submit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>

                                    <AnimatePresence>
                                        {status === 'error' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-500 text-sm font-mono uppercase tracking-widest"
                                            >
                                                [Error_State]: {errorMessage}
                                            </motion.p>
                                        )}

                                        {status === 'success' && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-lightblueprimary text-sm font-mono uppercase tracking-widest"
                                            >
                                                [Success]: Message sent.
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </motion.div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
