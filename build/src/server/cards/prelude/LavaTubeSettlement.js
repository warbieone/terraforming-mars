"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaTubeSettlement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const BoardName_1 = require("../../../common/boards/BoardName");
const PlaceCityTile_1 = require("../../deferredActions/PlaceCityTile");
const CardRenderer_1 = require("../render/CardRenderer");
class LavaTubeSettlement extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LAVA_TUBE_SETTLEMENT,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            cost: 15,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            metadata: {
                cardNumber: 'P37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(2);
                    }).br;
                    b.city().asterix();
                }),
                description: 'Decrease your energy production 1 step and increase your M€ production 2 steps. Place a city tile on a VOLCANIC AREA regardless of adjacent cities.',
            },
        });
    }
    getSpacesForCity(player) {
        if (player.game.gameOptions.boardName === BoardName_1.BoardName.HELLAS) {
            return player.game.board.getAvailableSpacesForType(player, 'city');
        }
        return player.game.board.getAvailableSpacesForType(player, 'volcanic');
    }
    bespokeCanPlay(player) {
        return this.getSpacesForCity(player).length > 0 && player.production.energy >= 1;
    }
    bespokePlay(player) {
        player.game.defer(new PlaceCityTile_1.PlaceCityTile(player, {
            spaces: this.getSpacesForCity(player),
            title: 'Select either Tharsis Tholus, Ascraeus Mons, Pavonis Mons or Arsia Mons',
        }));
        return undefined;
    }
}
exports.LavaTubeSettlement = LavaTubeSettlement;
