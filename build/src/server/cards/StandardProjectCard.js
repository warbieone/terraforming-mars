"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardProjectCard = void 0;
const CardType_1 = require("../../common/cards/CardType");
const CardName_1 = require("../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../deferredActions/SelectPaymentDeferred");
const Card_1 = require("./Card");
const MoonExpansion_1 = require("../moon/MoonExpansion");
class StandardProjectCard extends Card_1.Card {
    constructor(properties) {
        super(Object.assign({ type: CardType_1.CardType.STANDARD_PROJECT }, properties));
    }
    get type() {
        return CardType_1.CardType.STANDARD_PROJECT;
    }
    discount(_player) {
        return 0;
    }
    onStandardProject(player) {
        var _a;
        for (const playedCard of player.tableau) {
            (_a = playedCard.onStandardProject) === null || _a === void 0 ? void 0 : _a.call(playedCard, player, this);
        }
    }
    canAct(player) {
        const canPayWith = this.canPayWith(player);
        return player.canAfford(this.cost - this.discount(player), Object.assign(Object.assign({}, canPayWith), { tr: this.tr, data: true, reserveUnits: MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this) }));
    }
    canPayWith(_player) {
        return {};
    }
    projectPlayed(player) {
        player.game.log('${0} used ${1} standard project', (b) => b.player(player).card(this));
        this.onStandardProject(player);
    }
    suffixFreeCardName(cardName) {
        return cardName.split(':')[0];
    }
    action(player) {
        const canPayWith = this.canPayWith(player);
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, this.cost - this.discount(player), {
            canUseSteel: canPayWith.steel,
            canUseTitanium: canPayWith.titanium,
            canUseSeeds: canPayWith.seeds,
            canUseData: player.isCorporation(CardName_1.CardName.AURORAI),
            title: `Select how to pay for ${this.suffixFreeCardName(this.name)} standard project`,
            afterPay: () => {
                this.projectPlayed(player);
                this.actionEssence(player);
            },
        }));
        return undefined;
    }
}
exports.StandardProjectCard = StandardProjectCard;
//# sourceMappingURL=StandardProjectCard.js.map