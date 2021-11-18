import moment from 'moment';

export const mapFromApplicationToTimeLineApplication = (applicationDto) => {
    return {
        id: applicationDto.id,
        group: applicationDto.postId,
        title: applicationDto.clientId.name,
        start: applicationDto.startDate,
        end: applicationDto.endDate,
        clientId: applicationDto.clientId,
    }
};


export const mapFromApplicationToUpdatingApplication= (application) => {
    return {
        ...application,
        clientId: application.clientId.id
    }
};
