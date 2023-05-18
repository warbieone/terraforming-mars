"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedTourismWave = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
class RedTourismWave extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.RED_TOURISM_WAVE,
            type: CardType_1.CardType.EVENT,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.REDS)),
            metadata: {
                cardNumber: 'T12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().emptyTile('normal', { size: Size_1.Size.SMALL }).asterix();
                }),
                description: 'Requires that Reds are ruling or that you have 2 delegates there. Gain 1 M€ from each EMPTY AREA ADJACENT TO YOUR TILES',
            },
        });
    }
    bespokePlay(player) {
        const amount = RedTourismWave.getAdjacentEmptySpacesCount(player);
        player.addResource(Resource_1.Resource.MEGACREDITS, amount);
        return undefined;
    }
    static getAdjacentEmptySpacesCount(player) {
        const board = player.game.board;
        return board.getEmptySpaces().filter((space) => board.getAdjacentSpaces(space).some((adj) => adj.tile !== undefined && adj.player === player)).length;
    }
}
exports.RedTourismWave = RedTourismWave;
//# sourceMappingURL=RedTourismWave.js.map