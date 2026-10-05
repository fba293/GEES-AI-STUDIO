/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES "Blogs, News & Updates" with Live Bookmarks, Reading Drawer & Social Share Modal
 */

import React, { useState } from 'react';
import { mockBlogPosts } from '../../data/mockDatabase.ts';
import { BlogPost } from '../../types/index.ts';

interface BlogsUpdatesSectionProps {
  onOpenConsultation: () => void;
}

export const BlogsUpdatesSection: React.FC<BlogsUpdatesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [activeReadingModal, setActiveReadingModal] = useState<BlogPost | null>(null);
  const [activeShareModal, setActiveShareModal] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const savedCount = posts.filter(p => p.saved).length;

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, saved: !p.saved };
      }
      return p;
    }));
  };

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : selectedCategory === 'saved'
    ? posts.filter(p => p.saved)
    : posts.filter(p => p.category.toLowerCase().includes(selectedCategory));

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white dark:bg-[#070b19]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-8 pb-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center flex-wrap gap-2.5">
          <span>Blogs, News &</span>
          <span className="bg-[#fbb034] text-slate-950 px-5 py-1 rounded-2xl shadow-xs">
            Updates
          </span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2.5 font-medium">
          Latest news, visa updates & student success stories.
        </p>
      </div>

      {/* Filter Tabs & Saved Badge */}
      <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
        <div className="inline-flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
          {[
            { label: 'All Posts', key: 'all' },
            { label: 'Articles', key: 'article' },
            { label: 'News & Events', key: 'news' },
            { label: 'Scholarships', key: 'scholarship' },
            { label: 'Visa Updates', key: 'visa' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
                selectedCategory === tab.key
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}

          {/* Saved Tab */}
          <button
            onClick={() => setSelectedCategory('saved')}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
              selectedCategory === 'saved'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-red-600'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-red-500">bookmark</span>
            <span>Saved</span>
            <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full bg-red-600 text-white leading-none">
              {savedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Grid: 2 Large Horizontal Split Cards on Top, 3 Cards on Bottom */}
      <div className="space-y-7">
        {/* Row 1: Horizontal Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPosts.slice(0, 2).map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveReadingModal(post)}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative"
            >
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="px-3 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {post.publishedDate}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-red-600 transition-colors mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1">
                    <span>Read More</span>
                    <span>→</span>
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveShareModal(post);
                      }}
                      className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                    </button>

                    <button
                      onClick={(e) => toggleBookmark(post.id, e)}
                      className={`p-1.5 rounded-full transition-transform active:scale-125 ${
                        post.saved ? 'text-red-600' : 'text-slate-400 hover:text-red-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {post.saved ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-52 h-48 sm:h-auto shrink-0 relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500"
                />
              </div>
            </article>
          ))}
        </div>

        {/* Row 2: 3-Column Standard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(2).map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveReadingModal(post)}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                <div className="w-full h-48 relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    {post.category}
                  </span>
                  <span className="text-slate-400">• {post.publishedDate}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-red-600 transition-colors mb-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1">
                  <span>Read More</span>
                  <span>→</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveShareModal(post);
                    }}
                    className="p-1.5 rounded-full text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>

                  <button
                    onClick={(e) => toggleBookmark(post.id, e)}
                    className={`p-1.5 rounded-full transition-transform active:scale-125 ${
                      post.saved ? 'text-red-600' : 'text-slate-400 hover:text-red-600'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {post.saved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state when filtering Saved with 0 bookmarks */}
        {filteredPosts.length === 0 && (
          <div className="py-16 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">bookmark_border</span>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Saved Articles Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Click the bookmark ribbon on any article card to save it for quick reading.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs"
            >
              Browse All Articles
            </button>
          </div>
        )}
      </div>

      {/* View More Articles Footer Link Redirecting to blog.html */}
      <div className="mt-12 sm:mt-14 text-center">
        <a
          href="blog.html"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#fbb034] hover:text-slate-950 dark:hover:bg-[#fbb034] dark:hover:text-slate-950 font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>More Articles</span>
          <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
        </a>
      </div>

      {/* Reading Article Modal */}
      {activeReadingModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                {activeReadingModal.category}
              </span>
              <button
                onClick={() => setActiveReadingModal(null)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 sm:px-8 py-6 overflow-y-auto space-y-5 no-scrollbar">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {activeReadingModal.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>Published: {activeReadingModal.publishedDate}</span>
                <span>• {activeReadingModal.readTime}</span>
                <span>• By {activeReadingModal.author}</span>
                <span>• {activeReadingModal.viewsCount} views</span>
              </div>

              <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-100">
                <img src={activeReadingModal.imageUrl} alt={activeReadingModal.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal space-y-3">
                <p>{activeReadingModal.body}</p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-2">
                  Key Strategic Takeaways:
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 pl-4 list-disc">
                  {activeReadingModal.takeaways.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveShareModal(activeReadingModal)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Share Story</span>
              </button>

              <button
                onClick={() => {
                  setActiveReadingModal(null);
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm"
              >
                Book IELTS & Visa Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Share Sheet Modal */}
      {activeShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-fadeIn">
            <button
              onClick={() => setActiveShareModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
              Share Article
            </h3>
            <p className="text-xs text-slate-500 mb-4 truncate">
              {activeShareModal.title}
            </p>

            <div className="grid grid-cols-4 gap-2.5 text-center mb-6">
              {[
                { label: 'WhatsApp', color: 'bg-emerald-500', action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(activeShareModal.title + ' ' + activeShareModal.slug)}`) },
                { label: 'Facebook', color: 'bg-blue-600', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`) },
                { label: 'X (Twitter)', color: 'bg-black', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeShareModal.title)}`) },
                { label: 'LinkedIn', color: 'bg-sky-600', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`) }
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={s.action}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-2xl ${s.color} text-white flex items-center justify-center shadow-sm`}>
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-300 truncate px-2">
                https://gees.education/blog/{activeShareModal.slug}
              </span>
              <button
                onClick={() => handleCopyLink(`https://gees.education/blog/${activeShareModal.slug}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shrink-0 cursor-pointer"
              >
                {copiedLink ? 'Copied! ✓' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
