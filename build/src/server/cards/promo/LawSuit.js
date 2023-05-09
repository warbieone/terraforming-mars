"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LawSuit = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const SelectPlayer_1 = require("../../inputs/SelectPlayer");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const Options_1 = require("../Options");
class LawSuit extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.LAW_SUIT,
            tags: [Tag_1.Tag.EARTH],
            cost: 2,
            victoryPoints: 'special',
            metadata: {
                cardNumber: 'X06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('steal', Size_1.Size.SMALL, true).megacredits(3, { all: Options_1.all }).asterix();
                }),
                description: 'Steal 3 M€ from a player that REMOVED YOUR RESOURCES OR DECREASED YOUR PRODUCTION this generation. Place this card face down in THAT PLAYER\'S EVENT PILE.',
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.any(-1),
            },
        });
    }
    targets(player) {
        return player.game.getPlayersById(player.removingPlayers);
    }
    bespokeCanPlay(player) {
        return this.targets(player).length > 0;
    }
    bespokePlay(player) {
        return new SelectPlayer_1.SelectPlayer(this.targets(player), 'Select player to sue (steal 3 M€ from)', 'Steal M€', (suedPlayer) => {
            const amount = Math.min(3, suedPlayer.megaCredits);
            player.addResource(Resource_1.Resource.MEGACREDITS, amount);
            suedPlayer.deductResource(Resource_1.Resource.MEGACREDITS, amount, { log: true, from: player, stealing: true });
            suedPlayer.playedCards.push(this);
            return undefined;
        });
    }
    getVictoryPoints() {
        return -1;
    }
    static resourceHook(player, _resource, amount, from) {
        if (from === player || amount >= 0) {
            return;
        }
        if (player.removingPlayers.includes(from.id) === false) {
            player.removingPlayers.push(from.id);
        }
    }
}
exports.LawSuit = LawSuit;
