import React, {Component} from 'react';
import DashboardBar from '../components/system/dashboard-bar/dashboard-bar';

export default class DashboardLayout extends Component {
    render() {
        return (
            <section>
                <DashboardBar />

                {this.props.children}
            </section>
        )
    }
}