/** @type {import("./@types/validation").ValidType} */
export function ValidType(value, callback) {
    if (callback(value))
        return value;
    throw new TypeError(`${value} is not a valid type`);
}
