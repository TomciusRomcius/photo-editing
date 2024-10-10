import { generateToolbar } from '../toolbarGenerator';
import { ViewportImage } from './image';

export class Application {
  private gl: WebGL2RenderingContext | null;
  private canvas: HTMLCanvasElement | null;
  private currentImage: ViewportImage | null;
  
  constructor() {
    this.gl = null;
    this.canvas = null;
    this.initialize();
  }
  
  update() {
    if (!this.gl || !this.currentImage) {
      console.error('WebGL context or currentImage is undefined');
      return;
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clearColor(0, 0, 0, 0);
    this.currentImage?.render(this.gl);
  }

  initialize() {
    generateToolbar();
    this.canvas = document.getElementById('game') as HTMLCanvasElement;
    const canvasParent = this.canvas.parentElement;
    if (!this.canvas) {
      console.error('Canvas is undefined');
      return;
    }
    if (!canvasParent) {
      console.error('Canvas parent is undefined');
      return;
    }
    // this.canvas.height = 
    this.gl = this.canvas.getContext('webgl2');
    if (!this.gl) {
      console.error('Failed to initialize canvas context');
      return;
    }

    this.currentImage = new ViewportImage(this.canvas, this.gl, './src');
    this.update();
    setInterval(() => this.update(), 10);
  }
}