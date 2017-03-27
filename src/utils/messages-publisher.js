import PubSub from "pubsub-js";

export const publishMessage = (...messages) => {
    messages.map((message) => PubSub.publish('show-message', message));
};