"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleManifest = exports.CardManifest = void 0;
var CardManifest;
(function (CardManifest) {
    function keys(manifest) {
        return Object.keys(manifest);
    }
    CardManifest.keys = keys;
    function values(manifest) {
        return Object.values(manifest);
    }
    CardManifest.values = values;
    function entries(manifest) {
        return keys(manifest).map((key) => {
            const value = manifest[key];
            if (value === undefined) {
                throw new Error(`Manifest has key ${key} but no entry.`);
            }
            return [key, value];
        });
    }
    CardManifest.entries = entries;
})(CardManifest = exports.CardManifest || (exports.CardManifest = {}));
class ModuleManifest {
    constructor(arg) {
        this.module = arg.module;
        this.projectCards = arg.projectCards || {};
        this.cardsToRemove = new Set(arg.cardsToRemove || []);
        this.corporationCards = arg.corporationCards || {};
        this.preludeCards = arg.preludeCards || {};
        this.ceoCards = arg.ceoCards || {};
        this.standardProjects = arg.standardProjects || {};
        this.standardActions = arg.standardActions || {};
    }
}
exports.ModuleManifest = ModuleManifest;
