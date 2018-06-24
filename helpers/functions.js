/*
 * Validate CPF -> CPF has 11 letters and hasn't any special characters?
 */

export function validateCpf(cpf) {
    let specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    return cpf.length !== 11 || specialChars.test(cpf) ?  false : true;
}