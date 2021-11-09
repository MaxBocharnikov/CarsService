import moment from 'moment';

export const mapFromApplicationDtoToApplication = (applicationDto) => {
    return {
        id: applicationDto.id,
        group: applicationDto.postId.id,
        title: applicationDto.clientId.name,
        start: moment(applicationDto.startDate),
        end: moment(applicationDto.endDate)
    }
};
