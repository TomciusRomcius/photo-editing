export interface IEffect {
  isActive: boolean;
  drawOptions: (parent: HTMLDivElement) => void;
  apply: () => void;
  cleanup: () => void;
}
