import Inspecteable from '../Inspectable.class.js';
import Angle, { Radians } from './Angle.class.js';
import ComplexNumber from './ComplexNumber.class.js';
import { absolute, equals } from './functions.js';
import { validLikeNumber } from './util.js';

export default class Polar extends Inspecteable {
    magnitude;
    angle;
    constructor(magnitude, angle) {
        super();
        this.magnitude = magnitude;
        this.angle = angle;
    }
    /** @returns {ComplexNumber} */
    toComplexNumber() {
        const theta = Radians.from(this.angle);
        const real = this.magnitude * Math.cos(theta.value);
        const imaginary = this.magnitude * Math.sin(theta.value);
        return ComplexNumber.from(real, imaginary);
    }
    /** @type {(typeof import('../@types/ComplexMath/Polar.class.d.ts').default)['from']} */
    static from(value) {
        validLikeNumber(value);
        const [real, imaginary] = ComplexNumber.from(value);
        const magnitude = absolute(value);
        const alpha = Math.atan2(imaginary, real);
        const angle = new Radians(alpha);
        return new Polar(magnitude, angle);
    }
    /** @returns {string} */
    toString() {
        return `${this.magnitude} ${this.angle}`;
    }
    /** @type {(typeof import('../@types/ComplexMath/Polar.class.d.ts').default)['toComplexNumber']} */
    static toComplexNumber(magnitude, angle, type = "radians") {
        const theta = angle instanceof Angle
            ? Radians.from(angle)
            : new Radians(type === "radians" ? angle : (Math.PI * angle) / 180);
        const real = magnitude * Math.cos(theta.value);
        const imaginary = magnitude * Math.sin(theta.value);
        return ComplexNumber.from(real, imaginary);
    }
}
/** @type {import('../@types/ComplexMath/Polar.class.d.ts').comparePolar}*/
export function comparePolar(a, b) {
    if (a === b)
        return true;
    const aComplex = a.toComplexNumber();
    const bComplex = b.toComplexNumber();
    return equals(aComplex, bComplex);
}
