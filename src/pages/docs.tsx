import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import {
  FileText,
  Search,
  Code,
  Terminal,
} from 'lucide-react';

// Types for Sanity Content
interface DocCategory {
  title: string;
}

interface DocContent {
  _id: string;
  title: string;
  slug: { current: string };
  category: DocCategory;
  lastUpdated: string;
  content: any[];
  order: number;
}

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const PortableTextComponents = {
  block: {
    h3: ({ children }: any) => <h3 className="text-xl font-black text-black uppercase tracking-tight not-italic mt-12 mb-6">{children}</h3>,
    normal: ({ children }: any) => <p className="text-zinc-900 leading-relaxed font-normal mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 space-y-2 mb-4 text-zinc-900">{children}</ul>,
  },
  types: {
    code: ({ value }: any) => (
      <div className="my-8 rounded-2xl overflow-hidden text-[13px] border border-black/5 shadow-sm">
        <div className="bg-zinc-100 px-4 py-2 border-b border-black/5 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">{value.language || 'code'}</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-black/10" />
            <div className="w-2 h-2 rounded-full bg-black/10" />
            <div className="w-2 h-2 rounded-full bg-black/10" />
          </div>
        </div>
        <SyntaxHighlighter
          language={value.language || 'javascript'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '24px',
            background: '#09090b',
            fontSize: '13px',
            lineHeight: '1.6',
          }}
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
    table: ({ value }: any) => (
      <div className="my-10 overflow-x-auto border border-black/5 rounded-2xl shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-black/5">
              {value.rows[0].cells.map((cell: string, i: number) => (
                <th key={i} className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-black">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.slice(1).map((row: any, i: number) => (
              <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-zinc-50/50 transition-colors">
                {row.cells.map((cell: string, j: number) => (
                  <td key={j} className="px-6 py-4 text-zinc-600 font-medium">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
};

const DocsPage = () => {
  const [docs, setDocs] = useState<DocContent[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocContent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const query = `*[_type == "documentation"] | order(order asc) {
          _id,
          title,
          slug,
          category->{title},
          lastUpdated,
          content,
          order
        }`;
        const fetchedDocs = await client.fetch(query);
        setDocs(fetchedDocs);

        // Handle initial active doc from hash or first item
        const hash = window.location.hash.slice(1);
        if (hash) {
          const doc = fetchedDocs.find((d: DocContent) => d.slug.current === hash);
          setActiveDoc(doc || fetchedDocs[0]);
        } else if (fetchedDocs.length > 0) {
          setActiveDoc(fetchedDocs[0]);
          window.location.hash = fetchedDocs[0].slug.current;
        }
      } catch (error) {
        console.error('Error fetching docs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && docs.length > 0) {
        const doc = docs.find(d => d.slug.current === hash);
        if (doc) setActiveDoc(doc);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [docs.length]);

  const handleDocChange = (doc: DocContent) => {
    setActiveDoc(doc);
    window.location.hash = doc.slug.current;
  };

  const filteredDocs = docs.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Anylayer | Documentation</title>
      </Head>

      <div className="bg-white min-h-screen font-geist text-black selection:bg-lightblueprimary/20">
        <Header />

        <main className="pt-40 pb-24 px-6 md:px-12 text-black">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">

            {/* Documentation Sidebar */}
            <aside className="lg:w-72 space-y-12 shrink-0 lg:sticky lg:top-40 self-start">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 not-italic">Docs</h1>
                  <p className="text-zinc-700 text-[10px] uppercase font-mono tracking-widest">Protocol Version v1.0.4</p>
                </div>

                <div className="relative border-b border-black/10 pb-2">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20 w-3.5 h-3.5" />
                  <input
                    type="text"
                    placeholder="Search docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-1 pl-6 pr-2 text-xs focus:outline-none placeholder:text-black/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-10">
                {Object.entries(
                  filteredDocs.reduce((acc, doc) => {
                    const category = doc.category.title;
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(doc);
                    return acc;
                  }, {} as Record<string, typeof filteredDocs>)
                ).map(([category, items]) => (
                  <div key={category} className="space-y-5">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-black">{category}</h4>
                    <div className="flex flex-col gap-4">
                      {items.map((doc) => (
                        <button
                          key={doc._id}
                          onClick={() => handleDocChange(doc)}
                          className={`text-left transition-all relative ${activeDoc?._id === doc._id
                            ? 'text-black font-black'
                            : 'text-zinc-700 hover:text-black font-medium'
                            } text-sm tracking-tight flex items-center gap-3`}
                        >
                          {activeDoc?._id === doc._id && (
                            <motion.div
                              layoutId="activeDocsIndicator"
                              className="absolute -left-4 w-1 h-4 bg-lightblueprimary rounded-full"
                            />
                          )}
                          {doc.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-12 border-t border-black/10 space-y-6">
                <h4 className="text-[9px] uppercase tracking-widest font-black text-zinc-600 tabular-nums">Resources</h4>
                <div className="space-y-4">
                  <a href="#" className="flex items-center justify-between text-xs text-zinc-700 hover:text-lightblueprimary transition-colors group font-medium">
                    Github Repo
                    <Code size={12} className="opacity-40 group-hover:opacity-100" />
                  </a>
                  <a href="#" className="flex items-center justify-between text-xs text-zinc-700 hover:text-lightblueprimary transition-colors group font-medium">
                    API Reference
                    <Terminal size={12} className="opacity-40 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content Article */}
            <article className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {activeDoc && (
                  <motion.div
                    key={activeDoc._id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-16"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <span className="text-lightblueprimary text-[10px] font-black uppercase tracking-widest tabular-nums">
                            {activeDoc.category.title}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-black/40" />
                          <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                            {activeDoc.slug.current}.docs
                          </span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] not-italic">
                          {activeDoc.title}
                        </h2>
                      </div>
                      <div className="text-[10px] font-mono text-black/20 uppercase tracking-widest shrink-0 mb-2">
                        Updated: {activeDoc.lastUpdated}
                      </div>
                    </div>

                    <div className="max-w-none prose prose-zinc selection:bg-lightblueprimary/20">
                      <PortableText
                        value={activeDoc.content}
                        components={PortableTextComponents}
                      />
                    </div>

                    {/* Footer Decoration */}
                    <div className="pt-24 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-10">
                      <div className="flex items-center gap-6">
                        <p className="text-black/20 text-[9px] uppercase tracking-[0.3em] font-mono">
                          © 2026 Anylayer Infrastructure
                        </p>
                      </div>
                      <div className="flex items-center gap-8">
                        <button className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-black/20 hover:text-black transition-colors">
                          Share <FileText size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>

          </div>
        </main>

        <div className="bg-[#08080C]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DocsPage;
