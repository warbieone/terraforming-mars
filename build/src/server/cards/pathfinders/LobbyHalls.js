"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyHalls = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const DeclareCloneTag_1 = require("../../pathfinders/DeclareCloneTag");
class LobbyHalls extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LOBBY_HALLS,
            cost: 11,
            behavior: {
                production: { megacredits: 2 },
                turmoil: { sendDelegates: { count: 1 } },
            },
            metadata: {
                cardNumber: 'PfTBD',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2)).delegates(1);
                }),
                description: 'Increase your M€ production 2 steps. Place 1 delegate in any party.' +
                    ' Choose a planet tag. This card counts as having 1 of that tag. Raise the corresponding planetary track 1 step.',
            },
        });
        this.cloneTag = Tag_1.Tag.CLONE;
    }
    get tags() {
        return [this.cloneTag, Tag_1.Tag.BUILDING];
    }
    bespokePlay(player) {
        player.game.defer(new DeclareCloneTag_1.DeclareCloneTag(player, this));
        return undefined;
    }
}
exports.LobbyHalls = LobbyHalls;
