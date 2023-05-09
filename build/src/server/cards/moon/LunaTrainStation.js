"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaTrainStation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class LunaTrainStation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_TRAIN_STATION,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 20,
            reserveUnits: { steel: 2 },
            victoryPoints: 'special',
            behavior: {
                production: { megacredits: 4 },
                moon: {
                    tile: { type: TileType_1.TileType.LUNA_TRAIN_STATION, title: 'Select a space for Luna Train Station.' },
                    logisticsRate: 1,
                },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.logisticRate(5)),
            metadata: {
                description: 'Requires a logistic rate of 5 or higher. Spend 2 steel. ' +
                    'Increase your M€ production 4 steps. Place this tile on The Moon and raise the logistic rate 1 step. ' +
                    '2 VP FOR EACH ROAD TILE ADJACENT TO THIS TILE.',
                cardNumber: 'M15',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().steel(2, { digit: Options_1.digit });
                    b.production((pb) => pb.megacredits(4));
                    b.tile(TileType_1.TileType.LUNA_TRAIN_STATION, true).moonLogisticsRate();
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.moonRoadTile(2, true),
            },
        });
    }
    getVictoryPoints(player) {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const usedSpace = moonData.moon.getSpaceByTileCard(this.name);
        if (usedSpace !== undefined) {
            const adjacentSpaces = moonData.moon.getAdjacentSpaces(usedSpace);
            const adjacentMines = adjacentSpaces.filter((s) => MoonExpansion_1.MoonExpansion.spaceHasType(s, TileType_1.TileType.MOON_ROAD));
            return 2 * adjacentMines.length;
        }
        return 0;
    }
}
exports.LunaTrainStation = LunaTrainStation;
