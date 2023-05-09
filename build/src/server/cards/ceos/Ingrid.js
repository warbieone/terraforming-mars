"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingrid = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const Phase_1 = require("../../../common/Phase");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const BoardType_1 = require("../../boards/BoardType");
class Ingrid extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.INGRID,
            metadata: {
                cardNumber: 'L09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br.br;
                    b.emptyTile('normal').asterix().nbsp.colon().nbsp.plus().cards(1);
                    b.br;
                }),
                description: 'When you take an action that places a tile on Mars THIS GENERATION, draw a card.',
            },
        });
        this.opgActionIsActive = false;
    }
    action() {
        this.isDisabled = true;
        this.opgActionIsActive = true;
        return undefined;
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        if (this.opgActionIsActive === false)
            return;
        if (boardType !== BoardType_1.BoardType.MARS || space.spaceType === SpaceType_1.SpaceType.COLONY)
            return;
        if (cardOwner.id !== activePlayer.id)
            return;
        if (cardOwner.game.phase === Phase_1.Phase.SOLAR)
            return;
        cardOwner.game.defer(new DeferredAction_1.SimpleDeferredAction(cardOwner, () => cardOwner.drawCard()));
    }
}
exports.Ingrid = Ingrid;
