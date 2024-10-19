#version 300 es

precision highp float;

in vec2 outTexCoord;

out vec4 outColor;

uniform sampler2D uTexture;
uniform float uHue;
uniform float uSaturation;

vec3 rgbToHSL(vec3 rgbValue) {
  float r = rgbValue.x / 255.0f;
  float g = rgbValue.y / 255.0f;
  float b = rgbValue.z / 255.0f;

  float cMax = max(max(r, g), b);
  float cMin = min(min(r, g), b);
  float delta = cMax - cMin;

  float hue;

  if(delta == 0.0f) {
    hue = 0.0f;
  } else if(cMax == r) {
    hue = (60.0f * (mod(((g - b) / delta), 6.0f)));
  } else if(cMax == g) {
    hue = (60.0f * (((b - r) / delta) + 2.0f));
  } else {
    hue = (60.0f * (((r - g) / delta) + 4.0f));
  }

  if(hue < 0.0f)
    hue += 360.0f;

  float lightness = (cMax + cMin) / 2.0f;
  float saturation;
  if(delta == 0.0f)
    saturation = 0.0f;
  else
    saturation = delta / (1.0f - abs(2.0f * lightness - 1.0f));
  return vec3(hue, saturation, lightness);
}

vec3 hslToRGB(vec3 hslValue) {
  float c = (1.0f - abs(2.0f * hslValue.z - 1.0f)) * hslValue.y;
  float x = c * (1.0f - abs(mod(hslValue.x / 60.0f, 2.0f) - 1.0f));
  float m = hslValue.z - c / 2.0f;

  vec3 nRGB = vec3(0, 0, 0);

  if(hslValue.x >= 0.0f && hslValue.x < 60.0f) {
    nRGB = vec3(c, x, 0.0f);
  } else if(hslValue.x >= 60.0f && hslValue.x < 120.0f) {
    nRGB = vec3(x, c, 0.0f);
  } else if(hslValue.x >= 120.0f && hslValue.x < 180.0f) {
    nRGB = vec3(0.0f, c, x);
  } else if(hslValue.x >= 180.0f && hslValue.x < 240.0f) {
    nRGB = vec3(0.0f, x, c);
  } else if(hslValue.x >= 240.0f && hslValue.x < 300.0f) {
    nRGB = vec3(x, 0.0f, c);
  } else if(hslValue.x >= 300.0f && hslValue.x < 360.0f) {
    nRGB = vec3(c, 0.0f, x);
  }

  vec3 rgb = vec3((nRGB.x + m) * 255.0f, (nRGB.y + m) * 255.0f, (nRGB.z + m) * 255.0f);
  return rgb;
}

void main() {
  vec4 color = texture(uTexture, outTexCoord);

  vec3 hsl = rgbToHSL(vec3(color.x, color.y, color.z) * 255.0);
  // Apply effect
  hsl.x *= uHue;
  hsl.y *= uSaturation;

  vec3 newColor = hslToRGB(vec3(hsl.x, hsl.y, hsl.z));
  outColor = vec4(newColor.xyz / 255.0, 1);
}