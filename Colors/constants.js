/** @type {typeof import('../@types/Colors/constants.d.ts').FONTS} */
export const FONTS = {
    RESET: '\x1b[0m',
    BOLD: '\x1b[1m',
    DIM: '\x1b[2m',
    ITALIC: '\x1b[3m',
    UNDERLINED: '\x1b[4m',
    BLINK: '\x1b[5m',
    REVERSE: '\x1b[7m',
    HIDDEN: '\x1b[8m',
    STRIKETHROUGH: '\x1b[9m',
};
/** @type {import('../@types/Colors/constants.d.ts').COLORS_OBJECT} */
export const FOREGROUND = {};
/** @type {import('../@types/Colors/constants.d.ts').COLORS_OBJECT} */
export const BACKGROUND = {};

const Colors = ['BLACK', 'RED', 'GREEN', 'YELLOW', 'BLUE', 'MAGENTA', 'CYAN', 'WHITE'];
for (const color of Colors) {
    FOREGROUND[color] = `\x1b[${30 + Colors.indexOf(color)}m`;
    BACKGROUND[color] = `\x1b[${40 + Colors.indexOf(color)}m`;
    const brightColor = color === 'BLACK' ? 'GRAY' : `BRIGHT_${color}`;
    FOREGROUND[brightColor] = `\x1b[${90 + Colors.indexOf(color)}m`;
    BACKGROUND[brightColor] = `\x1b[${100 + Colors.indexOf(color)}m`;
}
