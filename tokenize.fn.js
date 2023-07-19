import { InvalidTokenError } from './Errors.consts.js';
/** @type {import('./@types/tokenize.fn.d.ts').default} */
export default function tokenize(source, options) {
    const tokens = [];
    const lines = source.split(/\r?\n/);
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        for (let col = 0; col < line.length; col++) {
            const char = line[col];
            const token = options.find(option => {
                if (typeof option[0] === 'string')
                    return option[0] === char;
                if (option[0] instanceof RegExp)
                    return option[0].test(char);
            });
            if (token) {
                const v = token[1];
                if (typeof v === 'function') {
                    const [t, i] = v(char, { col, row }, line);
                    if (t)
                        tokens.push(t);
                    col += i;
                    continue;
                }
                tokens.push({ type: v, value: char, col, row });
            }
            else
                throw new InvalidTokenError(`Invalid token ${char}`);
        }
    }
    return tokens;
}
/** @type {import('./@types/tokenize.fn.d.ts').skip} */
export function skip() {
    return [null, 0];
}
