import { FOREGROUND, colorize } from "./Colors/index.js";

export const DenoSymbol = Symbol.for('Deno.customInspect');
export const NodeSymbol = Symbol.for('nodejs.util.inspect.custom');

export default class Inspecteable {
    toConsoleColor = FOREGROUND.MAGENTA;
    toConsole() {
        return colorize(this.toString(), this.toConsoleColor);
    }
    [DenoSymbol]() {
        return this.toConsole();
    }
    [NodeSymbol]() {
        return this.toConsole();
    }
}
