import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Search, Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

// Placeholder blog data
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'introducing-anylayer-identity',
    title: 'Introducing .any — A New Identity Primitive',
    excerpt: 'Today we\'re launching .any, a universal identity namespace that separates who you are from what you share. Built for privacy, portability, and proof.',
    category: 'Product',
    author: 'AnyLayer Team',
    date: 'Jan 17, 2026',
    readTime: '5 min read',
    image: '/blog/identity-launch.jpg',
    featured: true
  },
  {
    id: 2,
    slug: 'zk-proofs-explained',
    title: 'Zero-Knowledge Proofs: Trust Without Exposure',
    excerpt: 'How ZK proofs enable you to prove anything about your identity or reputation without revealing the underlying data.',
    category: 'Technical',
    author: 'Research Team',
    date: 'Jan 15, 2026',
    readTime: '8 min read',
    image: '/blog/zk-proofs.jpg',
    featured: false
  },
  {
    id: 3,
    slug: 'ai-agents-reputation',
    title: 'Building Reputation Systems for AI Agents',
    excerpt: 'As autonomous agents become more prevalent, how do we ensure they can be trusted? A look at reputation infrastructure for AI.',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    date: 'Jan 12, 2026',
    readTime: '6 min read',
    image: '/blog/ai-agents.jpg',
    featured: false
  },
  {
    id: 4,
    slug: 'privacy-by-design',
    title: 'Privacy by Design: Why Data Minimization Matters',
    excerpt: 'Our approach to building trust infrastructure that collects nothing, proves everything, and puts users in control.',
    category: 'Philosophy',
    author: 'Policy Team',
    date: 'Jan 10, 2026',
    readTime: '4 min read',
    image: '/blog/privacy.jpg',
    featured: false
  },
  {
    id: 5,
    slug: 'developer-integration-guide',
    title: 'Integrating .any Into Your dApp',
    excerpt: 'A step-by-step guide for developers looking to add human-readable identities and trust-based features to their applications.',
    category: 'Developer',
    author: 'Dev Relations',
    date: 'Jan 8, 2026',
    readTime: '10 min read',
    image: '/blog/developer-guide.jpg',
    featured: false
  },
  {
    id: 6,
    slug: 'naming-policy-announcement',
    title: 'Announcing the .any Naming Policy',
    excerpt: 'A comprehensive framework for fair, transparent, and secure allocation of .any identities.',
    category: 'Policy',
    author: 'Governance Team',
    date: 'Jan 5, 2026',
    readTime: '7 min read',
    image: '/blog/naming-policy.jpg',
    featured: false
  }
];

const CATEGORIES = ['All', 'Product', 'Technical', 'Research', 'Philosophy', 'Developer', 'Policy'];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Head>
        <title>Blog | Anylayer</title>
        <meta name="description" content="News, insights, and updates from the AnyLayer team" />
      </Head>

      <div className="bg-[#08080C] min-h-screen font-geist text-white">
        <Header />

        <main className="pt-32 pb-24">
          {/* Hero Section */}
          <section className="px-6 md:px-12 mb-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-5">
                    Latest <span className="text-white/20">News</span>
                  </h1>
                  <p className="text-lg text-white/50 font-light leading-relaxed">
                    Updates on identity, trust infrastructure, zero-knowledge proofs, and the future of privacy-preserving systems.
                  </p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-4 pt-4">
                  <div className="flex-1 relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all text-sm"
                    />
                  </div>

                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.15em] transition-all ${
                          selectedCategory === category
                            ? 'bg-white text-black'
                            : 'bg-white/[0.02] text-white/30 hover:bg-white/[0.08] hover:text-white/60 border border-white/10'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Article */}
          {featuredPost && (
            <section className="px-6 md:px-12 mb-24">
              <div className="max-w-6xl mx-auto">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer"
                  >
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Content */}
                      <div className="p-8 md:p-10 space-y-5 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="px-3 py-1 bg-white/[0.08] text-white border border-white/10 rounded-full font-black uppercase tracking-[0.15em]">
                            Featured
                          </span>
                          <span className="text-white/30 font-mono uppercase tracking-wider">{featuredPost.category}</span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight group-hover:text-white/90 transition-colors">
                          {featuredPost.title}
                        </h2>
                        
                        <p className="text-white/50 leading-relaxed text-base font-light">
                          {featuredPost.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-white/30 font-mono pt-2">
                          <span>{featuredPost.author}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{featuredPost.date}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wide text-xs group-hover:gap-3 transition-all pt-2">
                          Read Article
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px] bg-white/[0.02] overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/10 via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(166,131,255,0.08),transparent_50%)]" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </section>
          )}

          {/* Regular Articles Grid */}
          <section className="px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              {regularPosts.length > 0 && (
                <h2 className="text-sm font-black uppercase tracking-wider text-white/30 mb-8">
                  All Articles
                </h2>
              )}
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group h-full bg-black border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer">
                        {/* Image Area */}
                        <div className="aspect-video bg-white/[0.02] relative overflow-hidden border-b border-white/10">
                          <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/8 via-transparent to-transparent" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(166,131,255,0.06),transparent_60%)] group-hover:opacity-80 transition-opacity" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 text-white/80 rounded-full text-[9px] font-black uppercase tracking-[0.15em]">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 space-y-3">
                          <h3 className="text-lg font-black tracking-tight leading-tight group-hover:text-white/90 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 font-light">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono">
                              <span>{post.date}</span>
                              <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                              <span>{post.readTime}</span>
                            </div>
                            
                            <ArrowRight 
                              size={14} 
                              className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" 
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-white/30 text-base font-light">No articles found matching your search.</p>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="px-6 md:px-12 mt-24 mb-16">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative bg-black border border-white/10 rounded-2xl p-8 md:p-10 text-center overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/5 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,131,255,0.08),transparent_70%)]" />
                
                <div className="relative z-10 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                      Stay <span className="text-white/20">Updated</span>
                    </h3>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
                      Get the latest updates on identity, trust, and privacy infrastructure delivered to your inbox.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all text-sm"
                    />
                    <button className="px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-white/90 transition-colors uppercase text-xs tracking-[0.15em] whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
