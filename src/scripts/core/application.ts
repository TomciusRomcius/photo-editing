import { generateToolbar } from '../toolbarGenerator';
import { ViewportImage } from './image';
import { Project } from './project';

export class Application {
  private gl: WebGL2RenderingContext | null;
  private canvas: HTMLCanvasElement | null;
  private currentImage: ViewportImage | null;
  
  constructor() {
    this.gl = null;
    this.canvas = null;
    this.initialize();
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
    this.canvas.width = canvasParent.clientWidth;
    this.canvas.height = canvasParent.clientHeight;
    if (!this.gl) {
      console.error('Failed to initialize canvas context');
      return;
    }

    const project = new Project(this.canvas, this.gl);
  }
}