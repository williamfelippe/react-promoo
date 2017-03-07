import React, {Component} from "react";
import {Row, Col, Input, Button} from 'react-materialize';
import Geosuggest from 'react-geosuggest';

const ESTABLISHMENT = 'establishment';
const ADDRESS = 'geocode';

export default class CreateStoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = {location: {}, name: '', typeOfLocation: ESTABLISHMENT};
    }

    onSuggestSelect(suggest) {
        console.log(suggest);
    }

    submit(event) {
        event.preventDefault();
    }

    render() {
        const title = this.state.typeOfLocation === ESTABLISHMENT ?
            "Procure a loja" : "Procure o endereço";

        return (
            <form onSubmit={this.submit.bind(this)} className="col s12 m8 offset-m2">
                <div className="container">
                    <Row>
                        <Col s={12}>
                            <Geosuggest types={[this.state.typeOfLocation]}
                                        country="br" placeholder={title}
                                        onSuggestSelect={this.onSuggestSelect}/>

                            <p className="center-align">
                                {
                                    this.state.typeOfLocation === ESTABLISHMENT &&
                                    <a onClick={() => this.setState({typeOfLocation: ADDRESS})}>
                                        <small>
                                            Não encontrei a loja
                                        </small>
                                    </a>
                                }
                            </p>
                        </Col>

                        {
                            this.state.location && this.state.typeOfLocation === ADDRESS &&
                            <Input s={12} type="name" label="Qual o nome dessa loja?"
                                   onChange={this.onChangeName.bind(this)}/>
                        }

                        <Col s={12}>
                            <Button waves="light" className="w-100">
                                Indicar
                            </Button>
                        </Col>
                    </Row>
                </div>
            </form>
        )
    }
}