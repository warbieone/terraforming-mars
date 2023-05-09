"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMilestoneAwardDescription = exports.allMaNames = void 0;
const maJson = require("@/genfiles/ma.json");
const descriptions = new Map();
maJson.forEach((metadata) => {
    descriptions.set(metadata.name, metadata.description);
});
function allMaNames() {
    return descriptions.keys();
}
exports.allMaNames = allMaNames;
function getMilestoneAwardDescription(name) {
    const description = descriptions.get(name);
    if (description === undefined) {
        throw new Error(`Unknown milestone or award ${name}`);
    }
    return description;
}
exports.getMilestoneAwardDescription = getMilestoneAwardDescription;
