'use client'
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import Link from 'next/link';

const AboutSection = () => {
  const features = [
    {
      icon: '🔬',
      title: 'Cutting-Edge Research',
      description: 'Access the latest research papers from top universities and institutions worldwide'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Connect with researchers, academics, and students from around the world'
    },
    {
      icon: '📈',
      title: 'Knowledge Sharing',
      description: 'Share your research findings and contribute to the academic community'
    },
    {
      icon: '⚡',
      title: 'Easy Access',
      description: 'User-friendly platform designed for seamless research discovery and collaboration'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Research Papers' },
    { number: '5,000+', label: 'Registered Researchers' },
    { number: '50+', label: 'Countries' },
    { number: '100+', label: 'Universities' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Academic Director',
      bio: 'Former professor at Stanford University with 15+ years in academic research',
      avatar: '👩‍🎓'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Technical Lead',
      bio: 'Expert in research technology and digital academic platforms',
      avatar: '👨‍💻'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Community Manager',
      bio: 'Dedicated to fostering collaboration among researchers worldwide',
      avatar: '👩‍🔬'
    }
  ];

  return (
    <section id="about" className="py-20 bg-zinc-50 py-28">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Header */}
        <Fade triggerOnce direction="down" duration={800}>
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Empowering Research Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ResearchHub is a comprehensive platform dedicated to advancing academic research 
              through collaboration, knowledge sharing, and innovative technology.
            </p>
          </div>
        </Fade>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Zoom triggerOnce duration={800}>
            <div className="card bg-gradient-to-br from-primary to-secondary text-white shadow-2xl">
              <div className="card-body">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="card-title text-2xl text-white mb-4">Our Mission</h3>
                <p className="text-white text-opacity-90 leading-relaxed">
                  To create a global ecosystem where researchers can easily discover, share, 
                  and collaborate on cutting-edge research, accelerating scientific progress 
                  and innovation across all disciplines.
                </p>
              </div>
            </div>
          </Zoom>

          <Zoom triggerOnce duration={800} delay={200}>
            <div className="card bg-gradient-to-br from-secondary to-accent text-white shadow-2xl">
              <div className="card-body">
                <div className="text-4xl mb-4">🔭</div>
                <h3 className="card-title text-2xl text-white mb-4">Our Vision</h3>
                <p className="text-white text-opacity-90 leading-relaxed">
                  To become the world's most trusted platform for academic research, 
                  breaking down barriers to knowledge and fostering a culture of 
                  open collaboration and innovation.
                </p>
              </div>
            </div>
          </Zoom>
        </div>

        {/* Features Grid */}
        <Fade triggerOnce direction="up" duration={800}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose ResearchHub?</h3>
            <p className="text-gray-600">Designed by researchers, for researchers</p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Zoom key={feature.title} triggerOnce duration={800} delay={index * 150}>
              <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="card-title justify-center text-lg mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </Zoom>
          ))}
        </div>

        {/* Statistics */}
        <Slide triggerOnce direction="up" duration={800}>
          <div className="bg-base-200 rounded-3xl p-8 mb-20">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Our Impact</h3>
              <p className="text-gray-600">Join our growing community of researchers</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Fade key={stat.label} triggerOnce delay={index * 200}>
                  <div className="text-center">
                    <div className="stat-value text-primary text-3xl md:text-4xl">{stat.number}</div>
                    <div className="stat-desc text-gray-600">{stat.label}</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </Slide>

        {/* Team Section */}
        <Fade triggerOnce duration={800}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Meet Our Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to supporting the research community
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <Zoom key={member.name} triggerOnce duration={800} delay={index * 200}>
              <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-full w-20 h-20 text-3xl">
                      {member.avatar}
                    </div>
                  </div>
                  <h4 className="card-title justify-center text-xl">{member.name}</h4>
                  <div className="badge badge-primary badge-lg">{member.role}</div>
                  <p className="text-gray-600 text-sm mt-3">{member.bio}</p>
                </div>
              </div>
            </Zoom>
          ))}
        </div>

        {/* Call to Action */}
        <Fade triggerOnce duration={800}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Research Journey?</h3>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of researchers already using ResearchHub
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn btn-lg btn-white text-gray-800 hover:bg-gray-100">
                  Get Started Free
                </Link>
                <Link href="/papers" className="btn btn-lg btn-outline btn-white border-white text-white hover:bg-white hover:text-gray-800">
                  Browse Papers
                </Link>
              </div>
              <p className="text-white text-opacity-80 mt-4 text-sm">
                No credit card required • Free forever for basic features
              </p>
            </div>
          </div>
        </Fade>

      </div>
    </section>
  );
};

export default AboutSection;