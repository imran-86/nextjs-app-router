'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from './Context/AuthContext'

export default function ManagePapersContent() {
  const { user } = useContext(AuthContext)
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    async function fetchUserPapers() {
      if (!user?.email) return
      
      try {
        setLoading(true)
        const response = await fetch(`/api/papers/user-email?userEmail=${encodeURIComponent(user.email)}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch your papers')
        }
        
        const userPapers = await response.json()
        console.log('Fetched papers:', userPapers) // Debug
        setPapers(userPapers)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPapers()
  }, [user])

  const handleDeletePaper = async (paperId, paperTitle) => {
    console.log('Deleting paper:', { paperId, paperTitle }) // Debug
    
    if (!confirm(`Are you sure you want to delete "${paperTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(paperId); 
      
      const response = await fetch(`/api/papers/${paperId}`, {
        method: 'DELETE',
      });

      console.log('Delete response status:', response.status); // Debug

      const result = await response.json();
      console.log('Delete result:', result); // Debug

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete paper');
      }

      // Remove from local state using _id
      setPapers(prevPapers => prevPapers.filter(paper => paper._id !== paperId));
      
      alert('Research paper deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting paper:', error);
      alert(`Error deleting paper: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'badge-warning', text: 'Under Review' },
      approved: { class: 'badge-success', text: 'Published' },
      rejected: { class: 'badge-error', text: 'Rejected' },
      draft: { class: 'badge-info', text: 'Draft' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return <span className={`badge ${config.class}`}>{config.text}</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-600">Loading your research papers...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>Error: {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Manage Your Research Papers</h1>
          <p className="text-xl text-gray-600">
            View and manage all your submitted research papers
          </p>
          <div className="mt-4 p-4 bg-info text-info-content rounded-lg inline-block">
            <p><strong>Logged in as:</strong> {user?.email}</p>
            <p><strong>Total Papers:</strong> {papers.length}</p>
          </div>
        </div>

        {/* Papers Grid */}
        {papers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold mb-4">No Research Papers Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't submitted any research papers yet. Start sharing your research with the academic community.
            </p>
            <Link href="/add-papers" className="btn btn-primary btn-lg">
              Submit Your First Paper
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {papers.map((paper) => (
              <div key={paper._id} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Paper Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {getStatusBadge(paper.status || 'pending')}
                        <span className="badge badge-primary">{paper.category}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(paper.publishedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h2 className="card-title text-xl mb-2">{paper.title}</h2>
                      
                      <div className="space-y-1 mb-3">
                        <p className="text-sm">
                          <strong>Author:</strong> {paper.author}
                        </p>
                        <p className="text-sm">
                          <strong>University:</strong> {paper.university}
                        </p>
                        <p className="text-sm line-clamp-2 text-gray-600">
                          {paper.description}
                        </p>
                        
                        {/* Debug Info - Temporary */}
                        <div className="text-xs bg-yellow-100 p-2 rounded mt-2">
                          <strong>Paper ID:</strong> {paper._id}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>📥 {paper.downloads || 0} Downloads</span>
                        <span>❤️ {paper.likes || 0} Likes</span>
                        {paper.isFeatured && (
                          <span className="text-yellow-600">⭐ Featured</span>
                        )}
                      </div>

                      {/* Tags */}
                      {paper.tags && paper.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {paper.tags.map((tag, index) => (
                            <span key={index} className="badge badge-outline badge-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:w-auto">
                      <Link 
                        href={`/papers/${paper._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Paper
                      </Link>
                      <button 
                        onClick={() => handleDeletePaper(paper._id, paper.title)}
                        disabled={deletingId === paper._id}
                        className="btn btn-error btn-sm"
                      >
                        {deletingId === paper._id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {papers.length > 0 && (
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Total Papers</div>
              <div className="stat-value">{papers.length}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Published</div>
              <div className="stat-value">
                {papers.filter(p => p.status === 'approved').length}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Under Review</div>
              <div className="stat-value">
                {papers.filter(p => p.status === 'pending').length}
              </div>
            </div>
            <div className="stat bg-base-200 rounded-lg">
              <div className="stat-title">Total Downloads</div>
              <div className="stat-value">
                {papers.reduce((sum, paper) => sum + (paper.downloads || 0), 0)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}