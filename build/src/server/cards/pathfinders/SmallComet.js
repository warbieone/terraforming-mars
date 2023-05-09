"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallComet = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
class SmallComet extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SMALL_COMET,
            cost: 32,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.SPACE],
            tr: { temperature: 1, oxygen: 1, oceans: 1 },
            behavior: {
                stock: { titanium: 1 },
                global: { temperature: 1, oxygen: 1 },
                ocean: { on: 'land' },
            },
            metadata: {
                cardNumber: 'Pf37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().plants(2, { all: Options_1.all }).asterix();
                    b.br;
                    b.temperature(1).oxygen(1).oceans(1).asterix();
                    b.br;
                    b.titanium(1);
                }),
                description: 'Every player loses 2 plants. Raise the temperature 1 step. Raise the oxygen 1 step. ' +
                    'Place an ocean ON AN AREA NOT RESERVED FOR OCEAN. Gain 1 titanium.',
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        game.getPlayers().forEach((p) => {
            if (!p.plantsAreProtected()) {
                p.deductResource(Resource_1.Resource.PLANTS, 2, { log: true, from: player });
            }
        });
        return undefined;
    }
}
exports.SmallComet = SmallComet;
