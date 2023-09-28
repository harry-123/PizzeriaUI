import { Ingredient } from './ingredient';

export type OrderItem = {
  id: number;
  name: string;
  itemId: number;
  thumbnailPath: string;
  size: string;
  quantity: number;
  netPrice: number;
  ingredients: Ingredient[];
};
