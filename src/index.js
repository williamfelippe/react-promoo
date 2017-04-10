import ReactDOM from "react-dom";
import axios from "axios";
import Router from "./router";
import "./index.css";

axios.defaults.baseURL = 'http://private-88d50-promoo.apiary-mock.com/';
//axios.defaults.baseURL = 'http://localhost:1402/promoo';
ReactDOM.render(Router, document.getElementById('root'));