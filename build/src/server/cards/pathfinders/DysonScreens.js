"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DysonScreens = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const Size_1 = require("../../../common/cards/render/Size");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const ActionCard_1 = require("../ActionCard");
class DysonScreens extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.DYSON_SCREENS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.VENUS, Tag_1.Tag.POWER, Tag_1.Tag.SPACE],
            cost: 28,
            victoryPoints: 1,
            behavior: {
                production: { energy: 2, heat: 2 },
                drawCard: 1,
                global: { temperature: 1 },
                city: { space: SpaceName_1.SpaceName.DYSON_SCREENS },
            },
            action: {
                spend: { titanium: 2 },
                production: { energy: 1, heat: 1 },
            },
            metadata: {
                cardNumber: 'Pf15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Pay 2 titanium to raise your heat and energy production 1 step each.', (ab) => ab.titanium(2, { digit: Options_1.digit }).startAction.production((pb) => pb.heat(1).energy(1))).br;
                    b.temperature(1).cards(1, { size: Size_1.Size.SMALL }).city({ size: Size_1.Size.SMALL }).asterix();
                    b.production((pb) => pb.heat(2, { digit: Options_1.digit }).energy(2, { digit: Options_1.digit }));
                }),
                description: 'Raise the temperature 1 step. Draw a card. Place a city tile ON THE RESERVED AREA. Raise your energy and heat production 2 steps.',
            },
        });
    }
}
exports.DysonScreens = DysonScreens;
