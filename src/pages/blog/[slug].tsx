import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          title,
          excerpt,
          mainImage,
          publishedAt,
          body,
          "category": categories[0]->title,
          "author": author->name,
          "readTime": round(length(pt::text(body)) / 5 / 180) + 1,
          "related": *[_type == "post" && slug.current != $slug && categories[0]._ref == ^.categories[0]._ref] [0...2] {
            title,
            "slug": slug.current
          }
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-lightblueprimary animate-spin" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/20">Loading Article...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#08080C] min-h-screen font-geist text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black">Article Not Found</h1>
          <Link href="/blog" className="text-lightblueprimary hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const portableTextComponents = {
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-black text-white mt-12 mb-6 tracking-tight leading-tight">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-black text-white mt-10 mb-5 tracking-tight">{children}</h3>,
      h4: ({ children }: any) => <h4 className="text-xl font-black text-white/90 mt-8 mb-4 tracking-tight">{children}</h4>,
      normal: ({ children }: any) => <p className="my-6 font-light leading-[1.7] text-white/60">{children}</p>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="space-y-2 my-6 pl-6 list-disc marker:text-white/30">{children}</ul>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2 text-white/50 font-light">{children}</li>,
    },
    types: {
      image: ({ value }: any) => (
        <div className="my-12 rounded-2xl overflow-hidden border border-white/10">
          <img src={urlFor(value).url()} alt="Content image" className="w-full h-auto" />
        </div>
      ),
    },
  };

  return (
    <>
      <Head>
        <title>{post.title} | Anylayer Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="bg-[#08080C] min-h-screen font-geist text-white">
        <Header />

        <main className="pt-32 pb-24">
          {/* Breadcrumb */}
          <div className="px-6 md:px-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Articles
              </Link>
            </div>
          </div>

          {/* Article Header */}
          <article className="px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Category */}
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-white/[0.08] text-white border border-white/10 rounded-full font-black uppercase tracking-[0.15em] text-[10px]">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  {post.excerpt}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/30 pt-6 border-t border-white/10 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white/60">{post.author}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{post.readTime} min read</span>
                  </div>
                  <button className="flex items-center gap-2 ml-auto hover:text-white transition-colors group">
                    <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-wider">Share</span>
                  </button>
                </div>
              </motion.div>

              {/* Featured Image */}
              {post.mainImage && (
                <div className="aspect-video bg-black border border-white/10 rounded-2xl overflow-hidden relative">
                  <img 
                    src={urlFor(post.mainImage).url()} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-lightblueprimary/10 via-transparent to-transparent opacity-40" />
                </div>
              )}

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                <div className="space-y-6 text-white/60 leading-relaxed text-base">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>
              </motion.div>
            </div>
          </article>

          {/* Related Articles */}
          {post.related && post.related.length > 0 && (
            <section className="px-6 md:px-12 mt-20 mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white/30">
                    Continue Reading
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    {post.related.map((related: any, index: number) => (
                      <Link key={index} href={`/blog/${related.slug}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="group bg-black border border-white/10 rounded-xl p-6 hover:border-white/20 hover:bg-white/[0.02] transition-all cursor-pointer h-full flex flex-col justify-between"
                        >
                          <h4 className="text-lg font-black tracking-tight leading-tight group-hover:text-white/90 transition-colors mb-4">
                            {related.title}
                          </h4>
                          
                          <div className="flex items-center gap-2 text-xs text-white/40 font-mono uppercase tracking-wider group-hover:text-white group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
