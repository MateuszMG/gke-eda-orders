import { Router } from 'express';
import { ordersService } from './orders.service';
import type { CreateOrderDto, UpdateOrderDto } from './orders.types';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const orders = await ordersService.findAll();
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await ordersService.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ order });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const dto: CreateOrderDto = req.body;
    
    if (!dto.items || !Array.isArray(dto.items) || dto.items.length === 0) {
      res.status(400).json({ error: 'Items array is required and must not be empty' });
      return;
    }

    for (const item of dto.items) {
      if (!item.productId || typeof item.quantity !== 'number' || typeof item.priceAtOrder !== 'number') {
        res.status(400).json({ error: 'Each item must have productId, quantity, and priceAtOrder' });
        return;
      }
    }

    const order = await ordersService.create(dto);
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const dto: UpdateOrderDto = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    
    if (dto.status && !validStatuses.includes(dto.status)) {
      res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      return;
    }

    const order = await ordersService.update(req.params.id, dto);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ order });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await ordersService.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export const ordersRouter = router;
