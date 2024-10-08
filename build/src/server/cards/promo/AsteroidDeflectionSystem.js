"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidDeflectionSystem = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class AsteroidDeflectionSystem extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ASTEROID_DEFLECTION_SYSTEM,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH, Tag_1.Tag.BUILDING],
            cost: 13,
            resourceType: CardResource_1.CardResource.ASTEROID,
            victoryPoints: { resourcesHere: {} },
            behavior: {
                production: { energy: -1 },
            },
            metadata: {
                cardNumber: 'X14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('REVEAL AND DISCARD the top card of the deck. If it has a space tag, add an asteroid here.', (eb) => {
                        eb.empty().startAction.cards(1).asterix().nbsp.tag(Tag_1.Tag.SPACE).colon().resource(CardResource_1.CardResource.ASTEROID);
                    }).br;
                    b.production((pb) => pb.minus().energy(1)).text('opponents may not remove your plants', Size_1.Size.SMALL, true);
                }),
                description: {
                    text: 'Decrease your energy production 1 step. 1VP per asteroid on this card.',
                    align: 'left',
                },
            },
        });
    }
    canAct(player) {
        return player.game.projectDeck.canDraw(1);
    }
    action(player) {
        const card = player.game.projectDeck.drawOrThrow(player.game);
        player.game.log('${0} revealed and discarded ${1}', (b) => b.player(player).card(card, { tags: true }));
        if (card.tags.includes(Tag_1.Tag.SPACE)) {
            player.addResourceTo(this, { qty: 1, log: true });
        }
        player.game.projectDeck.discard(card);
        return undefined;
    }
}
exports.AsteroidDeflectionSystem = AsteroidDeflectionSystem;
