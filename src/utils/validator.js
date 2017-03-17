import Validator from "validatorjs";

const messages = {
    required: 'Você esqueceu de preencher o campo :attribute',
    email: 'Ops.. Parece que esse e-mail não é válido',
    min: 'Olho no campo :attribute!. Precisamos de pelo menos :min caracteres'
};

export const validate = (data, rules) => {
    Validator.useLang('pt');
    return new Validator(data, rules, messages);
};