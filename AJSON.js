function convertFunctionToString(fn) {
    const data = fn.toString();
    // function name (arg1, arg2) { body }
    const matchBlock = data.match(/function\s*\((.*)\)\s*\{([\s\S]*)\}/);
    if (matchBlock)
        return `fn:${data}`;
    // (arg1, arg2) => { body }
    const matchArrow = data.match(/\((.*)\)\s*=>\s*{([\s\S]*)}/);
    if (matchArrow)
        return `fn:${data}`;
    // name(arg1, arg2) { body }
    const matchProp = data.match(/(.*)\((.*)\)\s*\{([\s\S]*)\}/);
    if (matchProp) {
        const [, name, args, body] = matchProp;
        return `fn:function ${name}(${args}){${body}}`;
    }
}
/** @type {import('./@types/AJSON.d.ts').stringify} */
export function stringify(data) {
    if (typeof data === 'function') {
        return stringify(convertFunctionToString(data));
    }
    if (typeof data === 'object') {
        return JSON.stringify(data, (_key, value) => {
            if (typeof value === 'function')
                return convertFunctionToString(value);
            return value;
        });
    }
    return JSON.stringify(data);
}

function _parse(self, obj) {
    if (typeof obj === 'string' && obj.startsWith('fn:')) {
        const fnBody = obj.slice(3);
        return new Function('self', `return (${fnBody})`)(self);
    }
    if (typeof obj === 'object') {
        if (Array.isArray(obj))
            return obj.map(v => _parse(self, v));
        if (obj === null)
            return obj;
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = _parse(self, obj[key]);
            return acc;
        }, obj);
    }
    return obj;
}
/** @type {import('./@types/AJSON.d.ts').parse} */
export function parse(data) {
    const self = JSON.parse(data);
    return _parse(self, self);
}
export default {
    stringify,
    parse
};
