import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';
import UserBar from '../components/user/user-bar/user-bar';

export default class UserLayout extends Component {
    render() {
        return (
            <section>
                <div className="container">
                    <Row>
                        <Col s={12}>
                            <UserBar />
                        </Col>
                    </Row>
                </div>

                {this.props.children}
            </section>
        )
    }
}