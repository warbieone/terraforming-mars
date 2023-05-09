"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OumuamuaTypeObjectSurvey = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardResource_1 = require("../../../common/CardResource");
const CardRequirements_1 = require("../CardRequirements");
const Tag_1 = require("../../../common/cards/Tag");
const Options_1 = require("../Options");
const Resource_1 = require("../../../common/Resource");
const Size_1 = require("../../../common/cards/render/Size");
class OumuamuaTypeObjectSurvey extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.OUMUAMUA_TYPE_OBJECT_SURVEY,
            cost: 20,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.SCIENCE],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SPACE, 1).tag(Tag_1.Tag.SCIENCE, 1)),
            metadata: {
                cardNumber: 'Pf53',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.data({ amount: 2 }).asterix().cards(2, { size: Size_1.Size.SMALL }).asterix().br;
                    b.science(1, { played: Options_1.played }).microbes(1, { played: Options_1.played }).colon().text('play ', Size_1.Size.SMALL, false, true);
                    b.space({ played: Options_1.played }).colon().production((pb) => pb.energy(3, { digit: Options_1.digit })).br;
                    b.text('Draw 2 cards face up. If the first has a science or microbe tag, play it outright ignoring requirements and cost. ' +
                        'If not, and it has a space tag, gain 3 energy prod. If it has none of those, apply the check to the second card.', Size_1.Size.SMALL, false, false);
                }),
                description: 'Requires 1 space tag and 1 science tag. Add 2 data to ANY card. ',
            },
        });
    }
    keep(player, card) {
        player.cardsInHand.push(card);
        player.game.log('${0} kept ${1}', (b) => b.player(player).card(card));
    }
    processCard(player, card) {
        const tags = card.tags;
        if (player.tags.cardHasTag(card, Tag_1.Tag.SCIENCE) || player.tags.cardHasTag(card, Tag_1.Tag.MICROBE)) {
            player.playCard(card, undefined);
            return true;
        }
        else if (tags.includes(Tag_1.Tag.SPACE)) {
            player.production.add(Resource_1.Resource.ENERGY, 3, { log: true });
            this.keep(player, card);
            return true;
        }
        else {
            this.keep(player, card);
            return false;
        }
    }
    bespokePlay(player) {
        const game = player.game;
        game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.DATA, { count: 2 }));
        const cards = [game.projectDeck.draw(player.game), game.projectDeck.draw(player.game)];
        player.game.log('${0} revealed ${1} and ${2}', (b) => b.player(player).card(cards[0]).card(cards[1]));
        if (this.processCard(player, cards[0])) {
            this.keep(player, cards[1]);
        }
        else {
            this.processCard(player, cards[1]);
        }
        return undefined;
    }
}
exports.OumuamuaTypeObjectSurvey = OumuamuaTypeObjectSurvey;
