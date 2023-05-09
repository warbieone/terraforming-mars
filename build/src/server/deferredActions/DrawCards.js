"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCards = void 0;
const DeferredAction_1 = require("./DeferredAction");
const SelectCard_1 = require("../inputs/SelectCard");
const SelectPaymentDeferred_1 = require("./SelectPaymentDeferred");
const LogHelper_1 = require("../LogHelper");
var LogType;
(function (LogType) {
    LogType["DREW"] = "drew";
    LogType["BOUGHT"] = "bought";
    LogType["DREW_VERBOSE"] = "drew_verbose";
})(LogType || (LogType = {}));
class DrawCards extends DeferredAction_1.DeferredAction {
    constructor(player, count = 1, options = {}, cb) {
        super(player, DeferredAction_1.Priority.DRAW_CARDS);
        this.count = count;
        this.options = options;
        this.cb = cb;
    }
    execute() {
        this.player.game.resettable = false;
        const game = this.player.game;
        const cards = game.projectDeck.drawByCondition(game, this.count, (card) => {
            if (this.options.resource !== undefined && this.options.resource !== card.resourceType) {
                return false;
            }
            if (this.options.cardType !== undefined && this.options.cardType !== card.type) {
                return false;
            }
            if (this.options.tag !== undefined && !this.player.tags.cardHasTag(card, this.options.tag)) {
                return false;
            }
            if (this.options.include !== undefined && !this.options.include(card)) {
                return false;
            }
            return true;
        });
        return this.cb(cards);
    }
    static keepAll(player, count = 1, options) {
        return new DrawCards(player, count, options, (cards) => {
            let verbosity = LogType.DREW;
            if (options !== undefined) {
                if (options.tag !== undefined ||
                    options.resource !== undefined ||
                    options.cardType !== undefined ||
                    options.include !== undefined) {
                    verbosity = LogType.DREW_VERBOSE;
                }
            }
            return DrawCards.keep(player, cards, verbosity);
        });
    }
    static keepSome(player, count = 1, options) {
        return new DrawCards(player, count, options, (cards) => DrawCards.choose(player, cards, options));
    }
    static keep(player, cards, logType = LogType.DREW) {
        player.cardsInHand.push(...cards);
        if (logType === LogType.DREW_VERBOSE) {
            LogHelper_1.LogHelper.logDrawnCards(player, cards);
        }
        else {
            player.game.log('${0} ${1} ${2} card(s)', (b) => b.player(player).string(logType).number(cards.length));
            LogHelper_1.LogHelper.logDrawnCards(player, cards, true);
        }
        return undefined;
    }
    static discard(player, preserve, discard) {
        discard.forEach((card) => {
            if (preserve.find((f) => f.name === card.name) === undefined) {
                player.game.projectDeck.discard(card);
            }
        });
    }
    static choose(player, cards, options) {
        let max = options.keepMax || cards.length;
        let msg = '';
        if (options.paying) {
            const spendableMegacredits = player.spendableMegacredits();
            const affordableCards = Math.floor(spendableMegacredits / player.cardCost);
            max = Math.min(max, affordableCards);
            if (max === 0) {
                msg = 'You cannot afford any cards';
            }
            else if (max < cards.length) {
                msg = `Select up to ${max} card(s) to buy`;
            }
            else {
                msg = 'Select card(s) to buy';
            }
        }
        else {
            msg = `Select ${max} card(s) to keep`;
        }
        const min = options.paying ? 0 : options.keepMax;
        const button = max === 0 ? 'Ok' : (options.paying ? 'Buy' : 'Select');
        const cb = (selected) => {
            if (selected.length > max) {
                throw new Error('Selected too many cards');
            }
            if (options.paying && selected.length > 0) {
                const cost = selected.length * player.cardCost;
                player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, cost, {
                    title: `Select how to spend ${cost} M€ for ${selected.length} cards`,
                    afterPay: () => {
                        this.keep(player, selected, LogType.BOUGHT);
                        this.discard(player, selected, cards);
                    },
                }));
            }
            else if (options.logDrawnCard === true) {
                this.keep(player, selected, LogType.DREW_VERBOSE);
                this.discard(player, selected, cards);
            }
            else {
                this.keep(player, selected, options.paying ? LogType.BOUGHT : LogType.DREW);
                this.discard(player, selected, cards);
            }
            return undefined;
        };
        return new SelectCard_1.SelectCard(msg, button, cards, cb, { max, min });
    }
}
exports.DrawCards = DrawCards;
