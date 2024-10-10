import { Pointer } from './effects/pointer';
import { Image } from './core/image';

export function generateToolbar() {
  const toolbar = document.getElementById('toolbar');
  const eff = document.createElement("div");
  eff.innerHTML = 'a';
  toolbar?.appendChild(eff)
}
