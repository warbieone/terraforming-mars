"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoboticWorkforce = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const RoboticWorkforceBase_1 = require("./RoboticWorkforceBase");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class RoboticWorkforce extends RoboticWorkforceBase_1.RoboticWorkforceBase {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ROBOTIC_WORKFORCE,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            metadata: {
                cardNumber: '086',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Copy A', Size_1.Size.SMALL, true).nbsp;
                    b.production((pb) => pb.building(1, { played: Options_1.played }));
                }),
                description: 'Duplicate only the production box of one of your building cards.',
            },
        });
    }
    bespokePlay(player) {
        return this.selectBuildingCard(player, this.getPlayableBuildingCards(player), 'Select builder card to copy');
    }
}
exports.RoboticWorkforce = RoboticWorkforce;
//# sourceMappingURL=RoboticWorkforce.js.map