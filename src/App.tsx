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
      {/* Modal Content Container: Updated rounded-lg to rounded-xl */}
      <div className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden"> {/* rounded-lg to rounded-xl */}
        {/* Close Button: Updated text colors */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-primary hover:text-accent z-10 transition-colors" /* text-gray-800 hover:text-gray-600 to text-text-primary hover:text-accent */
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
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-white p-2 rounded-full transition-all" /* Updated styles */
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-primary/70 hover:bg-primary text-white p-2 rounded-full transition-all" /* Updated styles */
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
    <div className="min-h-screen bg-secondary w-full"> {/* Updated background */}
      {/* Header/Hero Section */}
      {/* Gradient updated to from-primary via-blue-800 to-primary */}
      <header className="bg-gradient-to-r from-primary via-blue-800 to-primary animate-color-change text-white min-h-screen flex items-center justify-center w-full">
        <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"> {/* Added some padding for smaller screens */}
          <div className={`flex flex-col items-center text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img 
              src={about.photo}
              alt={about.name}
              // Profile image border changed to border-white and added shadow-xl
              className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 object-cover rounded-full border-4 border-white shadow-xl mb-6 md:mb-8" 
            />
            {/* Name: Text color is white, font-bold. Sizes are responsive. */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"> 
              {about.name}
            </h1>
            {/* Description: Text color text-gray-200. Increased max-width for potentially larger text. */}
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mb-6 md:mb-8 text-gray-200 px-4"> 
              {about.description}
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6"> {/* Added flex-wrap and justify-center for better wrapping on small screens, adjusted spacing */}
              {/* Social link hover effect changed to hover:text-accent */}
              <a href={`${import.meta.env.BASE_URL}assets/cv/mycv.pdf`} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" target="_blank" rel="noopener noreferrer" aria-label="CV">
                <FileText size={28} /> {/* Increased icon size slightly */}
              </a>
              <a href={socialLinks.github} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="GitHub">
                <Github size={28} /> {/* Increased icon size slightly */}
              </a>
              <a href={socialLinks.linkedin} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="LinkedIn">
                <Linkedin size={28} /> {/* Increased icon size slightly */}
              </a>
              <a href={socialLinks.facebook} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Facebook">
                <Facebook size={28} /> {/* Increased icon size slightly */}
              </a>
              <a href={socialLinks.instagram} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Instagram">
                <Instagram size={28} /> {/* Increased icon size slightly */}
              </a>
              <a href={`mailto:${about.email}`} className="text-white hover:text-accent transition-colors transform hover:-translate-y-1 duration-300 p-2" aria-label="Email">
                <Mail size={28} /> {/* Increased icon size slightly */}
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
          className={`py-12 md:py-20 bg-white blur-in ${currentInView ? 'animate' : ''}`} {/* Updated to bg-white */}
        >
          <div className="container mx-auto px-4">
            {/* h2 already uses text-primary from global styles */}
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${currentInView ? 'animate' : ''}`}>Current Project Working On</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden project-card"> {/* rounded-lg to rounded-xl */}
                <img 
                  src={projects.current.image} 
                  alt={projects.current.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-2"> {/* Added flex-wrap and gap-2 for responsiveness */}
                    {/* h3 already uses text-primary from global styles */}
                    <h3 className="text-2xl font-bold">{projects.current.title}</h3> 
                    <a href={projects.current.link} className="text-accent hover:opacity-80 flex items-center gap-1 text-sm sm:text-base"> {/* Ensured text-accent and hover:opacity-80, added responsive text size */}
                      View Project <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-text-secondary mb-4">{projects.current.description}</p> {/* Already text-text-secondary */}
                  <div className="flex flex-wrap gap-2">
                    {projects.current.technologies.map((tech) => (
                      // Updated to bg-accent/15 text-teal-700 (darker accent text)
                      <span key={tech} className="px-3 py-1 bg-accent/15 text-teal-700 rounded-full text-sm">
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
          className={`py-12 md:py-20 bg-secondary`} // Kept bg-secondary as per decision
        >
          {/* h2 already uses text-primary from global styles */}
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 rotate-in ${pastInView ? 'animate' : ''}`}>
            Other Projects
          </h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 stagger-children ${pastInView ? 'animate' : ''}`}>
            {projects.past.map((project, index) => (
              <div 
                key={project.title} 
                className="bg-white rounded-xl shadow-lg overflow-hidden project-card" // rounded-lg to rounded-xl
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImages(project.images)}
                />
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-2"> {/* Added flex-wrap and gap-2 for responsiveness */}
                    {/* h3 already uses text-primary from global styles */}
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <a href={project.link} className="text-accent hover:opacity-80 text-sm sm:text-base"> {/* Ensured text-accent and hover:opacity-80, added responsive text size */}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-text-secondary mb-4">{project.description}</p> {/* Already text-text-secondary */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      // Updated to bg-accent/15 text-teal-700 (darker accent text)
                      <span key={tech} className="px-2 py-1 bg-accent/15 text-teal-700 rounded-full text-xs">
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
          className={`py-12 md:py-20 bg-white`} {/* Updated background to bg-white */}
        >
          {/* h2 uses text-primary from global styles */}
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 pop-in ${skillsInView ? 'animate' : ''}`}>
            Skills
          </h2>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto stagger-children ${skillsInView ? 'animate' : ''}`}>
            {about.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center skill-icon animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Updated gradient to from-accent/10 via-secondary to-accent/10. Icon container size made responsive. */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-accent/10 via-secondary to-accent/10 mb-4 shadow-md">
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10" /> {/* Adjusted icon size within container */}
                </div>
                {/* h3 uses text-primary from global styles */}
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                {/* span uses text-accent */}
                <span className="text-sm text-accent">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={contactRef as React.RefObject<HTMLElement>} 
          className={`py-12 md:py-20 bg-secondary float-in ${contactInView ? 'animate' : ''}`} {/* Updated background to bg-secondary */}
        >
          <div className="container mx-auto px-4 text-center">
            {/* h2 uses text-primary from global styles */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Let's Connect</h2>
            {/* text-text-secondary is already applied from previous steps */}
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-text-secondary">
              I'm always open to discussing new projects and opportunities.
            </p>
            {/* Button styles confirmed to be from-primary to-accent and hover:from-primary/90 hover:to-accent/90 */}
            <a 
              href={`mailto:${about.email}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <Mail size={20} />
              Get in Touch
            </a>
          </div>
        </section>

        {/* Footer */}
        {/* Updated background to bg-primary and text to text-gray-300 */}
        <footer className="bg-primary text-gray-300 py-8">
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