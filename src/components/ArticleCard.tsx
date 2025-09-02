// src/components/ArticleCard.tsx
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  summary: string;
  slug: string;
}

export const ArticleCard = ({ title, summary, slug }: ArticleCardProps) => {
  return (
    // The entire card is a clickable link.
    <Link href={`/insights/${slug}`} className="block group">
      <div className="h-full bg-secondary p-6 rounded-xl border border-transparent group-hover:border-accent/50 group-hover:scale-105 transition-all duration-300 flex flex-col">
        {/* Card Title */}
        <h3 className="text-xl font-bold text-text-main group-hover:text-accent transition-colors mb-3">
          {title}
        </h3>
        {/* Card Summary */}
        <p className="text-text-secondary flex-grow mb-4">
          {summary}
        </p>
        {/* "Read More" Link */}
        <div className="mt-auto font-semibold text-accent group-hover:underline">
          查看全文 →
        </div>
      </div>
    </Link>
  );
};
