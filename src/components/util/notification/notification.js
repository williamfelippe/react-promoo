import React, {Component} from "react";
import PubSub from "pubsub-js";
import {NotificationStack} from "react-notification";
import {OrderedSet} from "immutable"; // Optional library used for example

export default class Notification extends Component {
    constructor() {
        super();
        this.state = {
            notifications: OrderedSet(),
            count: 0
        };
    }

    componentDidMount() {
        PubSub.subscribe('show-message', (subject, message) => {
            if(subject && subject.localeCompare('show-message') === 0) {
                this.addNotification(message);
            }
        });
    }

    addNotification(message) {
        const {notifications, count} = this.state;
        const newCount = count + 1;
        return this.setState({
            count: newCount,
            notifications: notifications.add({
                message: message,
                key: newCount,
                action: 'Fechar',
                dismissAfter: 3000,
                onClick: () => this.removeNotification(newCount)
            })
        });
    }

    removeNotification(count) {
        const {notifications} = this.state;
        this.setState({
            notifications: notifications.filter(n => n.key !== count)
        })
    }

    render() {
        return (
            <NotificationStack notifications={this.state.notifications.toArray()}
                onDismiss={
                    notification => this.setState({
                        notifications: this.state.notifications.delete(notification)
                    })
                }/>
        );
    }
}