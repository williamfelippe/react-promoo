import PubSub from 'pubsub-js';

export function showMessage(...messages) {
    messages.map((message) => PubSub.publish('show-message', message));
}