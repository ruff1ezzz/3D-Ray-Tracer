import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images: GalleryImage[] = [
    {
      src: `${process.env.PUBLIC_URL}/images/scene1-cam1.png`,
      title: 'Scene 1 - Camera 1',
      description: 'Simple quad viewed from the first camera position',
      category: 'Basic Geometry'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene1-cam2.png`,
      title: 'Scene 1 - Camera 2',
      description: 'Simple quad viewed from the second camera position',
      category: 'Basic Geometry'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene1-cam3.png`,
      title: 'Scene 1 - Camera 3',
      description: 'Simple quad viewed from the third camera position',
      category: 'Basic Geometry'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene1-cam4.png`,
      title: 'Scene 1 - Camera 4',
      description: 'Simple quad viewed from the fourth camera position',
      category: 'Basic Geometry'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene2-cam1.png`,
      title: 'Scene 2 - Camera 1',
      description: 'Complex geometry with multiple objects',
      category: 'Complex Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene2-cam2.png`,
      title: 'Scene 2 - Camera 2',
      description: 'Complex geometry viewed from different angle',
      category: 'Complex Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene2-cam3.png`,
      title: 'Scene 2 - Camera 3',
      description: 'Complex geometry with advanced lighting',
      category: 'Complex Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene3.png`,
      title: 'Scene 3 - Table',
      description: 'Table with legs demonstrating transform operations',
      category: 'Transform Examples'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene4-ambient.png`,
      title: 'Scene 4 - Ambient Lighting',
      description: 'Demonstrating ambient lighting effects',
      category: 'Lighting Tests'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene4-diffuse.png`,
      title: 'Scene 4 - Diffuse Lighting',
      description: 'Demonstrating diffuse reflection effects',
      category: 'Lighting Tests'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene4-emission.png`,
      title: 'Scene 4 - Emission',
      description: 'Self-illuminating materials',
      category: 'Lighting Tests'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene4-specular.png`,
      title: 'Scene 4 - Specular Lighting',
      description: 'Demonstrating specular reflection effects',
      category: 'Lighting Tests'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene5.png`,
      title: 'Scene 5',
      description: 'Advanced rendering with complex lighting',
      category: 'Advanced Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene6.png`,
      title: 'Scene 6',
      description: 'Complex scene with multiple light sources',
      category: 'Advanced Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/scene7.png`,
      title: 'Scene 7',
      description: 'Advanced scene with recursive reflections',
      category: 'Advanced Scenes'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/aung-diffuse.png`,
      title: 'Aung Diffuse Test',
      description: 'Custom diffuse lighting test scene',
      category: 'Custom Tests'
    },
    {
      src: `${process.env.PUBLIC_URL}/images/aung-diffuse2.png`,
      title: 'Aung Diffuse Test 2',
      description: 'Additional diffuse lighting test',
      category: 'Custom Tests'
    }
  ];

  const categories = ['All', 'Basic Geometry', 'Complex Scenes', 'Transform Examples', 'Lighting Tests', 'Advanced Scenes', 'Custom Tests'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Gallery Showcase
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the beautiful renders created by our ray tracing engine
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openModal(image, index)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                    <p className="text-white/80 text-sm mb-3">{image.category}</p>
                    <div className="flex items-center justify-center">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-5xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mt-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full text-sm font-medium">
                      {selectedImage.category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {currentIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery; 