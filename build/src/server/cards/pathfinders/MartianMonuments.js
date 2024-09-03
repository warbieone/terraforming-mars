"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianMonuments = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Board_1 = require("../../boards/Board");
const SpaceType_1 = require("../../../common/boards/SpaceType");
class MartianMonuments extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MARTIAN_MONUMENTS,
            cost: 10,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.BUILDING],
            requirements: { cities: 1, text: 'ON MARS' },
            behavior: {
                production: { megacredits: { tag: Tag_1.Tag.MARS } },
            },
            metadata: {
                cardNumber: 'Pf09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production(((pb) => pb.megacredits(1))).slash().tag(Tag_1.Tag.MARS);
                }),
                description: 'Requires that you own a city ON MARS. Raise your M€ production 1 step for every Mars tag you own (including this.)',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.game.board.spaces.some((space) => {
            return Board_1.Board.isCitySpace(space) && space.player?.id === player.id && space.spaceType !== SpaceType_1.SpaceType.COLONY;
        });
    }
}
exports.MartianMonuments = MartianMonuments;
