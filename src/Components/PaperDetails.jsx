'use client'
import { useState, useEffect } from 'react';

export default function PaperDetailsClient({ paperId }) {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaperDetails() {
      try {
        setLoading(true);
        const response = await fetch(`/api/papers/${paperId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch paper details');
        }
        
        const paperData = await response.json();
        setPaper(paperData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPaperDetails();
  }, [paperId]);

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;
  if (error) return <div className="alert alert-error">Error: {error}</div>;
  if (!paper) return <div className="alert alert-warning">Paper not found</div>;

  return  (
    <div className="min-h-screen bg-zinc-50 py-28">
      <div className="container mx-auto px-4 max-w-4xl">
      
        <div className="bg-base-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <span className="badge badge-primary">{paper.category}</span>
            <span className="text-sm text-gray-500">
              {new Date(paper.publishedDate).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{paper.title}</h1>
          <p className="text-lg text-gray-600 mb-2">by {paper.author}</p>
          <p className="text-gray-500">{paper.university}</p>
        </div>

        
        <div className="mb-6">
          <img 
            src={paper.image} 
            alt={paper.title}
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>

        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Abstract</h2>
              <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
              
              <h2 className="text-2xl font-bold mt-6 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{paper.description}</p>
            </div>
          </div>

        
          <div className="space-y-4">
            <div className="bg-base-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">Paper Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Downloads:</span>
                  <span className="font-semibold">{paper.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span>Likes:</span>
                  <span className="font-semibold">{paper.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold">{paper.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-base-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {paper.tags?.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-base-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">Actions</h3>
              <div className="space-y-2">
                <button className="btn btn-primary btn-sm w-full">
                  Download PDF
                </button>
                <button className="btn btn-outline btn-sm w-full">
                  ❤️ Like Paper
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}