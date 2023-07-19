import { Radians } from '../ComplexMath/Angle.class.js';
import Polar from '../ComplexMath/Polar.class.js';
import ComplexNumber from './ComplexNumber.class.js';
import { I, PI } from './constants.js';
function roundDecimals(value, decimals = 0) {
    const multiplier = Math.pow(10, decimals);
    const round = Math.round(value * multiplier);
    return round / multiplier;
}
/** @type {import('../@types/ComplexMath/functions.d.ts').isLikeNumber} */
export function isLikeNumber(value) {
    return value instanceof ComplexNumber || typeof value === 'number';
}
//#region Arithmetic functions
/** @type {import('../@types/ComplexMath/functions.d.ts').absolute} */
export function absolute(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return Math.abs(x);
    // Absolute value is the distance from the origin (0,0)
    // c^2 = a^2 + b^2
    // c = sqrt(a^2 + b^2)
    const c2 = x.real * x.real + x.imaginary * x.imaginary;
    const c = Math.sqrt(c2);
    return c;
}
/**
 * x±y
 * @type {import('../@types/ComplexMath/functions.d.ts').plusMinus}
 */
export function plusMinus(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    const plus = add(x, y);
    const minus = subtract(x, y);
    return [plus, minus];
}
/** @type {import('../@types/ComplexMath/functions.d.ts').add}*/
export function add(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    if (typeof x === 'number')
        if (typeof y === 'number')
            return ComplexNumber.from(x + y);
        else
            return ComplexNumber.from(x + y.real, y.imaginary);
    // x instanceof ComplexNumber
    else if (typeof y === 'number')
        return ComplexNumber.from(x.real + y, x.imaginary);
    else
        return ComplexNumber.from(x.real + y.real, x.imaginary + y.imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').subtract} */
export function subtract(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    if (typeof x === 'number')
        if (typeof y === 'number')
            return ComplexNumber.from(x - y);
        else
            return ComplexNumber.from(x - y.real, -y.imaginary);
    // x instanceof ComplexNumber
    else if (typeof y === 'number')
        return ComplexNumber.from(x.real - y, x.imaginary);
    else
        return ComplexNumber.from(x.real - y.real, x.imaginary - y.imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').multiply} */
export function multiply(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    if (typeof x === 'number')
        if (typeof y === 'number')
            return ComplexNumber.from(x * y);
        else
            return ComplexNumber.from(x * y.real, x * y.imaginary);
    // x instanceof ComplexNumber
    else if (typeof y === 'number')
        return ComplexNumber.from(x.real * y, x.imaginary * y);
    else
        return ComplexNumber.from(x.real * y.real - x.imaginary * y.imaginary, x.real * y.imaginary + x.imaginary * y.real);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').divide} */
export function divide(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    if (typeof x === 'number')
        x = ComplexNumber.from(x);
    if (typeof y === 'number')
        y = ComplexNumber.from(y);
    // Denominator: c^2 + d^2
    const denominator = y.real * y.real + y.imaginary * y.imaginary;
    // Real part: (a * c + b * d) / (c^2 + d^2)
    const real = (x.real * y.real + x.imaginary * y.imaginary) / denominator;
    // Imaginary part: (b * c - a * d) / (c^2 + d^2)
    const imaginary = (x.imaginary * y.real - x.real * y.imaginary) / denominator;
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').modulo} */
export function modulo(x, y) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    const quotient = divide(x, y);
    const quotientFloor = floor(quotient);
    return subtract(x, multiply(quotientFloor, y));
}
/** @type {import('../@types/ComplexMath/functions.d.ts').exp} */
export function exp(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.exp(x));
    const real = Math.exp(x.real) * Math.cos(x.imaginary);
    const imaginary = Math.exp(x.real) * Math.sin(x.imaginary);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').log} */
export function log(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.log(x));
    // Real: ln(|x|)
    const real = Math.log(Math.sqrt(x.real * x.real + x.imaginary * x.imaginary));
    // Imaginary: arg(x)
    const imaginary = Math.atan2(x.imaginary, x.real);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').power} */
export function power(base, exponent = 2) {
    if (!isLikeNumber(base))
        throw new Error('Invalid x value');
    if (!isLikeNumber(exponent))
        throw new Error('Invalid y value');
    // (a+bi)^(c+di)
    const polarBase = Polar.from(base);
    // r = |a+bi|
    const r = polarBase.magnitude;
    // theta = arg(a+bi)
    const theta = Radians.from(polarBase.angle);
    const [c, d] = ComplexNumber.from(exponent);

    const lnr = Math.log(r);
    const clnr = c * lnr;
    const ctheta = c * theta.value;
    const dlnr = d * lnr;
    const dtheta = d * theta.value;
    const yRe = ctheta + dlnr;
    const yIm = dtheta - clnr;
    const y = new ComplexNumber(yRe, yIm);
    const cosY = cos(y);
    const sinY = sin(y);
    const isinY = multiply(I, sinY);
    return add(cosY, isinY);
}
/** @type {typeof import('../@types/ComplexMath/functions.d.ts').square['default']} */
export function square(x, y = 2) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    return power(x, divide(1, y));
}
/** @type {typeof import('../@types/ComplexMath/functions.d.ts').square['multidata']} */
square.multidata = function square(base, index = 2) {
    if (!isLikeNumber(base))
        throw new Error('Invalid x value');
    const maxData = 100;
    const data = [];
    // (a+bi)^(c+di)
    const polarBase = Polar.from(base);
    // r = |a+bi|
    const r = polarBase.magnitude;
    // theta = arg(a+bi)
    const θ = Radians.from(polarBase.angle);
    const r_n = power(r, divide(1, index));
    for (let k = 0; k < maxData; k++) {
        const angle = divide(θ.value + ( /* 360° */2 * PI * k), index);
        const cosY = cos(angle);
        const sinY = sin(angle);
        const isinY = multiply(I, sinY);
        const cos_isin = add(cosY, isinY);
        const value = multiply(r_n, cos_isin);
        const exists = data.some((v) => equals(v, value));
        if (exists)
            break;
        data.push(value);
    }
    return data;
};
//#endregion
//#region Trigonometric functions

/** @type {import('../@types/ComplexMath/functions.d.ts').sin} */
export function sin(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.sin(x));
    // Real part: sin(a) * cosh(b)
    const real = Math.sin(x.real) * Math.cosh(x.imaginary);
    // Imaginary part: cos(a) * sinh(b)
    const imaginary = Math.cos(x.real) * Math.sinh(x.imaginary);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').cos} */
export function cos(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.cos(x));
    // Real part: cos(a) * cosh(b)
    const real = Math.cos(x.real) * Math.cosh(x.imaginary);
    // Imaginary part: -sin(a) * sinh(b)
    const imaginary = -Math.sin(x.real) * Math.sinh(x.imaginary);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').tan} */
export function tan(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.tan(x));
    // Calculate sin(x) and cos(x)
    const sinX = sin(x);
    const cosX = cos(x);
    // Divide sin(x) by cos(x)
    return divide(sinX, cosX);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').cot} */
export function cot(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    // Calculate cos(x) and sin(x)
    const cosX = cos(x);
    const sinX = sin(x);
    // Divide cos(x) by sin(x)
    return divide(cosX, sinX);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').sec} */
export function sec(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(1 / Math.cos(x));
    // Calculate cos(x)
    const cosX = cos(x);
    // Take the reciprocal of cos(x)
    return divide(1, cosX);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').csc} */
export function csc(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(1 / Math.sin(x));
    // Calculate sin(x)
    const sinX = sin(x);
    // Take the reciprocal of sin(x)
    return divide(1, sinX);
}
//#endregion
//#region Program functions
/** @type {import('../@types/ComplexMath/functions.d.ts').equals} */
export function equals(x, y) {
    if (typeof x === 'number' && typeof y === 'number')
        return x === y;
    if (typeof x === 'number' && y instanceof ComplexNumber)
        return x === y.real && y.imaginary === 0;
    if (x instanceof ComplexNumber && typeof y === 'number')
        return x.real === y && x.imaginary === 0;
    if (x instanceof ComplexNumber && y instanceof ComplexNumber)
        return x.real === y.real && x.imaginary === y.imaginary;
    return false;
}
/** @type {import('../@types/ComplexMath/functions.d.ts').negative} */
export function negative(x) {
    if (typeof x === 'number')
        return ComplexNumber.from(-x);
    return ComplexNumber.from(-x.real, -x.imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').round} */
export function round(x, y = 0) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (!isLikeNumber(y))
        throw new Error('Invalid y value');
    // If y is a complex number, use its real part
    if (y instanceof ComplexNumber)
        y = y.real;
    if (typeof x === 'number')
        return ComplexNumber.from(roundDecimals(x, y));
    // Round the real and imaginary parts separately
    const real = roundDecimals(x.real, y);
    const imaginary = roundDecimals(x.imaginary, y);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').floor} */
export function floor(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return ComplexNumber.from(Math.floor(x));
    // Floor the real and imaginary parts separately
    const real = Math.floor(x.real);
    const imaginary = Math.floor(x.imaginary);
    return ComplexNumber.from(real, imaginary);
}
/** @type {import('../@types/ComplexMath/functions.d.ts').isInt} */
export function isInt(x) {
    if (!isLikeNumber(x))
        throw new Error('Invalid x value');
    if (typeof x === 'number')
        return Number.isInteger(x);
    return Number.isInteger(x.real) && x.imaginary === 0;
}
//#endregion
