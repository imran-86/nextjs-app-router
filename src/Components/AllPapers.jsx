
'use client'
import { useState, useEffect } from 'react';
import PaperCard from './PaperCard';


export default function AllPapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllPapers() {
      try {
        setLoading(true);
        const response = await fetch('/api/papers/all-papers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch  papers');
        }
        
        const data = await response.json();
        setPapers(data);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPapers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600">Loading  papers...</p>
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
        <span>Error loading  papers: {error}</span>
      </div>
    );
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2">No  Papers Available</h3>
        <p className="text-gray-600">Check back later for new research papers.</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
             All Research Papers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           Browse our complete collection of academic research papers across all categories and disciplines
          </p>
        </div>
        <div className='my-10'>
          <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" required placeholder="Search By Category" />
</label>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {papers.map((paper) => (
            <PaperCard key={paper._id || paper.id} paper={paper} />
          ))}
        </div>
        
        
      </div>
    </section>
  );
}