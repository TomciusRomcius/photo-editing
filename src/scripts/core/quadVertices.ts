// prettier-ignore
export const quadVertices = new Float32Array([
  // Positions       // Texture Coordinates (Y-coords flipped)
  -1.0,  -1.0,      0.0, 1.0,  // Bottom-left
   1.0,  -1.0,      1.0, 1.0,  // Bottom-right
   1.0,   1.0,      1.0, 0.0,  // Top-right

  -1.0,  -1.0,      0.0, 1.0,  // Bottom-left
   1.0,   1.0,      1.0, 0.0,  // Top-right
  -1.0,   1.0,      0.0, 0.0   // Top-left
]);

export const quadVerticesForFramebuffer = new Float32Array([
  // Positions       // Texture Coordinates (Normal, no flipping)
  -1.0,  -1.0,      0.0, 0.0,  // Bottom-left
   1.0,  -1.0,      1.0, 0.0,  // Bottom-right
   1.0,   1.0,      1.0, 1.0,  // Top-right

  -1.0,  -1.0,      0.0, 0.0,  // Bottom-left
   1.0,   1.0,      1.0, 1.0,  // Top-right
  -1.0,   1.0,      0.0, 1.0   // Top-left
]);