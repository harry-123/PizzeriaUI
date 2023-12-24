import { OrderItem } from "src/models/orderItem";

export interface AppState {
    orderItemsState: OrderItemState
}

export interface OrderItemState {
    orderItems: OrderItem[]
}