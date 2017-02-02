import React, {Component} from 'react';
import DashboardBar from '../views/dashboard-bar/dashboard-bar';

export default class Dashboard extends Component {
    render() {
        return (
            <section>
                <DashboardBar />

                {this.props.children}
            </section>
        )
    }
}