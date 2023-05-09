"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaturnSystems = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class SaturnSystems extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.SATURN_SYSTEMS,
            tags: [Tag_1.Tag.JOVIAN],
            startingMegaCredits: 42,
            behavior: {
                production: { titanium: 1, megacredits: 1 },
            },
            metadata: {
                cardNumber: 'R03',
                description: 'You start with 1 titanium production and 42 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.titanium(1)).nbsp.megacredits(42);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each time any Jovian tag is put into play, including this, increase your M€ production 1 step.', (eb) => {
                            eb.jovian({ played: Options_1.played, all: Options_1.all }).startEffect.production((pb) => pb.megacredits(1));
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        this._onCardPlayed(player, card);
    }
    onCorpCardPlayed(player, card) {
        this._onCardPlayed(player, card);
        return undefined;
    }
    _onCardPlayed(player, card) {
        for (const tag of card.tags) {
            if (tag === Tag_1.Tag.JOVIAN) {
                player.game.getCardPlayerOrThrow(this.name).production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
            }
        }
    }
}
exports.SaturnSystems = SaturnSystems;
