import Moment from 'moment';

export function format(date) {
    return Moment(date).format('[Dia] D/M/YY [às] h:mm');
}