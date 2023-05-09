"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalEventModel = exports.getGlobalEventOrThrow = exports.getGlobalEvent = exports.allGlobalEventNames = void 0;
const PartyName_1 = require("@/common/turmoil/PartyName");
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
function getGlobalEventModel(globalEventName) {
    const globalEvent = getGlobalEvent(globalEventName);
    if (globalEvent) {
        return {
            name: globalEvent.name,
            description: globalEvent.description,
            revealed: globalEvent.revealedDelegate,
            current: globalEvent.currentDelegate,
        };
    }
    return {
        name: globalEventName,
        description: 'global event not found',
        revealed: PartyName_1.PartyName.GREENS,
        current: PartyName_1.PartyName.GREENS,
    };
}
exports.getGlobalEventModel = getGlobalEventModel;
