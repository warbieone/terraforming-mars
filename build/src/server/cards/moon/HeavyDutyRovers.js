"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeavyDutyRovers = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class HeavyDutyRovers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HEAVY_DUTY_ROVERS,
            cost: 12,
            behavior: {
                moon: { logisticsRate: 1 },
            },
            metadata: {
                description: 'Gain 4 M€ for each mining tile adjacent to a road tile. Raise the logistic rate 1 step.',
                cardNumber: 'M39',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(4).slash().moonRoad({ size: Size_1.Size.SMALL, all: Options_1.all })
                        .moonMine({ size: Size_1.Size.SMALL, all: Options_1.all });
                    b.br;
                    b.moonLogisticsRate({ size: Size_1.Size.SMALL });
                }),
            },
        });
    }
    bespokePlay(player) {
        MoonExpansion_1.MoonExpansion.ifMoon(player.game, (moonData) => {
            const mines = MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE);
            const minesNextToRoads = mines.filter((mine) => {
                const spacesNextToMine = moonData.moon.getAdjacentSpaces(mine);
                const firstRoad = spacesNextToMine.find((s) => MoonExpansion_1.MoonExpansion.spaceHasType(s, TileType_1.TileType.MOON_ROAD));
                return firstRoad !== undefined;
            });
            const count = minesNextToRoads.length;
            player.addResource(Resource_1.Resource.MEGACREDITS, count * 4, { log: true });
        });
        return undefined;
    }
}
exports.HeavyDutyRovers = HeavyDutyRovers;
