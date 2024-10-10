import { IEffect } from '../effects/effect';
import { Shader } from './shader';
import vertexSource from './shaders/vertex.glsl?raw';
import fragmentSource from './shaders/fragment.glsl?raw';
import { Core } from './arrayBuffer';
import { Program } from './program';
import { Texture } from './texture';

// prettier-ignore
const quadVertices = new Float32Array([
  // Positions       // Texture Coordinates (Y-coords flipped)
  -1.0,  -1.0,      0.0, 1.0,  // Bottom-left
   1.0,  -1.0,      1.0, 1.0,  // Bottom-right
   1.0,   1.0,      1.0, 0.0,  // Top-right

  -1.0,  -1.0,      0.0, 1.0,  // Bottom-left
   1.0,   1.0,      1.0, 0.0,  // Top-right
  -1.0,   1.0,      0.0, 0.0   // Top-left
]);

export class ViewportImage {
  effects: IEffect[] = [];
  framebuffer: WebGLFramebuffer;
  imageSrc: string;
  canvas: HTMLCanvasElement;
  arrayBuffer: Core.ArrayBuffer | null;
  texture: Texture | null;
  program: Program;

  constructor(
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    imageSrc: string
  ) {
    this.canvas = canvas;

    this.texture = new Texture(gl, imageSrc);
    this.arrayBuffer = new Core.ArrayBuffer(gl, quadVertices);
    this.arrayBuffer.bind(gl);

    const vertexShader = new Shader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = new Shader(gl, fragmentSource, gl.FRAGMENT_SHADER);
    this.program = new Program(gl, vertexShader, fragmentShader);
  }

  render(gl: WebGL2RenderingContext) {
    this.arrayBuffer?.bind(gl);
    this.program.useProgram(gl);
    this.texture?.bind(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
