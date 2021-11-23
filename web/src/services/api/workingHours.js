import HttpClient from './httpClient';
import {_BASE_URL} from '../../constants/httpClient';

export default class WorkingHoursApi {
    static fetchWorkingHours = async () => {
        const response = await HttpClient.call('get',`${_BASE_URL}/workingHours`);
        return response.data;
    };
}