"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aridor = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
class Aridor extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.ARIDOR,
            startingMegaCredits: 45,
            initialActionText: 'Add a colony tile',
            metadata: {
                cardNumber: 'R20',
                description: 'You start with 45 M€. As your first action, put an additional Colony Tile of your choice into play',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(45).nbsp.colonyTile();
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you get a new type of tag in play [event cards do not count], increase your M€ production 1 step.', (eb) => {
                            eb.diverseTag().startEffect.production((pb) => pb.megacredits(1));
                        });
                    });
                }),
            },
        });
        this.allTags = new Set();
    }
    initialAction(player) {
        ColoniesHandler_1.ColoniesHandler.addColonyTile(player, { title: 'Aridor first action - Select colony tile to add' });
        return undefined;
    }
    onCorpCardPlayed(player, card) {
        return this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (card.type === CardType_1.CardType.EVENT ||
            card.tags.filter((tag) => tag !== Tag_1.Tag.WILD).length === 0 ||
            !player.isCorporation(this.name)) {
            return;
        }
        for (const tag of card.tags.filter((tag) => tag !== Tag_1.Tag.WILD)) {
            const currentSize = this.allTags.size;
            this.allTags.add(tag);
            if (this.allTags.size > currentSize) {
                player.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
            }
        }
    }
    serialize(serialized) {
        serialized.allTags = Array.from(this.allTags);
    }
    deserialize(serialized) {
        this.allTags = new Set(serialized.allTags);
    }
}
exports.Aridor = Aridor;
//# sourceMappingURL=Aridor.js.map