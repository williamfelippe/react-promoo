import React, {Component} from 'react';
import UserBar from '../components/user/user-bar/user-bar';

export default class UserLayout extends Component {
    render() {
        return (
            <section>
                <UserBar />

                {this.props.children}
            </section>
        )
    }
}