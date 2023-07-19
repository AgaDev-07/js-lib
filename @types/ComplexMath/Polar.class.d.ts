import Inspecteable from '../../Inspectable.class.js';
import Angle from './Angle.class.d.ts';
import ComplexNumber from '../../ComplexMath/ComplexNumber.class.js';
import { LikeNumber, RealNumber } from './types.d.ts';

export const enum AngleType {
	degrees = 'degrees',
	radians = 'radians',
}

export default class Polar extends Inspecteable {
	public readonly magnitude: RealNumber;
	public readonly angle: Angle;
	constructor(magnitude: RealNumber, angle: Angle)
	toComplexNumber(): ComplexNumber
	static from(value: LikeNumber): Polar 
	toString(): string
	static toComplexNumber(
		magnitude: RealNumber,
		angle: RealNumber | Angle,
		type?: AngleType
	): ComplexNumber;
}

export function comparePolar(a: Polar, b: Polar): boolean
