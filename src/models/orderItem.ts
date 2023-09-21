import { Ingredient } from './ingredient';

export type OrderItem = {
  name: string;
  id: number;
  thumbnailPath: string;
  size: string;
  quantity: number;
  itemValue: number;
  ingredients: Ingredient[];
};
