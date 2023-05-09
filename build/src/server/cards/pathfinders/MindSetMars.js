"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindSetMars = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const Turmoil_1 = require("../../turmoil/Turmoil");
const PlaceCityTile_1 = require("../../deferredActions/PlaceCityTile");
const Size_1 = require("../../../common/cards/render/Size");
class MindSetMars extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.MIND_SET_MARS,
            startingMegaCredits: 44,
            resourceType: CardResource_1.CardResource.AGENDA,
            behavior: {
                addResources: 1,
            },
            metadata: {
                cardNumber: 'PfC23',
                description: 'You start with 44 M€ and 1 agenda resource to this card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(44).agenda().nbsp.building(1, { played: Options_1.played }).colon(Size_1.Size.SMALL).agenda().br;
                    b.text('(Action: When you play a card with a building tag, add 1 agenda on this card.)', Size_1.Size.SMALL, false, false).br;
                    b.agenda({ amount: 2, digit: true }).arrow(Size_1.Size.SMALL).delegates(1).nbsp;
                    b.agenda({ amount: 5, digit: true }).arrow(Size_1.Size.SMALL).city().br;
                    b.text('(Action: Spend 2 agenda resources to place 1 delegate in any party.)', Size_1.Size.SMALL, false, false).br;
                    b.text('(Action: Spend 5 agenda resources to place a city tile on Mars.)', Size_1.Size.SMALL, false, false);
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.game.getCardPlayerOrUndefined(this.name) !== player)
            return;
        if (card.tags.includes(Tag_1.Tag.BUILDING)) {
            player.addResourceTo(this, { qty: 1, log: true });
        }
    }
    canAddDelegate(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        return this.resourceCount >= 2 && turmoil.getAvailableDelegateCount(player.id) > 0;
    }
    canAddCity(player) {
        return this.resourceCount >= 5 && player.game.board.getAvailableSpacesForCity(player).length > 0;
    }
    canAct(player) {
        return this.canAddDelegate(player) || this.canAddCity(player);
    }
    action(player) {
        const options = new OrOptions_1.OrOptions();
        if (this.canAddDelegate(player)) {
            options.options.push(new SelectOption_1.SelectOption('Spend 2 agendas to add a delegate to any party', 'OK', () => {
                player.removeResourceFrom(this, 2);
                player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player));
                return undefined;
            }));
        }
        if (this.canAddCity(player)) {
            options.options.push(new SelectOption_1.SelectOption('Spend 5 agendas to place a city on Mars', 'OK', () => {
                player.removeResourceFrom(this, 5);
                player.game.defer(new PlaceCityTile_1.PlaceCityTile(player));
                return undefined;
            }));
        }
        if (options.options.length === 0) {
            return undefined;
        }
        if (options.options.length === 1) {
            return options.options[0];
        }
        return options;
    }
}
exports.MindSetMars = MindSetMars;
