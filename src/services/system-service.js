import axios from "axios";

/**
 * Send contact form message to server
 */

export const sendMessage = (data) => {
    return axios.post('system/contact', data);
};