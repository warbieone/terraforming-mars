"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonMineStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonMineTile_1 = require("../../moon/PlaceMoonMineTile");
const Resource_1 = require("../../../common/Resource");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MoonMineStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor(properties = {
        name: CardName_1.CardName.MOON_MINE_STANDARD_PROJECT,
        cost: 20,
        reserveUnits: { titanium: 1 },
        tr: { moonMining: 1 },
        tilesBuilt: [TileType_1.TileType.MOON_MINE],
        metadata: {
            cardNumber: '',
            renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 20 M€ and 1 titanium to place a mine on the moon, raise the mining rate 1 step, and raise steel production 1 step.', (eb) => {
                eb.megacredits(20).titanium(1).startAction.moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).production((pb) => pb.steel(1));
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
        const spaces = moonData.moon.getAvailableSpacesForMine(player);
        if (spaces.length === 0) {
            return false;
        }
        return super.canAct(player);
    }
    actionEssence(player) {
        const adjustedReserveUnits = MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this);
        player.deductUnits(adjustedReserveUnits);
        player.game.defer(new PlaceMoonMineTile_1.PlaceMoonMineTile(player));
        player.production.add(Resource_1.Resource.STEEL, 1, { log: true });
    }
}
exports.MoonMineStandardProject = MoonMineStandardProject;
