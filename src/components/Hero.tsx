import React from 'react';
import { motion } from 'framer-motion';
import { Code, Camera, Zap, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-40 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-tight tracking-tight">
              3D RayTracer
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              A complete ray tracing renderer built in C++ with advanced lighting, 
              materials, and recursive reflection effects.
            </p>
          </motion.div>

          

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <a
              href="#gallery"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              View Gallery
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#code"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Explore Code
              <Code className="w-5 h-5" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero; 