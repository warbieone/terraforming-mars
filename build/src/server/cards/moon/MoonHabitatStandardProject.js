"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonHabitatStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const PlaceMoonHabitatTile_1 = require("../../moon/PlaceMoonHabitatTile");
const Resource_1 = require("../../../common/Resource");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MoonHabitatStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor(properties = {
        name: CardName_1.CardName.MOON_HABITAT_STANDARD_PROJECT,
        cost: 22,
        reserveUnits: { titanium: 1 },
        tr: { moonHabitat: 1 },
        tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        metadata: {
            cardNumber: '',
            renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 22 M€ and 1 titanium to place a habitat on The Moon and raise your M€ production 1 step.', (eb) => {
                eb.megacredits(22).titanium(1).startAction.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).production((pb) => pb.megacredits(1));
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
        player.game.defer(new PlaceMoonHabitatTile_1.PlaceMoonHabitatTile(player));
        player.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
    }
}
exports.MoonHabitatStandardProject = MoonHabitatStandardProject;
