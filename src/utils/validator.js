import Validator from 'Validator';

const messages = {
    'email': ':attribute não parece ser válido',
    'required': 'Você esqueceu de preencher o campo :attribute'
};

export function validate(data, rules) {
    return Validator.make(data, rules, messages);
}