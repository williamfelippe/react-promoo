import React, {Component} from "react";
import Banner from "../../components/home/banner/banner";
//import BannerWithImage from "../../components/home/banner-with-image/banner-with-image";
import Offers from "../../components/home/offers/offers";
import Contact from "../../components/home/contact/contact";
import Apps from "../../components/home/apps/apps";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Banner/>

                {/*<BannerWithImage/>*/}

                <Offers/>

                <Contact/>

                <Apps/>
            </div>
        )
    }
}