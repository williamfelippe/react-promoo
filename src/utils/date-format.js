import Moment from 'moment';

export const formatDate = (date) => {
    return Moment().utc(date).format('[Dia] D/MM/YY [às] h[h]mm');
};