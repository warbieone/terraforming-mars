"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallDutyRovers = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Resource_1 = require("../../../common/Resource");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const Card_1 = require("../Card");
class SmallDutyRovers extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SMALL_DUTY_ROVERS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 9,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { logisticsRate: 1 },
            },
            metadata: {
                description: 'Spend 1 titanium. Raise the logistic rate 1 step. Gain 1 M€ per habitat tile, mine tile and road tile on The Moon.',
                cardNumber: 'M73',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).moonLogisticsRate().br;
                    b.megacredits(1).slash()
                        .moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all })
                        .moonMine({ size: Size_1.Size.SMALL, all: Options_1.all })
                        .moonRoad({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
        });
    }
    bespokePlay(player) {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const gain = moonData.moon.spaces.filter((s) => s.tile !== undefined && s.spaceType !== SpaceType_1.SpaceType.COLONY).length;
        player.addResource(Resource_1.Resource.MEGACREDITS, gain, { log: true });
        return undefined;
    }
}
exports.SmallDutyRovers = SmallDutyRovers;
