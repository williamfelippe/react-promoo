import PubSub from 'pubsub-js';

export function showMessage(...messages) {
    console.log("MESSAGES");
    console.log(messages);
    
    messages.map((message) => PubSub.publish('show-message', message));
}