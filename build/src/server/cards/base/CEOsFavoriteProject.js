"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CEOsFavoriteProject = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class CEOsFavoriteProject extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CEOS_FAVORITE_PROJECT,
            cost: 1,
            behavior: {
                addResourcesToAnyCard: {
                    count: 1,
                    min: 1,
                    mustHaveCard: true,
                    robotCards: true,
                },
            },
            metadata: {
                cardNumber: '149',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.text('Add 1 resource to a card with at least 1 resource on it', Size_1.Size.SMALL, true)),
            },
        });
    }
}
exports.CEOsFavoriteProject = CEOsFavoriteProject;
