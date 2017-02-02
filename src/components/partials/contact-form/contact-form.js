import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class ContactForm extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            responseCaptcha: ''
        };

        this.submit = this
            .submit
            .bind(this);
    }

    componentDidMount() {
        const element = ReactDOM.findDOMNode(this.refs.subject)

        $(element).ready(function () {
            $('select').material_select();
        });
    }

    submit(e) {
        e.preventDefault();
        console.log('Mensagem enviada com sucesso');
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input type="text" id="name" name="name" value={this.state.name}/>
                        <label htmlFor="name">Nome</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" value={this.state.email}/>
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <select ref="subject" value={this.state.subject}>
                            <option value="" disabled>Escolha um assunto</option>
                            <option value="Dúvida">Dúvida</option>
                            <option value="Bug">Bug</option>
                            <option value="Parceria">Parceria</option>
                            <option value="Outro">Outro</option>
                        </select>
                        <label>Assunto</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <textarea
                            id="message"
                            value={this.state.message}
                            className="materialize-textarea"></textarea>
                        <label htmlFor="message">Mensagem</label>
                    </div>
                </div >

                <div className="row">
                    <div className="col s12"></div>
                </div>

                <button type="submit" className="waves-effect waves-light btn">
                    Enviar
                </button>
            </form >
        )
    }
}