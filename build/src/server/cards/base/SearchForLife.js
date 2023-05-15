"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchForLife = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
const Options_1 = require("../Options");
class SearchForLife extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SEARCH_FOR_LIFE,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 3,
            resourceType: CardResource_1.CardResource.SCIENCE,
            victoryPoints: 'special',
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(6, { max: Options_1.max })),
            metadata: {
                cardNumber: '005',
                description: 'Oxygen must be 6% or less.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 M€ to reveal the top card of the draw deck. If that card has a microbe tag, add a science resource here.', (eb) => {
                        eb.megacredits(1).startAction.microbes(1, { played: Options_1.played }).asterix().nbsp.colon().nbsp.science();
                    }).br;
                    b.vpText('3 VPs if you have one or more science resources here.');
                }),
                victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.searchForLife(),
            },
        });
    }
    getVictoryPoints() {
        if (this.resourceCount > 0) {
            return 3;
        }
        return 0;
    }
    canAct(player) {
        return player.canAfford(1);
    }
    action(player) {
        const topCard = player.game.projectDeck.draw(player.game);
        player.game.log('${0} revealed and discarded ${1}', (b) => b.player(player).card(topCard));
        if (topCard.tags.includes(Tag_1.Tag.MICROBE)) {
            player.addResourceTo(this, 1);
            player.game.log('${0} found life!', (b) => b.player(player));
        }
        player.game.projectDeck.discard(topCard);
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 1, { title: 'Select how to pay for action' }));
        return undefined;
    }
}
exports.SearchForLife = SearchForLife;
//# sourceMappingURL=SearchForLife.js.map