"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitrogenRichAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class NitrogenRichAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.NITROGEN_RICH_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 31,
            behavior: {
                global: { temperature: 1 },
                tr: 2,
            },
            metadata: {
                cardNumber: '037',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(1).nbsp.or().br;
                        pb.plants(3, { played: Options_1.played, digit: Options_1.digit }).colon().nbsp.plants(4, { digit: Options_1.digit });
                    }).br;
                    b.tr(2).temperature(1);
                }),
                description: 'Raise your terraforming rating 2 steps and temperature 1 step. Increase your plant production 1 step, or 4 steps if you have 3 plant tags.',
            },
        });
    }
    bespokePlay(player) {
        if (player.tags.count(Tag_1.Tag.PLANT) < 3) {
            player.production.add(Resource_1.Resource.PLANTS, 1, { log: true });
        }
        else {
            player.production.add(Resource_1.Resource.PLANTS, 4, { log: true });
        }
        return undefined;
    }
}
exports.NitrogenRichAsteroid = NitrogenRichAsteroid;
