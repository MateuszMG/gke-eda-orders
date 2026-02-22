import type { Message } from '@google-cloud/pubsub';
import { pubsub, SUBSCRIPTIONS } from '../config/pubsub';
import type { ProductUpdatedEvent, ProductPriceChangedEvent } from './types';

function handleProductUpdated(event: ProductUpdatedEvent): void {
  console.log('Received product.updated event', {
    productId: event.productId,
    name: event.name,
    stock: event.stock,
    updatedAt: event.updatedAt,
  });
}

function handleProductPriceChanged(event: ProductPriceChangedEvent): void {
  console.log('Received product.price.changed event', {
    productId: event.productId,
    oldPrice: event.oldPrice,
    newPrice: event.newPrice,
    updatedAt: event.updatedAt,
  });
}

function createMessageHandler(handler: (event: any) => void) {
  return (message: Message) => {
    try {
      const data = JSON.parse(message.data.toString());
      console.log(`Processing message ${message.id}`, { eventType: data.eventType });
      handler(data);
      message.ack();
    } catch (error) {
      console.error(`Error processing message ${message.id}`, { error });
      message.nack();
    }
  };
}

export async function initializeSubscribers(): Promise<void> {
  console.log('Initializing event subscribers for Orders service...');

  const productUpdatedSub = pubsub.subscription(SUBSCRIPTIONS.ORDERS_PRODUCT_UPDATED);
  productUpdatedSub.on('message', createMessageHandler(handleProductUpdated));
  productUpdatedSub.on('error', (error) => {
    console.error('Error in product-updated subscription', { error });
  });
  console.log(`Subscribed to ${SUBSCRIPTIONS.ORDERS_PRODUCT_UPDATED}`);

  const productPriceChangedSub = pubsub.subscription(SUBSCRIPTIONS.ORDERS_PRODUCT_PRICE_CHANGED);
  productPriceChangedSub.on('message', createMessageHandler(handleProductPriceChanged));
  productPriceChangedSub.on('error', (error) => {
    console.error('Error in product-price-changed subscription', { error });
  });
  console.log(`Subscribed to ${SUBSCRIPTIONS.ORDERS_PRODUCT_PRICE_CHANGED}`);

  console.log('Event subscribers initialized successfully');
}
