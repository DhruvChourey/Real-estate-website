import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { journalArticles } from '../data/journal';

export const JournalArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = journalArticles.find((a) => a.slug === slug) || journalArticles[0];

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — The Aurel Journal`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  const relatedArticles = journalArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="pt-20 sm:pt-24 lg:pt-28 pb-32">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between border-b border-stone-200 text-xs">
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-charcoal transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>
        <div className="flex items-center gap-3 text-stone-400">
          <span className="text-[11px] uppercase tracking-luxury text-bronze font-medium">
            {article.category}
          </span>
          <span>·</span>
          <span className="text-[11px] font-mono">{article.readTime}</span>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 pb-10 text-center space-y-6">
        <span className="text-xs uppercase tracking-luxury text-bronze font-medium block">
          Aurel Journal Dispatch
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
          {article.title}
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-stone-600 max-w-2xl mx-auto">
          "{article.subtitle}"
        </p>

        {/* Author Metadata Bar */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-200 text-xs text-stone-500">
          {article.author.avatar && (
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="text-left">
            <p className="font-medium text-charcoal">{article.author.name}</p>
            <p className="text-[11px] text-stone-400">{article.author.role}</p>
          </div>
          <span className="text-stone-300">|</span>
          <span className="text-[11px]">{article.publishedDate}</span>
        </div>
      </header>

      {/* Cinematic Hero Photograph */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 pb-16">
        <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 shadow-xl border border-stone-200">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Prose Content with Editorial Styling */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8 font-sans text-stone-700 leading-relaxed text-sm sm:text-base">
        {/* Editorial Lead Paragraph with Drop Cap */}
        <p className="text-base sm:text-lg text-charcoal leading-relaxed font-serif first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:text-charcoal first-letter:leading-none">
          {article.excerpt}
        </p>

        {article.content.map((block, idx) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={idx}
                className="font-serif text-2xl sm:text-3xl text-charcoal pt-8 pb-2 border-b border-stone-200"
              >
                {block.value}
              </h2>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote
                key={idx}
                className="my-10 pl-6 border-l-2 border-bronze font-serif italic text-xl sm:text-2xl text-charcoal leading-snug py-2 bg-parchment-100/60 p-4"
              >
                "{block.value}"
              </blockquote>
            );
          }
          if (block.type === 'callout') {
            return (
              <div
                key={idx}
                className="my-8 p-6 bg-parchment-100 border border-stone-300 text-xs sm:text-sm text-stone-800 leading-relaxed italic font-serif"
              >
                <span className="text-[10px] uppercase tracking-luxury text-bronze font-sans font-semibold block mb-1 not-italic">
                  Advisory Insight
                </span>
                {block.value}
              </div>
            );
          }
          if (block.type === 'image') {
            return (
              <figure key={idx} className="my-12">
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 border border-stone-200">
                  <img src={block.value} alt="" className="w-full h-full object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="text-xs text-stone-500 font-serif italic mt-2 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          return <p key={idx}>{block.value}</p>;
        })}
      </div>

      {/* Author Card & Footnote */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 mt-16 pt-8 border-t border-stone-200">
        <div className="bg-white border border-stone-200 p-6 flex items-center gap-4">
          {article.author.avatar && (
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-14 h-14 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-luxury text-bronze font-medium block">
              About the Author
            </span>
            <h4 className="font-serif text-lg text-charcoal">{article.author.name}</h4>
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Contributes architectural critiques and market intelligence to the Aurel Journal, focusing on modernist preservation and structural authenticity.
            </p>
          </div>
        </div>
      </div>

      {/* Related Reading */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 mt-24 pt-16 border-t border-stone-200">
        <h3 className="font-serif text-2xl text-charcoal mb-8 text-center">
          Further Reading from the Journal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedArticles.map((rel) => (
            <Link
              key={rel.id}
              to={`/journal/${rel.slug}`}
              className="group bg-white border border-stone-200 p-6 transition-all hover:border-bronze flex gap-4 items-center"
            >
              <img
                src={rel.heroImage}
                alt=""
                className="w-24 h-24 object-cover flex-shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] uppercase tracking-luxury text-bronze font-medium block">
                  {rel.category}
                </span>
                <h4 className="font-serif text-lg text-charcoal group-hover:text-bronze transition-colors truncate">
                  {rel.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1">{rel.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};
