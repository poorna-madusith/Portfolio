import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail, ExternalLink, X } from 'lucide-react';
import { projects, socialLinks, about } from './data';

function ImageGalleryModal({ images, onClose }: { images: string[], onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === 'ArrowRight') setCurrentImageIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [images, onClose]);

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
            className="w-full h-[80vh] object-contain"
          />
          
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-blue-950 via-blue-700 to-blue-400 animate-color-change text-white py-20">
        <div className="container mx-auto px-4">
          <div className={`flex flex-col items-center text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <img 
              src={about.photo}
              alt={about.name}
              className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg mb-6 hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              {about.name}
            </h1>
            <p className="text-xl max-w-2xl mb-8 text-blue-50">{about.description}</p>
            
            {/* Social Links */}
            <div className="flex space-x-6">
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

      {/* Current Project Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">Current Project Working On</h2>
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
                  <a href={projects.current.link} className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-gray-600 mb-4">{projects.current.description}</p>
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <a href={project.link} className="text-indigo-600 hover:text-indigo-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
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
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-900">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {about.skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="flex flex-col items-center skill-icon animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 mb-4 shadow-md">
                  <span className="text-3xl">{skill.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-indigo-900">{skill.name}</h3>
                <span className="text-sm text-indigo-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-indigo-900">Let's Connect</h2>
          <p className="text-xl mb-8 text-gray-600">
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