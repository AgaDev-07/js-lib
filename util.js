/** @type {import("./@types/util.d.ts").makeRange} */
export function makeRange(min, max) {
    return (value) => min <= value && value <= max;
}
/** @type {import("./@types/util.d.ts").exec} */
export function exec(a, b, fn) {
    if (Array.isArray(a) && Array.isArray(b)) {
        const results = [];
        for (let i = 0; i < a.length; i++)
            for (let j = 0; j < b.length; j++)
                results.push(fn(a[i], b[j]));
        return results;
    }
    if (Array.isArray(a)) {
        const results = [];
        for (let i = 0; i < a.length; i++)
            results.push(fn(a[i], b));
        return results;
    }
    if (Array.isArray(b)) {
        const results = [];
        for (let i = 0; i < b.length; i++)
            results.push(fn(a, b[i]));
        return results;
    }
    return fn(a, b);
}
/** @type {import("./@types/util.d.ts").List} */
export const List = {
    concat(array, compare, ...lists) {
        for (let i = 0; i < lists.length; i++)
            List.push(array, compare, ...lists[i]);
        return array;
    },
    push(array, compare, ...lists) {
        for (let i = 0; i < lists.length; i++) {
            const element = lists[i];
            if (!array.find(x => compare(x, element)))
                array.push(element);
        }
        return array;
    },
    toConcat(array, compare, ...lists) {
        const result = [...array];
        List.concat(result, compare, ...lists);
        return result;
    },
    toPush(array, compare, ...lists) {
        const result = [...array];
        List.push(result, compare, ...lists);
        return result;
    }
};
export function getRuntime(){
	// Node.js
	if(globalThis.Buffer) return 'Node.js';
	// Deno
	if(globalThis.Deno) return 'Deno';
	// Bun.js
	if(globalThis.Bun) return 'Bun.js';
	// Browser
	return 'Browser';
}