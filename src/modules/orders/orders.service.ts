import { v4 as uuidv4 } from 'uuid';
import type { Order, CreateOrderDto, UpdateOrderDto } from './orders.types';
import { publishOrderCreated, publishOrderUpdated } from '../../events/publisher';

const orders: Map<string, Order> = new Map();

export const ordersService = {
  async findAll(): Promise<Order[]> {
    return Array.from(orders.values());
  },

  async findById(id: string): Promise<Order | undefined> {
    return orders.get(id);
  },

  async create(dto: CreateOrderDto): Promise<Order> {
    const id = uuidv4();
    const now = new Date();
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.priceAtOrder * item.quantity,
      0
    );

    const order: Order = {
      id,
      items: dto.items,
      totalAmount,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    orders.set(id, order);

    await publishOrderCreated({
      orderId: order.id,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    });

    return order;
  },

  async update(id: string, dto: UpdateOrderDto): Promise<Order | undefined> {
    const order = orders.get(id);
    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      ...dto,
      updatedAt: new Date(),
    };

    orders.set(id, updatedOrder);

    if (dto.status) {
      await publishOrderUpdated({
        orderId: updatedOrder.id,
        status: updatedOrder.status,
        updatedAt: updatedOrder.updatedAt.toISOString(),
      });
    }

    return updatedOrder;
  },

  async delete(id: string): Promise<boolean> {
    return orders.delete(id);
  },
};
