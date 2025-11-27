
'use client'
import { useState, useEffect } from 'react';
import PaperCard from './PaperCard';
import Link from 'next/link';

export default function FeaturedPapers() {
  const [featuredPapers, setFeaturedPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeaturedPapers() {
      try {
        setLoading(true);
        const response = await fetch('/api/papers/featured');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured papers');
        }
        
        const data = await response.json();
        setFeaturedPapers(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedPapers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600">Loading featured papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-2xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading featured papers: {error}</span>
      </div>
    );
  }

  if (featuredPapers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">No Featured Papers Available</h3>
        <p className="text-gray-600">Check back later for new research papers.</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Recent Papers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest groundbreaking research from our community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPapers.map((paper) => (
            <PaperCard key={paper._id || paper.id} paper={paper} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
          href="/papers"
          className="btn btn-primary btn-lg">
            View All Research Papers
          </Link>
        </div>
      </div>
    </section>
  );
}