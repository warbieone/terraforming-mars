"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StormCraftIncorporated = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class StormCraftIncorporated extends CorporationCard_1.ActiveCorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.STORMCRAFT_INCORPORATED,
            tags: [Tag_1.Tag.JOVIAN],
            startingMegaCredits: 48,
            victoryPoints: { tag: Tag_1.Tag.JOVIAN, per: 2 },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 1, autoSelect: true },
            },
            metadata: {
                cardNumber: 'R29',
                description: 'You start with 48 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(48);
                    b.corpBox('action', (ce) => {
                        ce.action('Add a floater to ANY card.', (eb) => {
                            eb.empty().startAction.resource(CardResource_1.CardResource.FLOATER).asterix();
                        });
                    });
                }),
            },
        });
    }
}
exports.StormCraftIncorporated = StormCraftIncorporated;
