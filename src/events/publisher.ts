import { pubsub, TOPICS } from '../config/pubsub';
import type { OrderCreatedEvent, OrderUpdatedEvent } from './types';

async function publishMessage(topicName: string, data: object): Promise<string> {
  const topic = pubsub.topic(topicName);
  const messageBuffer = Buffer.from(JSON.stringify(data));
  
  try {
    const messageId = await topic.publishMessage({ data: messageBuffer });
    console.log(`Message ${messageId} published to ${topicName}`, { data });
    return messageId;
  } catch (error) {
    console.error(`Failed to publish message to ${topicName}`, { error, data });
    throw error;
  }
}

export async function publishOrderCreated(event: Omit<OrderCreatedEvent, 'eventType' | 'timestamp'>): Promise<string> {
  const fullEvent: OrderCreatedEvent = {
    ...event,
    eventType: 'order.created',
    timestamp: new Date().toISOString(),
  };
  return publishMessage(TOPICS.ORDER_CREATED, fullEvent);
}

export async function publishOrderUpdated(event: Omit<OrderUpdatedEvent, 'eventType' | 'timestamp'>): Promise<string> {
  const fullEvent: OrderUpdatedEvent = {
    ...event,
    eventType: 'order.updated',
    timestamp: new Date().toISOString(),
  };
  return publishMessage(TOPICS.ORDER_UPDATED, fullEvent);
}
