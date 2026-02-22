export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtOrder: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  items: Array<{
    productId: string;
    quantity: number;
    priceAtOrder: number;
  }>;
}

export interface UpdateOrderDto {
  status?: Order['status'];
}
