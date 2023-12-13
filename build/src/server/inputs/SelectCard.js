"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCard = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInput_2 = require("../PlayerInput");
const CardName_1 = require("../../common/cards/CardName");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const ModelUtils_1 = require("../models/ModelUtils");
class SelectCard extends PlayerInput_2.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', cards, config) {
        var _a, _b, _c, _d, _e;
        super('card', title);
        this.cards = cards;
        this.config = {
            max: (_a = config === null || config === void 0 ? void 0 : config.max) !== null && _a !== void 0 ? _a : 1,
            min: (_b = config === null || config === void 0 ? void 0 : config.min) !== null && _b !== void 0 ? _b : 1,
            selectBlueCardAction: (_c = config === null || config === void 0 ? void 0 : config.selectBlueCardAction) !== null && _c !== void 0 ? _c : false,
            enabled: config === null || config === void 0 ? void 0 : config.enabled,
            played: (_d = config === null || config === void 0 ? void 0 : config.played) !== null && _d !== void 0 ? _d : true,
            showOwner: (_e = config === null || config === void 0 ? void 0 : config.showOwner) !== null && _e !== void 0 ? _e : false,
        };
        this.buttonLabel = buttonLabel;
    }
    toModel(player) {
        var _a, _b;
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'card',
            cards: (0, ModelUtils_1.cardsToModel)(player, this.cards, {
                showCalculatedCost: this.config.played === false || this.config.played === CardName_1.CardName.SELF_REPLICATING_ROBOTS,
                showResources: this.config.played === true || this.config.played === CardName_1.CardName.SELF_REPLICATING_ROBOTS,
                enabled: this.config.enabled,
            }),
            max: this.config.max,
            min: this.config.min,
            showOnlyInLearnerMode: (_b = (_a = this.config.enabled) === null || _a === void 0 ? void 0 : _a.every((p) => p === false)) !== null && _b !== void 0 ? _b : false,
            selectBlueCardAction: this.config.selectBlueCardAction,
            showOwner: this.config.showOwner === true,
        };
    }
    process(input) {
        var _a;
        if (!(0, InputResponse_1.isSelectCardResponse)(input)) {
            throw new Error('Not a valid SelectCardResponse');
        }
        if (input.cards.length < this.config.min) {
            throw new Error('Not enough cards selected');
        }
        if (input.cards.length > this.config.max) {
            throw new Error('Too many cards selected');
        }
        const cards = [];
        for (const cardName of input.cards) {
            const { card, idx } = (0, PlayerInput_1.getCardFromPlayerInput)(this.cards, cardName);
            cards.push(card);
            if (((_a = this.config.enabled) === null || _a === void 0 ? void 0 : _a[idx]) === false) {
                throw new Error(`${cardName} is not available`);
            }
        }
        return this.cb(cards);
    }
}
exports.SelectCard = SelectCard;
//# sourceMappingURL=SelectCard.js.map