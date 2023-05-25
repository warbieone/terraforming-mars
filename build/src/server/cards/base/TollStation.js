"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TollStation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Resource_1 = require("../../../common/Resource");
class TollStation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TOLL_STATION,
            tags: [Tag_1.Tag.SPACE],
            cost: 18,
            metadata: {
                cardNumber: '099',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1).slash().space({ played: Options_1.played, all: Options_1.all }).asterix();
                    });
                }),
                description: 'Increase your M€ production 1 step for each space tag of the OPPONENT who has the most space tags.',
            },
        });
    }
    play(player) {
        if (player.game.isSoloMode()) {
            return undefined;
        }
        const opponentSpaceTagCounts = player.game.getPlayers()
            .filter((aPlayer) => aPlayer !== player)
            .map((opponent) => opponent.tags.count(Tag_1.Tag.SPACE, 'raw'));
        const maxOpponentSpaceTagCount = Math.max(...opponentSpaceTagCounts);
        player.production.add(Resource_1.Resource.MEGACREDITS, maxOpponentSpaceTagCount, { log: true });
        return undefined;
    }
}
exports.TollStation = TollStation;
//# sourceMappingURL=TollStation.js.map