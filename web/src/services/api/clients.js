import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class PostsApi {
    static fetchClients = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/clients/list`, {query: query || ''});
        return response.data;
    };
}