"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitatMarte = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class HabitatMarte extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.HABITAT_MARTE,
            tags: [Tag_1.Tag.MARS],
            startingMegaCredits: 40,
            metadata: {
                cardNumber: 'PfC22',
                description: 'You start with 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(40);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Mars tags also count as science tags.', (eb) => {
                            eb.mars(1, { played: Options_1.played }).startEffect.science(1, { played: Options_1.played });
                        });
                    });
                }),
            },
        });
    }
}
exports.HabitatMarte = HabitatMarte;
