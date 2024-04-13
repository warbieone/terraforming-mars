"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProjectCardToPlay = void 0;
const PlayerInput_1 = require("../PlayerInput");
const Payment_1 = require("../../common/inputs/Payment");
const Units_1 = require("../../common/Units");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const CardName_1 = require("../../common/cards/CardName");
const ModelUtils_1 = require("../models/ModelUtils");
class SelectProjectCardToPlay extends PlayerInput_1.BasePlayerInput {
    constructor(player, cards = player.getPlayableCards(), config) {
        super('projectCard', 'Play project card');
        this.player = player;
        this.config = config;
        this.cards = [];
        this.buttonLabel = 'Play card';
        this.cards = cards.map((card) => card.card);
        this.extras = new Map(cards.map((card) => {
            return [
                card.card.name,
                {
                    reserveUnits: card.card.reserveUnits ?
                        MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, card.card) :
                        Units_1.Units.EMPTY,
                    details: card.details,
                },
            ];
        }));
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'projectCard',
            cards: (0, ModelUtils_1.cardsToModel)(player, this.cards, { showCalculatedCost: true, extras: this.extras }),
            microbes: player.getSpendable('microbes'),
            floaters: player.getSpendable('floaters'),
            paymentOptions: {
                heat: player.canUseHeatAsMegaCredits,
                lunaTradeFederationTitanium: player.canUseTitaniumAsMegacredits,
                plants: player.canUsePlantsAsMegacredits,
                corruption: player.canUseCorruptionAsMegacredits,
            },
            lunaArchivesScience: player.getSpendable('lunaArchivesScience'),
            seeds: player.getSpendable('seeds'),
            graphene: player.getSpendable('graphene'),
            kuiperAsteroids: player.getSpendable('kuiperAsteroids'),
            corruption: player.underworldData.corruption,
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectProjectCardToPlayResponse)(input)) {
            throw new Error('Not a valid SelectProjectCardToPlayResponse');
        }
        if (!(0, Payment_1.isPayment)(input.payment)) {
            throw new Error('payment is not a valid type');
        }
        const card = this.cards.find((card) => card.name === input.card);
        if (card === undefined) {
            throw new Error('Unknown card name ' + input.card);
        }
        const details = this.extras.get(input.card);
        if (details === undefined) {
            throw new Error('Unknown card name ' + input.card);
        }
        const reserveUnits = details.reserveUnits;
        if (reserveUnits.steel + input.payment.steel > this.player.steel) {
            throw new Error(`${reserveUnits.steel} units of steel must be reserved for ${input.card}`);
        }
        if (reserveUnits.titanium + input.payment.titanium > this.player.titanium) {
            throw new Error(`${reserveUnits.titanium} units of titanium must be reserved for ${input.card}`);
        }
        if (reserveUnits.plants + input.payment.plants > this.player.plants) {
            throw new Error(`${reserveUnits.titanium} units of plants must be reserved for ${input.card}`);
        }
        const yesAnd = typeof (details.details) === 'boolean' ? undefined : details.details;
        this.payAndPlay(card, input.payment, yesAnd);
        return undefined;
    }
    payAndPlay(card, payment, yesAnd) {
        this.player.checkPaymentAndPlayCard(card, payment, this.config?.action);
        if ((yesAnd?.thinkTankResources ?? 0) > 0) {
            const thinkTank = this.player.tableau.find((card) => card.name === CardName_1.CardName.THINK_TANK);
            if (thinkTank !== undefined) {
                this.player.removeResourceFrom(thinkTank, yesAnd?.thinkTankResources, { log: true });
            }
        }
        this.cb(card);
    }
}
exports.SelectProjectCardToPlay = SelectProjectCardToPlay;
