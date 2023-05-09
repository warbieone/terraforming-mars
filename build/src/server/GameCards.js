"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCards = void 0;
const ColoniesCardManifest_1 = require("./cards/colonies/ColoniesCardManifest");
const PreludeCardManifest_1 = require("./cards/prelude/PreludeCardManifest");
const PromoCardManifest_1 = require("./cards/promo/PromoCardManifest");
const StandardCardManifests_1 = require("./cards/StandardCardManifests");
const TurmoilCardManifest_1 = require("./cards/turmoil/TurmoilCardManifest");
const VenusCardManifest_1 = require("./cards/venusNext/VenusCardManifest");
const CommunityCardManifest_1 = require("./cards/community/CommunityCardManifest");
const AresCardManifest_1 = require("./cards/ares/AresCardManifest");
const MoonCardManifest_1 = require("./cards/moon/MoonCardManifest");
const PathfindersCardManifest_1 = require("./cards/pathfinders/PathfindersCardManifest");
const CeoCardManifest_1 = require("./cards/ceos/CeoCardManifest");
const ModuleManifest_1 = require("./cards/ModuleManifest");
const CardName_1 = require("../common/cards/CardName");
const CardFinder_1 = require("./CardFinder");
class GameCards {
    constructor(gameOptions) {
        this.cardFinder = new CardFinder_1.CardFinder();
        this.gameOptions = gameOptions;
        const manifests = [
            [true, StandardCardManifests_1.BASE_CARD_MANIFEST],
            [gameOptions.corporateEra, StandardCardManifests_1.CORP_ERA_CARD_MANIFEST],
            [gameOptions.preludeExtension, PreludeCardManifest_1.PRELUDE_CARD_MANIFEST],
            [gameOptions.venusNextExtension, VenusCardManifest_1.VENUS_CARD_MANIFEST],
            [gameOptions.coloniesExtension, ColoniesCardManifest_1.COLONIES_CARD_MANIFEST],
            [gameOptions.turmoilExtension, TurmoilCardManifest_1.TURMOIL_CARD_MANIFEST],
            [gameOptions.aresExtension, AresCardManifest_1.ARES_CARD_MANIFEST],
            [gameOptions.promoCardsOption, PromoCardManifest_1.PROMO_CARD_MANIFEST],
            [gameOptions.communityCardsOption, CommunityCardManifest_1.COMMUNITY_CARD_MANIFEST],
            [gameOptions.moonExpansion, MoonCardManifest_1.MOON_CARD_MANIFEST],
            [gameOptions.pathfindersExpansion, PathfindersCardManifest_1.PATHFINDERS_CARD_MANIFEST],
            [gameOptions.ceoExtension, CeoCardManifest_1.CEO_CARD_MANIFEST],
        ];
        this.moduleManifests = manifests.filter((a) => a[0]).map((a) => a[1]);
    }
    static isCompatibleWith(cf, gameOptions) {
        if (cf.compatibility === undefined) {
            return true;
        }
        const expansions = Array.isArray(cf.compatibility) ? cf.compatibility : [cf.compatibility];
        return expansions.every((expansion) => {
            switch (expansion) {
                case 'venus':
                    return gameOptions.venusNextExtension;
                case 'colonies':
                    return gameOptions.coloniesExtension;
                case 'turmoil':
                    return gameOptions.turmoilExtension;
                case 'prelude':
                    return gameOptions.preludeExtension;
                case 'moon':
                    return gameOptions.moonExpansion;
                case 'pathfinders':
                    return gameOptions.pathfindersExpansion;
                case 'ares':
                    return gameOptions.aresExtension;
                case 'ceo':
                    return gameOptions.ceoExtension;
                default:
                    throw new Error(`Unhandled expansion type ${expansion}`);
            }
        });
    }
    instantiate(manifest) {
        return ModuleManifest_1.CardManifest.values(manifest)
            .filter((factory) => factory.instantiate !== false)
            .filter((factory) => GameCards.isCompatibleWith(factory, this.gameOptions))
            .map((factory) => new factory.Factory());
    }
    getProjectCards() {
        return this.getCards('projectCards');
    }
    getStandardProjects() {
        return this.getCards('standardProjects');
    }
    getCorporationCards() {
        const cards = this.getCards('corporationCards')
            .filter((card) => card.name !== CardName_1.CardName.BEGINNER_CORPORATION);
        return this.addCustomCards(cards, this.gameOptions.customCorporationsList);
    }
    getPreludeCards() {
        let preludes = this.getCards('preludeCards');
        if (preludes.length === 0) {
            preludes = this.instantiate(PreludeCardManifest_1.PRELUDE_CARD_MANIFEST.preludeCards);
        }
        preludes = this.addCustomCards(preludes, this.gameOptions.customPreludes);
        if (this.gameOptions.twoCorpsVariant) {
            preludes = preludes.filter((c) => c.name !== CardName_1.CardName.MERGER);
        }
        return preludes;
    }
    getCeoCards() {
        let ceos = this.getCards('ceoCards');
        ceos = this.addCustomCards(ceos, this.gameOptions.customCeos);
        return ceos;
    }
    addCustomCards(cards, customList = []) {
        for (const cardName of customList) {
            const idx = cards.findIndex((c) => c.name === cardName);
            if (idx === -1) {
                const card = this.cardFinder.getCardByName(cardName);
                if (card === undefined) {
                    console.warn(`Unknown card: ${cardName}`);
                }
                cards.push(card);
            }
        }
        return cards;
    }
    getCards(cardManifestName) {
        let cards = [];
        for (const moduleManifest of this.moduleManifests) {
            const cardManifest = moduleManifest[cardManifestName];
            cards.push(...this.instantiate(cardManifest));
        }
        cards = this.filterBannedCards(cards);
        cards = this.filterReplacedCards(cards);
        return cards;
    }
    filterBannedCards(cards) {
        return cards.filter((card) => {
            return this.gameOptions.bannedCards.includes(card.name) !== true;
        });
    }
    filterReplacedCards(cards) {
        return cards.filter((card) => {
            for (const manifest of this.moduleManifests) {
                if (manifest.cardsToRemove.has(card.name))
                    return false;
            }
            return true;
        });
    }
}
exports.GameCards = GameCards;
