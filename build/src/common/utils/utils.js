"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.partition = exports.sum = exports.inplaceRemove = exports.hasIntersection = exports.intersection = exports.range = exports.generateClassString = exports.playerColorClass = void 0;
const playerColorClass = (color, type) => {
    const prefix = {
        shadow: 'player_shadow_color_',
        bg_transparent: 'player_translucent_bg_color_',
        bg: 'player_bg_color_',
    }[type];
    return `${prefix}${color}`;
};
exports.playerColorClass = playerColorClass;
const generateClassString = (classes) => classes.join(' ').trimStart();
exports.generateClassString = generateClassString;
const range = (n) => Array.from(Array(n).keys());
exports.range = range;
function intersection(a, b) {
    return a.filter((e) => b.includes(e));
}
exports.intersection = intersection;
function hasIntersection(a, b) {
    return a.some((e) => b.includes(e));
}
exports.hasIntersection = hasIntersection;
function inplaceRemove(array, element) {
    const idx = array.findIndex((e) => e === element);
    if (idx > -1) {
        array.splice(idx, 1);
    }
}
exports.inplaceRemove = inplaceRemove;
function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}
exports.sum = sum;
function partition(source, predicate) {
    return source.reduce((result, element) => {
        result[predicate(element) ? 0 : 1].push(element);
        return result;
    }, [[], []]);
}
exports.partition = partition;
function zip(first, second) {
    return first.map((e, i) => [e, second[i]]);
}
exports.zip = zip;
