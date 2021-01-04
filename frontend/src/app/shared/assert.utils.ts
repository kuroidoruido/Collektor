export function isDefined<T>(x: T | null | undefined): x is T {
    return x !== null && typeof x !== 'undefined';
}
export function isUndefined<T>(x: T | null | undefined): x is null | undefined {
    return !isDefined(x);
}