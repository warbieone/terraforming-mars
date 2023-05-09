"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonRoadStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonRoadTile_1 = require("../../moon/PlaceMoonRoadTile");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MoonRoadStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor(properties = {
        name: CardName_1.CardName.MOON_ROAD_STANDARD_PROJECT,
        cost: 18,
        reserveUnits: { steel: 1 },
        tr: { moonLogistics: 1 },
        tilesBuilt: [TileType_1.TileType.MOON_ROAD],
        metadata: {
            cardNumber: '',
            renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 18 M€ and 1 steel to place a road on the moon and raise the Logistics Rate 1 step.', (eb) => {
                eb.megacredits(18).steel(1).startAction.moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE });
            })),
        },
    }) {
        super(properties);
    }
    discount(player) {
        if (player.playedCards.find((card) => card.name === CardName_1.CardName.MOONCRATE_BLOCK_FACTORY)) {
            return 4;
        }
        return super.discount(player);
    }
    canAct(player) {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
        const spaces = moonData.moon.getAvailableSpacesOnLand(player);
        if (spaces.length === 0) {
            return false;
        }
        return super.canAct(player);
    }
    actionEssence(player) {
        const adjustedReserveUnits = MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this);
        player.deductUnits(adjustedReserveUnits);
        player.game.defer(new PlaceMoonRoadTile_1.PlaceMoonRoadTile(player));
    }
}
exports.MoonRoadStandardProject = MoonRoadStandardProject;
