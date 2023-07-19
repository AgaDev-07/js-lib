import { FONTS } from './constants.js';
import { makeRange } from '../util.js';
/** @type {import('../@types/Colors/functions.d.ts').ValidateColor} */
export function ValidateColor(color) {
	return color.startsWith('\x1b[') && color.endsWith('m');
}
/** @type {import('../@types/Colors/functions.d.ts').joinColors} */
export function joinColors(...colors) {
	let foreground = false;
	let background = false;
	let result = FONTS.RESET;
	for (const color of colors) {
		if (!ValidateColor(color)) throw new Error('Invalid color');
		if (color === FONTS.RESET) result = FONTS.RESET;
		else if (color.startsWith('\x1b[38;2;')) foreground = true;
		else if (color.startsWith('\x1b[48;2;')) background = true;
		if (result.includes(color)) continue;
		if (color.startsWith('\x1b[38;2;') && foreground) continue;
		if (color.startsWith('\x1b[48;2;') && background) continue;
		result += color;
	}
	return result;
}

/** @type {import('../@types/Colors/functions.d.ts').colorize} */
export function colorize(text, color, end = FONTS.RESET) {
	if (typeof text !== 'string') throw new Error('Invalid text');
	if (!ValidateColor(color)) throw new Error('Invalid color');
	if (!ValidateColor(end)) throw new Error('Invalid end color');
	if (text.includes(FONTS.RESET)) {
		const parts = text.split(FONTS.RESET);
		return parts.map(part => colorize(part, color, end)).join(FONTS.RESET);
	}
	return `${color}${text}${end}`;
}
const ValidRGB = makeRange(0, 255);
function validateRGB(red, green, blue) {
	if (Array.isArray(red)) return validateRGB(...red);
	red = parseInt(red);
	if (!ValidRGB(red)) throw new Error('Invalid red value');
	green = parseInt(green);
	if (!ValidRGB(green)) throw new Error('Invalid green value');
	blue = parseInt(blue);
	if (!ValidRGB(blue)) throw new Error('Invalid blue value');
	return [red, green, blue];
}

/** @type {typeof import('../@types/Colors/functions.d.ts').rgb} */
export const rgb = function rgb(red, green, blue) {
	const [r, g, b] = validateRGB(red, green, blue);
	return `\x1b[38;2;${r};${g};${b}m`;
}
rgb.background = /**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @returns {Color}
 */ function (red, green, blue) {
	const [r, g, b] = validateRGB(red, green, blue);
	return `\x1b[48;2;${r};${g};${b}m`;
};
/** @type {import('../@types/Colors/functions.d.ts').hexToRGB} */
export function hexToRGB(hex) {
	if (!hex.startsWith('#')) throw new Error('Invalid hex color');
	hex = hex.replace('#', '');
	const LENGTH = hex.length / 3;
	if (LENGTH === 1)
		hex = hex
			.split('')
			.map(x => x + x)
			.join('');
	else if (LENGTH !== 2) throw new Error('Invalid hex color');
	const red = parseInt(hex[0] + hex[1], 16);
	const green = parseInt(hex[2] + hex[3], 16);
	const blue = parseInt(hex[4] + hex[5], 16);
	return [red, green, blue];
}
