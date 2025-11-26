
'use client'
import Link from 'next/link';

export default function PaperCard({ paper }) {

  const paperId = paper._id || paper.id;
  
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <figure className="h-48 overflow-hidden">
        <img 
          src={paper.image} 
          alt={paper.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="badge badge-primary badge-sm text-white">
            {paper.category}
          </span>
        </div>
      </figure>
      
      <div className="card-body">
        <h2 className="card-title text-lg line-clamp-2 hover:text-primary transition-colors">
          {paper.title}
        </h2>
        
        <div className="space-y-1 mb-3">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <span className="font-semibold">Author:</span> {paper.author}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            🏛️ {paper.university}
          </p>
          <p className="text-xs text-gray-500">
            📅 Published: {new Date(paper.publishedDate).toLocaleDateString()}
          </p>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-3 flex-grow">
          {paper.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {paper.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="badge badge-outline badge-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="card-actions justify-between items-center mt-4 pt-4 border-t">
          <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1" title="Downloads">
              📥 {paper.downloads || 0}
            </span>
            <span className="flex items-center gap-1" title="Likes">
              ❤️ {paper.likes || 0}
            </span>
          </div>
          
          <Link 
            href={`/papers/${paperId}`}
            className="btn btn-primary btn-sm"
          >
            Read Paper
          </Link>
        </div>
      </div>
    </div>
  );
}