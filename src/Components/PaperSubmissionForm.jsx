'use client'
import { useContext, useState } from 'react'
import { AuthContext } from './Context/AuthContext'

export default function PaperSubmissionForm() {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    abstract: '',
    image: '',
    tags: '',
    university: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const paperData = {
        title: formData.title,
        author: user?.displayName || user?.email.split('@')[0], 
        userEmail: user?.email, 
        category: formData.category,
        description: formData.description,
        abstract: formData.abstract,
        image: formData.image || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        university: formData.university,
        publishedDate: new Date().toISOString(),
        downloads: 0,
        likes: 0,
        userId: user.uid 
      }

      const response = await fetch('/api/papers/add-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paperData)
      })

      if (response.ok) {
        alert('Research paper submitted successfully!')
        setFormData({
          title: '',
          category: '',
          description: '',
          abstract: '',
          image: '',
          tags: '',
          university: ''
        })
      } else {
        throw new Error('Failed to submit paper')
      }
    } catch (error) {
      console.error('Error submitting paper:', error)
      alert('Error submitting paper. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-base-200 p-4 sm:p-6 rounded-lg shadow-lg mx-2 sm:mx-0">
      {/* User Info Section */}
      <div className="mb-6 p-4 bg-primary text-primary-content rounded-lg">
        <h3 className="font-bold text-lg">Your Information</h3>
        <p className="mt-2"><strong>Author:</strong> {user?.displayName || user?.email.split('@')[0]}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paper Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-base sm:text-lg">Research Paper Title *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter your research paper title"
            required
          />
        </div>

        {/* Category and University - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category *</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">University/Institution *</span>
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., Stanford University"
              required
            />
          </div>
        </div>

        {/* Abstract */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Abstract *</span>
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32 sm:h-40"
            placeholder="Provide a concise abstract of your research paper..."
            required
          />
          <label className="label">
            <span className="label-text-alt text-sm">Brief summary of your research (200-300 words)</span>
          </label>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Detailed Description *</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24 sm:h-32"
            placeholder="Provide a detailed description of your research..."
            required
          />
          <label className="label">
            <span className="label-text-alt text-sm">Comprehensive description of your research work</span>
          </label>
        </div>

        {/* Image URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Cover Image URL</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/your-image.jpg"
          />
          <label className="label">
            <span className="label-text-alt text-sm">Optional: Provide an image URL that represents your research</span>
          </label>
          
          {/* Image Preview */}
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Image Preview:</p>
              <div className="flex justify-center sm:justify-start">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg border shadow-sm"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Research Tags</span>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., Machine Learning, AI, Data Analysis (separate with commas)"
          />
          <label className="label">
            <span className="label-text-alt text-sm">Add relevant keywords to help others discover your research</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-control pt-4">
          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Submitting...
              </>
            ) : (
              'Submit Research Paper'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}