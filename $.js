// @ts-check

/**
 * @typedef {{
 *  element: Element;
 *  css: ((property: string, value: string) => ThisType) | ((property: object) => ThisType);
 *  on<K extends keyof HTMLElementEventMap>(event: K, callback: (event: HTMLElementEventMap[K]) => void): ThisType;
 *  html: (data?: string) => string;
 *  text: (data?: string) => string;
 * }} Query
 * @typedef { Query & {
 * 	forEach: (item: Query, index: number, list: QueryList) => void;
 * 	[key:number]: Query
 * 	[Symbol.iterator]: () => IterableIterator<Query>;
 * }} QueryList
*/

/**
 * @param {string | HTMLElement} node
 * @returns {QueryList}
 */
export function $(node) {
	let elements = [];
	if (typeof node === 'string') elements.push(...document.querySelectorAll(node));
	if (node instanceof HTMLElement) elements.push(node);

	// @ts-ignore
	let query = new Proxy(elements.map($.ƒ), {
		get(target, property) {
			if (property == Symbol.iterator) return target[Symbol.iterator];
			if (Number(property) == Number(property)) target[property];
			if (property == 'forEach')
				return callback => {
					target.forEach(callback);
					return query;
				};
			return (...args) => {
				target.forEach(q => {
					q[property](...args);
				});
				return query;
			};
		},
	});

	return query;
}
/**
 *
 * @param {HTMLElement} element
 * @returns {Query}
 */
$.ƒ = function (element) {
	let query = null;
	let _ =
		fn =>
		(...args) =>
			fn(...args) || query;
	query = new Proxy(element, {
		get(target, property) {
			console.log(property);
			if (property == 'forEach') return;
			if (property == 'element') {
				return target;
			}
			if (property == 'css') {
				return _((property, value) => {
					if (typeof property === 'string') target.style[property] = value;
					else if (typeof property === 'object')
						Object.entries(property).forEach(([property, value]) => {
							target.style[property] = value;
						});
				});
			}
			if (property == 'on') {
				return _((event, callback) => {
					target.addEventListener(event, callback);
				});
			}
			if (property == 'html') {
				return _(data => {
					target.innerHTML = data;
					return target.innerHTML;
				});
			}
			if (property == 'text') {
				return _(data => {
					target.innerText = data;
					return target.innerText;
				});
			}
			return _(callback => {
				query.on(property, (...args) => {
					callback(query, ...args);
				});
			});
		},
	});
	// @ts-ignore
	return query;
};
