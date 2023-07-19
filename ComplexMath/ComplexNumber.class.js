import { FOREGROUND } from '../Colors/index.js';
import Inspecteable from '../Inspectable.class.js';
const PRECISION = 14;
const MIDDLE_PRECISION = Math.round(PRECISION / 2);
const EPSILON = Number(`1e-${PRECISION}`);

function roundDecimals(value, decimals = 0) {
    if (typeof value !== 'number')
        throw new Error('Invalid value');
    if (typeof decimals !== 'number')
        throw new Error('Invalid decimals');
    const multiplier = Math.pow(10, decimals);
    const round = Math.round(value * multiplier);
    return round / multiplier;
}

function ConvertToFraction(number, tolerance = 1e-6) {
    let numerator = 1;
    let denominator = 1;
    while (Math.abs(number - Math.round(number)) > tolerance) {
        number *= 10;
        numerator *= 10;
    }
    denominator = numerator;
    numerator = Math.round(number);
    const gcd = GreatestCommonDivisor(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;
    return `${numerator}/${denominator}`;
}

function GreatestCommonDivisor(a, b) {
    if (b === 0) {
        return a;
    }
    return GreatestCommonDivisor(b, a % b);
}
function useConsts(val) {
    if (val % Math.PI === 0)
        return `${val / Math.PI === 1 ? '' : val / Math.PI}π`;
    if (val % Math.E === 0)
        return `${val / Math.E === 1 ? '' : val / Math.E}e`;
    if (val % (Math.PI * Math.E) === 0)
        return `${val / (Math.PI * Math.E) === 1 ? '' : val / (Math.PI * Math.E)}πe`;
    return `${val}`;
}
export default class ComplexNumber extends Inspecteable {
    real;
    imaginary;
    toConsoleColor = FOREGROUND.YELLOW;
    constructor(real = 0, imaginary = 0) {
        super();
        this.real = real;
        this.imaginary = imaginary;
    }
    /** @returns {string} */
    toFraction() {
        const real = ConvertToFraction(this.real);
        const imaginary = ConvertToFraction(this.imaginary);
        if (this.imaginary === 0)
            return real;
        else if (this.real === 0)
            return `(${imaginary})i`;
        else
            return `${real} + (${imaginary})i`;
    }
    /** @returns {Generator<number, void, unknown>} */
    [Symbol.iterator] = function* () {
        yield this.real;
        yield this.imaginary;
    };
    /** @returns {string | number} */
    valueOf() {
        if (this.imaginary === 0)
            return this.real;
        else
            return this.toString();
    }
    /** @default this.toString */
    toJSON = this.toString;
    /** @returns {string} */
    toString() {
        const parts = ['0', '+', '0i'];
        if (this.real !== 0)
            parts[0] = useConsts(this.real);
        else
            parts[0] = parts[1] = '';
        if (this.imaginary === 0) {
            parts[1] = parts[2] = '';
        }
        else if (Math.abs(this.imaginary) === 1)
            parts[2] = 'i';
        else
            parts[2] = `${useConsts(Math.abs(this.imaginary))}i`;
        if (this.imaginary < 0)
            parts[1] = '-';
        return parts.join('') || '0';
    }
    /**
     * @param {unknown} instance
     * @returns {boolean}
     */
    [Symbol.hasInstance](instance) {
        if (typeof instance !== 'object')
            return false;
        if (instance === null)
            return false;
        if (!('real' in instance))
            return false;
        if (!('imaginary' in instance))
            return false;
        return true;
    }
    /** @type {ComplexNumber} */
    static NaN
    /** @type {ComplexNumber} */
    static Infinity
    /** @type {ComplexNumber} */
    static NegativeInfinity
    /** @type {ComplexNumber} */
    static Zero
    /** @type {ComplexNumber} */
    static One
    /** @type {ComplexNumber} */
    static Two
    /** @type {ComplexNumber} */
    static E
    /** @type {ComplexNumber} */
    static Pi
    /** @type {ComplexNumber} */
    static I
    /** @type {ComplexNumber} */
    static One_Two

    /** @type {(typeof import('../@types/ComplexMath/ComplexNumber.class.d.ts').default)['from']} */
    static from(value, imaginary = 0) {
        if (value instanceof ComplexNumber)
            return ComplexNumber.from(value.real, value.imaginary);
        if (typeof value !== 'number')
            throw new Error('Invalid value');
        if (typeof imaginary !== 'number')
            throw new Error('Invalid imaginary');
        if (Math.abs(value) < EPSILON)
            value = 0;
        if (Math.abs(imaginary) < EPSILON)
            imaginary = 0;
        const a = Number(value.toPrecision(PRECISION));
        const b = Number(value.toPrecision(MIDDLE_PRECISION));
        if (a === b)
            value = roundDecimals(value, PRECISION - 2);
        const c = parseFloat(imaginary.toPrecision(PRECISION));
        const d = parseFloat(imaginary.toPrecision(MIDDLE_PRECISION));
        if (c === d)
            imaginary = roundDecimals(imaginary, PRECISION - 2);
        if (!ComplexNumber.NaN)
            ComplexNumber.NaN = new ComplexNumber(NaN);
        if (!ComplexNumber.Infinity)
            ComplexNumber.Infinity = new ComplexNumber(Infinity);
        if (!ComplexNumber.NegativeInfinity)
            ComplexNumber.NegativeInfinity = new ComplexNumber(-Infinity);
        if (!ComplexNumber.Zero)
            ComplexNumber.Zero = new ComplexNumber(0);
        if (!ComplexNumber.One)
            ComplexNumber.One = new ComplexNumber(1);
        if (!ComplexNumber.Two)
            ComplexNumber.Two = new ComplexNumber(2);
        if (!ComplexNumber.E)
            ComplexNumber.E = new ComplexNumber(Math.E);
        if (!ComplexNumber.Pi)
            ComplexNumber.Pi = new ComplexNumber(Math.PI);
        if (!ComplexNumber.I)
            ComplexNumber.I = new ComplexNumber(0, 1);
        if (!ComplexNumber.One_Two)
            ComplexNumber.One_Two = new ComplexNumber(1 / 2);
        if (ComplexNumber.isNaN(value) || ComplexNumber.isNaN(imaginary))
            return ComplexNumber.NaN;
        if (value === Infinity)
            return ComplexNumber.Infinity;
        if (value === -Infinity)
            return ComplexNumber.NegativeInfinity;
        if (imaginary === Infinity)
            return ComplexNumber.Infinity;
        if (imaginary === -Infinity)
            return ComplexNumber.NegativeInfinity;
        if (value === 0 && imaginary === 0)
            return ComplexNumber.Zero;
        if (value === 1 && imaginary === 0)
            return ComplexNumber.One;
        if (value === 2 && imaginary === 0)
            return ComplexNumber.Two;
        if (value === Math.E && imaginary === 0)
            return ComplexNumber.E;
        if (value === Math.PI && imaginary === 0)
            return ComplexNumber.Pi;
        if (value === 0 && imaginary === 1)
            return ComplexNumber.I;
        if (value === 1 / 2 && imaginary === 0)
            return ComplexNumber.One_Two;
        return new ComplexNumber(value, imaginary);
    }
    /**
     * @param {number} value
     * @returns {boolean}
     */
    static isNaN(value) {
        return value !== 0 && !value;
    }
}
