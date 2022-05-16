
/**
 * Simple email check, checks only for a character before the @ symbol
 * and something before and after the dot in the domain part, space is not allowed.
 * @return True if the email is valid or blank, false otherwise
 */
export function isEmailAddress(input: string): boolean {
    if (input === null) {
        return false;
    }
    if (input.length === 0) {
        return true;
    }
    return /^\S+@\S+\.\S+$/.test(input);
}
