import { Color } from '../Colors/constants.d.ts';
import { figure } from './types.d.ts';

export function toString(
	figure: figure,
	char: string,
	foreground?: Color,
	background?: Color,
	...othersColors: Color[]
): string;
