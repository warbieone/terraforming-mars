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
        super('card', title);
        this.cards = cards;
        this.config = {
            max: config?.max ?? 1,
            min: config?.min ?? 1,
            selectBlueCardAction: config?.selectBlueCardAction ?? false,
            enabled: config?.enabled,
            played: config?.played ?? true,
            showOwner: config?.showOwner ?? false,
        };
        this.buttonLabel = buttonLabel;
    }
    toModel(player) {
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
            showOnlyInLearnerMode: this.config.enabled?.every((p) => p === false) ?? false,
            selectBlueCardAction: this.config.selectBlueCardAction,
            showOwner: this.config.showOwner === true,
        };
    }
    process(input) {
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
            if (this.config.enabled?.[idx] === false) {
                throw new Error(`${cardName} is not available`);
            }
        }
        return this.cb(cards);
    }
}
exports.SelectCard = SelectCard;
