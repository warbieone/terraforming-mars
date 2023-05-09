"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Merger = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectCard_1 = require("../../inputs/SelectCard");
const Size_1 = require("../../../common/cards/render/Size");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const LogHelper_1 = require("../../LogHelper");
const constants_1 = require("../../../common/constants");
class Merger extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.MERGER,
            metadata: {
                cardNumber: 'X41',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.corporation().asterix().nbsp.megacredits(-42, { size: Size_1.Size.SMALL });
                    b.br.br;
                }),
                description: 'Draw 4 corporation cards. Play one of them and discard the other 3. Then pay 42 M€.',
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        const dealtCorps = Merger.dealCorporations(player, game.corporationDeck);
        const enabled = dealtCorps.map((corp) => {
            return player.canAfford(Merger.mergerCost - this.spendableMegacredits(player, corp));
        });
        if (enabled.some((v) => v === true) === false) {
            game.log('None of the four drawn corporation cards are affordable.');
            dealtCorps.forEach((corp) => game.corporationDeck.discard(corp));
        }
        game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            return new SelectCard_1.SelectCard('Choose corporation card to play', 'Play', dealtCorps, ([card]) => {
                player.playAdditionalCorporationCard(card);
                dealtCorps.forEach((corp) => {
                    if (corp.name !== card.name) {
                        game.corporationDeck.discard(corp);
                    }
                });
                game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, Merger.mergerCost, { title: 'Select how to pay for Merger' }));
                return undefined;
            }, { enabled: enabled });
        }));
        return undefined;
    }
    static dealCorporations(player, corporationDeck) {
        const cards = [];
        try {
            while (cards.length < 4) {
                cards.push(corporationDeck.draw(player.game));
            }
        }
        catch (err) {
            player.game.log('Not enough corporations while resolving ${0}', (b) => b.cardName(CardName_1.CardName.MERGER));
        }
        LogHelper_1.LogHelper.logDrawnCards(player, cards, true);
        return cards;
    }
    static setCardCost(player) {
        return player.corporations
            .map((card) => { var _a; return ((_a = card.cardCost) !== null && _a !== void 0 ? _a : constants_1.CARD_COST) - constants_1.CARD_COST; })
            .reduce((prev, curr) => prev + curr, constants_1.CARD_COST);
    }
    spendableMegacredits(player, corp) {
        if (corp.startingMegaCredits >= Merger.mergerCost) {
            return corp.startingMegaCredits;
        }
        const behavior = corp.behavior;
        const stock = behavior === null || behavior === void 0 ? void 0 : behavior.stock;
        const production = behavior === null || behavior === void 0 ? void 0 : behavior.production;
        let sum = corp.startingMegaCredits;
        const asNumber = (x) => typeof (x) === 'number' ? x : 0;
        let incomingTitanium = asNumber(stock === null || stock === void 0 ? void 0 : stock.titanium);
        const titaniumValue = player.getTitaniumValue();
        if (player.isCorporation(CardName_1.CardName.MANUTECH)) {
            sum += asNumber(production === null || production === void 0 ? void 0 : production.megacredits);
            incomingTitanium += asNumber(production === null || production === void 0 ? void 0 : production.titanium);
        }
        if (corp.name === CardName_1.CardName.LUNA_TRADE_FEDERATION || player.isCorporation(CardName_1.CardName.LUNA_TRADE_FEDERATION)) {
            sum += (player.titanium + incomingTitanium) * (titaniumValue - 1);
        }
        return sum;
    }
}
exports.Merger = Merger;
Merger.mergerCost = 42;
