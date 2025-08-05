/*****************************************************************************/
/* This is the program skeleton for homework 2 in CSE167 by Ravi Ramamoorthi */
/* Extends HW 1 to deal with shading, more transforms and multiple objects   */
/*****************************************************************************/

/*****************************************************************************/
// This file is readfile.cpp.  It includes helper functions for matrix 
// transformations for a stack (matransform) and to rightmultiply the 
// top of a stack.  These functions are given to aid in setting up the 
// transformations properly, and to use glm functions in the right way.  
// Their use is optional in your program.  


// The functions readvals and readfile do basic parsing.  You can of course 
// rewrite the parser as you wish, but we think this basic form might be 
// useful to you.  It is a very simple parser.

// Please fill in parts that say YOUR CODE FOR HW 2 HERE. 
// Read the other parts to get a context of what is going on. 

/*****************************************************************************/

// Basic includes to get this file to work.  
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <deque>
#include <stack>
#include "Transform.h" 

using namespace std;
#include "readfile.h" 

// You may not need to use the following two functions, but it is provided
// here for convenience

// The function below applies the appropriate transform to a 4-vector
void matransform(stack<mat4>& transfstack, float values[])
{
    mat4 transform = transfstack.top();
    vec4 valvec = vec4(values[0], values[1], values[2], values[3]);
    vec4 newval = transform * valvec;
    for (int i = 0; i < 4; i++) values[i] = newval[i];
}

void rightmultiply(const mat4& M, stack<mat4>& transfstack)
{
    mat4& T = transfstack.top();
    T = T * M;
}

// Function to read the input data values
// Use is optional, but should be very helpful in parsing.  
bool readvals(stringstream& s, const int numvals, float values[])
{
    for (int i = 0; i < numvals; i++) {
        s >> values[i];
        if (s.fail()) {
            cout << "Failed reading value " << i << " will skip\n";
            return false;
        }
    }
    return true;
}

void readfile(const char* filename)
{
    string str, cmd;
    ifstream in;
    in.open(filename);
    if (in.is_open()) {

        // I need to implement a matrix stack to store transforms.  
        // This is done using standard STL Templates 
        stack <mat4> transfstack;
        transfstack.push(mat4(1.0));  // identity

        getline(in, str);
        while (in) {
            if ((str.find_first_not_of(" \t\r\n") != string::npos) && (str[0] != '#')) {
                // Ruled out comment and blank lines 

                stringstream s(str);
                s >> cmd;
                int i;
                float values[10]; // Position and color for light, colors for others
                                    // Up to 10 params for cameras.  
                bool validinput; // Validity of input 

                // GENERAL COMMANDS
                if (cmd == "size") {
                    validinput = readvals(s, 2, values);
                    if (validinput) {
                        w = (int)values[0]; h = (int)values[1];
                    }
                }
                else if (cmd == "maxdepth") {
                    validinput = readvals(s, 1, values);
                    if (validinput) {
                        maxdepth = values[0];
                    }
                }
                else if (cmd == "output") {
                    s >> outFile;
                }

                // CAMERA COMMAND
                else if (cmd == "camera") {
                    validinput = readvals(s, 10, values); // 10 values eye cen up fov
                    if (validinput) {
                        camera.eye = vec3(values[0], values[1], values[2]);
                        camera.center = vec3(values[3], values[4], values[5]);
                        camera.up = vec3(values[6], values[7], values[8]);
                        //camera.up = Transform::upvector(upxyz, camera.eye);
                        camera.fovy = values[9];
                    }
                }

                // GEOMETRY COMMANDS
                else if (cmd == "sphere") {
                    validinput = readvals(s, 4, values);
                    if (validinput) {
                        Object* obj = new Sphere(vec3(values[0], values[1], values[2]), values[3]);
                        obj->ambient = ambient;
                        obj->diffuse = diffuse;
                        obj->specular = specular;
                        obj->emission = emission;
                        obj->shininess = shininess;
                        obj->shape = Object::sphere;
                        obj->transform = transfstack.top();
                        objects.push_back(obj);
                        numobjects++;
                    }
                }
                else if (cmd == "maxverts") {
                    validinput = readvals(s, 1, values);
                    if (validinput) {
                        maxverts = values[0];
                    }
                }
                else if (cmd == "vertex") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        vertices.push_back(vec3(values[0], values[1], values[2]));
                    }
                }
                else if (cmd == "tri") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        Object* obj = new Triangle(vertices[values[0]], vertices[values[1]], vertices[values[2]]);
                        obj->ambient = ambient;
                        obj->diffuse = diffuse;
                        obj->specular = specular;
                        obj->emission = emission;
                        obj->shininess = shininess;
                        obj->shape = Object::triangle;
                        obj->transform = transfstack.top();
                        objects.push_back(obj);
                        numobjects++;
                    }
                }


                // TRANSFORMATION COMMANDS
                else if (cmd == "translate") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        mat4 trans = Transform::translate(values[0], values[1], values[2]);
                        rightmultiply(trans, transfstack);
                    }
                }
                else if (cmd == "scale") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        mat4 trans = Transform::scale(values[0], values[1], values[2]);
                        rightmultiply(trans, transfstack);
                    }
                }
                else if (cmd == "rotate") {
                    validinput = readvals(s, 4, values);
                    if (validinput) {
                        vec3 ax = vec3(values[0], values[1], values[2]);
                        mat3 rot = Transform::rotate(values[3], ax);
                        mat4 trans(1.0);
                        trans[0] = vec4(rot[0], 0);
                        trans[1] = vec4(rot[1], 0);
                        trans[2] = vec4(rot[2], 0);
                        rightmultiply(trans, transfstack);
                    }
                }

                // I include the basic push/pop code for matrix stacks
                else if (cmd == "pushTransform") {
                    transfstack.push(transfstack.top());
                }
                else if (cmd == "popTransform") {
                    if (transfstack.size() <= 1) {
                        cerr << "Stack has no elements.  Cannot Pop\n";
                    }
                    else {
                        transfstack.pop();
                    }
                }

                // LIGHT COMMANDS
                else if (cmd == "point") {
                    validinput = readvals(s, 6, values); // Position/color for lts.
                    if (validinput) {
                        lightpos.push_back(vec4(values[0], values[1], values[2], 1));
                        lightcol.push_back(vec4(values[3], values[4], values[5], 1));
                    }
                }
                else if (cmd == "directional") {
                    validinput = readvals(s, 6, values); // Position/color for lts.
                    if (validinput) {
                        lightpos.push_back(vec4(values[0], values[1], values[2], 0));
                        lightcol.push_back(vec4(values[3], values[4], values[5], 1));
                    }
                }
                else if (cmd == "attenuation") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        attenuation = vec3(values[0], values[1], values[2]);
                    }
                }


                // MATERIAL COMMANDS
                else if (cmd == "ambient") {
                    validinput = readvals(s, 3, values); // colors 
                    if (validinput) {
                        ambient.x = values[0];
                        ambient.y = values[1];
                        ambient.z = values[2];
                    }
                }
                else if (cmd == "diffuse") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        diffuse.x = values[0];
                        diffuse.y = values[1];
                        diffuse.z = values[2];
                    }
                }
                else if (cmd == "specular") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        specular.x = values[0];
                        specular.y = values[1];
                        specular.z = values[2];
                    }
                }
                else if (cmd == "emission") {
                    validinput = readvals(s, 3, values);
                    if (validinput) {
                        emission.x = values[0];
                        emission.y = values[1];
                        emission.z = values[2];
                    }
                }
                else if (cmd == "shininess") {
                    validinput = readvals(s, 1, values);
                    if (validinput) {
                        shininess = values[0];
                    }
                }

                else {
                    cerr << "Unknown Command: " << cmd << " Skipping \n";
                }
            }
            getline(in, str);
        }
    }
    else {
        cerr << "Unable to Open Input Data File " << filename << "\n";
        throw 2;
    }
}