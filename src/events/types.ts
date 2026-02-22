export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtOrder: number;
}

export interface OrderCreatedEvent {
  eventType: 'order.created';
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  timestamp: string;
}

export interface OrderUpdatedEvent {
  eventType: 'order.updated';
  orderId: string;
  status: string;
  updatedAt: string;
  timestamp: string;
}

export interface ProductUpdatedEvent {
  eventType: 'product.updated';
  productId: string;
  name: string;
  stock: number;
  updatedAt: string;
  timestamp: string;
}

export interface ProductPriceChangedEvent {
  eventType: 'product.price.changed';
  productId: string;
  oldPrice: number;
  newPrice: number;
  updatedAt: string;
  timestamp: string;
}

export type OrderEvent = OrderCreatedEvent | OrderUpdatedEvent;
export type ProductEvent = ProductUpdatedEvent | ProductPriceChangedEvent;
export type AppEvent = OrderEvent | ProductEvent;
