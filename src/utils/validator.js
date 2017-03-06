import Validator from "validatorjs";

export function validate(data, rules) {
    Validator.useLang('pt');
    return new Validator(data, rules);
}