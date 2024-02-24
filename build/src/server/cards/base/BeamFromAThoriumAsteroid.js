"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeamFromAThoriumAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class BeamFromAThoriumAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BEAM_FROM_A_THORIUM_ASTEROID,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE, Tag_1.Tag.POWER],
            cost: 32,
            victoryPoints: 1,
            behavior: {
                production: { heat: 3, energy: 3 },
            },
            requirements: { tag: Tag_1.Tag.JOVIAN },
            metadata: {
                cardNumber: '058',
                description: 'Requires a Jovian tag. Increase your heat production and energy production 3 steps each.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.heat(3).br;
                        pb.energy(3);
                    });
                }),
            },
        });
    }
}
exports.BeamFromAThoriumAsteroid = BeamFromAThoriumAsteroid;
