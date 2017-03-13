import numeral from "numeral";
import "numeral/locales/pt-br";

export function format(value) {
    if(!value) value = 0;

    numeral.locale('pt-br');
    return numeral(value).format('$0,0.00');
}

/*export function format(value) {
    if(!value) value = 0;
    return 'R$' + configure(value, 2, 3, '.', ',');
}

function configure(value, n, x, s, c) {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';

    let num = value.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}*/