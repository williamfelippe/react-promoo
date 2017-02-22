import React, {Component} from 'react';
import {Row, Col} from 'react-materialize';

export default class About extends Component {
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={10} m={8} offset="s1 m2" className="center-align">
                        <h2>Sobre</h2>

                        <p>
                            Sed rhoncus dui metus, sit amet lobortis mauris lobortis ut. Etiam pretium dolor
                            eget elit facilisis ullamcorper. In varius imperdiet velit, sit amet bibendum
                            libero malesuada a. Nulla consectetur fermentum lacus, vitae venenatis purus
                            iaculis eget. Suspendisse auctor tincidunt neque, et varius enim tempor id. Ut
                            quis mollis neque. Curabitur vel massa ut elit viverra euismod. Aenean dapibus
                            dui a vulputate vehicula. Fusce viverra mattis nisl, vitae malesuada nisl dictum
                            sed. Nulla ut laoreet lacus.
                        </p>
                        <p>
                            Nam a congue nulla, consectetur dignissim odio. Nunc ante quam, volutpat
                            tincidunt tortor a, venenatis molestie nibh. Ut molestie velit ac nulla rutrum
                            interdum. Nullam non molestie dolor. Donec hendrerit a diam nec molestie. Proin
                            ut bibendum odio, vitae tincidunt ex. Nunc dictum nec nisi vel varius.
                            Vestibulum sit amet nisi at purus luctus tincidunt. Pellentesque auctor erat vel
                            imperdiet semper. Morbi sit amet fringilla tortor. Integer tempor leo sit amet
                            nisl viverra faucibus. In hac habitasse platea dictumst. Pellentesque ornare
                            porta sem vel accumsan. Aenean imperdiet tincidunt elit, a pulvinar dolor semper
                            quis. Etiam tristique nibh nec odio ullamcorper, pellentesque sodales justo
                            scelerisque.
                        </p>
                    </Col>
                </Row>
            </div>
        )
    }
}