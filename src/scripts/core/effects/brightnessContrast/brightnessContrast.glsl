#version 300 es

precision highp float;

in vec2 outTexCoord;

out vec4 outColor;

uniform sampler2D uTexture;
uniform float contrast;
uniform float brightness;

void main() {
  vec4 color = texture(uTexture, outTexCoord);

  // Apply contrast
  color.x = (color.x - 0.5) * contrast + 0.5;
  color.y = (color.y - 0.5) * contrast + 0.5;
  color.z = (color.z - 0.5) * contrast + 0.5;

  // Apply brightness

  color.x *= brightness;
  color.y *= brightness;
  color.z *= brightness;
  outColor = color;
}