#version 300 es

precision highp float;

in vec2 outTexCoord;

out vec4 outColor;

uniform sampler2D uTexture;

void main() {
  outColor = texture(uTexture, outTexCoord) + vec4(.21, 0, 0, .1);
}