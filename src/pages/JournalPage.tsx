import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import { journalArticles } from '../data/journal';

export const JournalPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    document.title = 'The Aurel Journal — Essays on Architecture & Living | AUREL ESTATES';
  }, []);

  const categories = ['all', 'Architecture', 'Perspectives', 'Materials'];

  const filteredArticles = journalArticles.filter((art) =>
    activeCategory === 'all' ? true : art.category === activeCategory
  );

  const featuredStory = journalArticles[0];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-32 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 pb-8 border-b border-stone-200">
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Editorial Publication
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light">
          The Aurel Journal
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
          Critical essays, architectural monographs, and observations on material longevity, natural light, and the psychology of domestic stillness.
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all ${
                activeCategory === cat
                  ? 'border-charcoal bg-charcoal text-white font-medium'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'
              }`}
            >
              {cat === 'all' ? 'All Dispatches' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Featured Story (When 'all' is selected) */}
      {activeCategory === 'all' && (
        <article className="group bg-white border border-stone-200 overflow-hidden shadow-subtle-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-stone-100">
              <Link to={`/journal/${featuredStory.slug}`}>
                <img
                  src={featuredStory.heroImage}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-luxury px-3 py-1 bg-charcoal text-white font-medium">
                  Cover Feature · {featuredStory.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{featuredStory.readTime}</span>
                <span>·</span>
                <span>{featuredStory.publishedDate}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal group-hover:text-bronze transition-colors leading-tight">
                <Link to={`/journal/${featuredStory.slug}`}>{featuredStory.title}</Link>
              </h2>

              <p className="font-serif italic text-base text-stone-600">
                "{featuredStory.subtitle}"
              </p>

              <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-3">
                {featuredStory.excerpt}
              </p>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredStory.author.avatar}
                    alt={featuredStory.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs text-stone-600 font-medium">
                    {featuredStory.author.name}
                  </span>
                </div>

                <Link
                  to={`/journal/${featuredStory.slug}`}
                  className="text-xs uppercase tracking-luxury text-charcoal group-hover:text-bronze font-medium flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-white border border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-card hover:border-stone-400"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <Link to={`/journal/${article.slug}`}>
                <img
                  src={article.heroImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-luxury px-2.5 py-1 bg-charcoal text-white font-medium">
                  {article.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-stone-400 text-xs mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px]">{article.readTime}</span>
                  <span>·</span>
                  <span className="text-[11px]">{article.publishedDate}</span>
                </div>

                <h3 className="font-serif text-2xl text-charcoal group-hover:text-bronze transition-colors leading-snug">
                  <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed font-sans">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-500 font-medium">
                  By {article.author.name}
                </span>
                <Link
                  to={`/journal/${article.slug}`}
                  className="text-bronze group-hover:translate-x-1 transition-transform flex items-center gap-1 font-medium"
                >
                  Read Essay <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
