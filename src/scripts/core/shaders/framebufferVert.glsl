#version 300 es

in vec2 position;
in vec2 texCoord;

out vec2 outTexCoord;

void main() {
  outTexCoord = texCoord;
  gl_Position = vec4(position.x, 1 - position.y, 0, 1);
}