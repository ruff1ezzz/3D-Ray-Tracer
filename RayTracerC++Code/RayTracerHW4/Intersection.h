#ifndef INTERSECTION_H
#define INTERSECTION_H

#include "Object.h"
#include "glm/glm.hpp"
#include <limits>

class Object; // Forward declaration of Object class

class Intersection {
public:
    Object* object;
    float distance;
    glm::vec3 intersectionPoint;
    glm::vec3 normal;

    Intersection(Object* obj, float dist, const glm::vec3& point, const glm::vec3& n) {
        object = obj;
        distance = dist;
        intersectionPoint = point;
        normal = n;
    }

    Intersection() {
        object = nullptr;
        distance = std::numeric_limits<float>::infinity();
        intersectionPoint = glm::vec3(0.0f);
        normal = glm::vec3(0.0f);
    }

    bool isValid() const {
        return (distance < std::numeric_limits<float>::infinity());
    }
};

#endif