import Inspecteable from '../../Inspectable.class.js';
import type { LikeNumber } from "./types.d.ts";

export default class ComplexNumber extends Inspecteable {
	public readonly real: number;
	public readonly imaginary: number;
	constructor(real?: number, imaginary?: number);
	toFraction():string
	[Symbol.iterator] (this: ComplexNumber): Generator<number, void, unknown>
	valueOf(): number | string;
	toJSON: ComplexNumber['toString'];
	toString():string
	[Symbol.hasInstance](instance: unknown):boolean
	static NaN: ComplexNumber;
	static Infinity: ComplexNumber;
	static NegativeInfinity: ComplexNumber;
	static Zero: ComplexNumber;
	static One: ComplexNumber;
	static Two: ComplexNumber;
	static E: ComplexNumber;
	static Pi: ComplexNumber;
	static I: ComplexNumber;
	static One_Two: ComplexNumber;

	static from(value: LikeNumber, imaginary?: number): ComplexNumber
	static isNaN(value: number): boolean
}