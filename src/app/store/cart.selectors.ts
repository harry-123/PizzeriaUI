import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

const orderItemsState = (state: AppState) => state.orderItemsState;

export const selectOrderItems = createSelector(
  orderItemsState,
  (state) => state.orderItems
);

export const selectUniqueItemId = createSelector(
  orderItemsState,
  (state) => state.orderItemUniqueId
);
