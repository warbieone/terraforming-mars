"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Xu = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Options_1 = require("../Options");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const utils_1 = require("../../../common/utils/utils");
class Xu extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.XU,
            tags: [Tag_1.Tag.VENUS],
            metadata: {
                cardNumber: 'L37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().venus(1, { played: Options_1.played, all: Options_1.all }).colon().megacredits(2).megacredits(8).asterix();
                    b.br.br;
                }),
                description: 'Once per game, gain 2 M€ for each Venus tag in play. Gain an additional 8 M€ if you have the most Venus tags in play.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const players = player.game.getPlayers();
        const counts = players.map((p) => p.tags.count(Tag_1.Tag.VENUS, player.id === p.id ? 'default' : 'raw'));
        const total = (0, utils_1.sum)(counts);
        player.addResource(Resource_1.Resource.MEGACREDITS, total * 2, { log: true });
        const maxPlayerVenusTagCount = Math.max(...counts);
        if (maxPlayerVenusTagCount === player.tags.count(Tag_1.Tag.VENUS)) {
            player.addResource(Resource_1.Resource.MEGACREDITS, 8, { log: true });
        }
        return undefined;
    }
}
exports.Xu = Xu;
