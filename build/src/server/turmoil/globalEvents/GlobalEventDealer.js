"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEventDealer = exports.getGlobalEventByName = exports.initializeGlobalEventDealer = void 0;
const ModuleManifest_1 = require("../../cards/ModuleManifest");
const ICardFactory_1 = require("../../cards/ICardFactory");
const shuffle_1 = require("../../utils/shuffle");
const RENAMED_GLOBAL_EVENTS = [];
const ALL_EVENTS = new Map();
const ALL_MODULE_MANIFESTS = [];
function initializeGlobalEventDealer(allModuleManifests) {
    if (ALL_EVENTS.size > 0) {
        return;
    }
    ALL_MODULE_MANIFESTS.push(...allModuleManifests);
    for (const manifest of allModuleManifests) {
        for (const card of ModuleManifest_1.GlobalEventManifest.entries(manifest.globalEvents)) {
            ALL_EVENTS.set(card[0], card[1].Factory);
        }
    }
    for (const card of RENAMED_GLOBAL_EVENTS) {
        ALL_EVENTS.set(card[0], card[1]);
    }
}
exports.initializeGlobalEventDealer = initializeGlobalEventDealer;
function getGlobalEventByName(globalEventName) {
    const Factory = ALL_EVENTS.get(globalEventName);
    if (Factory !== undefined)
        return new Factory();
    console.warn(`unable to find global event ${globalEventName}`);
    return undefined;
}
exports.getGlobalEventByName = getGlobalEventByName;
class GlobalEventDealer {
    constructor(deck, discards) {
        this.deck = deck;
        this.discards = discards;
    }
    static newInstance(game) {
        const events = [];
        const gameOptions = game.gameOptions;
        const includes = {
            base: true,
            corpera: gameOptions.corporateEra,
            prelude: gameOptions.preludeExtension,
            prelude2: gameOptions.prelude2Expansion,
            league: gameOptions.leagueCardsOption,
            venus: gameOptions.venusNextExtension,
            colonies: gameOptions.coloniesExtension,
            turmoil: gameOptions.turmoilExtension,
            ares: gameOptions.aresExtension,
            promo: gameOptions.promoCardsOption,
            community: gameOptions.communityCardsOption,
            moon: gameOptions.moonExpansion,
            pathfinders: gameOptions.pathfindersExpansion,
            ceo: gameOptions.ceoExtension,
            starwars: gameOptions.starWarsExpansion,
            underworld: gameOptions.underworldExpansion,
        };
        for (const manifest of ALL_MODULE_MANIFESTS) {
            if (includes[manifest.module] !== true) {
                continue;
            }
            for (const card of ModuleManifest_1.GlobalEventManifest.entries(manifest.globalEvents)) {
                const factory = card[1];
                if (game.gameOptions.removeNegativeGlobalEventsOption && factory.negative === true) {
                    continue;
                }
                if ((0, ICardFactory_1.isCompatibleWith)(factory, game.gameOptions)) {
                    events.push(new factory.Factory());
                }
            }
        }
        (0, shuffle_1.inplaceShuffle)(events, game.rng);
        return new GlobalEventDealer(events, []);
    }
    draw() {
        return this.deck.pop();
    }
    discard(globalEvent) {
        this.discards.push(globalEvent);
    }
    serialize() {
        return {
            deck: this.deck.map((card) => card.name),
            discarded: this.discards.map((card) => card.name),
        };
    }
    static deserialize(d) {
        const deck = [];
        d.deck.forEach((element) => {
            const globalEvent = getGlobalEventByName(element);
            if (globalEvent !== undefined)
                deck.push(globalEvent);
        });
        const discardPile = [];
        d.discarded.forEach((element) => {
            const globalEvent = getGlobalEventByName(element);
            if (globalEvent !== undefined)
                discardPile.push(globalEvent);
        });
        return new GlobalEventDealer(deck, discardPile);
    }
}
exports.GlobalEventDealer = GlobalEventDealer;
