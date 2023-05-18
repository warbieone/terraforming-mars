"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutdoorSports = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
const Board_1 = require("../../boards/Board");
class OutdoorSports extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.OUTDOOR_SPORTS,
            cost: 8,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 3 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.cities(1, { all: Options_1.all, text: ' next to' }).oceans(1)),
            metadata: {
                cardNumber: 'X38',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(3);
                    });
                }),
                description: 'Requires any city adjacent to an ocean. Increase your M€ production 2 steps.',
            },
        });
    }
    bespokeCanPlay(player) {
        const board = player.game.board;
        const oceans = board.getOceanSpaces({ upgradedOceans: true, wetlands: true });
        return oceans.some((ocean) => board.getAdjacentSpaces(ocean).some((space) => Board_1.Board.isCitySpace(space)));
    }
}
exports.OutdoorSports = OutdoorSports;
//# sourceMappingURL=OutdoorSports.js.map