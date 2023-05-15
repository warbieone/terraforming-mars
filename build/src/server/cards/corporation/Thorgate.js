"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thorgate = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
class Thorgate extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.THORGATE,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SCIENCE],
            startingMegaCredits: 40,
            behavior: {
                production: { energy: 1 },
            },
            cardDiscount: { tag: Tag_1.Tag.POWER, amount: 3 },
            metadata: {
                cardNumber: 'R13',
                description: 'You start with 1 energy production and 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.energy(1)).nbsp.megacredits(40);
                    b.corpBox('effect', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.action('Decr. energy prod. gain 6 M€.', (eb) => {
                            eb.production((pb) => pb.energy(1)).startAction.megacredits(6);
                        });
                        ce.vSpace(Size_1.Size.SMALL);
                        ce.effect('When playing a power card OR SP POWER OR TURMOIL KELVINISTS ACTION, you pay 3 M€ less for it.', (eb) => {
                            eb.energy(1).asterix().slash().production((pb) => {
                                pb.energy(1).heat(1);
                            }).asterix().startEffect.megacredits(-3);
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.production.energy >= 1;
    }
    action(player) {
        if (player.production.energy >= 1) {
            return this.getMegacreditsOption(player);
        }
        return undefined;
    }
    getMegacreditsOption(player) {
        player.production.add(Resource_1.Resource.ENERGY, -1, { log: true });
        player.megaCredits += 6;
        player.game.log('${0} decreased energy production 1 step to gain 6 M€', (b) => b.player(player));
        return undefined;
    }
}
exports.Thorgate = Thorgate;
//# sourceMappingURL=Thorgate.js.map