// Transform.cpp: implementation of the Transform class.

// Note: when you construct a matrix using mat4() or mat3(), it will be COLUMN-MAJOR
// Keep this in mind in readfile.cpp and display.cpp
// See FAQ for more details or if you're having problems.

#include "Transform.h"

// Helper rotation function.  Please implement this.  

mat3 Transform::rotate(const float degrees, const vec3& axis) 
{
    vec3 ax = normalize(axis);
    float radians = degrees * pi / 180;
    mat3 identity(1.0);
    mat3 A_star(0, ax[2], -ax[1], -ax[2], 0, ax[0], ax[1], -ax[0], 0);
    mat3 aat(ax[0] * ax[0], ax[0] * ax[1], ax[0] * ax[2],
        ax[0] * ax[1], ax[1] * ax[1], ax[1] * ax[2],
        ax[0] * ax[2], ax[1] * ax[2], ax[2] * ax[2]);

    mat3 res = (float)cos(radians) * identity + (float)(1 - cos(radians)) * aat + (float)sin(radians) * A_star;
    return res;
}

void Transform::left(float degrees, vec3& eye, vec3& up) 
{
    mat3 rotmat = rotate(degrees, up);
    eye = rotmat * eye;
}

void Transform::up(float degrees, vec3& eye, vec3& up) 
{
    vec3 axis = normalize(cross(eye, up));
    mat3 rotmat = rotate(degrees, axis);
    eye = rotmat * eye;
    up = rotmat * up;
}

mat4 Transform::lookAt(const vec3 &eye, const vec3 &center, const vec3 &up) 
{
    vec3 w = normalize(eye);
    vec3 u = normalize(cross(up, w));
    vec3 v = cross(w, u);

    mat4 res(1.0);
    res[0] = vec4(u, -dot(u, eye));
    res[1] = vec4(v, -dot(v, eye));
    res[2] = vec4(w, -dot(w, eye));
    res = transpose(res);
    return res;
}

mat4 Transform::perspective(float fovy, float aspect, float zNear, float zFar)
{
    mat4 ret(1.0);
    float theta = fovy / 2;
    float d = 1 / tanf(theta * pi / 180);
    ret[0][0] = d / aspect;
    ret[1][1] = d;
    ret[2][2] = -(zFar + zNear) / (zFar - zNear);
    ret[2][3] = -2 * zFar * zNear / (zFar - zNear);
    ret[3][2] = -1;
    ret[3][3] = 0;
    ret = transpose(ret);
    return ret;
}

mat4 Transform::scale(const float &sx, const float &sy, const float &sz) 
{
    mat4 ret(1.0);
    ret[0][0] = sx;
    ret[1][1] = sy;
    ret[2][2] = sz;
    return ret;
}

mat4 Transform::translate(const float &tx, const float &ty, const float &tz) 
{
    mat4 ret(1.0);
    ret[3][0] = tx;
    ret[3][1] = ty;
    ret[3][2] = tz;
    return ret;
}

// To normalize the up direction and construct a coordinate frame.  
// As discussed in the lecture.  May be relevant to create a properly 
// orthogonal and normalized up. 
// This function is provided as a helper, in case you want to use it. 
// Using this function (in readfile.cpp or display.cpp) is optional.  

vec3 Transform::upvector(const vec3 &up, const vec3 & zvec) 
{
    vec3 x = glm::cross(up,zvec); 
    vec3 y = glm::cross(zvec,x); 
    vec3 ret = glm::normalize(y); 
    return ret; 
}


Transform::Transform()
{

}

Transform::~Transform()
{

}
