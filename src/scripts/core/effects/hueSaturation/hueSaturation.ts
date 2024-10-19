import { Program } from "../../program";
import { Shader } from "../../shader";
import { IEffect } from "../effect";
import vertexSource from "../../coreShaders/vertex.glsl?raw";
import fragmentSource from "./hueSaturation.glsl?raw";
import { createEffectSection } from "../../ui/createToggleableElement";
import { Slider } from "../../ui/slider";

type HueSaturationPropertiesType = {
  hue: number;
  saturation: number;
};

export class HueSaturation implements IEffect {
  gl: WebGL2RenderingContext;
  isActive = false;
  program: Program;
  properties: HueSaturationPropertiesType = {
    hue: 1,
    saturation: 1,
  };

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.program = new Program(
      gl,
      new Shader(gl, vertexSource, gl.VERTEX_SHADER),
      new Shader(gl, fragmentSource, gl.FRAGMENT_SHADER)
    );

    if (!this.program) throw new Error("a");
    this.program.useProgram();
  }

  public apply() {
    this.program.useProgram();
    const hueLoc = this.gl.getUniformLocation(
      this.program.getProgram(),
      "uHue"
    );
    const saturationLoc = this.gl.getUniformLocation(
      this.program.getProgram(),
      "uSaturation"
    );
    this.gl.uniform1f(hueLoc, this.properties.hue);
    this.gl.uniform1f(saturationLoc, this.properties.saturation);
  }

  public drawOptions(parent: HTMLDivElement) {
    createEffectSection(
      parent,
      "Hue / Saturation",
      "hue-saturation",
      "abcd"
    );
    new Slider(parent, {
      name: "Hue",
      min: 0,
      max: 2,
      onChange: (value) => (this.properties.hue = value),
    });
      
    new Slider(parent, {
      name: "Saturation",
      min: 0,
      max: 2,
      onChange: (value) => (this.properties.saturation = value),
    });
  }

  public cleanup() {
    this.program.deleteInclShaders();
    // Cheaty but temporary(hopefully) way
    document.getElementById("effects-list")!.innerHTML = "";
  }
}
