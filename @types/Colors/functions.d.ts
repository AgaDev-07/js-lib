import { Base10 } from "../util.d.ts";
import { Color } from "./constants.d.ts";

type Base255STR = Base10 | `${Exclude<Base10, 0>}${Base10}` | `1${Base10}${Base10}` | `2${0 | 1 | 2 | 3 | 4}${Base10}` | `25${0 | 1 | 2 | 3 | 4 | 5}`;
type RGB_ARG = number | Base255STR;
type RGB_RED = RGB_ARG | [RGB_ARG, RGB_ARG, RGB_ARG];

export function ValidateColor(color: string): color is Color;

export function joinColors(...colors: Color[]): Color;
export function colorize(text: string, color: Color, end?: Color): string

export const rgb: ((red: number, green: number, blue: number) => Color) & {
	background: (red: number, green: number, blue: number) => Color;
}

export function hexToRGB(hex: string): [number, number, number]
