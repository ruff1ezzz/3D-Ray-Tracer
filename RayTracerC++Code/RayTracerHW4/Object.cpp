#include "Object.h"
#include <algorithm>

Color Color::clip() const {
	return Color(std::min((float)r, 255.0f), std::min((float)g, 255.0f), std::min((float)b, 255.0f));
}

Color Color::operator+ (Color c) const {
	return Color(r + c.r, g + c.g, b + c.b);
}

Color Color::operator* (vec3 c) const {
	return Color(r * c.r, g * c.g, b * c.b);
}

Intersection Sphere::intersection(Ray r) {
	vec3 p0 = r.pos;
	vec3 p1 = r.dir;

	float a = dot(p1, p1);
	float b = (float)2 * dot(p1, (p0 - center));
	float c = dot((p0 - center), (p0 - center)) - (radius * radius);

	float discriminant = b * b - 4 * a * c;

	float addT = (-b + sqrt(discriminant)) / (2 * a);
	float subT = (-b - sqrt(discriminant)) / (2 * a);

	if (discriminant < 0) {
		return Intersection();
	}

	if (addT < 0 && subT < 0) {
		return Intersection();
	}

	float t = (addT < subT) ? addT : subT;
	vec3 hitPoint = p0 + t * p1;
	vec3 normal = normalize(hitPoint - center);

	return Intersection(this, t, hitPoint, normal);
}

Intersection Triangle::intersection(Ray r) {
	vec3 p0 = r.pos;
	vec3 p1 = r.dir;
	vec3 normal = normalize(cross(v2 - v1, v3 - v1));

	float denominator = dot(normal, p1);

	float t = dot(v1 - p0, normal) / denominator;

	if (t < 0) {
		return Intersection();
	}

	vec3 P = p0 + p1 * t;

	vec3 edge1 = v2 - v1;
	vec3 edge2 = v3 - v2;
	vec3 edge3 = v1 - v3;

	vec3 C1 = P - v2;
	vec3 C0 = P - v1;
	vec3 C2 = P - v3;

	if (dot(normal, cross(edge1, C0)) >= 0 &&
		dot(normal, cross(edge2, C1)) >= 0 &&
		dot(normal, cross(edge3, C2)) >= 0)
		return Intersection(this, t, P, normal);

	return Intersection();
}


Object::Object() {
	transform = mat4(1.0);
}

Sphere::Sphere(vec3 _center, float _radius) {
	center = _center;
	radius = _radius;
}
Triangle::Triangle(vec3 _v1, vec3 _v2, vec3 _v3) {
	v1 = _v1;
	v2 = _v2;
	v3 = _v3;
}

Object::~Object() {

}
Sphere::~Sphere() {

}
Triangle::~Triangle() {

}