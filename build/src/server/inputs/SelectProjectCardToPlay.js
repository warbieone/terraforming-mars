"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectProjectCardToPlay = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const Payment_1 = require("../../common/inputs/Payment");
const Units_1 = require("../../common/Units");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectProjectCardToPlay extends PlayerInput_1.BasePlayerInput {
    constructor(player, cards = player.getPlayableCards(), config) {
        super(PlayerInputType_1.PlayerInputType.SELECT_PROJECT_CARD_TO_PLAY, 'Play project card');
        this.player = player;
        this.cards = cards;
        this.config = config;
        this.buttonLabel = 'Play card';
        this.reserveUnits = this.cards.map((card) => {
            return card.reserveUnits ? MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, card) : Units_1.Units.EMPTY;
        });
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectProjectCardToPlayResponse)(input)) {
            throw new Error('Not a valid SelectProjectCardToPlayResponse');
        }
        if (!(0, Payment_1.isPayment)(input.payment)) {
            throw new Error('payment is not a valid type');
        }
        const cardData = (0, PlayerInput_1.getCardFromPlayerInput)(this.cards, input.card);
        const card = cardData.card;
        const reserveUnits = this.reserveUnits[cardData.idx];
        if (reserveUnits.steel + input.payment.steel > this.player.steel) {
            throw new Error(`${reserveUnits.steel} units of steel must be reserved for ${input.card}`);
        }
        if (reserveUnits.titanium + input.payment.titanium > this.player.titanium) {
            throw new Error(`${reserveUnits.titanium} units of titanium must be reserved for ${input.card}`);
        }
        this.cb(card, input.payment);
        return undefined;
    }
    cb(card, payment) {
        var _a, _b, _c;
        this.player.checkPaymentAndPlayCard(card, payment, (_a = this.config) === null || _a === void 0 ? void 0 : _a.action);
        (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.cb) === null || _c === void 0 ? void 0 : _c.call(_b, card);
        return undefined;
    }
}
exports.SelectProjectCardToPlay = SelectProjectCardToPlay;
