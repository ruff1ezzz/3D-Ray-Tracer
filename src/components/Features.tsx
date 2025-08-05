import React from 'react';
import { motion } from 'framer-motion';
import { Code, Camera, Zap, Globe, Cpu, Palette } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Ray Tracing Engine',
      description: 'Implements ray-object intersection algorithms for spheres and triangles with transform support.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Camera,
      title: 'Multiple Cameras',
      description: 'Supports multiple camera positions and perspectives for comprehensive scene analysis.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Advanced Lighting',
      description: 'Phong lighting model with ambient, diffuse, specular, and recursive reflection effects.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Globe,
      title: '3D Transformations',
      description: 'Full support for 3D transformations including rotation, scaling, and translation.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Cpu,
      title: 'High Performance',
      description: 'Optimized C++ implementation for fast rendering and real-time preview capabilities.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Palette,
      title: 'Material System',
      description: 'Comprehensive material system with textures, reflections, and custom shaders.',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-features relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the powerful capabilities of our ray tracing engine with cutting-edge graphics technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gradient-card backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/25 transition-all duration-200 group hover:scale-102"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 