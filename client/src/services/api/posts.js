import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class PostsApi {
    static fetchPosts = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/posts`);
        return response.data;
    };
}