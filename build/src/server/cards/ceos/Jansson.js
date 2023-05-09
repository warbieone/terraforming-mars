"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jansson = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
class Jansson extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.JANSSON,
            metadata: {
                cardNumber: 'L10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().emptyTile().wild(1).asterix();
                }),
                description: 'Once per game, gain all placement bonuses under your tiles on Mars.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const spaces = player.game.board.spaces.filter((space) => space.tile !== undefined && space.player === player);
        spaces.forEach((space) => {
            player.game.grantSpaceBonuses(player, space);
        });
        return undefined;
    }
}
exports.Jansson = Jansson;
