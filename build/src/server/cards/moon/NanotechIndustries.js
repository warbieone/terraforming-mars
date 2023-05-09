"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanotechIndustries = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const MoonCards_1 = require("../../moon/MoonCards");
const Card_1 = require("../Card");
class NanotechIndustries extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.NANOTECH_INDUSTRIES,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MOON],
            startingMegaCredits: 42,
            resourceType: CardResource_1.CardResource.SCIENCE,
            firstAction: {
                text: 'Draw 3 cards and keep 2.',
                drawCard: { count: 3, keep: 2 },
            },
            victoryPoints: { resourcesHere: {}, per: 2 },
            metadata: {
                cardNumber: 'MC1',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).cards(3).minus().cards(1).br;
                    b.action('Add 1 science resource to ANY card [except those giving 2 or more VP per 1 science resource.]', (eb) => {
                        eb.empty().startAction.science(1).asterix();
                    });
                }),
                description: 'You start with 42 M€. As your first action, draw 3 cards. Take 2 of them into hand, and discard the rest. ' +
                    '1 VP for every 2 science resources here.',
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.SCIENCE, { filter: (card) => MoonCards_1.MoonCards.scienceCardsWithLessThan2VP.has(card.name) }));
        return undefined;
    }
}
exports.NanotechIndustries = NanotechIndustries;
