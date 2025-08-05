import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, FileText, Cpu, Zap } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  icon: React.ComponentType<any>;
}

const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ray-tracing');

  const codeSnippets: { [key: string]: CodeSnippet } = {
    'ray-tracing': {
      id: 'ray-tracing',
      title: 'Ray Construction',
      description: 'Core ray construction algorithm for camera perspective',
      language: 'cpp',
      icon: Code,
      code: `Ray ConstructRay(const Camera& cam, const int& i, const int& j) {
    float aspectRatio = (float)w / h;
    float fovy = radians(cam.fovy);
    float fovx = tan(fovy / 2.0) * aspectRatio;

    vec3 camW = normalize(cam.eye - cam.center);
    vec3 camU = normalize(cross(cam.up, camW));
    vec3 camV = normalize(cross(camW, camU));

    float alpha = fovx * (((float)j + 0.5 - (w / 2.0)) / (w / 2.0));
    float beta = tan(fovy / 2.0) * (((h / 2.0) - (float)i + 0.5) / (h / 2.0));

    vec3 rayDirection = normalize(alpha * camU + beta * camV - camW);
    return Ray{ cam.eye, rayDirection };
}`
    },
    'intersection': {
      id: 'intersection',
      title: 'Sphere Intersection',
      description: 'Ray-sphere intersection using quadratic formula',
      language: 'cpp',
      icon: Cpu,
      code: `Intersection Sphere::intersection(Ray r) {
    vec3 p0 = r.pos;
    vec3 p1 = r.dir;

    float a = dot(p1, p1);
    float b = (float)2 * dot(p1, (p0 - center));
    float c = dot((p0 - center), (p0 - center)) - (radius * radius);

    float discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        return Intersection();
    }

    float addT = (-b + sqrt(discriminant)) / (2 * a);
    float subT = (-b - sqrt(discriminant)) / (2 * a);

    if (addT < 0 && subT < 0) {
        return Intersection();
    }

    float t = (addT < subT) ? addT : subT;
    vec3 hitPoint = p0 + t * p1;
    vec3 normal = normalize(hitPoint - center);

    return Intersection(this, t, hitPoint, normal);
}`
    },
    'lighting': {
      id: 'lighting',
      title: 'Phong Lighting Model',
      description: 'Complete lighting calculation with ambient, diffuse, and specular',
      language: 'cpp',
      icon: Zap,
      code: `Color FindColor(const Object* obj, const Intersection& intersection, 
         const Ray& ray, int depth) {
    if (obj == nullptr) return Color(0, 0, 0);

    float intensityR = obj->ambient.r + obj->emission.r;
    float intensityG = obj->ambient.g + obj->emission.g;
    float intensityB = obj->ambient.b + obj->emission.b;

    for (size_t i = 0; i < lightpos.size(); ++i) {
        vec3 position = vec3(lightpos[i].x, lightpos[i].y, lightpos[i].z);
        vec3 direction;
        if (lightpos[i].w == 0) { // Directional light
            direction = normalize(position);
        } else { // Point light
            direction = normalize(position - intersection.intersectionPoint);
        }
        
        vec3 eyedirn = normalize(ray.pos - intersection.intersectionPoint);
        vec3 halfVec = normalize(direction + eyedirn);

        float distanceToLight = length(position - intersection.intersectionPoint);
        float c = 1.0f / (attenuation.x + attenuation.y * distanceToLight + 
                          attenuation.z * distanceToLight * distanceToLight);

        bool isVisible = IsVisible(intersection.intersectionPoint, lightpos[i]);

        if (isVisible) {
            vec4 difhomo = vec4(obj->diffuse, 1.0f);
            vec4 spehomo = vec4(obj->specular, 1.0f);
            vec4 lightIntensity = ComputeLight(direction, lightcol[i], 
                intersection.normal, halfVec, difhomo, spehomo, obj->shininess);

            intensityR += lightIntensity.r * c;
            intensityG += lightIntensity.g * c;
            intensityB += lightIntensity.b * c;
        }
    }
    
    return Color(static_cast<unsigned char>(intensityR * 255),
                 static_cast<unsigned char>(intensityG * 255),
                 static_cast<unsigned char>(intensityB * 255));
}`
    },
    'reflection': {
      id: 'reflection',
      title: 'Recursive Reflection',
      description: 'Ray reflection calculation for mirror-like surfaces',
      language: 'cpp',
      icon: FileText,
      code: `Ray ReflectedRay(const Ray& ray, const Intersection& pt) {
    // Phong formula for reflection
    vec3 L = -ray.dir;
    vec3 N = pt.normal;
    vec3 R = -L + 2 * dot(L, N) * N;
    return Ray{ pt.intersectionPoint + 0.001f*R, normalize(R) };
}

// Recursive ray tracing in FindColor
Color currColor = Color(static_cast<unsigned char>(intensityR), 
                       static_cast<unsigned char>(intensityG), 
                       static_cast<unsigned char>(intensityB));
Ray reflection = ReflectedRay(ray, intersection);
if (depth == maxdepth) {
    return currColor.clip();
} else {
    Object* reflectClosestObj = nullptr;
    Intersection reflectClosestInt = findIntersection(reflection, reflectClosestObj);
    Color newCol = currColor + FindColor(reflectClosestObj, reflectClosestInt, 
                                        reflection, depth + 1) * obj->specular;
    return newCol.clip();
}`
    }
  };

  const tabs = [
    { id: 'ray-tracing', label: 'Ray Construction' },
    { id: 'intersection', label: 'Intersection' },
    { id: 'lighting', label: 'Lighting Model' },
    { id: 'reflection', label: 'Reflection' }
  ];

  const activeSnippet = codeSnippets[activeTab];

  return (
    <section id="code" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Code Showcase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the key algorithms and implementation details of our ray tracing engine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
                <div className="flex items-center space-x-2">
                  <activeSnippet.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">{activeSnippet.title}</span>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{activeSnippet.code}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Code Sections
              </h3>
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {activeSnippet.title}
              </h3>
              <p className="text-blue-800 text-sm">
                {activeSnippet.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Technical Details
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Language:</span> C++
                </div>
                <div>
                  <span className="font-medium">Library:</span> GLM Mathematics
                </div>
                <div>
                  <span className="font-medium">Performance:</span> Optimized for speed
                </div>
                <div>
                  <span className="font-medium">Memory:</span> Efficient allocation
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Project Architecture
            </h3>
            <p className="text-lg opacity-90 mb-6">
              The ray tracer is built with a modular architecture featuring clean separation 
              of concerns between geometry, lighting, and rendering components.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Geometry</h4>
                <p className="text-sm opacity-80">Sphere and triangle primitives with intersection algorithms</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Lighting</h4>
                <p className="text-sm opacity-80">Phong model with ambient, diffuse, and specular components</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Rendering</h4>
                <p className="text-sm opacity-80">Recursive ray tracing with reflection and shadow casting</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase; 