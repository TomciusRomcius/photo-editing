export type SliderOptionsType = {
  name: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
};

export class Slider {
  constructor(parent: HTMLDivElement, sliderOptions: SliderOptionsType) {
    const elementHTML = `
      <input type="range" min="${sliderOptions.mix}" min="${sliderOptions.max}"/> 
    `;

    const parser = new DOMParser();
    const el = parser.parseFromString(elementHTML, "text/html").body.firstChild;
    if (!el) throw new Error("Element not defined");
    parent.appendChild(el);
    el.addEventListener("input", (e) => {
      // Normalize input
      let nMax = sliderOptions.max - sliderOptions.min;
      let value = e.currentTarget!.value;
      value = (value / 100 * nMax) + sliderOptions.min;
      // Call onchange callback
      sliderOptions.onChange(value);
    });
  }
}
