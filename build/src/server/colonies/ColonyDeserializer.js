"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColonyDeserializer = void 0;
const ColonyManifest_1 = require("./ColonyManifest");
class ColonyDeserializer {
    static deserialize(serialized) {
        const name = typeof (serialized) === 'string' ? serialized : serialized.name;
        const factory = ColonyManifest_1.ALL_COLONIES_TILES.find((cf) => cf.colonyName === name);
        if (factory === undefined) {
            console.warn(`colony ${name} not found`);
            return undefined;
        }
        const colony = new factory.Factory();
        if (typeof (serialized) !== 'string') {
            colony.colonies = serialized.colonies;
            colony.isActive = serialized.isActive;
            colony.trackPosition = serialized.trackPosition;
            colony.visitor = serialized.visitor;
        }
        return colony;
    }
    static deserializeAndFilter(serialized) {
        const colonies = serialized.map((c) => this.deserialize(c)).filter((c) => c !== undefined);
        return colonies;
    }
}
exports.ColonyDeserializer = ColonyDeserializer;
