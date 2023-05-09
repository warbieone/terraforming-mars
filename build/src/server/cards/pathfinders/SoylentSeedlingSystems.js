"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoylentSeedlingSystems = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const CardResource_1 = require("../../../common/CardResource");
const Board_1 = require("../../boards/Board");
class SoylentSeedlingSystems extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.PLANT],
            startingMegaCredits: 38,
            resourceType: CardResource_1.CardResource.SEED,
            behavior: {
                addResources: 2,
            },
            metadata: {
                cardNumber: 'PfC8',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(38).seed().seed().br;
                    b.effect('When you place a greenery tile, add 1 seed resource to this card.', (eb) => {
                        eb.greenery().startEffect.seed();
                    }).br;
                    b.effect('When paying for a plant card, or the STANDARD GREENERY PROJECT, seeds here may be used as 5 M€ each.', (eb) => {
                        eb.plants(1, { played: Options_1.played }).slash().greenery(Size_1.Size.MEDIUM).startEffect.seed().equals().megacredits(5);
                    }).br;
                }),
                description: 'You start with 38M€ and 2 seeds on this card.',
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (cardOwner.id !== activePlayer.id) {
            return;
        }
        if (Board_1.Board.isGreenerySpace(space)) {
            cardOwner.addResourceTo(this, { log: true });
        }
    }
}
exports.SoylentSeedlingSystems = SoylentSeedlingSystems;
