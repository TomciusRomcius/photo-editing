import { Project } from "./project";

export class Application {
  private gl: WebGL2RenderingContext | null;
  private canvas: HTMLCanvasElement | null;
  project: Project | null = null;

  constructor() {
    this.gl = null;
    this.canvas = null;
    this.initialize();
  }

  initialize() {
    // Setup WebGL
    this.canvas = document.getElementById("game") as HTMLCanvasElement;
    const canvasParent = document.getElementById("viewport");
    if (!this.canvas) {
      console.error("Canvas is undefined");
      return;
    }
    if (!canvasParent) {
      console.error("Canvas parent is undefined");
      return;
    }
    // this.canvas.height =
    this.gl = this.canvas.getContext("webgl2");
    this.canvas.width = canvasParent.clientWidth;
    this.canvas.height = canvasParent.clientHeight;
    if (!this.gl) {
      console.error("Failed to initialize canvas context");
      return;
    }

    // Setup image uploader
    this.setupUploadImage();
    setInterval(() => this.update(), 50);
  }

  private setupUploadImage() {
    document.getElementById("upload-image")?.addEventListener("input", (e) => {
      const img = e.currentTarget.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        if (!ev.target?.result) {
          throw new Error("Failed to initialize file reader")
        }

        const imageEl = new Image();
        imageEl.src = ev.target.result;
        imageEl.onload = () =>
          (this.project = new Project(this.canvas, this.gl, imageEl));
      };
      reader.readAsDataURL(img);
    });
  }

  private update() {
    if (!this.project) return;
    this.project.render();
  }
}
