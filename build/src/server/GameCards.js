"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCards = void 0;
const ColoniesCardManifest_1 = require("./cards/colonies/ColoniesCardManifest");
const NonColoniesCardManifest_1 = require("./cards/colonies/NonColoniesCardManifest");
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
const LeagueCardManifest_1 = require("./cards/.league/LeagueCardManifest");
const ModuleManifest_1 = require("./cards/ModuleManifest");
const CardName_1 = require("../common/cards/CardName");
const ICardFactory_1 = require("./cards/ICardFactory");
const IProjectCard_1 = require("./cards/IProjectCard");
const createCard_1 = require("./createCard");
const Prelude2CardManifest_1 = require("./cards/prelude2/Prelude2CardManifest");
const StarwarsCardManifest_1 = require("./cards/starwars/StarwarsCardManifest");
const UnderworldCardManifest_1 = require("./cards/underworld/UnderworldCardManifest");
class GameCards {
    constructor(gameOptions) {
        this.gameOptions = gameOptions;
        const manifests = [
            [true, StandardCardManifests_1.BASE_CARD_MANIFEST],
            [gameOptions.corporateEra, StandardCardManifests_1.CORP_ERA_CARD_MANIFEST],
            [gameOptions.preludeExtension, PreludeCardManifest_1.PRELUDE_CARD_MANIFEST],
            [gameOptions.prelude2Expansion, Prelude2CardManifest_1.PRELUDE2_CARD_MANIFEST],
            [gameOptions.leagueCardsOption, LeagueCardManifest_1.LEAGUE_CARD_MANIFEST],
            [gameOptions.venusNextExtension, VenusCardManifest_1.VENUS_CARD_MANIFEST],
            [gameOptions.coloniesExtension, ColoniesCardManifest_1.COLONIES_CARD_MANIFEST],
            [!gameOptions.coloniesExtension, NonColoniesCardManifest_1.NON_COLONIES_CARD_MANIFEST],
            [gameOptions.turmoilExtension, TurmoilCardManifest_1.TURMOIL_CARD_MANIFEST],
            [gameOptions.aresExtension, AresCardManifest_1.ARES_CARD_MANIFEST],
            [gameOptions.promoCardsOption, PromoCardManifest_1.PROMO_CARD_MANIFEST],
            [gameOptions.communityCardsOption, CommunityCardManifest_1.COMMUNITY_CARD_MANIFEST],
            [gameOptions.moonExpansion, MoonCardManifest_1.MOON_CARD_MANIFEST],
            [gameOptions.pathfindersExpansion, PathfindersCardManifest_1.PATHFINDERS_CARD_MANIFEST],
            [gameOptions.ceoExtension, CeoCardManifest_1.CEO_CARD_MANIFEST],
            [gameOptions.starWarsExpansion, StarwarsCardManifest_1.STAR_WARS_CARD_MANIFEST],
            [gameOptions.underworldExpansion, UnderworldCardManifest_1.UNDERWORLD_CARD_MANIFEST],
        ];
        this.moduleManifests = manifests
            .filter(([option, _manifest]) => option === true)
            .map(([_option, manifest]) => manifest);
    }
    instantiate(manifest) {
        return ModuleManifest_1.CardManifest.values(manifest)
            .filter((factory) => factory.instantiate !== false)
            .filter((factory) => (0, ICardFactory_1.isCompatibleWith)(factory, this.gameOptions))
            .map((factory) => new factory.Factory());
    }
    getProjectCards() {
        const cards = this.getCards('projectCards');
        const cardsWithIncludedCards = this.addCustomCards(cards, this.gameOptions.includedCards);
        return cardsWithIncludedCards.filter(IProjectCard_1.isIProjectCard);
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
                const card = (0, createCard_1.newCard)(cardName);
                if (card === undefined) {
                    console.warn(`Unknown card: ${cardName}`);
                }
                else {
                    cards.push(card);
                }
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
        cards = this.includeExtraCards(cards, cards);
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
    includeExtraCards(cards, extraCards) {
        for (const card of extraCards) {
            if (!cards.find((existingCard) => existingCard.name === card.name)) {
                cards.push(card);
            }
        }
        return cards;
    }
}
exports.GameCards = GameCards;
