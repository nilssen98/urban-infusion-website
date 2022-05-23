export function hexToRgb(hex: string): number[] {
    return hex
        .slice(1)
        .padStart(6, 'f')
        .match(/^(..)(..)(..)$/)!
        .slice(1, 4)
        .map(s => parseInt(s, 16));
}

function isStringEnum<T extends Record<string, string | number>>(t: T): boolean {
    return typeof Object.values(t).pop() === 'string';
}

export function enumKeys<T extends Record<string, string | number>>(t: T): (keyof T)[] {
    return isStringEnum(t) ? Object.keys(t) : Object.keys(t).slice(0, Object.keys(t).length / 2);
}

export function enumValues<T extends Record<string, string>>(t: T): string[];
export function enumValues<T extends Record<string, string | number>>(t: T): number[];
export function enumValues<T extends Record<string, string | number>>(t: T): string[] | number[] {
    if (isStringEnum(t)) {
        return Object.values(t) as string[];
    } else {
        return Object.values(t).slice(Object.values(t).length / 2) as number[];
    }
}
