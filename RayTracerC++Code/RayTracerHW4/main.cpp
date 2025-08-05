// RAY TRACER USING HW2 SKELETON

#define _USE_MATH_DEFINES
#define GLM_ENABLE_EXPERIMENTAL
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <deque>
#include <stack>
#include <vector>
#include "Transform.h"
#include "FreeImage.h"
#include <math.h>
#include "glm/gtx/string_cast.hpp"

using namespace std;
using namespace glm;
#include "readfile.h"

// Initialize external variables
struct Camera camera;
int w, h;
float fovy;

int maxdepth;
int maxverts;
string outFile;

vector<vec4> lightpos;
vector<vec4> lightcol;
vec3 ambient;
vec3 diffuse;
vec3 specular;
vec3 emission;
float shininess;
vec3 attenuation(1, 0, 0);

int numobjects;
vector<Object*> objects;
vector<vec3> vertices;

vec3 Dehomo(vec4 v) {
    return vec3(v.x / v.w, v.y / v.w, v.z / v.w);
}

Ray ConstructRay(const Camera& cam, const int& i, const int& j) {
    float aspectRatio = (float)w / h;
    float fovy = radians(cam.fovy);
    float fovx = tan(fovy / 2.0) * aspectRatio;

    vec3 camW = normalize(cam.eye - cam.center);
    vec3 camU = normalize(cross(cam.up, camW));
    vec3 camV = normalize(cross(camW, camU));
    //if (i == 438 && j == 0) printf("%s", glm::to_string(camW).c_str());
    //if (i == 438 && j == 0) printf("%s", glm::to_string(camU).c_str());
    //if (i == 438 && j == 0) printf("%s", glm::to_string(camV).c_str());

    float alpha = fovx * (((float)j + 0.5 - (w / 2.0)) / (w / 2.0));
    float beta = tan(fovy / 2.0) * (((h / 2.0) - (float)i + 0.5) / (h / 2.0));

    //if (i == 438 && j == 0) printf("%f, %f", alpha, beta);
    vec3 rayDirection = normalize(alpha * camU + beta * camV - camW);
    //if (i == 438 && j == 0) printf("%s", glm::to_string(rayDirection).c_str());

    return Ray{ cam.eye, rayDirection };
}

Ray TransformRay(const Ray& ray, mat4 transfMatrix) {
    vec4 newPos(ray.pos, 1.0f);
    vec4 newDir(ray.dir, 0.0f);
    newPos = transfMatrix * newPos;
    newDir = transfMatrix * newDir;
    return Ray{ Dehomo(newPos), normalize(vec3(newDir.x, newDir.y, newDir.z)) };
}

Ray ReflectedRay(const Ray& ray, const Intersection& pt) {
    // Phong formula
    vec3 L = -ray.dir;
    vec3 N = pt.normal;
    vec3 R = -L + 2 * dot(L, N) * N;
    return Ray{ pt.intersectionPoint + 0.001f*R, normalize(R) };
}

Intersection findIntersection(Ray& ray, Object*& closestObj) {
    float closestT = std::numeric_limits<float>::infinity();
    Intersection closestIntersection;
    for (Object* obj : objects) {
        // Transform ray to object's local coordinates
        Ray transRay = TransformRay(ray, inverse(obj->transform));

        // Calculate intersection
        Intersection intersection = obj->intersection(transRay);
        if (!intersection.isValid()) continue;
        // Transform points and normals back to world coords
        vec4 worldCoords = obj->transform * vec4(intersection.intersectionPoint, 1.0f);
        intersection.intersectionPoint = Dehomo(worldCoords);
        vec4 worldNormal = transpose(inverse(obj->transform)) * vec4(intersection.normal, 0.0f);
        intersection.normal = normalize(vec3(worldNormal.x, worldNormal.y, worldNormal.z));
        // Recalculate distance
        intersection.distance = length(intersection.intersectionPoint - ray.pos);

        if (intersection.isValid() && intersection.distance < closestT) {
            closestT = intersection.distance;
            closestObj = obj;
            closestIntersection = intersection;
        }
    }
    return closestIntersection;
}

vec4 ComputeLight(const vec3& direction, const vec4& lightcolor, const vec3& normal,
    const vec3& halfvec, const vec4& mydiffuse, const vec4& myspecular, const float& myshininess) {

    float nDotL = dot(normal, direction);
    vec4 lambert = mydiffuse * lightcolor * std::max(nDotL, 0.0f);

    float nDotH = dot(normal, halfvec);
    vec4 phong = myspecular * lightcolor * pow(std::max(nDotH, 0.0f), myshininess);

    vec4 retval = lambert + phong;
    return retval;
}


bool IsVisible(const vec3& intersectionPoint, const vec4& pos) {
    vec3 position = vec3(pos.x, pos.y, pos.z);
    vec3 directionToLight;
    if (pos.w == 0) { // Directional light
        directionToLight = normalize(position);
    } else { // Point light
        directionToLight = normalize(position - intersectionPoint);
    }
    Ray shadowRay = { intersectionPoint + 0.001f * directionToLight, directionToLight };
    Object* closestObj = nullptr;
    Intersection shadowIntersection = findIntersection(shadowRay, closestObj);
    
    if (!shadowIntersection.isValid()) return true;
    if (pos.w == 1 && shadowIntersection.distance < length(position - intersectionPoint)) return false;
    return true;
}

Color FindColor(const Object* obj, const Intersection& intersection, const Ray& ray, int depth) {
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
        float c = 1.0f / (attenuation.x + attenuation.y * distanceToLight + attenuation.z * distanceToLight * distanceToLight);

        bool isVisible = IsVisible(intersection.intersectionPoint, lightpos[i]);

        if (isVisible) {
            vec4 difhomo = vec4(obj->diffuse, 1.0f);
            vec4 spehomo = vec4(obj->specular, 1.0f);
            vec4 lightIntensity = ComputeLight(direction, lightcol[i], intersection.normal, halfVec, difhomo, spehomo, obj->shininess);

            intensityR += lightIntensity.r * c;
            intensityG += lightIntensity.g * c;
            intensityB += lightIntensity.b * c;
        }
    }
    intensityR = intensityR * 255;
    intensityG = intensityG * 255;
    intensityB = intensityB * 255;

    // recursive ray trace
    Color currColor = Color(static_cast<unsigned char>(intensityR), static_cast<unsigned char>(intensityG), static_cast<unsigned char>(intensityB));
    Ray reflection = ReflectedRay(ray, intersection);
    if (depth == maxdepth) {
        return currColor.clip();
    } else {
        Object* reflectClosestObj = nullptr;
        Intersection reflectClosestInt = findIntersection(reflection, reflectClosestObj);
        Color newCol = currColor + FindColor(reflectClosestObj, reflectClosestInt, reflection, depth + 1) * obj->specular;
        return newCol.clip();
    }
}

BYTE* RayTracer(Camera cam, int width, int height) {
    BYTE* pixels = new BYTE[3 * width * height];
    bool first = true;
    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            Ray ray = ConstructRay(cam, height - i, j);

            Object* closestObj = nullptr;
            Intersection closestIntersection = findIntersection(ray, closestObj);
            if (first) {
                //printf("%s", glm::to_string(inverse(objects[1]->transform)).c_str());
                first = false;
            }

            Color col = FindColor(closestObj, closestIntersection, ray, 1);
            pixels[3 * (i * width + j)] = col.b;
            pixels[3 * (i * width + j) + 1] = col.g;
            pixels[3 * (i * width + j) + 2] = col.r;
        }
    }
    return pixels;
}

void setDefaults() {
    maxdepth = 5;
    outFile = "raytrace.png";
    attenuation = vec3(1, 0, 0);
    ambient = vec3(.2, .2, .2);
}

int main(int argc, char* argv[]) {

    if (argc < 2) {
        cerr << "Enter 2 arguments\n";
        exit(-1);
    }

    setDefaults();
    readfile(argv[1]);

    FreeImage_Initialise();
    BYTE* pixels = RayTracer(camera, w, h);
    FIBITMAP* img = FreeImage_ConvertFromRawBits(pixels, w, h, w * 3, 24, 0xFF0000, 0x00FF00, 0x0000FF, false);
    FreeImage_Save(FIF_PNG, img, outFile.c_str(), 0);
    printf("Saved Image to: %s", outFile.c_str());
    FreeImage_DeInitialise();

    delete pixels;
    for (Object* o : objects) {
        delete o;
    }

    return 0;
}