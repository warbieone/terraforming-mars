"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DustStorm = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class DustStorm extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DUST_STORM,
            cost: 17,
            tags: [Tag_1.Tag.MARS],
            behavior: {
                global: { temperature: 2 },
            },
            metadata: {
                cardNumber: 'Pf08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().energy(1, { all: Options_1.all }).asterix();
                    b.br;
                    b.temperature(2);
                }),
                description: 'Every player loses all energy. Raise the temperature 2 steps.',
            },
        });
    }
    bespokePlay(player) {
        player.game.getPlayers().forEach((p) => p.deductResource(Resource_1.Resource.ENERGY, p.energy, { log: true }));
        return undefined;
    }
}
exports.DustStorm = DustStorm;
