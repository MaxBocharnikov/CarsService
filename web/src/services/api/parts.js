import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class Parts {
    static fetchParts = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/parts`);
        return response.data;
    };
}