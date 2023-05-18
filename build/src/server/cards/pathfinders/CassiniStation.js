"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CassiniStation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
const SelectCard_1 = require("../../inputs/SelectCard");
class CassiniStation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CASSINI_STATION,
            cost: 23,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            metadata: {
                cardNumber: 'Pf62',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).slash().colonies(1, { all: Options_1.all })).br;
                    b.floaters(2).asterix().or().br;
                    b.data({ amount: 3 }).asterix();
                }),
                description: 'Increase your energy production 1 step for every colony in play. ' +
                    'Add 2 floaters to ANY card OR add 3 data to ANY card.',
            },
        });
    }
    bespokePlay(player) {
        let coloniesCount = 0;
        player.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.length;
        });
        player.production.add(Resource_1.Resource.ENERGY, coloniesCount, { log: true });
        const cards = [
            ...player.getResourceCards(CardResource_1.CardResource.FLOATER),
            ...player.getResourceCards(CardResource_1.CardResource.DATA),
        ];
        if (cards.length === 0) {
            return undefined;
        }
        const input = new SelectCard_1.SelectCard('Select card to gain 2 floaters or 3 data', 'Add resources', cards, (selected) => {
            const card = selected[0];
            if (card.resourceType === CardResource_1.CardResource.FLOATER) {
                player.addResourceTo(card, { qty: 2, log: true });
            }
            else {
                player.addResourceTo(card, { qty: 3, log: true });
            }
            return undefined;
        });
        if (cards.length === 1) {
            input.cb(cards);
            return undefined;
        }
        return input;
    }
}
exports.CassiniStation = CassiniStation;
//# sourceMappingURL=CassiniStation.js.map