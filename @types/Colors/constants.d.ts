export type Color = `\x1b[${string}m`;
export const FONTS: {
	RESET: Color;
	BOLD: Color;
	DIM: Color;
	ITALIC: Color;
	UNDERLINED: Color;
	BLINK: Color;
	REVERSE: Color;
	HIDDEN: Color;
	STRIKETHROUGH: Color;
};

type COLORS =
	| 'BLACK'
	| 'RED'
	| 'GREEN'
	| 'YELLOW'
	| 'BLUE'
	| 'MAGENTA'
	| 'CYAN'
	| 'WHITE';
type BRIGHT_COLORS = `BRIGHT_${Exclude<COLORS, 'GRAY' | 'BLACK'>}` | 'GRAY';
type ALL_COLORS = COLORS | BRIGHT_COLORS;


export type COLORS_OBJECT = Record<ALL_COLORS, Color>;
export const FOREGROUND: COLORS_OBJECT;
export const BACKGROUND: COLORS_OBJECT;