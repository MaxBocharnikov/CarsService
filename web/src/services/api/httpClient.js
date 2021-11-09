import axios from 'axios';

export default class HttpClient {
    static async call(method, url, data = null) {
        const response = await axios({
            method,
            url,
            data,
            timeout: 15000,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    }
}
