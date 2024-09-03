"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoDeck = exports.PreludeDeck = exports.ProjectDeck = exports.CorporationDeck = exports.Deck = void 0;
const createCard_1 = require("../createCard");
const CardName_1 = require("../../common/cards/CardName");
const LogHelper_1 = require("../LogHelper");
const shuffle_1 = require("../utils/shuffle");
const utils_1 = require("../../common/utils/utils");
class Deck {
    static shuffle(array, random) {
        (0, shuffle_1.inplaceShuffle)(array, random);
    }
    constructor(type, drawPile, discards, random) {
        this.type = type;
        this.drawPile = drawPile;
        this.discardPile = discards;
        this.random = random;
    }
    shuffle(cardsOnTop = []) {
        const copy = [...this.drawPile, ...this.discardPile];
        this.drawPile.splice(0, this.drawPile.length);
        this.discardPile.splice(0, this.discardPile.length);
        if (cardsOnTop.length === 0) {
            Deck.shuffle(copy, this.random);
            this.drawPile.push(...copy);
        }
        else {
            const set = new Set(cardsOnTop);
            const top = [];
            const rest = [];
            copy.forEach((card) => {
                if (set.has(card.name)) {
                    top.push(card);
                }
                else {
                    rest.push(card);
                }
            });
            (0, shuffle_1.inplaceShuffle)(top, this.random);
            (0, shuffle_1.inplaceShuffle)(rest, this.random);
            this.drawPile.push(...rest, ...top);
        }
    }
    draw(logger, source = 'top') {
        this.shuffleIfNecessary(logger);
        const card = source === 'top' ? this.drawPile.pop() : this.drawPile.shift();
        this.shuffleIfNecessary(logger);
        return card;
    }
    drawN(logger, count, source = 'top') {
        const cards = [];
        for (let idx = 0; idx < count; idx++) {
            const card = this.draw(logger, source);
            if (card === undefined) {
                break;
            }
            cards.push(card);
        }
        return cards;
    }
    drawNOrThrow(logger, count) {
        const cards = [];
        for (let idx = 0; idx < count; idx++) {
            cards.push(this.drawOrThrow(logger));
        }
        return cards;
    }
    size() {
        return this.drawPile.length + this.discardPile.length;
    }
    canDraw(count) {
        return this.size() >= count;
    }
    shuffleIfNecessary(logger) {
        if (this.drawPile.length === 0 && this.discardPile.length !== 0) {
            logger.log(`The ${this.type} discard pile has been shuffled to form a new deck.`);
            this.shuffle();
        }
    }
    drawOrThrow(logger, source = 'top') {
        const card = this.draw(logger, source);
        if (card === undefined) {
            throw new Error(`Unexpected empty ${this.type} deck`);
        }
        return card;
    }
    drawByConditionLegacy(logger, total, include) {
        return this.drawByConditionOrThrow(logger, total, include);
    }
    drawByConditionOrThrow(logger, total, include) {
        const result = [];
        const discardedCards = new Set();
        while (result.length < total) {
            if (discardedCards.size >= this.drawPile.length + this.discardPile.length) {
                logger.log(`discarded every ${this.type} card without a match`);
                break;
            }
            const projectCard = this.drawOrThrow(logger);
            if (include(projectCard)) {
                result.push(projectCard);
            }
            else {
                discardedCards.add(projectCard.name);
                this.discard(projectCard);
            }
        }
        if (discardedCards.size > 0) {
            LogHelper_1.LogHelper.logDiscardedCards(logger, Array.from(discardedCards));
        }
        return result;
    }
    discard(...cards) {
        this.discardPile.push(...cards);
    }
    shuffleDiscardPile() {
        Deck.shuffle(this.discardPile, this.random);
    }
    serialize() {
        return {
            drawPile: this.drawPile.map(utils_1.toName),
            discardPile: this.discardPile.map(utils_1.toName),
        };
    }
}
exports.Deck = Deck;
class CorporationDeck extends Deck {
    constructor(deck, discarded, random) {
        super('corporation', deck, discarded, random);
    }
    static deserialize(d, random) {
        const deck = (0, createCard_1.corporationCardsFromJSON)(d.drawPile);
        const discarded = (0, createCard_1.corporationCardsFromJSON)(d.discardPile);
        return new CorporationDeck(deck, discarded, random);
    }
}
exports.CorporationDeck = CorporationDeck;
class ProjectDeck extends Deck {
    constructor(deck, discarded, random) {
        super('project', deck, discarded, random);
    }
    static deserialize(d, random) {
        const deck = (0, createCard_1.cardsFromJSON)(d.drawPile);
        const discarded = (0, createCard_1.cardsFromJSON)(d.discardPile);
        return new ProjectDeck(deck, discarded, random);
    }
}
exports.ProjectDeck = ProjectDeck;
const INCOMPATIBLE_PRELUDES = [CardName_1.CardName.BY_ELECTION, CardName_1.CardName.THE_NEW_SPACE_RACE];
class PreludeDeck extends Deck {
    constructor(deck, discarded, random) {
        const copy = [...deck];
        const indexes = INCOMPATIBLE_PRELUDES.map((name) => deck.findIndex((c) => c.name === name));
        if (indexes[0] >= 0 && indexes[1] >= 0) {
            const target = random.nextInt(2);
            const indexToRemove = indexes[target];
            copy.splice(indexToRemove, 1);
        }
        super('prelude', copy, discarded, random);
    }
    static deserialize(d, random) {
        const deck = (0, createCard_1.preludesFromJSON)(d.drawPile);
        const discarded = (0, createCard_1.preludesFromJSON)(d.discardPile);
        return new PreludeDeck(deck, discarded, random);
    }
}
exports.PreludeDeck = PreludeDeck;
class CeoDeck extends Deck {
    constructor(deck, discarded, random) {
        super('ceo', deck, discarded, random);
    }
    static deserialize(d, random) {
        const deck = (0, createCard_1.ceosFromJSON)(d.drawPile);
        const discarded = (0, createCard_1.ceosFromJSON)(d.discardPile);
        return new CeoDeck(deck, discarded, random);
    }
}
exports.CeoDeck = CeoDeck;
