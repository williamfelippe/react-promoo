import React, {Component} from 'react';
import './apps.css';

export default class Apps extends Component {
    render() {
        return (
            <div className="row moo-home-apps">
                <div className="col s12">
                    <div className="container">
                        <h3 className="center-align">
                            promoo<b>app</b>
                        </h3>

                        <div className="row n-margin-bottom">
                            <div className="col s12 m5">
                                <p className="highlight">
                                    Acesse o
                                    <strong>Promoo</strong>
                                    de qualquer lugar. Baixe para IOS e Android
                                </p>

                                <ul>
                                    <li>
                                        <a href="#" target="_blank">
                                            <span className="play"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                            <span className="app"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 m7">
                                <div className="phone"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}