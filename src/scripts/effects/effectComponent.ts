import { Image } from "../core/image";

export interface IEffectComponent {
  render: () => void;
  toggleEffect: (image: Image) => void;
}