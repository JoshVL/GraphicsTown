/* basic uniforms and attributes are 
 * provided by THREE: (see https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram)
 */
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// in vec3 position;
// varying vec4 gl_Position;
void main() { 
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
