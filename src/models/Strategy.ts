export interface Strategy {
  id: string;
  name: string;
  description: string;
  userId: string;
  performance: number | null;
  profit: number | null;
  isActive: boolean
  configStrategy: string | null;
}
