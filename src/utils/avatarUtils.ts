
export function firstLetterOfUsername(username: string | undefined): string {
    return username ? username.charAt(0).toUpperCase() : 'A';
}

export function stringToColor(string: string | undefined): string {
    if (!string) {
        return 'default';
    }

    let hash = 3;

    /* eslint-disable no-bitwise */
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
