"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsMaths = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MarsMaths extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.MARS_MATHS,
            tags: [Tag_1.Tag.SCIENCE],
            startingMegaCredits: 40,
            firstAction: {
                text: 'Draw 2 cards',
                drawCard: { count: 2 },
            },
            metadata: {
                cardNumber: 'PfCXX',
                description: 'You start with 40 M€. As your first action, draw 2 cards',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(40).nbsp.cards(2).br;
                    b.effect('At the beginning of the Research phase, you draw 5 cards, but may STILL only buy 4 cards. If you are drafting, keep 2 cards for your first draft.', (eb) => {
                        eb.empty().startEffect.plus().cards(1).asterix();
                    }).br;
                    b.action('Take another two actions this turn.', (eb) => {
                        eb.empty().startAction.colon().nbsp.arrow().arrow();
                    });
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        player.availableActionsThisRound += 2;
        return undefined;
    }
}
exports.MarsMaths = MarsMaths;
