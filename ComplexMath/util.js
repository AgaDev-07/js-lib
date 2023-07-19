import ComplexNumber from './ComplexNumber.class.js';
import { ValidType } from '../validation.js';
import { equals } from './functions.js';

/** @type {import('../@types/ComplexMath/util.d.ts').isRealNumber} */
export function isRealNumber(value) {
    return typeof value === 'number';
}
/** @type {import('../@types/ComplexMath/util.d.ts').validRealNumber} */
export function validRealNumber(value) {
    ValidType(value, isRealNumber);
}
/** @type {import('../@types/ComplexMath/util.d.ts').isComplexNumber} */
export function isComplexNumber(value) {
    return value instanceof ComplexNumber;
}
/** @type {import('../@types/ComplexMath/util.d.ts').validComplexNumber} */
export function validComplexNumber(value) {
    ValidType(value, isComplexNumber);
}
/** @type {import('../@types/ComplexMath/util.d.ts').isLikeNumber} */
export function isLikeNumber(value) {
    return isRealNumber(value) || isComplexNumber(value);
}
/** @type {import('../@types/ComplexMath/util.d.ts').validLikeNumber} */
export function validLikeNumber(value) {
    ValidType(value, isLikeNumber);
}
/** @type {import('../@types/ComplexMath/util.d.ts').multiNumberFunction} */
export function multiNumberFunction(fn) {
    return (x, y) => {
        const xArray = Array.isArray(x) ? x : [x];
        const yArray = Array.isArray(y) ? y : [y];
        const result = [];
        for (const xValue of xArray)
            for (const yValue of yArray) {
                const fnResult = fn(xValue, yValue);
                if (!Array.isArray(fnResult)) {
                    const exist = result.find(value => equals(value, fnResult));
                    if (!exist)
                        result.push(fnResult);
                }
                else
                    for (const item of fnResult) {
                        const exist = result.find(value => equals(value, item));
                        if (!exist)
                            result.push(item);
                    }
            }
        return result;
    };
}
