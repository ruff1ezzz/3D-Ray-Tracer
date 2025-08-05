#ifndef OBJECT_H
#define OBJECT_H

#include "glm/glm.hpp"
#include "Intersection.h"

typedef glm::vec3 vec3;
typedef glm::mat4 mat4;

struct Ray {
	vec3 pos;
	vec3 dir;
};

struct Color {
	unsigned char r, g, b;

	Color() : r(0), g(0), b(0) {}
	Color(unsigned char _r, unsigned char _g, unsigned char _b) : r(_r), g(_g), b(_b) {}
	Color clip() const;
	Color operator + (Color c) const;
	Color operator * (vec3 c) const;
};

class Object {
public:
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	vec3 emission;
	float shininess;
	enum objshape { triangle, sphere };
	objshape shape;
	mat4 transform;

	Object();
	virtual ~Object();
	virtual Intersection intersection(Ray r) = 0;
};

class Sphere : public Object {
public:
	vec3 center;
	float radius;

	Sphere(vec3 _center, float _radius);
	~Sphere();
	Intersection intersection(Ray r);
};

class Triangle : public Object {
public:
	vec3 v1;
	vec3 v2;
	vec3 v3;

	Triangle(vec3 _v1, vec3 _v2, vec3 _v3);
	~Triangle();
	Intersection intersection(Ray r);
};

#endif