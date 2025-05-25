import { useEffect, useState, useCallback } from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail, ExternalLink, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, socialLinks, about } from './data';
import { useInView } from './hooks/useInView';
import StarryBackground from './components/StarryBackground';
import DarkModeToggle from './components/DarkModeToggle';

function ImageGalleryModal({ images, onClose }: { images: string[], onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');

  const handleNext = useCallback(() => {
    setSlideDirection('right');
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    setTimeout(() => setSlideDirection(''), 300);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setSlideDirection('left');
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    setTimeout(() => setSlideDirection(''), 300);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handleNext, handlePrevious]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      {/* Modal Content Container: Updated rounded-lg to rounded-xl */}
      <div className="relative max-w-6xl w-full bg-white dark:bg-dark-secondary rounded-xl overflow-hidden transition-all duration-300" style={{ transform: 'translateZ(0)' }}> {/* rounded-lg to rounded-xl */}
        {/* Close Button: Updated text colors */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-primary dark:text-dark-text-primary hover:text-accent dark:hover:text-dark-accent z-10 transition-colors" /* text-gray-800 hover:text-gray-600 to text-text-primary hover:text-accent */
        >
          <X size={24} />
        </button>
        
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt="Project screenshot"
            className={`w-full h-[80vh] object-contain transition-transform duration-300 ease-in-out ${
              slideDirection === 'right' ? 'animate-slide-left' : 
              slideDirection === 'left' ? 'animate-slide-right' : ''
            }`}
          />
          
          {images.length > 1 && (
            <>
              {/* Navigation Buttons: Updated background, hover background, and text color. Consistent padding p-2. */}
              <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary dark:bg-dark-primary/70 dark:hover:bg-dark-primary text-white p-2 rounded-full transition-all" /* Updated styles */
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary dark:bg-dark-primary/70 dark:hover:bg-dark-primary text-white p-2 rounded-full transition-all" /* Updated styles */
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const [pastRef, pastInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create a ref for the About Me section
  const [aboutMeRef, aboutMeInView] = useInView();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-secondary dark:bg-dark-secondary w-full transition-all duration-500">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-primary via-blue-800 to-primary dark:from-dark-primary dark:via-blue-900 dark:to-dark-primary animate-color-change text-white min-h-screen flex items-center justify-center w-full relative overflow-hidden transition-all duration-700" 
        style={{ 
          transform: `translateZ(0) translateY(${scrollPosition * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollPosition / 700)
        }}>
        <StarryBackground />
        <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img 
              src={about.photo}
              alt={about.name}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 object-cover rounded-full border-4 border-white dark:border-dark-accent/20 shadow-xl mb-4 sm:mb-6 md:mb-8" 
              loading="eager" /* For better performance */
            />
            {/* Name: Text color is white, font-bold. Sizes are responsive. */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"> 
              {about.name}
            </h1>
            {/* Description: Text color text-gray-200. Increased max-width for potentially larger text. */}
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mb-6 md:mb-8 text-gray-200 dark:text-gray-100 px-4"> 
              {about.description}
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <a href={`${import.meta.env.BASE_URL}assets/cv/mycv.pdf`} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" target="_blank" rel="noopener noreferrer" aria-label="CV">
                <FileText size={28} />
              </a>
              <a href={socialLinks.github} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github size={28} />
              </a>
              <a href={socialLinks.linkedin} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={28} />
              </a>
              <a href={socialLinks.facebook} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={28} />
              </a>
              <a href={socialLinks.instagram} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={28} />
              </a>
              <a href={`mailto:${about.email}`} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Email">
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the sections with a relative position */}
      <main className="relative">
        {/* About Me Section */}
        <section 
          ref={aboutMeRef as React.RefObject<HTMLElement>}
          className={`py-12 md:py-20 bg-white dark:bg-dark-secondary transition-all duration-700 ease-in-out transform ${
            aboutMeInView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 dark:text-dark-text-primary transition-all duration-700 transform ${aboutMeInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}>
              About Me
            </h2>
            <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 stagger-children transition-all duration-1000 ease-out ${aboutMeInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className={`md:w-1/3 transition-all duration-700 delay-300 ${aboutMeInView ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-12'}`}>
                <img 
                  src="/Portfolio/assets/images/pro2.jpg"
                  alt={about.name} 
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-accent dark:border-dark-accent shadow-lg mx-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className={`md:w-2/3 transition-all duration-1000 delay-500 ${aboutMeInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <p className="text-lg md:text-xl mb-6 leading-relaxed dark:text-dark-text-primary transform transition-all duration-500">
                  I'm a Computer Science undergraduate with a strong passion for building innovative and impactful software solutions. I specialize in full-stack development and enjoy creating seamless user experiences through both web and mobile applications.
                </p>
                <p className="text-lg md:text-xl mb-6 leading-relaxed dark:text-dark-text-primary">
                  With hands-on experience in technologies like Spring Boot, Angular, ReactJS, NodeJS, React Native, and .NET, I've developed a variety of projects ranging from real-time ticketing systems to AI-powered crop disease detection apps. My work reflects a blend of problem-solving, creativity, and technical skill.
                </p>
                <p className="text-lg md:text-xl mb-6 leading-relaxed dark:text-dark-text-primary">
                  I'm also deeply interested in machine learning and cloud technologies, which I incorporate into my projects to deliver smarter and more scalable solutions. I thrive in collaborative environments and am always eager to learn new tools, take on new challenges, and contribute to meaningful tech innovations.
                </p>
                
                {/* CV Download Button */}
                <div className="flex justify-start mt-2">
                  <a 
                    href={`${import.meta.env.BASE_URL}assets/cv/mycv.pdf`} 
                    download="Poorna_Kahandakorala_CV.pdf"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent text-white px-4 sm:px-5 py-2 rounded-lg hover:from-primary/90 hover:to-accent/90 dark:hover:from-dark-primary/90 dark:hover:to-dark-accent/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm sm:text-base touch-manipulation"
                  >
                    <FileText size={18} />
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={pastRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-white dark:bg-dark-secondary/70 transition-colors duration-300`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 rotate-in dark:text-dark-text-primary ${pastInView ? 'animate' : ''}`}>
            My Projects
          </h2>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children ${pastInView ? 'animate' : ''}`} style={{ transform: 'translateZ(0)' }}>
                  {projects.past.slice(0, projects.past.length - 2).map((project, index) => (
                    <div 
                      key={project.title} 
                      className="bg-white dark:bg-dark-secondary/90 rounded-xl shadow-lg border border-gray-100 dark:border-dark-accent/20 overflow-hidden project-card transition-colors duration-300"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setSelectedImages(project.images)}
                      />
                      <div className="p-6">
                        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                          <h3 className="text-xl font-bold dark:text-dark-text-primary">{project.title}</h3>
                          <a href={project.link} className="text-accent dark:text-dark-accent hover:opacity-80 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <p className="text-text-secondary dark:text-dark-text-secondary mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 bg-accent/15 dark:bg-dark-accent/20 text-teal-700 dark:text-dark-accent rounded-full text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            
            {/* Special container for the last two projects to center them */}
            <div className="mt-8 flex flex-col md:flex-row justify-center gap-6 md:gap-8 px-4 sm:px-0">
              {projects.past.slice(-2).map((project, index) => (
                <div 
                  key={project.title}
                  className="bg-white dark:bg-dark-secondary/90 rounded-xl shadow-lg border border-gray-100 dark:border-dark-accent/20 overflow-hidden project-card transition-colors duration-300 max-w-md w-full mx-auto md:mx-0"
                  style={{ animationDelay: `${(index + projects.past.length - 2) * 0.2}s` }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImages(project.images)}
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                      <h3 className="text-xl font-bold dark:text-dark-text-primary">{project.title}</h3>
                      <a href={project.link} className="text-accent dark:text-dark-accent hover:opacity-80 text-sm sm:text-base" target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 bg-accent/15 dark:bg-dark-accent/20 text-teal-700 dark:text-dark-accent rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={skillsRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-white dark:bg-dark-secondary transition-colors duration-300`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 pop-in dark:text-dark-text-primary ${skillsInView ? 'animate' : ''}`}>
            Skills
          </h2>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto stagger-children ${skillsInView ? 'animate' : ''}`} style={{ transform: 'translateZ(0)' }}>
            {about.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center skill-icon animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-accent/10 via-secondary to-accent/10 dark:from-dark-accent/20 dark:via-dark-secondary dark:to-dark-accent/20 mb-4 shadow-md transition-all duration-300">
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="text-lg font-semibold dark:text-dark-text-primary">{skill.name}</h3>
                <span className="text-sm text-accent dark:text-dark-accent">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={contactRef as React.RefObject<HTMLElement>}
          className={`py-12 md:py-20 bg-gray-50 dark:bg-dark-secondary/70 float-in transition-colors duration-300 ${contactInView ? 'animate' : ''}`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 dark:text-dark-text-primary">Let's Connect</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-text-secondary dark:text-dark-text-secondary">
              I'm always open to discussing new projects and opportunities.
            </p>
            <a 
              href={`mailto:${about.email}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent text-white px-6 sm:px-8 py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 dark:hover:from-dark-primary/90 dark:hover:to-dark-accent/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-base sm:text-lg touch-manipulation"
            >
              <Mail size={20} />
              Get in Touch
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary dark:bg-dark-primary text-gray-300 py-8 transition-colors duration-300">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} {about.name}. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
      
      {/* Image Gallery Modal */}
      {selectedImages && (
        <ImageGalleryModal
          images={selectedImages}
          onClose={() => setSelectedImages(null)}
        />
      )}
    </div>
  );
}

export default App;