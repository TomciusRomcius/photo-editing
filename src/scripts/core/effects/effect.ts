export interface IEffect {
  isActive: boolean;
  drawOptions: () => void;
  apply: () => void;
}
