"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiTechLab = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const CardRenderer_1 = require("../render/CardRenderer");
class HiTechLab extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.HI_TECH_LAB,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 17,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'X04',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend any amount of energy to draw the same number of cards. TAKE 1 INTO HAND AND DISCARD THE REST.', (eb) => {
                        eb.text('X').energy(1).startAction.text('X').cards(1).asterix();
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.energy > 0;
    }
    action(player) {
        return new SelectAmount_1.SelectAmount('Select amount of energy to spend', 'OK', (amount) => {
            player.deductResource(Resource_1.Resource.ENERGY, amount);
            player.game.log('${0} spent ${1} energy', (b) => b.player(player).number(amount));
            if (amount === 1) {
                player.drawCard();
                return undefined;
            }
            return player.drawCardKeepSome(amount, { keepMax: 1 });
        }, 1, player.energy);
    }
}
exports.HiTechLab = HiTechLab;
