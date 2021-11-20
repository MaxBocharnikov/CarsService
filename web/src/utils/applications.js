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