import axios from 'axios';

axios.defaults.baseURL = 'http://private-88d50-promoo.apiary-mock.com/';

/**
 * Send contact form message to server
 */

export function sendMessage(data) {
    return axios.post('system/contact', data);
}
