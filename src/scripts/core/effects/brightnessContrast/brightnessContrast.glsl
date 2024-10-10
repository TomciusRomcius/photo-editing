#version 300 es

precision highp float;

in vec2 outTexCoord;

out vec4 outColor;

uniform sampler2D uTexture;
uniform float contrast;

void main() {
  vec4 color = texture(uTexture, outTexCoord);
  color.x = (color.x - 0.5) * contrast + 0.5;
  color.y = (color.y - 0.5) * contrast + 0.5;
  color.z = (color.z - 0.5) * contrast + 0.5;
  outColor = color;
}