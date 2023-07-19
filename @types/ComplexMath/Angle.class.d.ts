import Inspecteable from '../../Inspectable.class.js';
import type { RealNumber } from "./types.d.ts";

export default class Angle extends Inspecteable {
	public readonly value: RealNumber;
	constructor(value?: RealNumber)
}

export class Radians extends Angle {
	static from(ang: Degrees | Radians): Radians
	toString(): string
}
export class Degrees extends Angle {
	static from(ang: Radians | Degrees): Degrees
	toString(): string
}