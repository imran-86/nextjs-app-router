
'use client'
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from './Context/AuthContext'

export default function ManagePapersContent() {
  const { user } = useContext(AuthContext)
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
                        {getStatusBadge(paper.status)}
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
                        onClick={() => handleDeletePaper(paper._id)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
                      <button className="btn btn-outline btn-sm">
                        Edit
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