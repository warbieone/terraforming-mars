"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoctisCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class NoctisCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.NOCTIS_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 18,
            behavior: {
                production: { energy: -1, megacredits: 3 },
            },
            metadata: {
                cardNumber: '017',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).nbsp.city().asterix();
                }),
                description: 'Decrease your energy production 1 step and increase your M€ production 3 steps. Place a city tile ON THE RESERVED AREA, disregarding normal placement restrictions.',
            },
        });
    }
    bespokeCanPlay(player) {
        if (player.game.board.getNoctisCitySpaceId !== undefined) {
            return true;
        }
        else {
            return player.game.board.getAvailableSpacesForCity(player).length > 0;
        }
    }
    bespokePlay(player) {
        const noctisCitySpaceId = player.game.board.getNoctisCitySpaceId();
        if (noctisCitySpaceId !== undefined) {
            const space = player.game.board.getSpace(noctisCitySpaceId);
            player.game.addCityTile(player, space);
            return undefined;
        }
        return new SelectSpace_1.SelectSpace('Select space for Noctis city', player.game.board.getAvailableSpacesForCity(player), (space) => {
            player.game.addCityTile(player, space);
            return undefined;
        });
    }
}
exports.NoctisCity = NoctisCity;
//# sourceMappingURL=NoctisCity.js.map