import Inspecteable from '../Inspectable.class.js';
import { PI } from "./constants.js";
import { FOREGROUND } from '../Colors/index.js';
export default class Angle extends Inspecteable {
    value;
    toConsoleColor = FOREGROUND.BLUE;
    constructor(value = 0) {
        super();
        this.value = value;
    }
}
function formatRadians(value) {
    const PI_RAD = (value / PI);
    if (+PI_RAD === 1)
        return 'π';
    else if (+PI_RAD === -1)
        return '-π';
    else if (+PI_RAD === 0)
        return '';
    if (+PI_RAD < 1 && +PI_RAD > 0)
        return 'π/' + (1 / PI_RAD);
    else if (+PI_RAD > -1 && +PI_RAD < 0)
        return '-π/' + (1 / PI_RAD);
    const [int, dec] = value.toString().split('.');
    if (dec) {
        const fraction = formatRadians((+`0.${dec}` * PI));
        `${int}π + ${fraction.startsWith('-') ? `(${fraction})` : fraction}`;
    }
    return `${value}π`;
}

export class Radians extends Angle {
    /** @type {(typeof import('../@types/ComplexMath/Angle.class.d.ts').Radians)['from']} */
    static from(ang) {
        if (ang instanceof Radians)
            return ang;
        const radians = ((ang.value * PI) / (180));
        return new Radians(radians);
    }
    /** @returns {string} */
    toString() {
        const v = formatRadians(this.value);
        return `${v}rad`;
    }
}
/** @extends Angle */
export class Degrees extends Angle {
    /** @type {(typeof import('../@types/ComplexMath/Angle.class.d.ts').Degrees)['from']} */
    static from(ang) {
        if (ang instanceof Degrees)
            return ang;
        const degrees = ((ang.value * (180)) * PI);
        return new Degrees(degrees);
    }
    /** @returns {string} */
    toString() {
        return `${this.value}°`;
    }
}
