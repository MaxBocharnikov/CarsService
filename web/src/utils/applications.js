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

export const getExtendedFieldsData = (applicationDetails) => {
    const {clientId, contactName, contactPhone, description, startDate, endDate, postId, trailersIds, workingHourId} = applicationDetails;
    return {
        client: clientId.id,
        name: contactName,
        phone: contactPhone,
        description: description,
        date: getDefaultFieldData({startDate, endDate}).date,
        time: getDefaultFieldData({startDate, endDate}).time,
        post: postId.id,
        trailers: trailersIds.map(t => t.id),
        workingHourId: workingHourId || '',

    }
};