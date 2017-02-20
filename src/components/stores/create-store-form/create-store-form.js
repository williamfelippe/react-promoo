import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'react-materialize';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete'

export default class CreateStoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};
    }

    onChangePlace(address) {
        this.setState({address: address});
    }

    submit(event) {
        event.preventDefault();

        const address = this.state.address;
        geocodeByAddress(address, (err, {lat, lng}, results) => {
            if (err) {
                console.log('Oh no!', err);
            }

            console.log(`Yay! got latitude and longitude for ${address}`, {lat, lng});
            console.log('Entire payload from Google API', results);
        });
    }

    render() {
        const options = {
            types: ['address'],
            componentRestrictions: {'country': 'br'}
        };

        return (
            <form onSubmit={this.submit.bind(this)} className="col s12 m8 offset-m2">
                <Row>
                    { /* Endereço da loja */ }
                    <PlacesAutocomplete value={this.state.address} onChange={this.onChangePlace.bind(this)}
                                        options={options} hideLabel>
                        <Input s={12} label="Onde fica essa loja?" />
                    </PlacesAutocomplete>;
                </Row>

                { /* Nome da loja */ }
                <Row>
                    <Input s={12} label="Nome da loja" onChange={this.onChangeName.bind(this)}/>
                </Row>

                <Row>
                    <Col s={12}>
                        {/*
                         <div className="file-field input-field">
                         <div className="btn">
                         <span>Imagem</span>
                         <input type="file">
                         </div>
                         <div className="file-path-wrapper">
                         <input className="file-path validate" type="text">
                         </div>
                         </div>
                         */}
                    </Col>
                </Row>

                <Button type="submit" waves="light">
                    Indicar
                </Button>
            </form>
        )
    }
}