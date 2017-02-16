import axios from 'axios';

/**
 * Send contact form message to server
 */

export function sendMessage(data) {
    return axios.post('system/contact', data);
}
