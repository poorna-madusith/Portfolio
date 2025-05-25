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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      {/* Modal Content Container: Updated rounded-lg to rounded-xl */}
      <div className="relative max-w-6xl w-full bg-white dark:bg-dark-secondary rounded-xl overflow-hidden transition-colors duration-300"> {/* rounded-lg to rounded-xl */}
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
  
  const [pastRef, pastInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create a ref for the About Me section
  const [aboutMeRef, aboutMeInView] = useInView();

  return (
    <div className="min-h-screen bg-secondary dark:bg-dark-secondary w-full transition-colors duration-300">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-primary via-blue-800 to-primary dark:from-dark-primary dark:via-blue-900 dark:to-dark-primary animate-color-change text-white min-h-screen flex items-center justify-center w-full relative overflow-hidden">
        <StarryBackground />
        <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className={`flex flex-col items-center text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img 
              src={about.photo}
              alt={about.name}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 object-cover rounded-full border-4 border-white dark:border-dark-accent/20 shadow-xl mb-6 md:mb-8" 
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
              <a href={socialLinks.github} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="GitHub">
                <Github size={28} />
              </a>
              <a href={socialLinks.linkedin} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="LinkedIn">
                <Linkedin size={28} />
              </a>
              <a href={socialLinks.facebook} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href={socialLinks.instagram} className="text-white hover:text-accent dark:hover:text-dark-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Instagram">
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
          className={`py-12 md:py-20 bg-white dark:bg-dark-secondary transition-colors duration-300`}
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 pop-in dark:text-dark-text-primary ${aboutMeInView ? 'animate' : ''}`}>
              About Me
            </h2>
            <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 stagger-children ${aboutMeInView ? 'animate' : ''}`}>
              <div className="md:w-1/3 rotate-in" style={{ animationDelay: '0.2s' }}>
                <img 
                  src={about.photo} 
                  alt={about.name} 
                  className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-accent dark:border-dark-accent shadow-lg mx-auto"
                />
              </div>
              <div className="md:w-2/3 float-in" style={{ animationDelay: '0.4s' }}>
                <p className="text-lg md:text-xl mb-6 leading-relaxed dark:text-dark-text-primary">
                  I'm a passionate Computer Science undergraduate with a deep love for creating innovative solutions through code. My journey in technology began with simple HTML websites and has evolved into building complex web applications and mobile solutions.
                </p>
                <p className="text-lg md:text-xl mb-6 leading-relaxed dark:text-dark-text-primary">
                  With a focus on full-stack development, I enjoy working with modern frameworks and technologies to bring ideas to life. I believe in writing clean, maintainable code and am constantly learning new skills to stay at the forefront of technology trends.
                </p>
                <p className="text-lg md:text-xl leading-relaxed dark:text-dark-text-primary">
                  When I'm not coding, you can find me exploring new tech, contributing to open-source projects, or sharing my knowledge with the community. I'm always open to new challenges and opportunities to grow as a developer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={pastRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-secondary dark:bg-dark-secondary/70 transition-colors duration-300`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 rotate-in dark:text-dark-text-primary ${pastInView ? 'animate' : ''}`}>
            My Projects
          </h2>
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children ${pastInView ? 'animate' : ''}`}>
              {projects.past.map((project, index) => (
                <div 
                  key={project.title} 
                  className="bg-white dark:bg-dark-secondary/90 rounded-xl shadow-lg dark:shadow-dark-accent/10 border border-transparent dark:border-dark-accent/20 overflow-hidden project-card transition-colors duration-300"
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
                      <a href={project.link} className="text-accent dark:text-dark-accent hover:opacity-80 text-sm sm:text-base">
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
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto stagger-children ${skillsInView ? 'animate' : ''}`}>
            {about.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center skill-icon animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-accent/10 via-secondary to-accent/10 dark:from-dark-accent/20 dark:via-dark-secondary dark:to-dark-accent/20 mb-4 shadow-md transition-colors duration-300">
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
          className={`py-12 md:py-20 bg-secondary dark:bg-dark-secondary/70 float-in transition-colors duration-300 ${contactInView ? 'animate' : ''}`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 dark:text-dark-text-primary">Let's Connect</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-text-secondary dark:text-dark-text-secondary">
              I'm always open to discussing new projects and opportunities.
            </p>
            <a 
              href={`mailto:${about.email}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent dark:from-dark-primary dark:to-dark-accent text-white px-8 py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 dark:hover:from-dark-primary/90 dark:hover:to-dark-accent/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
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