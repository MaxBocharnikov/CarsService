import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class Parts {
    static fetchParts = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/parts/list`, {query: query || ''});
        return response.data;
    };

    static createPart = async (part) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/parts`, part);
        return response.data;
    };

    static updatePart = async (part) => {
        const response = await HttpClient.call('put',`${_BASE_URL}/parts`, part);
        return response.data;
    };


}