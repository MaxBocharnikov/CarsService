import {getApplicationTimeFromFields} from '../applications';

export const mapFromOrderToOrderDto = (id, fields) => {
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
        recommendationDescription: fields.recommendationDescription,
        recommendedWorks: fields.recommendedWorks,
        recommendedParts: fields.recommendedParts,
        status: fields.status,
    }
};

export const mapFromOrderToUpdatingOrder = (order) => {
    return {
        ...order,
        clientId: order.clientId.id
    }
};