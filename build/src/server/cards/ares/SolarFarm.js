"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarFarm = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const PlaceTile_1 = require("../../../server/deferredActions/PlaceTile");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
const Units_1 = require("../../../common/Units");
class SolarFarm extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SOLAR_FARM,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 12,
            metadata: {
                cardNumber: 'A17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.energy(1).slash().plants(1);
                    }).asterix().nbsp.tile(TileType_1.TileType.SOLAR_FARM, false, true).br;
                }),
                description: 'Place this tile which grants an ADJACENCY BONUS of 2 energy. Increase your energy production 1 step for each plant resource on the area where you place the tile.',
            },
        });
    }
    bespokeCanPlay(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions).length > 0;
    }
    productionBox(player) {
        const space = player.game.board.getSpaceByTileCard(this.name);
        if (space === undefined) {
            throw new Error('Solar Farm space not found');
        }
        const plantsOnSpace = space.bonus.filter((b) => b === SpaceBonus_1.SpaceBonus.PLANT).length;
        return Units_1.Units.of({ energy: plantsOnSpace });
    }
    bespokePlay(player) {
        player.game.defer(new PlaceTile_1.PlaceTile(player, {
            tile: { tileType: TileType_1.TileType.SOLAR_FARM, card: this.name },
            on: 'land',
            title: (0, MessageBuilder_1.message)('Select space for ${0} tile', (b) => b.card(this)),
            adjacencyBonus: { bonus: [SpaceBonus_1.SpaceBonus.ENERGY, SpaceBonus_1.SpaceBonus.ENERGY] },
        }).andThen(() => {
            player.production.adjust(this.productionBox(player), { log: true });
        }));
        return undefined;
    }
}
exports.SolarFarm = SolarFarm;
