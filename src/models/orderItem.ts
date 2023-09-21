import { Ingredient } from './ingredient';

export type OrderItem = {
  name: string;
  itemId: number;
  thumbnailPath: string;
  size: string;
  quantity: number;
  netPrice: number;
  ingredients: Ingredient[];
};
