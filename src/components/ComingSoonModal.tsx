'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { DropdownPortal } from "./layout/DropdownPortal";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <DropdownPortal>
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/40 backdrop-blur-[12px]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[380px] bg-[#0D0D12]/90 border border-white/10 rounded-[40px] p-10 shadow-3xl overflow-hidden backdrop-blur-2xl"
                        >
                            {/* Visual Polish: Top Accent Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-lightblueprimary/10 blur-[80px] rounded-full pointer-events-none" />

                            <div className="relative flex flex-col items-center">
                                <button
                                    onClick={onClose}
                                    className="absolute -top-4 -right-4 p-2 text-white/10 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="space-y-4 text-center mb-10">
                                    <h3 className="text-[2.5rem] font-black uppercase tracking-tighter text-white leading-[0.9]">
                                        Private <br />
                                        <span className="text-lightblueprimary">Access.</span>
                                    </h3>
                                    <p className="text-[#9494a3] text-sm font-medium leading-relaxed max-w-[240px] mx-auto opacity-60">
                                        We're currently in a gated beta. Join our community to secure your spot for the public launch.
                                    </p>
                                </div>

                                <div className="w-full space-y-3">
                                    <a
                                        href="https://x.com/anylayerorg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full px-7 py-5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl transition-all group/link"
                                    >
                                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#9494a3] group-hover/link:text-white transition-colors">Follow on X</span>
                                        <ArrowUpRight size={18} className="text-[#9494a3] group-hover/link:text-white transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                    </a>
                                    <a
                                        href="https://discord.gg/ZmnsPMKgjw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full px-7 py-5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl transition-all group/link"
                                    >
                                        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#9494a3] group-hover/link:text-white transition-colors">Join Discord</span>
                                        <ArrowUpRight size={18} className="text-[#9494a3] group-hover/link:text-white transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </DropdownPortal>
            )}
        </AnimatePresence>
    );
};
