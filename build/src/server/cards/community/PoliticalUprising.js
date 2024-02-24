"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticalUprising = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const TurmoilCardManifest_1 = require("../turmoil/TurmoilCardManifest");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const ModuleManifest_1 = require("../ModuleManifest");
class PoliticalUprising extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.POLITICAL_UPRISING,
            behavior: {
                turmoil: { sendDelegates: { count: 4, manyParties: true } },
            },
            metadata: {
                cardNumber: 'Y03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.delegates(4).br.br;
                    b.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.TURMOIL });
                }),
                description: 'Place 4 delegates in any parties. Draw a Turmoil card.',
            },
        });
    }
    bespokePlay(player) {
        this.drawTurmoilCard(player);
        return undefined;
    }
    drawTurmoilCard(player) {
        const turmoilCardNames = ModuleManifest_1.CardManifest.keys(TurmoilCardManifest_1.TURMOIL_CARD_MANIFEST.projectCards);
        const drawnCard = player.game.projectDeck.drawPile.find((card) => turmoilCardNames.includes(card.name));
        if (drawnCard === undefined) {
            player.game.log('${0} played ${1} to find a Turmoil card but none were in the draw deck.', (b) => b.player(player).card(this));
        }
        else {
            const cardIndex = player.game.projectDeck.drawPile.findIndex((c) => c.name === drawnCard.name);
            player.game.projectDeck.drawPile.splice(cardIndex, 1);
            player.cardsInHand.push(drawnCard);
            player.game.log('${0} drew ${1}', (b) => b.player(player).card(drawnCard));
        }
        return undefined;
    }
}
exports.PoliticalUprising = PoliticalUprising;
