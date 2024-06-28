import { hasUpperCase, hasLowerCase, hasNumeric, hasSpecialCharacter } from "../validation";

const passValid = (password) => {
    if (!password || password.length < 12 || !hasUpperCase(password) || !hasLowerCase(password) || !hasNumeric(password) || !hasSpecialCharacter(password)) {
        if (!password || password.length < 12) {
            return 'Password must be at least 12 characters long.';
        } else if (!hasUpperCase(password)) {
            return 'Password must include one uppercase at least.';
        } else if (!hasLowerCase(password)) {
            return 'Password must include one lowercase at least.';
        } else if (!hasNumeric(password)) {
            return 'Password must include one numeric at least.';
        } else if (!hasSpecialCharacter(password)) {
            return 'Password must include one special character at least.';
        } else {
            return 'Password format is not correct. Try again.';
        }
    } else {
        return false;
    }
}

export default passValid;