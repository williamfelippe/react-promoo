import React, {Component} from 'react';

export default class CreateStore extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <h4 className="center-align">
                            Indique uma loja
                        </h4>
                    </Col>

                    <CreateStoreForm />
                </Row>
            </div>
        )
    }
}