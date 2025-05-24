import { useEffect, useState } from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail, ExternalLink, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, socialLinks, about } from './data';
import { useInView } from './hooks/useInView';

function ImageGalleryModal({ images, onClose }: { images: string[], onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [images, onClose]);

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    setTimeout(() => setSlideDirection(''), 300);
  };

  const handlePrevious = () => {
    setSlideDirection('left');
    setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    setTimeout(() => setSlideDirection(''), 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl w-full bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 z-10"
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
              <button
                onClick={handlePrevious}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 md:p-2 rounded-full transition-all"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 md:p-2 rounded-full transition-all"
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
  
  const [currentRef, currentInView] = useInView();
  const [pastRef, pastInView] = useInView();
  const [skillsRef, skillsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-400 animate-color-change text-white min-h-screen flex items-center justify-center w-full">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className={`flex flex-col items-center text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img 
              src={about.photo}
              alt={about.name}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 object-cover rounded-full border-4 border-white shadow-lg mb-4 md:mb-6"
            />
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
              {about.name}
            </h1>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mb-4 md:mb-6 lg:mb-8 text-blue-50 px-4 leading-relaxed">
              {about.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-6 md:space-x-6">
              <a href={`${import.meta.env.BASE_URL}assets/cv/mycv.pdf`} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300" target="_blank" rel="noopener noreferrer">
                <FileText size={24} />
              </a>
              <a href={socialLinks.github} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300">
                <Github size={24} />
              </a>
              <a href={socialLinks.linkedin} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300">
                <Linkedin size={24} />
              </a>
              <a href={socialLinks.facebook} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300">
                <Facebook size={24} />
              </a>
              <a href={socialLinks.instagram} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300">
                <Instagram size={24} />
              </a>
              <a href={`mailto:${about.email}`} className="hover:text-blue-200 transition-colors transform hover:-translate-y-1 duration-300">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the sections with a relative position */}
      <main className="relative">
        {/* Current Project Section */}
        <section 
          ref={currentRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-white scroll-animate ${currentInView ? 'animate' : ''}`}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-indigo-900 tracking-tight">Current Project Working On</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden project-card">
                <img 
                  src={projects.current.image} 
                  alt={projects.current.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-indigo-900">{projects.current.title}</h3>
                    <a href={projects.current.link} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group transition-all duration-300">
                      View Project <ExternalLink size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{projects.current.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {projects.current.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Past Projects Section */}
        <section 
          ref={pastRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-indigo-900 scroll-animate tracking-tight ${pastInView ? 'animate' : ''}`}>
            Other Projects
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children ${pastInView ? 'animate' : ''}`}>
            {projects.past.map((project, index) => (
              <div 
                key={project.title} 
                className="bg-white rounded-lg shadow-lg overflow-hidden project-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImages(project.images)}
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-900">{project.title}</h3>
                    <a href={project.link} className="text-indigo-600 hover:text-indigo-800 group transition-all duration-300">
                      <ExternalLink size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={skillsRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-white`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-indigo-900 scroll-animate tracking-tight ${skillsInView ? 'animate' : ''}`}>
            Skills
          </h2>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto stagger-children ${skillsInView ? 'animate' : ''}`}>
            {about.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center skill-icon animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 mb-4 shadow-md">
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-900">{skill.name}</h3>
                <span className="text-sm text-indigo-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={contactRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white scroll-animate ${contactInView ? 'animate' : ''}`}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-indigo-900 tracking-tight">Let's Connect</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600 leading-relaxed">
              I'm always open to discussing new projects and opportunities.
            </p>
            <a 
              href={`mailto:${about.email}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-900 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <Mail size={20} />
              Get in Touch
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} {about.name}. All rights reserved.</p>
          </div>
        </footer>
      </main>

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