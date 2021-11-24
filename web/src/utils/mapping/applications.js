import {getApplicationTimeFromFields} from '../applications';

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