"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardProjectCard = void 0;
const CardType_1 = require("../../common/cards/CardType");
const CardName_1 = require("../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../deferredActions/SelectPaymentDeferred");
const Card_1 = require("./Card");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const MessageBuilder_1 = require("../logs/MessageBuilder");
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
    _discount(player) {
        var _a, _b;
        const underworldStandardProjectCard = player.playedCards.find((card) => card.name === CardName_1.CardName.STANDARD_TECHNOLOGY_UNDERWORLD);
        const underworldDiscount = (_b = (_a = underworldStandardProjectCard === null || underworldStandardProjectCard === void 0 ? void 0 : underworldStandardProjectCard.getCardDiscount) === null || _a === void 0 ? void 0 : _a.call(underworldStandardProjectCard, player, this)) !== null && _b !== void 0 ? _b : 0;
        return underworldDiscount + this.discount(player);
    }
    onStandardProject(player) {
        var _a;
        for (const playedCard of player.tableau) {
            (_a = playedCard.onStandardProject) === null || _a === void 0 ? void 0 : _a.call(playedCard, player, this);
        }
    }
    canPlayOptions(player) {
        const canPayWith = this.canPayWith(player);
        return Object.assign(Object.assign({}, canPayWith), { cost: this.cost - this._discount(player), tr: this.tr, auroraiData: true, spireScience: true, reserveUnits: MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this) });
    }
    canAct(player) {
        return player.canAfford(this.canPlayOptions(player));
    }
    canPayWith(_player) {
        return {};
    }
    projectPlayed(player) {
        player.game.log('${0} used ${1} standard project', (b) => b.player(player).card(this));
        this.onStandardProject(player);
    }
    action(player) {
        const canPayWith = this.canPayWith(player);
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, this.cost - this._discount(player), {
            canUseSteel: canPayWith.steel,
            canUseTitanium: canPayWith.titanium,
            canUseSeeds: canPayWith.seeds,
            canUseAuroraiData: player.isCorporation(CardName_1.CardName.AURORAI),
            canUseSpireScience: player.isCorporation(CardName_1.CardName.SPIRE),
            canUseAsteroids: canPayWith.kuiperAsteroids && player.isCorporation(CardName_1.CardName.KUIPER_COOPERATIVE),
            title: (0, MessageBuilder_1.message)('Select how to pay for the ${0} standard project', (b) => b.cardName(this.name)),
        })).andThen(() => {
            this.projectPlayed(player);
            this.actionEssence(player);
        });
        return undefined;
    }
}
exports.StandardProjectCard = StandardProjectCard;
//# sourceMappingURL=StandardProjectCard.js.map