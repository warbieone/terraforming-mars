"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CometForVenus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const SelectPlayer_1 = require("../../inputs/SelectPlayer");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Options_1 = require("../Options");
class CometForVenus extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.COMET_FOR_VENUS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 11,
            behavior: {
                global: { venus: 1 },
            },
            metadata: {
                description: 'Raise Venus 1 step. Remove up to 4M€ from any player WITH A VENUS TAG IN PLAY.',
                cardNumber: '218',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).nbsp.nbsp.minus().megacredits(4, { all: Options_1.all, secondaryTag: Tag_1.Tag.VENUS });
                }),
            },
        });
    }
    bespokePlay(player) {
        const venusTagPlayers = player.game.getPlayers().filter((otherPlayer) => otherPlayer.id !== player.id && otherPlayer.tags.count(Tag_1.Tag.VENUS, 'raw') > 0);
        if (player.game.isSoloMode() || venusTagPlayers.length === 0) {
            return undefined;
        }
        if (venusTagPlayers.length > 0) {
            return new OrOptions_1.OrOptions(new SelectPlayer_1.SelectPlayer(Array.from(venusTagPlayers), 'Select player to remove up to 4 M€ from', 'Remove M€', (selectedPlayer) => {
                selectedPlayer.deductResource(Resource_1.Resource.MEGACREDITS, 4, { log: true, from: player });
                return undefined;
            }), new SelectOption_1.SelectOption('Do not remove M€', 'Confirm', () => undefined));
        }
        return undefined;
    }
}
exports.CometForVenus = CometForVenus;
