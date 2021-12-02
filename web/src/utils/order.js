import {getDefaultFieldData} from './applications';

export const getOrderFieldsData = (data, workingHours, isNew) => {
    if (!data) {
            return {
                client: '',
                name: '',
                phone: '',
                description: '',
                date: '',
                time:'',
                post: '',
                trailers: [],
                workingHourId: '',
                works: [],
                parts: [],
                sum: '',
                recommendationDescription:  '',
                recommendedWorks:  [],
                recommendedParts:  [],
                recommendationSum: '',
                applicationId: '',
                status: 'application',
            }
    }
    const {
        clientId, contactName, contactPhone, description, startDate, endDate,
        postId, trailersIds, workingHourId, works, parts, sum, recommendationDescription, recommendedWorks, recommendedParts,
        recommendationSum, applicationId, id, status
    } = data;
    return {
        id: id,
        client: clientId.id ? clientId.id : clientId,
        name: contactName,
        phone: contactPhone,
        description: description,
        date: getDefaultFieldData({startDate, endDate}).date,
        time: getDefaultFieldData({startDate, endDate}).time,
        post: postId,
        trailers: trailersIds.map(t => t.id ? t.id : t),
        workingHourId: workingHourId || (workingHours[0] ? workingHours[0].id : ''),
        works: works || [],
        parts: parts || [],
        sum: sum || 0,
        recommendationDescription: recommendationDescription || '',
        recommendedWorks: !isNew && recommendedWorks ? recommendedWorks : [],
        recommendedParts: !isNew && recommendedParts ? recommendedParts : [],
        recommendationSum: recommendationSum || '',
        applicationId,
        status: status || 'application',
    }
};