/** @type {import('../@types/Geometry/quadrate.d.ts').makeQuadrate} */
export function makeQuadrate(d) {
    const figure = [];
    for (let i = 0; i <= d; i++) {
        figure.push([i, 0]);
        figure.push([0, i]);
        figure.push([i, d]);
        figure.push([d, i]);
    }
    return figure;
}
