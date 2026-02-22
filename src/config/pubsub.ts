import { PubSub } from '@google-cloud/pubsub';
import { GOOGLE_CLOUD_PROJECT, env } from './appConfig';

export const pubsub = new PubSub({
  projectId: GOOGLE_CLOUD_PROJECT,
  ...(env.GOOGLE_KEYFILE_PATH && { keyFilename: env.GOOGLE_KEYFILE_PATH }),
});

export const TOPICS = {
  ORDER_CREATED: 'order-created',
  ORDER_UPDATED: 'order-updated',
} as const;

export const SUBSCRIPTIONS = {
  ORDERS_PRODUCT_UPDATED: 'orders-product-updated',
  ORDERS_PRODUCT_PRICE_CHANGED: 'orders-product-price-changed',
} as const;
