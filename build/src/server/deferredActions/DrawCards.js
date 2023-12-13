"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCards = void 0;
const DeferredAction_1 = require("./DeferredAction");
const ChooseCards_1 = require("./ChooseCards");
class DrawCards extends DeferredAction_1.DeferredAction {
    constructor(player, count = 1, options = {}) {
        super(player, DeferredAction_1.Priority.DRAW_CARDS);
        this.count = count;
        this.options = options;
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
        this.cb(cards);
        return undefined;
    }
    static keepAll(player, count = 1, options) {
        return new DrawCards(player, count, options).andThen((cards) => {
            let verbosity = ChooseCards_1.LogType.DREW;
            if (options !== undefined) {
                if (options.tag !== undefined ||
                    options.resource !== undefined ||
                    options.cardType !== undefined ||
                    options.include !== undefined) {
                    verbosity = ChooseCards_1.LogType.DREW_VERBOSE;
                }
            }
            (0, ChooseCards_1.keep)(player, cards, [], verbosity);
        });
    }
    static keepSome(player, count = 1, options) {
        return new DrawCards(player, count, options).andThen((cards) => player.game.defer(new ChooseCards_1.ChooseCards(player, cards, options)));
    }
}
exports.DrawCards = DrawCards;
//# sourceMappingURL=DrawCards.js.map