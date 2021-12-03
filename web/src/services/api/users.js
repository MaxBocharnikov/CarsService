import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class UsersApi {

    static hasLogin = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/users/haslogin`);
        return response.data;
    };

    static login = async (user) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/users/login`, user);
        return response.data;
    };

    static logout = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/users/logout`);
        return response.data;
    };
}