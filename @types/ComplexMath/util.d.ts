import type { RealNumber, LikeNumber } from './types.d.ts';
import ComplexNumber from './ComplexNumber.class.d.ts';

export function isRealNumber(value: unknown): value is RealNumber
export function validRealNumber(value: RealNumber): void

export function isComplexNumber(value: unknown): value is ComplexNumber
export function validComplexNumber(value: ComplexNumber): void

export function isLikeNumber(value: unknown): value is LikeNumber
export function validLikeNumber(value: LikeNumber): void

type MultiNumber<Num extends LikeNumber> = Num | Num[];
type Item<Arr> = Arr extends (infer Item)[] ? Item : Arr;
export function multiNumberFunction<
	X extends LikeNumber,
	Y extends LikeNumber | undefined,
	R extends LikeNumber | LikeNumber[]
>(fn: (x: X, y?: Y) => R): (x: MultiNumber<X>, y?: MultiNumber<NonNullable<Y>>) => Item<R>[];

