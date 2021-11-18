import moment from 'moment';

export const mapFromApplicationDtoToApplication = (applicationDto) => {
    return {
        id: applicationDto.id,
        group: applicationDto.postId.id,
        title: applicationDto.clientId.name,
        start: moment(applicationDto.startDate).format('YYYY.MM.DD, HH:mm:ss'),
        end: moment(applicationDto.endDate).format('YYYY.MM.DD, HH:mm:ss')
    }
};
