"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neil = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Options_1 = require("../Options");
const Tag_1 = require("../../../common/cards/Tag");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
class Neil extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.NEIL,
            metadata: {
                cardNumber: 'L34',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Gain 1 M€ when any player plays a Moon tag.', (eb) => eb.tag(Tag_1.Tag.MOON, { all: Options_1.all }).startEffect.megacredits(1));
                    b.br.br;
                    b.opgArrow().production((pb) => pb.megacredits(1, { text: '?' })).asterix();
                }),
                description: 'Once per game, increase your M€ production by the value of the LOWEST Moon rate.',
            },
        });
    }
    onCardPlayedFromAnyPlayer(thisCardOwner, _playedCardOwner, card) {
        for (const tag of card.tags) {
            if (tag === Tag_1.Tag.MOON) {
                thisCardOwner.game.getCardPlayerOrThrow(this.name).stock.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
            }
        }
        return undefined;
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        MoonExpansion_1.MoonExpansion.ifMoon(game, (moonData) => {
            const lowestRate = Math.min(moonData.habitatRate, moonData.logisticRate, moonData.miningRate);
            if (lowestRate > 0) {
                player.production.add(Resource_1.Resource.MEGACREDITS, lowestRate, { log: true });
            }
        });
        return undefined;
    }
}
exports.Neil = Neil;
