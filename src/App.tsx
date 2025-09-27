import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter, Calendar, Clock, Search, Download, ExternalLink, ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';

// TypeScript interfaces for type safety
interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

interface Skill {
  category: string;
  technologies: string[];
}

interface NavItem {
  label: string;
  href: string;
}

const ChintaPatelWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Navigation items
  const navItems: NavItem[] = [
    { label: 'Home', href: 'home' },
    { label: 'Blog', href: 'blog' },
    { label: 'About', href: 'about' }
  ];

  // Articles data
  const articles: Article[] = [
    {
      id: 1,
      title: 'Building Modern Web Applications with React and TypeScript',
      description: 'Exploring the power of type-safe development and component architecture in modern web applications.',
      date: '3/14/2024',
      readTime: '8 min read',
      tags: ['React', 'TypeScript', 'Web Development'],
      featured: true
    },
    {
      id: 2,
      title: 'Modern CSS: Grid, Flexbox, and Beyond',
      description: 'A comprehensive guide to modern CSS layout techniques and how they\'re revolutionizing web design.',
      date: '3/4/2024',
      readTime: '5 min read',
      tags: ['CSS', 'Web Design', 'Frontend'],
      featured: true
    },
    {
      id: 3,
      title: 'The Art of Clean Code: Best Practices for Maintainable Software',
      description: 'Discover the principles and practices that make code not just functional, but beautiful and maintainable.',
      date: '3/9/2024',
      readTime: '6 min read',
      tags: ['Clean Code', 'Software Engineering', 'Best Practices']
    },
    {
      id: 4,
      title: 'JavaScript Performance Optimization: A Deep Dive',
      description: 'Techniques and strategies for optimizing JavaScript performance in modern web applications.',
      date: '2/27/2024',
      readTime: '10 min read',
      tags: ['JavaScript', 'Performance', 'Optimization']
    }
  ];

  // Skills data
  const skills: Skill[] = [
    {
      category: 'Frontend Development',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js']
    },
    {
      category: 'Backend Development',
      technologies: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL']
    },
    {
      category: 'Tools & Technologies',
      technologies: ['Git', 'Docker', 'AWS', 'Figma', 'Jest']
    }
  ];

  // Filter articles based on search
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Featured articles
  const featuredArticles = articles.filter(article => article.featured);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle page change and close mobile menu
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Handle email subscription
  const handleSubscribe = () => {
    console.log('Subscribing email:', email);
    setEmail('');
  };

  // Render navigation
  const renderNavigation = () => (
    <header className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'
    } backdrop-blur-md`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => handlePageChange('home')}
            className={`text-xl font-bold transition-colors duration-200 ${
              darkMode ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
            }`}
          >
            Chintan Patel
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handlePageChange(item.href)}
                    className={`transition-colors duration-200 ${
                      currentPage === item.href
                        ? darkMode ? 'text-blue-400' : 'text-gray-900'
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <ul className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handlePageChange(item.href)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentPage === item.href
                        ? darkMode ? 'text-blue-400 bg-gray-800' : 'text-gray-900 bg-gray-100'
                        : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );

  // Render home page
  const renderHomePage = () => (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Hello, I'm Chintan
          </h1>
          <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Welcome to my digital space where I share thoughts on technology, development,
            and everything in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handlePageChange('blog')}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                darkMode 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Read My Blog
            </button>
            <button
              onClick={() => handlePageChange('about')}
              className={`px-8 py-3 rounded-lg font-medium border transition-all duration-300 ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              About Me
            </button>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
        </div>
      </section>
    </main>
  );

  // Render blog page
  const renderBlogPage = () => (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Blog Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Latest Articles
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Thoughts, insights, and experiences from my journey in technology and development.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:ring-2 focus:ring-blue-200 outline-none`}
            />
          </div>
        </div>

        {/* Featured Articles */}
        {!searchQuery && (
          <section className="mb-16">
            <h2 className={`text-2xl font-bold mb-8 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <article 
                  key={article.id}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                      : 'bg-white border-gray-200 hover:shadow-xl'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {article.title}
                  </h3>
                  
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`px-3 py-1 text-sm rounded-full ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white">
                      Featured
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className={`text-2xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {searchQuery ? 'Search Results' : 'All Articles'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => (
              <article 
                key={article.id}
                className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                    : 'bg-white border-gray-200 hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {article.readTime}
                    </span>
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {article.title}
                </h3>
                
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {article.featured && (
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-900 text-white">
                      Featured
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className={`px-8 py-3 rounded-lg border transition-all duration-300 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
            }`}>
              Load More Articles
            </button>
          </div>
        </section>
      </div>
    </main>
  );

  // Render about page
  const renderAboutPage = () => (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About Me
          </h1>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className={`prose prose-lg ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                <p className={`text-lg leading-relaxed mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Hi there! I'm Chintan Patel, a passionate developer and technology enthusiast 
                  who loves to explore the ever-evolving landscape of software development.
                  As an IT Development Manager at Vi, I lead the design and delivery of impactful solutions in Business Intelligence, 
                  Data Analytics, and IT Development, with deep expertise in Microsoft technologies. 
                  With 10 Microsoft Certifications across BI, AI, Data Management, and Analytics, I specialize in turning complex data into actionable insights 
                  that drive business results. Currently I'm pursuing an MBA at the University of Chicago Booth School of Business to further elevate my leadership and strategic decision-making skills.
                  I'm guided by a strong belief in ethical leadership, continuous learning, 
                  and making a positive impact—both professionally and through philanthropic 
                  efforts that support underserved communities.
                  
                </p>
                
                <p className={`text-lg leading-relaxed mb-6 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Reading is a passion of mine and a source of inspiration that drives me to achieve great things in life.
                  Outside of work, I cherish time with family and friends and am an avid volleyball enthusiast and 
                  proud supporter of the US National Team.
                </p>
                
                <p className={`text-lg leading-relaxed mb-8 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open source projects, or writing about my latest discoveries 
                  in the tech world.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-white text-gray-900 hover:bg-gray-100' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </button>
                <button className={`flex items-center justify-center px-6 py-3 rounded-lg border transition-all duration-300 ${
                  darkMode 
                    ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900'
                }`}>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Portfolio
                </button>
              </div>
            </div>
            
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Skills & Expertise
              </h2>
              
              <div className="space-y-8">
                {skills.map((skillCategory) => (
                  <div key={skillCategory.category}>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {skillCategory.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className={`px-3 py-1 text-sm rounded-full ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // Render footer
  const renderFooter = () => (
    <footer className={`border-t ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          {/* Connect */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Connect
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let's connect and discuss technology, ideas, or potential collaborations.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/ChintansPatel" 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/chintanpatel42" 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className={`border-t mt-8 pt-8 text-center ${
          darkMode ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
        }`}>
          <p>© 2025 Chintan Patel. All rights reserved. Built with ❤️ using React & TypeScript.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {renderNavigation()}
      
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'blog' && renderBlogPage()}
      {currentPage === 'about' && renderAboutPage()}
      
      {renderFooter()}

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default ChintaPatelWebsite;