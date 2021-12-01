import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class ApplicationsApi {
    static fetchOrders = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/orders/list`, {query});
        return response.data;
    };

    static updateOrder = async (order) => {
        const response = await HttpClient.call('put',`${_BASE_URL}/orders`, order);
        return response.data;
    };

    static createOrder = async (order) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/orders`, order);
        return response.data;
    };

    static fetchOrderDetails = async (id) => {
        const response = await HttpClient.call('get',`${_BASE_URL}/orders/${id}`);
        return response.data;
    };
}