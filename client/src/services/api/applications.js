import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class ApplicationsApi {
    static fetchApplications = async (query) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/applications/list`, {query});
        return response.data;
    };

    static fetchApplicationsByDate = async (startDate, endDate) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/applications/getByDate`, {startDate, endDate});
        return response.data;
    };

    static updateApplications = async (application) => {
        const response = await HttpClient.call('put',`${_BASE_URL}/applications`, application);
        return response.data;
    };

    static createApplications = async (application) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/applications`, application);
        return response.data;
    };

    static fetchApplicationDetails = async (id) => {
        const response = await HttpClient.call('get',`${_BASE_URL}/applications/${id}`);
        return response.data;
    };
}