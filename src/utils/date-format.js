import Moment from 'moment';

export function format(date) {
    return Moment().utc(date).format('[Dia] D/MM/YY [às] h[h]mm');
}