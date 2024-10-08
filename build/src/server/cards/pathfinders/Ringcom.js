"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ringcom = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Ringcom extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.RINGCOM,
            tags: [Tag_1.Tag.JOVIAN],
            startingMegaCredits: 39,
            behavior: {
                production: { megacredits: 3 },
            },
            firstAction: {
                text: 'Draw 2 cards with a Jovian tag',
                drawCard: { count: 2, tag: Tag_1.Tag.JOVIAN },
            },
            metadata: {
                cardNumber: 'PfC4',
                description: 'You start with 39 M€. and 3 M€ production. As your first action, draw 2 cards with a Jovian tag.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(39).production((pb) => pb.megacredits(3));
                    b.cards(2, { secondaryTag: Tag_1.Tag.JOVIAN });
                    b.corpBox('effect', (ce) => {
                        ce.effect('When any player plays a card with a Jovian tag (including this) gain 1 titanium.', (eb) => {
                            eb.tag(Tag_1.Tag.JOVIAN, { all: Options_1.all }).startEffect.titanium(1);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        this.onCardPlayed(player, this);
        return undefined;
    }
    onCorpCardPlayed(player, card) {
        this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (card.tags.includes(Tag_1.Tag.JOVIAN)) {
            player.game.getPlayers().forEach((p) => {
                if (p.isCorporation(this.name)) {
                    p.stock.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                }
            });
        }
    }
}
exports.Ringcom = Ringcom;
