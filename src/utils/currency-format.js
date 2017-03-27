import numeral from "numeral";
import "numeral/locales/pt-br";

export const formatCurrency = (value) => {
    if(!value) value = 0;

    const currency = value.toString().replace(".", ",");

    numeral.locale('pt-br');
    return numeral(currency).format('$0.00');
};