#version 300 es

precision highp float;

in vec2 outTexCoord;

out vec4 outColor;

uniform sampler2D uTexture;
uniform float uHue;
uniform float uSaturation;

vec3 rgbToHSL(vec3 rgbValue) {
  float r = rgbValue.x / 255.0;
  float g = rgbValue.y / 255.0;
  float b = rgbValue.z / 255.0;

  float cMax = max(max(r, g), b);
  float cMin = min(min(r, g), b);
  float delta = cMax - cMin;

  float hue;

  if (delta == 0.0) {
    hue = 0.0;
  } 
  
  else if(cMax == r) {
    hue = (60.0 * (mod(((g - b) / delta), 6.0)));
  } 
  
  else if (cMax == g) {
    hue = (60.0 * (((b - r) / delta) + 2.0));
  } 
  
  else {
    hue = (60.0 * (((r - g) / delta) + 4.0));
  }

  if(hue < 0.0)
    hue += 360.0;

  float lightness = (cMax + cMin) / 2.0;
  float saturation;
  if(delta == 0.0)
    saturation = 0.0;
  else
    saturation = delta / (1.0 - abs(2.0 * lightness - 1.0));
  return vec3(hue, saturation, lightness);
}

vec3 hslToRGB(vec3 hslValue) {
  float c = (1.0 - abs(2.0 * hslValue.z - 1.0)) * hslValue.y;
  float x = c * (1.0 - abs(mod(hslValue.x / 60.0, 2.0) - 1.0));
  float m = hslValue.z - c / 2.0;

  vec3 nRGB;

  if(hslValue.x >= 0.0 && hslValue.x < 60.0) {
    nRGB = vec3(c, x, 0.0);
  } else if(hslValue.x >= 60.0 && hslValue.x < 120.0) {
    nRGB = vec3(x, c, 0.0);
  } else if(hslValue.x >= 120.0 && hslValue.x < 180.0) {
    nRGB = vec3(0.0, c, x);
  } else if(hslValue.x >= 180.0 && hslValue.x < 240.0) {
    nRGB = vec3(0.0, x, c);
  } else if(hslValue.x >= 240.0 && hslValue.x < 300.0) {
    nRGB = vec3(x, 0.0, c);
  } else if(hslValue.x >= 300.0 && hslValue.x < 360.0) {
    nRGB = vec3(c, 0.0, x);
  }

  vec3 rgb = vec3((nRGB.x + m) * 255.0, (nRGB.y + m) * 255.0, (nRGB.z + m) * 255.0);
  return rgb;
}

void main() {
  vec4 color = texture(uTexture, outTexCoord);

  vec3 hsl = rgbToHSL(vec3(color.x, color.y, color.z));

  // Apply effect
  hsl.x *= uHue;
  hsl.y *= uSaturation;

  vec3 newColor = hslToRGB(vec3(hsl.x, hsl.y, hsl.z));
  outColor = vec4(newColor.xyz, 1);
}