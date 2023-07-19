import type { LikeNumber, scope } from './types.d.ts';

type operation = string
type equation = `${operation}=${operation}`;

/**
 * Resolves an equation
 *
 * This function is not finished so it may have errors
 */

export default function resolve(
	source: equation | operation,
	scope?: scope
): LikeNumber | LikeNumber[] | scope;
