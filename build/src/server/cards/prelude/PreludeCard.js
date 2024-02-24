"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreludeCard = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
class PreludeCard extends Card_1.Card {
    constructor(properties) {
        const startingMegaCredits = properties.startingMegacredits ?? properties.behavior?.stock?.megacredits;
        if (typeof (startingMegaCredits) === 'object') {
            throw new Error('Cannot have a Countable for a Prelude stock MC: ' + properties.name);
        }
        const obj = {
            action: properties.action,
            behavior: properties.behavior,
            type: CardType_1.CardType.PRELUDE,
            name: properties.name,
            tags: properties.tags,
            globalParameterRequirementBonus: properties.globalParameterRequirementBonus,
            metadata: properties.metadata,
            resourceType: properties.resourceType,
            tilesBuilt: properties.tilesBuilt,
            victoryPoints: properties.victoryPoints,
        };
        if (startingMegaCredits !== undefined) {
            obj.startingMegaCredits = startingMegaCredits;
        }
        super(obj);
    }
    get type() {
        return CardType_1.CardType.PRELUDE;
    }
}
exports.PreludeCard = PreludeCard;
