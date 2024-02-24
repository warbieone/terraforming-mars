"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirScrappingStandardProjectVariant = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const AirScrappingStandardProject_1 = require("./AirScrappingStandardProject");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class AirScrappingStandardProjectVariant extends AirScrappingStandardProject_1.AirScrappingStandardProject {
    constructor() {
        super({
            name: CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT_VARIANT,
            cost: 15,
            tr: { venus: 1 },
            metadata: {
                cardNumber: 'SP1a',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.standardProject('Spend 15M€, less 1M€ per Venus tag you have, to raise Venus 1 step.', (eb) => {
                        eb.megacredits(15).text('(').megacredits(-1).slash().venus(1, { played: Options_1.played }).text(')').startAction.venus(1);
                    });
                    b.br.text('(max -5M€)', Size_1.Size.SMALL);
                }),
            },
        });
    }
    discount(player) {
        const tagCount = player.tags.count(Tag_1.Tag.VENUS);
        const discount = Math.min(tagCount, 5);
        return discount + super.discount(player);
    }
}
exports.AirScrappingStandardProjectVariant = AirScrappingStandardProjectVariant;
