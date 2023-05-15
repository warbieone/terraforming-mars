"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aridor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const SelectColony_1 = require("../../inputs/SelectColony");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
class Aridor extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ARIDOR,
            startingMegaCredits: 45,
            type: CardType_1.CardType.CORPORATION,
            initialActionText: 'Add a colony tile',
            metadata: {
                cardNumber: 'R20',
                description: 'You start with 45 M€. As your first action, put an additional Colony Tile of your choice into play',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(45).nbsp.placeColony();
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
        const game = player.game;
        if (game.discardedColonies.length === 0)
            return undefined;
        const selectColony = new SelectColony_1.SelectColony('Aridor first action - Select colony tile to add', 'Add colony tile', game.discardedColonies, (colony) => {
            if (game.discardedColonies.includes(colony)) {
                game.colonies.push(colony);
                game.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
                game.log('${0} added a new Colony tile: ${1}', (b) => b.player(player).colony(colony));
                this.checkActivation(colony, game);
            }
            else {
                throw new Error(`Colony ${colony.name} is not a discarded colony`);
            }
            return undefined;
        });
        selectColony.showTileOnly = true;
        return selectColony;
    }
    checkActivation(colony, game) {
        if (colony.isActive)
            return;
        for (const player of game.getPlayers()) {
            for (const card of player.tableau) {
                const active = ColoniesHandler_1.ColoniesHandler.maybeActivateColony(colony, card);
                if (active) {
                    return;
                }
            }
        }
    }
    onCorpCardPlayed(player, card) {
        return this.onCardPlayed(player, card);
    }
    onCardPlayed(player, card) {
        if (card.type === CardType_1.CardType.EVENT ||
            card.tags.filter((tag) => tag !== Tag_1.Tag.WILD).length === 0 ||
            !player.isCorporation(this.name)) {
            return undefined;
        }
        for (const tag of card.tags.filter((tag) => tag !== Tag_1.Tag.WILD)) {
            const currentSize = this.allTags.size;
            this.allTags.add(tag);
            if (this.allTags.size > currentSize) {
                player.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
            }
        }
        return undefined;
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