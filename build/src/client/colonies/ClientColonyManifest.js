"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColony = exports.allColonyNames = void 0;
const coloniesJson = require("@/genfiles/colonies.json");
const colonies = new Map();
coloniesJson.forEach((colony) => {
    colonies.set(colony.name, colony);
});
function allColonyNames() {
    return colonies.keys();
}
exports.allColonyNames = allColonyNames;
function getColony(name) {
    const metadata = colonies.get(name);
    if (metadata === undefined) {
        throw new Error(`Unknown colony ${name}`);
    }
    return metadata;
}
exports.getColony = getColony;
