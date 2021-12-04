import moment from 'moment';
import {getApplicationTimeFromFields} from '../applications';

export const mapFromApplicationToTimeLineApplication = (applicationDto) => {
    return {
        id: applicationDto.id,
        group: applicationDto.postId,
        title: applicationDto.clientId.name,
        start: applicationDto.startDate,
        end: applicationDto.endDate,
        clientId: applicationDto.clientId,
        trailers: applicationDto.trailersIds,
    }
};


export const mapFromApplicationToUpdatingApplication= (application) => {
    return {
        ...application,
        clientId: application.clientId.id,
        trailersIds: application.trailersIds.map(t => t.id || t),
    }
};


export const mapFromApplicationToCreateApplication = (fields) => {
  return {
      clientId: fields.client,
      trailersIds: fields.trailers,
      contactName: fields.name,
      contactPhone: fields.phone,
      description: fields.description,
      postId: fields.post,
      startDate: getApplicationTimeFromFields(fields).startDate,
      endDate: getApplicationTimeFromFields(fields).endDate,

  }
};

export const mapFromApplicationToExtendedUpdateApplication = (id, fields) => {
    return {
        id: id,
        clientId: fields.client,
        trailersIds: fields.trailers,
        contactName: fields.name,
        contactPhone: fields.phone,
        description: fields.description,
        postId: fields.post,
        startDate: getApplicationTimeFromFields(fields).startDate,
        endDate: getApplicationTimeFromFields(fields).endDate,
        workingHourId: fields.workingHourId,
        works: fields.works,
        parts: fields.parts,
        sum: fields.sum,
    }
};

export const mapFromApplicationToApplicationPageTableData = (application) => {
    return {
        id: application.id,
        number: application.id.slice(application.id.length - 3),
        date: moment(application.startDate).format('DD.MM.YYYY'),
        client: application.clientId ? application.clientId.name : '',
        trailer: application.trailersIds ?  application.trailersIds[0].name : '',
        sum: application.sum,
        contacts: application.contactName || '' + '-' + application.contactInfo || '',
    }
};