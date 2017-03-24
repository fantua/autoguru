import moment from 'moment';

export function formatForInput (date) {
    return moment(date).format('YYYY-MM-DD');
}