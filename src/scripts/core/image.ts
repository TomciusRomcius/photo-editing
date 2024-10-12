import { IEffect } from "./effects/effect";
import { Shader } from "./shader";
import vertexSource from "./coreShaders/vertex.glsl?raw";
import fragmentSource from "./coreShaders/fragment.glsl?raw";
import { Core } from "./arrayBuffer";
import { Program } from "./program";
import { Texture } from "./texture";
import { quadVertices, quadVerticesForFramebuffer } from "./quadVertices";
import { Framebuffer } from "./framebuffer";

export class ViewportImage {
  canvas: HTMLCanvasElement;
  effects: Array<IEffect>;
  arrayBuffer: Core.ArrayBuffer | null;
  arrayBufferForFrame: Core.ArrayBuffer | null;
  texture: Texture | null;
  program: Program;
  framebuffer1: Framebuffer | null = null;
  framebuffer2: Framebuffer | null = null;

  public constructor(
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    srcImage: HTMLImageElement,
    effects: Array<IEffect>
  ) {
    this.canvas = canvas;
    this.effects = effects;

    // Create necessary WebGL objects
    this.texture = new Texture(gl, canvas, srcImage);
    this.arrayBuffer = new Core.ArrayBuffer(gl, quadVertices);
    this.arrayBufferForFrame = new Core.ArrayBuffer(
      gl,
      quadVerticesForFramebuffer
    );
    this.arrayBuffer.bind(gl);

    const vertexShader = new Shader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = new Shader(gl, fragmentSource, gl.FRAGMENT_SHADER);

    this.framebuffer1 = new Framebuffer(gl, canvas);
    this.framebuffer2 = new Framebuffer(gl, canvas);
    this.program = new Program(gl, vertexShader, fragmentShader);
  }

  public addEffect() {}

  public removeEffect() {}

  // Rerender the whole image
  public render(gl: WebGL2RenderingContext) {
    if (!this.framebuffer1 || !this.framebuffer2) {
      console.error("Framebuffers are not initialized");
      return;
    }

    if (!this.arrayBuffer) {
      console.error("Array bufer is not initialized");
      return;
    }
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // Render the initial image
    this.framebuffer1.bind();
    this.arrayBuffer.bind(gl);
    this.program.useProgram(gl);
    this.texture?.bind(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    this.arrayBufferForFrame.bind(gl);


    // Apply effects
    this.effects.forEach((effect) => {
      // Check if framebuffers are not null
      if (!this.framebuffer1 || !this.framebuffer2) {
        console.error("Unexpected error: Framebuffers are not initialized");
        throw "Unexpected error: Framebuffers are not initialized";
      }
      this.framebuffer1.texture?.bind(gl);
      this.framebuffer2.bind();
      effect.apply();
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      let temp = this.framebuffer1;
      this.framebuffer1 = this.framebuffer2;
      this.framebuffer2 = temp;
    });

    // Unbind framebuffers and draw the processed image

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.framebuffer1.texture?.bind(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
