import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class Works {
    static fetchWorks = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/works`);
        return response.data;
    };
}