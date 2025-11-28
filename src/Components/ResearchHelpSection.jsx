
'use client'
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import Link from 'next/link';

const ResearchHelpSection = () => {
  const researchTips = [
    {
      icon: '📚',
      title: 'Literature Review',
      description: 'Learn how to conduct comprehensive literature reviews and identify research gaps',
      tips: [
        'Use academic databases like Google Scholar, PubMed',
        'Analyze citation patterns',
        'Identify key authors and publications'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔍',
      title: 'Research Methodology',
      description: 'Choose the right research methods for your study',
      tips: [
        'Understand qualitative vs quantitative methods',
        'Select appropriate data collection techniques',
        'Ensure research validity and reliability'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '📊',
      title: 'Data Analysis',
      description: 'Master data analysis techniques and tools',
      tips: [
        'Learn statistical analysis software',
        'Understand data visualization',
        'Interpret results accurately'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '✍️',
      title: 'Academic Writing',
      description: 'Improve your academic writing skills',
      tips: [
        'Structure your paper effectively',
        'Use proper citation styles',
        'Write clear and concise abstracts'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📖',
      title: 'Publication Guide',
      description: 'Navigate the publication process successfully',
      tips: [
        'Choose the right journal',
        'Understand peer review process',
        'Respond to reviewer comments'
      ],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: '🔬',
      title: 'Research Ethics',
      description: 'Ensure ethical standards in your research',
      tips: [
        'Obtain necessary approvals',
        'Maintain academic integrity',
        'Handle sensitive data properly'
      ],
      color: 'from-teal-500 to-green-500'
    }
  ];

  const quickResources = [
    {
      title: 'Citation Tools',
      items: ['Zotero', 'Mendeley', 'EndNote'],
      icon: '📋'
    },
    {
      title: 'Research Databases',
      items: ['Google Scholar', 'IEEE Xplore', 'ScienceDirect'],
      icon: '📁'
    },
    {
      title: 'Writing Assistance',
      items: ['Grammarly', 'Hemingway Editor', 'Academic Phrasebank'],
      icon: '🖊️'
    }
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Header */}
        <Fade triggerOnce direction="down" duration={800}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-2">
              Research Guidance & Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential resources and tips to enhance your research journey and academic writing skills
            </p>
          </div>
        </Fade>

        {/* Research Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {researchTips.map((tip, index) => (
            <Zoom key={tip.title} triggerOnce duration={800} delay={index * 150}>
              <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className={`card-body bg-gradient-to-br ${tip.color} text-white rounded-2xl p-6`}>
                  
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{tip.icon}</div>
                    <h3 className="text-2xl font-bold">{tip.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-white text-opacity-90 mb-6 leading-relaxed">
                    {tip.description}
                  </p>

                  {/* Tips List */}
                  <div className="space-y-2">
                    {tip.tips.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white text-opacity-90 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <div className="card-actions justify-end mt-6">
                    <button className="btn btn-sm btn-outline btn-white border-white text-white hover:bg-white hover:text-gray-800">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          ))}
        </div>

        {/* Quick Resources Section */}
        <Slide triggerOnce direction="up" duration={800}>
          <div className="bg-base-100 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Essential Research Tools</h3>
              <p className="text-gray-600">Curated resources to streamline your research process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickResources.map((resource, index) => (
                <Fade key={resource.title} triggerOnce delay={index * 200}>
                  <div className="bg-base-200 rounded-2xl p-6 text-center hover:bg-base-300 transition-colors duration-300">
                    <div className="text-4xl mb-4">{resource.icon}</div>
                    <h4 className="text-xl font-bold mb-4">{resource.title}</h4>
                    <div className="space-y-2">
                      {resource.items.map((item, idx) => (
                        <div key={idx} className="badge badge-outline badge-lg mx-1 mb-2">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </Slide>

        {/* Research Community CTA */}
        <Fade triggerOnce duration={800} delay={400}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Join Our Research Community</h3>
              <p className="text-xl mb-6 opacity-90">
                Connect with fellow researchers, share insights, and collaborate on projects
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn btn-lg btn-white text-gray-800 hover:bg-gray-100">
                  👥 Join Community
                </Link>
                <Link href="/" className="btn btn-lg btn-outline btn-white border-white text-white hover:bg-white hover:text-gray-800">
                  📚 View Resources
                </Link>
              </div>
            </div>
          </div>
        </Fade>

      </div>
    </section>
  );
};

export default ResearchHelpSection;