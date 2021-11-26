import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class TrailersApi {
    static fetchTrailers = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/trailers/list`, {query: query || ''});
        return response.data;
    };

    static createTrailer = async (trailer) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/trailers`, trailer);
        return response.data;
    };
}