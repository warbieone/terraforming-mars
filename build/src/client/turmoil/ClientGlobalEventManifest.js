"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalEventOrThrow = exports.getGlobalEvent = exports.allGlobalEventNames = void 0;
const eventJson = require("@/genfiles/events.json");
const events = new Map();
eventJson.forEach((card) => {
    events.set(card.name, card);
});
function allGlobalEventNames() {
    return events.keys();
}
exports.allGlobalEventNames = allGlobalEventNames;
function getGlobalEvent(globalEventName) {
    return events.get(globalEventName);
}
exports.getGlobalEvent = getGlobalEvent;
function getGlobalEventOrThrow(globalEventName) {
    const globalEvent = getGlobalEvent(globalEventName);
    if (globalEvent === undefined) {
        throw new Error(`global event ${globalEventName} not found`);
    }
    return globalEvent;
}
exports.getGlobalEventOrThrow = getGlobalEventOrThrow;
