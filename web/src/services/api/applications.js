import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class ApplicationsApi {
    static fetchApplications = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/applications`);
        return response.data;
    };

    static fetchApplicationsByDate = async (startDate, endDate) => {
        const response = await HttpClient.call('post',`${_BASE_URL}/applications/getByDate`, {startDate, endDate});
        return response.data;
    };
}