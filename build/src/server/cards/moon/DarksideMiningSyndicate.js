"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarksideMiningSyndicate = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
class DarksideMiningSyndicate extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DARKSIDE_MINING_SYNDICATE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 18,
            tr: { moonMining: 1 },
            metadata: {
                description: 'Increase your titanium production 2 steps, or ' +
                    '1 step if the mining rate is at least 2. And then raise the mining rate 1 step.',
                cardNumber: 'M66',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(2)).or().br;
                    b.moonMiningRate({ amount: 2 }).colon().production((pb) => pb.titanium(1)).br;
                    b.moonMiningRate().br;
                }),
            },
        });
    }
    bespokePlay(player) {
        const productionBonus = (MoonExpansion_1.MoonExpansion.moonData(player.game).miningRate >= 2) ? 1 : 2;
        player.production.add(Resource_1.Resource.TITANIUM, productionBonus, { log: true });
        MoonExpansion_1.MoonExpansion.raiseMiningRate(player);
        return undefined;
    }
}
exports.DarksideMiningSyndicate = DarksideMiningSyndicate;
