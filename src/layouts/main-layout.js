import React, {Component} from 'react';
import Header from '../components/header/header'
import Footer from '../components/footer/footer'

export default class MainLayout extends Component {
    render() {
        return (
            <div className="moo-app">
                <Header/>

                <main>
                    {this.props.children}
                </main>

                <Footer/>
            </div>
        )
    }
}