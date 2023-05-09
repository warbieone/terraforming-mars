"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardFinder = void 0;
const AllCards_1 = require("./cards/AllCards");
const CARD_RENAMES = new Map([]);
class CardFinder {
    getCard(cardName, cardManifestNames) {
        const standardizedCardName = CARD_RENAMES.get(cardName) || cardName;
        for (const moduleManifest of AllCards_1.ALL_MODULE_MANIFESTS) {
            for (const manifestName of cardManifestNames) {
                const cardManifest = moduleManifest[manifestName];
                const factory = cardManifest[standardizedCardName];
                if (factory !== undefined) {
                    return new factory.Factory();
                }
            }
        }
        console.warn(`card not found ${cardName}`);
        return undefined;
    }
    getCardByName(cardName) {
        return this.getCard(cardName, ['corporationCards', 'projectCards', 'preludeCards', 'ceoCards']);
    }
    getCorporationCardByName(cardName) {
        return this.getCard(cardName, ['corporationCards']);
    }
    getProjectCardByName(cardName) {
        return this.getCard(cardName, ['projectCards', 'preludeCards', 'ceoCards']);
    }
    getPreludeByName(cardName) {
        return this.getCard(cardName, ['preludeCards']);
    }
    getCeoByName(cardName) {
        return this.getCard(cardName, ['ceoCards']);
    }
    preludesFromJSON(cards) {
        if (cards === undefined) {
            console.warn('missing cards calling cardsFromJSON');
            return [];
        }
        const result = [];
        cards.forEach((element) => {
            const card = this.getPreludeByName(element);
            if (card !== undefined) {
                result.push(card);
            }
            else {
                console.warn(`card ${element} not found while loading game.`);
            }
        });
        return result;
    }
    ceosFromJSON(cards) {
        if (cards === undefined) {
            console.warn('missing cards calling ceosFromJSON');
            return [];
        }
        const result = [];
        cards.forEach((element) => {
            const card = this.getCeoByName(element);
            if (card !== undefined) {
                result.push(card);
            }
            else {
                console.warn(`card ${element} not found while loading game.`);
            }
        });
        return result;
    }
    cardsFromJSON(cards) {
        if (cards === undefined) {
            console.warn('missing cards calling cardsFromJSON');
            return [];
        }
        const result = [];
        cards.forEach((element) => {
            const card = this.getProjectCardByName(element);
            if (card !== undefined) {
                result.push(card);
            }
            else {
                console.warn(`card ${element} not found while loading game.`);
            }
        });
        return result;
    }
    corporationCardsFromJSON(cards) {
        if (cards === undefined) {
            console.warn('missing cards calling corporationCardsFromJSON');
            return [];
        }
        const result = [];
        cards.forEach((element) => {
            const card = this.getCorporationCardByName(element);
            if (card !== undefined) {
                result.push(card);
            }
            else {
                console.warn(`corporation ${element} not found while loading game.`);
            }
        });
        return result;
    }
}
exports.CardFinder = CardFinder;
