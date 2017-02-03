import React, {Component} from 'react';

export default class ForgotPasswordForm extends Component {
    constructor() {
        super();

        this.state = { email: ''};

        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault();
        console.log('Senha alterada com sucesso');
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submit} className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" id="email" value={this.state.email}/>
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>

                <button type="submit" className="waves-effect waves-light btn w-100">
                    Enviar instruções
                </button>
            </form>
        )
    }
}