"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = void 0;
var Units;
(function (Units) {
    Units.EMPTY = {
        get megacredits() {
            return 0;
        },
        get steel() {
            return 0;
        },
        get titanium() {
            return 0;
        },
        get plants() {
            return 0;
        },
        get energy() {
            return 0;
        },
        get heat() {
            return 0;
        },
    };
    Units.keys = Object.keys(Units.EMPTY);
    function isUnits(arg) {
        if (typeof arg !== 'object')
            return false;
        return Units.keys.every((key) => typeof arg[key] === 'number' && !isNaN(arg[key]));
    }
    Units.isUnits = isUnits;
    function of(partialUnits) {
        return {
            megacredits: partialUnits.megacredits === undefined ? 0 : partialUnits.megacredits,
            steel: partialUnits.steel === undefined ? 0 : partialUnits.steel,
            titanium: partialUnits.titanium === undefined ? 0 : partialUnits.titanium,
            plants: partialUnits.plants === undefined ? 0 : partialUnits.plants,
            energy: partialUnits.energy === undefined ? 0 : partialUnits.energy,
            heat: partialUnits.heat === undefined ? 0 : partialUnits.heat,
        };
    }
    Units.of = of;
    function negative(units) {
        const neg = (n) => n === 0 ? 0 : -n;
        return {
            megacredits: neg(units.megacredits),
            steel: neg(units.steel),
            titanium: neg(units.titanium),
            plants: neg(units.plants),
            energy: neg(units.energy),
            heat: neg(units.heat),
        };
    }
    Units.negative = negative;
    function isEmpty(u) {
        var _a, _b, _c, _d, _e, _f;
        if (u === undefined)
            return true;
        return ((_a = u.megacredits) !== null && _a !== void 0 ? _a : 0) === 0 &&
            ((_b = u.steel) !== null && _b !== void 0 ? _b : 0) === 0 &&
            ((_c = u.titanium) !== null && _c !== void 0 ? _c : 0) === 0 &&
            ((_d = u.plants) !== null && _d !== void 0 ? _d : 0) === 0 &&
            ((_e = u.energy) !== null && _e !== void 0 ? _e : 0) === 0 &&
            ((_f = u.heat) !== null && _f !== void 0 ? _f : 0) === 0;
    }
    Units.isEmpty = isEmpty;
    function partial(u) {
        const partial = {};
        for (const key of Units.keys) {
            const value = u[key];
            if (value) {
                partial[key] = value;
            }
        }
        return partial;
    }
    Units.partial = partial;
    function values(u) {
        return Units.keys.map((k) => u[k]);
    }
    Units.values = values;
})(Units = exports.Units || (exports.Units = {}));
