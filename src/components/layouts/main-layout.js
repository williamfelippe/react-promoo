import React, {Component} from 'react';
import Header from '../views/header/header'
import Footer from '../views/footer/footer'

export default class MainLayout extends Component {
    render() {
        return (
            <div className="app">
                <Header/>

                <main>
                    {this.props.children}
                </main>

                <Footer/>
            </div>
        )
    }
}