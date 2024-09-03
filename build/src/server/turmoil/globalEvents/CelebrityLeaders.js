"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CelebrityLeaders = void 0;
const GlobalEvent_1 = require("./GlobalEvent");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const Resource_1 = require("../../../common/Resource");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Tag_1 = require("../../../common/cards/Tag");
const RENDER_DATA = CardRenderer_1.CardRenderer.builder((b) => {
    b.megacredits(2).slash().tag(Tag_1.Tag.EVENT).influence({ size: Size_1.Size.SMALL });
});
class CelebrityLeaders extends GlobalEvent_1.GlobalEvent {
    constructor() {
        super({
            name: GlobalEventName_1.GlobalEventName.CELEBRITY_LEADERS,
            description: 'Gain 2 M€ for each event played (max 5) and influence.',
            revealedDelegate: PartyName_1.PartyName.UNITY,
            currentDelegate: PartyName_1.PartyName.GREENS,
            renderData: RENDER_DATA,
        });
    }
    resolve(game, turmoil) {
        game.getPlayersInGenerationOrder().forEach((player) => {
            const eventsCards = player.playedCards.filter((card) => card.type === CardType_1.CardType.EVENT).length;
            player.stock.add(Resource_1.Resource.MEGACREDITS, 2 * (Math.min(5, eventsCards) + turmoil.getPlayerInfluence(player)), { log: true, from: this.name });
        });
    }
}
exports.CelebrityLeaders = CelebrityLeaders;
