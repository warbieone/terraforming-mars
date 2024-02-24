"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyndicatePirateRaids = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
class SyndicatePirateRaids extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SYNDICATE_PIRATE_RAIDS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 8,
            metadata: {
                description: 'ALL OPPONENTS CANNOT RETRIEVE THEIR TRADE FLEETS THIS GENERATION',
                cardNumber: 'M65',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tradeFleet().asterix();
                }),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        game.syndicatePirateRaider = player.id;
        game.log('All players except ${0} may not retrieve their trade fleets this generation.', (b) => b.player(player));
        return undefined;
    }
}
exports.SyndicatePirateRaids = SyndicatePirateRaids;
