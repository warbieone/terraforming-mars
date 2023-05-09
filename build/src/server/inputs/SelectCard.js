"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCard = void 0;
const PlayerInput_1 = require("../PlayerInput");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const InputResponse_1 = require("../../common/inputs/InputResponse");
class SelectCard extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', cards, cb, config) {
        var _a, _b, _c, _d, _e;
        super(PlayerInputType_1.PlayerInputType.SELECT_CARD, title);
        this.cards = cards;
        this.cb = cb;
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
