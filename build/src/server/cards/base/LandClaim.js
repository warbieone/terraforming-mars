"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandClaim = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const CardName_1 = require("../../../common/cards/CardName");
const LogHelper_1 = require("../../LogHelper");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class LandClaim extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.LAND_CLAIM,
            cost: 1,
            metadata: {
                cardNumber: '066',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Place your marker on a non-reserved area. Only you may place a tile there.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.game.board.getNonReservedLandSpaces().length > 0;
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace('Select space for claim', player.game.board.getNonReservedLandSpaces(), (space) => {
            space.player = player;
            LogHelper_1.LogHelper.logBoardTileAction(player, space, 'land claim');
            return undefined;
        });
    }
}
exports.LandClaim = LandClaim;
