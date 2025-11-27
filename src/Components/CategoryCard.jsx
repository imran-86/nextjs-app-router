'use client'
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import Link from 'next/link';

const CategoryCards = () => {
  const categories = [
    {
      name: 'Physics',
      icon: '⚛️',
      description: 'Explore quantum mechanics, relativity, and fundamental forces of nature',
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-100',
      papers: '128+ Papers'
    },
    {
      name: 'Chemistry',
      icon: '🧪',
      description: 'Discover organic, inorganic, physical and analytical chemistry research',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-100',
      papers: '95+ Papers'
    },
    {
      name: 'Engineering',
      icon: '⚙️',
      description: 'Civil, mechanical, electrical and computer engineering innovations',
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-100',
      papers: '156+ Papers'
    },
    {
      name: 'Computer Science',
      icon: '💻',
      description: 'AI, machine learning, algorithms, and software engineering research',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-100',
      papers: '210+ Papers'
    },
    {
      name: 'Biology',
      icon: '🧬',
      description: 'Molecular biology, genetics, ecology and biomedical research',
      color: 'from-teal-500 to-green-500',
      textColor: 'text-teal-100',
      papers: '142+ Papers'
    },
    {
      name: 'Mathematics',
      icon: '📊',
      description: 'Pure and applied mathematics, statistics, and computational math',
      color: 'from-indigo-500 to-blue-500',
      textColor: 'text-indigo-100',
      papers: '88+ Papers'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <Fade triggerOnce direction="up" duration={800}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 py-1">
  Explore Research Categories
</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover groundbreaking research across diverse academic disciplines
            </p>
          </div>
        </Fade>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Zoom 
              key={category.name}
              triggerOnce 
              duration={800}
              delay={index * 100}
            >
              <Link 
                href={`/papers?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="block group"
              >
                <div className="card h-full bg-gradient-to-br shadow-2xl border-0 transform transition-all duration-300 hover:scale-102  hover:shadow-3xl">
                  <div className={`card-body text-white bg-gradient-to-br ${category.color} relative overflow-hidden rounded-md`}>
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
                    
                    <div className="relative z-10">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                      </div>

                      {/* Description */}
                      <p className={`${category.textColor} mb-6 leading-relaxed`}>
                        {category.description}
                      </p>

                      {/* Papers Count */}
                      <div className="flex justify-between items-center">
                        <span className="badge badge-lg badge-outline   border-white border-opacity-30 text-white">
                          {category.papers}
                        </span>
                        
                        {/* Arrow Icon */}
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <svg 
                            className="w-6 h-6 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M14 5l7 7m0 0l-7 7m7-7H3" 
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Zoom>
          ))}
        </div>

        {/* Bottom CTA */}
        <Slide triggerOnce direction="up" duration={800} delay={600}>
          <div className="text-center mt-12">
            <div className="bg-base-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Can't Find Your Category?</h3>
              <p className="text-gray-600 mb-6">
                Browse through all research papers or submit your own research to contribute to the academic community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/papers" className="btn btn-primary btn-lg">
                  Browse All Papers
                </Link>
                <Link href="/add-papers" className="btn btn-outline btn-lg">
                  Submit Research
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default CategoryCards;