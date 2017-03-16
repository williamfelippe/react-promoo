import ReactDOM from "react-dom";
import axios from "axios";
import Router from "./router";
import {getLoggedUserToken} from "./utils/user-information-store";
import "./index.css";

axios.defaults.baseURL = 'http://private-88d50-promoo.apiary-mock.com/';
axios.defaults.headers.common['Authorization'] = getLoggedUserToken();
ReactDOM.render(Router, document.getElementById('root'));