"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarStorm = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const RemoveResourcesFromCard_1 = require("../../deferredActions/RemoveResourcesFromCard");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
class SolarStorm extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SOLAR_STORM,
            cost: 12,
            tags: [Tag_1.Tag.SPACE],
            behavior: {
                production: { heat: 1 },
                global: { temperature: 1 },
            },
            metadata: {
                cardNumber: 'Pf32',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().plants(2, { all: Options_1.all }).asterix().nbsp.minus().data({ amount: 3, digit: Options_1.digit, all: Options_1.all }).br;
                    b.production((pb) => pb.heat(1)).nbsp.temperature(1);
                }),
                description: 'Every player loses 2 plants. Remove up to 3 data from any player. ' +
                    'Raise your heat production 1 step. Raise the temperature 1 step.',
            },
        });
    }
    bespokePlay(player) {
        for (const p of player.game.getPlayers()) {
            if (!p.plantsAreProtected()) {
                if (p.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
                    p.deductResource(Resource_1.Resource.PLANTS, 1, { log: true, from: player });
                }
                else {
                    p.deductResource(Resource_1.Resource.PLANTS, 2, { log: true, from: player });
                }
            }
        }
        player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, CardResource_1.CardResource.DATA, 3, false, false));
        return undefined;
    }
}
exports.SolarStorm = SolarStorm;
