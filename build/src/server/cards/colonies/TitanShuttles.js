"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitanShuttles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const AddResourcesToCard_1 = require("../../deferredActions/AddResourcesToCard");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class TitanShuttles extends Card_1.Card {
    constructor() {
        super({
            cost: 23,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            name: CardName_1.CardName.TITAN_SHUTTLES,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'C45',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 2 floaters to ANY JOVIAN CARD.', (eb) => {
                        eb.empty().startAction.floaters(2, { secondaryTag: Tag_1.Tag.JOVIAN });
                    }).br;
                    b.or().br;
                    b.action('Spend any number of floaters here to gain the same number of titanium.', (eb) => {
                        eb.text('x').floaters(1).startAction.text('x').titanium(1);
                    }).br;
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        if (this.resourceCount === 0) {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: 2, restrictedTag: Tag_1.Tag.JOVIAN, title: 'Add 2 floaters to a Jovian card' }));
            return undefined;
        }
        return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Add 2 floaters to a Jovian card', 'Add floaters', () => {
            player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER, { count: 2, restrictedTag: Tag_1.Tag.JOVIAN }));
            return undefined;
        }), new SelectAmount_1.SelectAmount('Remove X floaters on this card to gain X titanium', 'Remove floaters', (amount) => {
            player.removeResourceFrom(this, amount);
            player.titanium += amount;
            player.game.log('${0} removed ${1} floaters to gain ${2} titanium', (b) => b.player(player).number(amount).number(amount));
            return undefined;
        }, 1, this.resourceCount, true));
    }
}
exports.TitanShuttles = TitanShuttles;
