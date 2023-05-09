"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaArchives = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MediaArchives extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MEDIA_ARCHIVES,
            tags: [Tag_1.Tag.EARTH],
            cost: 8,
            metadata: {
                cardNumber: '107',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().event({ played: Options_1.played, all: Options_1.all });
                }),
                description: 'Gain 1 M€ for each event EVER PLAYED by all players.',
            },
        });
    }
    bespokePlay(player) {
        const allPlayedEvents = player.game.getPlayers().map((player) => player.getPlayedEventsCount()).reduce((a, c) => a + c, 0);
        player.addResource(Resource_1.Resource.MEGACREDITS, allPlayedEvents, { log: true });
        return undefined;
    }
}
exports.MediaArchives = MediaArchives;
