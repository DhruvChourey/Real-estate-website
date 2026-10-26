import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { journalArticles } from '../../data/journal';

export const JournalPreview: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-parchment-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-stone-300">
          <div>
            <span className="text-xs uppercase tracking-luxury text-bronze font-medium block mb-2">
              Architectural Perspectives
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
              The Aurel Journal
            </h2>
          </div>
          <Link
            to="/journal"
            className="text-xs uppercase tracking-luxury font-medium text-charcoal hover:text-bronze flex items-center gap-1.5 transition-colors"
          >
            <span>Read All Dispatches</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {journalArticles.slice(0, 3).map((article) => (
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

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-bronze transition-colors leading-snug">
                    <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 mt-2.5 leading-relaxed font-sans">
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
    </section>
  );
};
