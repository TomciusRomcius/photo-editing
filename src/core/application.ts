import { Project } from "./project";

export class Application {
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  project: Project | null = null;

  constructor() {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    if (!canvas) {
      throw new Error("Failed to get the canvas element");
    }
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      throw new Error("Failed to create a WebGL2 context");
    }
    this.gl = gl;
    if (!(this.gl.canvas instanceof HTMLCanvasElement)) {
      throw new Error("Canvas is an offscreen canvas")
    }

    this.canvas = this.gl.canvas;
    this.initialize();
  }

  initialize() {
    // Setup WebGL
    const canvasParent = document.getElementById("viewport");
    if (!canvasParent) {
      throw new Error("Canvas parent is undefined");
    }

    this.canvas.width = canvasParent.clientWidth;
    this.canvas.height = canvasParent.clientHeight;

    // Setup image uploader
    this.setupUploadImage();
    setInterval(() => this.update(), 50);
  }

  private setupUploadImage() {
    document.getElementById("upload-image")?.addEventListener("input", (e) => {
      const target = (e.target as HTMLInputElement);
      if (!target) {
        throw new Error("Upload image input item is undefined");
      }
      
      if (!target.files) {
        throw new Error("Input file stream is null");
      }
      const img = target.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        if (!ev.target?.result) {
          throw new Error("Failed to initialize file reader")
        }

        const imageEl = new Image();
        imageEl.src = ev.target.result as string;
        imageEl.onload = () => {
          if (this.project) this.project.cleanup();
          this.project = new Project(this.canvas, this.gl, imageEl);
        };
      };
      reader.readAsDataURL(img);
    });
  }

  private update() {
    if (!this.project) return;
    this.project.render();
  }
}
