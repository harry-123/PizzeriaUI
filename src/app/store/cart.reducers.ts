import { createReducer, on, props } from '@ngrx/store';
import { OrderItem } from 'src/models/orderItem';
import {
  addToCart,
  clearCart,
  incrementUniqueItemId,
  removeFromCart,
  updateCartItem,
} from './cart.actions';
import { AppState, OrderItemState } from './app.state';

const initialState: OrderItemState = {
  orderItems: [],
  orderItemUniqueId: 1,
};

export const cartReducer = createReducer(
  initialState,

  on(addToCart, (state: OrderItemState, orderItem: OrderItem) => {
    return { ...state, orderItems: [...state.orderItems, orderItem] };
  }),

  on(removeFromCart, (state: OrderItemState, orderItem: OrderItem) => {
    return {
      ...state,
      orderItems: state.orderItems.filter((x) => x.id != orderItem.id),
    };
  }),

  on(clearCart, (state: OrderItemState) => {
    return { ...state, orderItems: [] };
  }),

  on(updateCartItem, (state: OrderItemState, orderItem: OrderItem) => {
    return {
      ...state,
      orderItems: state.orderItems.map((x) =>
        x.id === orderItem.id ? orderItem : x
      ),
    };
  }),

  on(incrementUniqueItemId, (state: OrderItemState) => {
    return {
      ...state,
      orderItemUniqueId: state.orderItemUniqueId + 1,
    };
  })
);
