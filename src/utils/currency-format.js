export function format(value) {
    return 'R$' + configure(value, 2, 3, '.', ',');
}

function configure(value, n, x, s, c) {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0
        ? '\\D'
        : '$') + ')';
    let num = value.toFixed(Math.max(0, ~~ n));

    return (c
        ? num.replace('.', c)
        : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}