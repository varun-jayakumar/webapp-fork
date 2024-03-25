import { PubSub } from "@google-cloud/pubsub";
import logger from "../config/logger.js";

const projectId = process.env.PUB_PROJECT_ID;
const topicName = process.env.PUB_TOPIC;
const pubSubClient = new PubSub({ projectId });

export async function publishMessage(data) {
  if (process.env.NODE_ENV !== "test") {
    const dataBuffer = Buffer.from(data);
    try {
      const messageId = await pubSubClient
        .topic(topicName)
        .publishMessage({ data: dataBuffer });
      logger.debug(`Message ${messageId} published.`);
    } catch (error) {
      logger.debug(`Received error while publishing: ${error.message}`);
    }
  }
}
