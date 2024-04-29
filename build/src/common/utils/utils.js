"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deNull = exports.definedOrThrow = exports.asArray = exports.zip = exports.partition = exports.sum = exports.inplaceRemoveIf = exports.inplaceRemove = exports.twoWayDifference = exports.oneWayDifference = exports.hasIntersection = exports.intersection = exports.range = exports.playerColorClass = void 0;
const playerColorClass = (color, type) => {
    const prefix = {
        shadow: 'player_shadow_color_',
        bg_transparent: 'player_translucent_bg_color_',
        bg: 'player_bg_color_',
    }[type];
    return `${prefix}${color}`;
};
exports.playerColorClass = playerColorClass;
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
function oneWayDifference(a, b) {
    return a.filter((e) => !b.includes(e));
}
exports.oneWayDifference = oneWayDifference;
function twoWayDifference(a, b) {
    return a
        .filter((x) => !b.includes(x))
        .concat(b.filter((x) => !a.includes(x)));
}
exports.twoWayDifference = twoWayDifference;
function inplaceRemove(array, element) {
    return inplaceRemoveIf(array, (e) => e === element) !== undefined;
}
exports.inplaceRemove = inplaceRemove;
function inplaceRemoveIf(array, predicate) {
    const idx = array.findIndex(predicate);
    if (idx === -1) {
        return undefined;
    }
    const element = array[idx];
    array.splice(idx, 1);
    return element;
}
exports.inplaceRemoveIf = inplaceRemoveIf;
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
function asArray(elem) {
    return Array.isArray(elem) ? elem : [elem];
}
exports.asArray = asArray;
function definedOrThrow(obj) {
    if (obj === undefined) {
        throw new Error('object is undefined');
    }
    return obj;
}
exports.definedOrThrow = definedOrThrow;
function deNull(array) {
    const output = [];
    for (const elem of array) {
        if (elem !== undefined) {
            output.push(elem);
        }
    }
    return output;
}
exports.deNull = deNull;
