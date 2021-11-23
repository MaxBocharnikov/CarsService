import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class Works {
    static fetchWorks = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/works/list`, {query: query || ''});
        return response.data;
    };
}