"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aurorai = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const Priority_1 = require("../../deferredActions/Priority");
class Aurorai extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.AURORAI,
            tags: [Tag_1.Tag.MARS],
            startingMegaCredits: 33,
            resourceType: CardResource_1.CardResource.DATA,
            behavior: {
                addResources: 2,
            },
            metadata: {
                cardNumber: 'PfC9',
                description: 'You start with 33 M€. and 2 data on this card',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(33).data({ amount: 2 }).br;
                    b.effect('Whenever you increase your terraform rating, add 1 data per step to ANY card.', (eb) => {
                        eb.tr(1).startEffect.data().asterix();
                    }).br;
                    b.effect('You can use data on this card as 3M€ each to pay for standard projects.', (eb) => {
                        eb.data().startEffect.megacredits(3).asterix().text('standard project');
                    });
                }),
            },
        });
    }
    onIncreaseTerraformRating(player, cardOwner, steps) {
        if (player === cardOwner) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.DATA, { count: steps }), Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
    }
}
exports.Aurorai = Aurorai;
