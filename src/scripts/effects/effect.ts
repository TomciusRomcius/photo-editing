export interface IEffect {
  toolName: string;
  toolIcon: string;
  isActive: boolean;

  apply: () => void;
}
