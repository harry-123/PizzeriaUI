import { createAction, props } from '@ngrx/store';
import { OrderItem } from 'src/models/orderItem';

export const addToCart = createAction('[Item] Add to Cart', props<OrderItem>());

export const removeFromCart = createAction(
  '[Item] Remove from Cart',
  props<OrderItem>()
);

export const clearCart = createAction('[Item] Clear Cart');

export const updateCartItem = createAction(
  '[Item] update Cart Item',
  props<OrderItem>()
);
