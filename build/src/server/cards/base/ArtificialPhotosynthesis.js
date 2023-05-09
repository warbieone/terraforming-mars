"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtificialPhotosynthesis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
class ArtificialPhotosynthesis extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ARTIFICIAL_PHOTOSYNTHESIS,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            metadata: {
                description: 'Increase your plant production 1 step or your energy production 2 steps.',
                cardNumber: '115',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.plants(1).or(Size_1.Size.SMALL).energy(2))),
            },
        });
    }
    bespokePlay(player) {
        const options = new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Increase your energy production 2 steps', 'Increase', () => {
            player.production.add(Resource_1.Resource.ENERGY, 2, { log: true });
            return undefined;
        }), new SelectOption_1.SelectOption('Increase your plant production 1 step', 'Increase', () => {
            player.production.add(Resource_1.Resource.PLANTS, 1, { log: true });
            return undefined;
        }));
        player.defer(options, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        return undefined;
    }
}
exports.ArtificialPhotosynthesis = ArtificialPhotosynthesis;
