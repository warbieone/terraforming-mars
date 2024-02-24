"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gordon = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Board_1 = require("../../boards/Board");
const GainResources_1 = require("../../deferredActions/GainResources");
const Resource_1 = require("../../../common/Resource");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const BoardType_1 = require("../../boards/BoardType");
const Phase_1 = require("../../../common/Phase");
class Gordon extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.GORDON,
            metadata: {
                cardNumber: 'L07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.greenery().city().colon().megacredits(2).asterix();
                    b.br.br;
                }),
                description: 'Ignore placement restrictions for greenery and city tiles on Mars. Gain 2 M€ when you place a greenery or city tile on Mars.',
            },
        });
    }
    canAct() {
        return false;
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (cardOwner.id !== activePlayer.id)
            return;
        if (boardType !== BoardType_1.BoardType.MARS || space.spaceType !== SpaceType_1.SpaceType.LAND)
            return;
        if (cardOwner.game.phase === Phase_1.Phase.SOLAR)
            return;
        if (Board_1.Board.isCitySpace(space) || Board_1.Board.isGreenerySpace(space)) {
            cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, Resource_1.Resource.MEGACREDITS, { count: 2, log: true }));
        }
        return;
    }
}
exports.Gordon = Gordon;
