"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheNewSpaceRace = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const PreludeCard_1 = require("../prelude/PreludeCard");
const Tag_1 = require("../../../common/cards/Tag");
const Turmoil_1 = require("../../turmoil/Turmoil");
const ChooseRulingPartyDeferred_1 = require("../../turmoil/ChooseRulingPartyDeferred");
class TheNewSpaceRace extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.THE_NEW_SPACE_RACE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.EARTH],
            behavior: {
                stock: { megacredits: 12 },
            },
            metadata: {
                cardNumber: 'PfP14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.firstPlayer().rulingParty().megacredits(12).br;
                }),
                description: 'REVEALED BEFORE ANY OTHER PRELUDE. You become starting player for the game. Choose and set a ruling policy for the first generation. Gain 12 M€.',
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        game.overrideFirstPlayer(player);
        Turmoil_1.Turmoil.ifTurmoil((player.game), (turmoil) => {
            player.game.defer(new ChooseRulingPartyDeferred_1.ChooseRulingPartyDeferred(player, turmoil));
        });
        return undefined;
    }
    static potentiallyChangeFirstPlayer(game) {
        const [cardHolder, card] = game.getCardHolder(CardName_1.CardName.THE_NEW_SPACE_RACE);
        if (cardHolder !== undefined && card !== undefined) {
            game.log('${0} has ${1}, which is played before any other Prelude and makes them first player.', (b) => b.player(cardHolder).card(card));
            cardHolder.playCard(card);
        }
    }
}
exports.TheNewSpaceRace = TheNewSpaceRace;
