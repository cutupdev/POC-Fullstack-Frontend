export function hasUpperCase(str) {
    return str !== str.toLowerCase();
}

export function hasLowerCase(str) {
    return str !== str.toUpperCase();
}

export function hasSpecialCharacter(str) {
    return /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(str);
}

export function hasNumeric(str) {
    return /(?=.*\d)/.test(str);
}

export function isEmail(str) {
    return /\S+@\S+\.\S+/.test(str);
}