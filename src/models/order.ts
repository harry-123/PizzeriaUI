import { OrderItem } from './orderItem';

export type Order = {
  orderValue: number;
  deliveryAddress: string;
  orderItems: OrderItem[];
};
