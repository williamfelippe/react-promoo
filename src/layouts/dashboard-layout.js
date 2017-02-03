import React, {Component} from 'react';
import DashboardBar from '../components/dashboard-bar/dashboard-bar';

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