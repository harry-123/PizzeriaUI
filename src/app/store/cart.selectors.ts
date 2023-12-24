import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

const orderItemsState = (state: AppState) => state.orderItemsState;

export const selectOrderItems = createSelector(orderItemsState, state => state.orderItems);
