/*****************************************************************************/
/* This is the program skeleton for homework 2 in CSE167 by Ravi Ramamoorthi */
/* Extends HW 1 to deal with shading, more transforms and multiple objects   */
/*****************************************************************************/

// This is the basic include file for the global variables in the program.  
// Since all files need access to it, we define EXTERN as either blank or 
// extern, depending on if included in the main program or not.  

#ifndef VARIABLES_H
#define VARIABLES_H
#include <vector>
#include "Object.h"

extern struct Camera {
	vec3 eye;
	vec3 center;
	vec3 up;
	float fovy;
};

extern struct Camera camera;

extern int w, h;
extern float fovy;

extern int maxdepth;
extern int maxverts;
extern string outFile;

extern vector<vec4> lightpos;
extern vector<vec4> lightcol;
extern vec3 ambient;
extern vec3 diffuse;
extern vec3 specular;
extern vec3 emission;
extern float shininess;
extern vec3 attenuation;

extern int numobjects;
extern vector<Object*> objects;
extern vector<vec3> vertices;

/*
mat4 projection, modelview; // The mvp matrices
static enum {view, translate, scale} transop ; // which operation to transform
float sx, sy ; // the scale in x and y
float tx, ty ; // the translation in x and y*/

#endif