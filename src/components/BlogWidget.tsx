import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { client, urlFor } from '@/sanity/lib/client';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: any;
  publishedAt: string;
  categories: { title: string }[];
  readTime?: string;
}

interface BlogWidgetProps {
  category?: string;
  limit?: number;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export const BlogWidget: React.FC<BlogWidgetProps> = ({
  category,
  limit = 3,
  title = "Latest Updates",
  subtitle,
  dark = true
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post" ${category ? `&& "${category}" in categories[]->title` : ''}] | order(publishedAt desc) [0...${limit}] {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          publishedAt,
          "categories": categories[]->{title},
          "readTime": round(length(pt::text(body)) / 5 / 180) + 1
        }`;

        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, limit]);

  if (loading || posts.length === 0) return null;

  return (
    <section className={`py-24 ${dark ? 'bg-[#08080C] text-white' : 'bg-white text-[#08080C]'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className={`inline-flex items-center gap-3 px-3 py-1 rounded-full ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'} border backdrop-blur-sm`}>
              <div className="w-1 h-1 rounded-full bg-lightblueprimary" />
              <span className={`font-mono text-[9px] uppercase tracking-[0.5em] ${dark ? 'text-white/40' : 'text-black/40'}`}>
                Journal
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">
              {title}
            </h2>
            {subtitle && (
              <p className={`${dark ? 'text-white/40' : 'text-black/40'} text-lg font-medium leading-relaxed max-w-xl`}>
                {subtitle}
              </p>
            )}
          </div>
          <Link href="/blog" className={`group flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${dark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'} transition-all`}>
            View All News
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug.current}`}>
                <div className={`group h-full border ${dark ? 'bg-black border-white/10 hover:border-white/20' : 'bg-[#EBEBEB] border-black/5 hover:border-black/10'} rounded-2xl overflow-hidden transition-all cursor-pointer`}>
                  {post.mainImage && (
                    <div className="aspect-video relative overflow-hidden border-b border-white/5">
                      <img
                        src={urlFor(post.mainImage).width(600).url()}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      {post.categories?.map((cat, idx) => (
                        <span key={idx} className={`px-2.5 py-0.5 ${dark ? 'bg-white/5 text-white/60 border-white/10' : 'bg-black/5 text-black/60 border-black/10'} border rounded-full text-[9px] font-black uppercase tracking-[0.1em]`}>
                          {cat.title}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-lightblueprimary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-2 font-medium ${dark ? 'text-white/40' : 'text-black/40'}`}>
                      {post.excerpt}
                    </p>

                    <div className={`flex items-center justify-between pt-4 border-t ${dark ? 'border-white/5' : 'border-black/5'}`}>
                      <div className={`flex items-center gap-3 text-[10px] font-mono ${dark ? 'text-white/20' : 'text-black/20'}`}>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-current" />
                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
