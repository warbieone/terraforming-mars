"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProjectCardToPlay = void 0;
const PlayerInput_1 = require("../PlayerInput");
const Payment_1 = require("../../common/inputs/Payment");
const Units_1 = require("../../common/Units");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const CardName_1 = require("../../common/cards/CardName");
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
        const yesAnd = typeof (details.details) === 'boolean' ? undefined : details.details;
        this.payAndPlay(card, input.payment, yesAnd);
        return undefined;
    }
    payAndPlay(card, payment, yesAnd) {
        var _a, _b;
        this.player.checkPaymentAndPlayCard(card, payment, (_a = this.config) === null || _a === void 0 ? void 0 : _a.action);
        if (((_b = yesAnd === null || yesAnd === void 0 ? void 0 : yesAnd.thinkTankResources) !== null && _b !== void 0 ? _b : 0) > 0) {
            const thinkTank = this.player.tableau.find((card) => card.name === CardName_1.CardName.THINK_TANK);
            if (thinkTank !== undefined) {
                this.player.removeResourceFrom(thinkTank, yesAnd === null || yesAnd === void 0 ? void 0 : yesAnd.thinkTankResources, { log: true });
            }
        }
        this.cb(card);
    }
    cb(card) {
        var _a, _b;
        (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.cb) === null || _b === void 0 ? void 0 : _b.call(_a, card);
        return undefined;
    }
}
exports.SelectProjectCardToPlay = SelectProjectCardToPlay;
//# sourceMappingURL=SelectProjectCardToPlay.js.map