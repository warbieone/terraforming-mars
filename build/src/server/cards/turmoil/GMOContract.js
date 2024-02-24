"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GMOContract = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class GMOContract extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.GMO_CONTRACT,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.SCIENCE],
            cost: 8,
            requirements: { party: PartyName_1.PartyName.GREENS },
            metadata: {
                description: 'Requires that Greens are ruling or that you have 2 delegates there.',
                cardNumber: 'T06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Each time you play a plant, animal or microbe tag, including this, gain 2 M€.', (be) => {
                        be.animals(1, { played: Options_1.played }).slash().plants(1, { played: Options_1.played }).slash().microbes(1, { played: Options_1.played });
                        be.startEffect.megacredits(2);
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        const amount = player.tags.cardTagCount(card, [Tag_1.Tag.ANIMAL, Tag_1.Tag.PLANT, Tag_1.Tag.MICROBE]);
        if (amount > 0) {
            player.defer(() => player.stock.add(Resource_1.Resource.MEGACREDITS, amount * 2, { log: true }));
        }
    }
}
exports.GMOContract = GMOContract;
