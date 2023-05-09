"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonRoadStandardProjectVariant2 = exports.MoonMineStandardProjectVariant2 = exports.MoonHabitatStandardProjectVariant2 = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Units_1 = require("../../../common/Units");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const MoonHabitatStandardProject_1 = require("./MoonHabitatStandardProject");
const MoonMineStandardProject_1 = require("./MoonMineStandardProject");
const MoonRoadStandardProject_1 = require("./MoonRoadStandardProject");
const TileType_1 = require("../../../common/TileType");
class MoonHabitatStandardProjectVariant2 extends MoonHabitatStandardProject_1.MoonHabitatStandardProject {
    constructor() {
        super({
            name: CardName_1.CardName.MOON_HABITAT_STANDARD_PROJECT_V2,
            cost: 26,
            reserveUnits: Units_1.Units.EMPTY,
            tr: { moonHabitat: 1 },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
            metadata: {
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 26 M€ place a habitat on The Moon and raise your M€ production 1 step.', (eb) => {
                    eb.megacredits(26).startAction.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).production((pb) => pb.megacredits(1));
                })),
            },
        });
    }
    canAct(player) {
        return player.game.gameOptions.moonStandardProjectVariant && super.canAct(player);
    }
}
exports.MoonHabitatStandardProjectVariant2 = MoonHabitatStandardProjectVariant2;
class MoonMineStandardProjectVariant2 extends MoonMineStandardProject_1.MoonMineStandardProject {
    constructor() {
        super({
            name: CardName_1.CardName.MOON_MINE_STANDARD_PROJECT_V2,
            cost: 23,
            reserveUnits: Units_1.Units.EMPTY,
            tr: { moonMining: 1 },
            tilesBuilt: [TileType_1.TileType.MOON_MINE],
            metadata: {
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 23 M€ to place a mine on the moon, raise the mining rate 1 step, and raise steel production 1 step.', (eb) => {
                    eb.megacredits(23).startAction.moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).production((pb) => pb.steel(1));
                })),
            },
        });
    }
    canAct(player) {
        return player.game.gameOptions.moonStandardProjectVariant && super.canAct(player);
    }
}
exports.MoonMineStandardProjectVariant2 = MoonMineStandardProjectVariant2;
class MoonRoadStandardProjectVariant2 extends MoonRoadStandardProject_1.MoonRoadStandardProject {
    constructor() {
        super({
            name: CardName_1.CardName.MOON_ROAD_STANDARD_PROJECT_V2,
            cost: 21,
            reserveUnits: Units_1.Units.EMPTY,
            tr: { moonLogistics: 1 },
            tilesBuilt: [TileType_1.TileType.MOON_ROAD],
            metadata: {
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 21 M€ place a road on the moon and raise the Logistics Rate 1 step.', (eb) => {
                    eb.megacredits(21).startAction.moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE });
                })),
            },
        });
    }
    canAct(player) {
        return player.game.gameOptions.moonStandardProjectVariant && super.canAct(player);
    }
}
exports.MoonRoadStandardProjectVariant2 = MoonRoadStandardProjectVariant2;
