"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RareEarthElements = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const Board_1 = require("../../boards/Board");
class RareEarthElements extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RARE_EARTH_ELEMENTS,
            cost: 5,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.MARS],
            metadata: {
                cardNumber: 'Pf06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production(((pb) => pb.megacredits(1))).slash().specialTile();
                }),
                description: 'Increase your M€ production by 1 for every special tile you own on Mars.',
            },
        });
    }
    bespokePlay(player) {
        const spaces = player.game.board.spaces
            .filter((0, Board_1.playerTileFn)(player))
            .filter(Board_1.isSpecialTile);
        player.production.add(Resource_1.Resource.MEGACREDITS, spaces.length, { log: true });
        return undefined;
    }
}
exports.RareEarthElements = RareEarthElements;
