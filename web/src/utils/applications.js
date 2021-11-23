import moment from 'moment';

export const getApplicationTimeFromFields = (fields) => {
  const { date, time } = fields;
  const splittedDate = date.split('-');
  const splittedTime = time.split('-');

  const startDate = `${splittedDate[0]}, ${splittedTime[0]}`;
  const endDate = `${splittedDate[1]}, ${splittedTime[1]}`;

  return {startDate, endDate}
};

export const getDefaultFieldData = ({startDate, endDate, group}) => {
    return {
       date: `${moment(startDate).format('YYYY.MM.DD')}-${moment(endDate).format('YYYY.MM.DD')}`,
       time: `${moment(startDate).format('HH:mm')}-${moment(endDate).format('HH:mm')}`,
       post: group,
    }
};

export const getExtendedFieldsData = (applicationDetails, workingHours) => {
    const {clientId, contactName, contactPhone, description, startDate, endDate, postId, trailersIds, workingHourId, works, parts} = applicationDetails;
    return {
        client: clientId.id,
        name: contactName,
        phone: contactPhone,
        description: description,
        date: getDefaultFieldData({startDate, endDate}).date,
        time: getDefaultFieldData({startDate, endDate}).time,
        post: postId.id,
        trailers: trailersIds.map(t => t.id),
        workingHourId: workingHourId || (workingHours[0] ? workingHours[0].id : ''),
        works: works || [],
        parts: parts || [],

    }
};

export const mapFromWorkToApplicationWork = (id, works, workingHours, selectedWorkingHoursId) => {
    const foundWork = works.find(w => w.id === id);
    if (!foundWork) return;
    const foundHours = workingHours.find(w => w.id === selectedWorkingHoursId);
    const pricePerHour = foundHours ? +foundHours.title : 1;
    return {
        name: foundWork.name,
        time: foundWork.time,
        quantity: '1',
        pricePerHour,
        sum: pricePerHour * foundWork.time
    }
};

export const mapFromPartToApplicationPart = (id, parts) => {
    const foundPart = parts.find(w => w.id === id);
    if (!foundPart) return;
    return {
        number: foundPart.number,
        name: foundPart.name,
        quantity: '1',
        remainers: foundPart.quantity,
        price: foundPart.price,
        sum: foundPart.price,
    }
}