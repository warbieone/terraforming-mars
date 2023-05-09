"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEventDealer = exports.getGlobalEventModule = exports.getGlobalEventByName = exports.ALL_EVENTS = void 0;
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const GlobalDustStorm_1 = require("./GlobalDustStorm");
const SponsoredProjects_1 = require("./SponsoredProjects");
const AsteroidMining_1 = require("./AsteroidMining");
const GenerousFunding_1 = require("./GenerousFunding");
const SuccessfulOrganisms_1 = require("./SuccessfulOrganisms");
const Productivity_1 = require("./Productivity");
const EcoSabotage_1 = require("./EcoSabotage");
const HomeworldSupport_1 = require("./HomeworldSupport");
const MinersOnStrike_1 = require("./MinersOnStrike");
const MudSlides_1 = require("./MudSlides");
const Revolution_1 = require("./Revolution");
const Riots_1 = require("./Riots");
const Sabotage_1 = require("./Sabotage");
const SnowCover_1 = require("./SnowCover");
const VolcanicEruptions_1 = require("./VolcanicEruptions");
const InterplanetaryTrade_1 = require("./InterplanetaryTrade");
const ImprovedEnergyTemplates_1 = require("./ImprovedEnergyTemplates");
const WarOnEarth_1 = require("./WarOnEarth");
const Pandemic_1 = require("./Pandemic");
const Diversity_1 = require("./Diversity");
const CelebrityLeaders_1 = require("./CelebrityLeaders");
const SpinoffProducts_1 = require("./SpinoffProducts");
const Election_1 = require("./Election");
const AquiferReleasedByPublicCouncil_1 = require("./AquiferReleasedByPublicCouncil");
const ParadigmBreakdown_1 = require("./ParadigmBreakdown");
const CorrosiveRain_1 = require("./CorrosiveRain");
const JovianTaxRights_1 = require("./JovianTaxRights");
const DryDeserts_1 = require("./DryDeserts");
const ScientificCommunity_1 = require("./ScientificCommunity");
const RedInfluence_1 = require("./RedInfluence");
const SolarnetShutdown_1 = require("./SolarnetShutdown");
const StrongSociety_1 = require("./StrongSociety");
const SolarFlare_1 = require("./SolarFlare");
const VenusInfrastructure_1 = require("./VenusInfrastructure");
const CloudSocieties_1 = require("./CloudSocieties");
const MicrogravityHealthProblems_1 = require("./MicrogravityHealthProblems");
const LeadershipSummit_1 = require("./LeadershipSummit");
const BalancedDevelopment_1 = require("./BalancedDevelopment");
const TiredEarth_1 = require("./TiredEarth");
const MagneticFieldStimulationDelays_1 = require("./MagneticFieldStimulationDelays");
const ConstantStruggle_1 = require("./ConstantStruggle");
const SpaceRaceToMars_1 = require("./SpaceRaceToMars");
const CommunicationBoom_1 = require("./CommunicationBoom");
const COLONY_ONLY_POSITIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.JOVIAN_TAX_RIGHTS, JovianTaxRights_1.JovianTaxRights],
]);
const COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.MICROGRAVITY_HEALTH_PROBLEMS, MicrogravityHealthProblems_1.MicrogravityHealthProblems],
]);
const VENUS_COLONY_POSITIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.CLOUD_SOCIETIES, CloudSocieties_1.CloudSocieties],
]);
const VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.CORROSIVE_RAIN, CorrosiveRain_1.CorrosiveRain],
]);
const VENUS_POSITIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.VENUS_INFRASTRUCTURE, VenusInfrastructure_1.VenusInfrastructure],
]);
const POSITIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.SPONSORED_PROJECTS, SponsoredProjects_1.SponsoredProjects],
    [GlobalEventName_1.GlobalEventName.ASTEROID_MINING, AsteroidMining_1.AsteroidMining],
    [GlobalEventName_1.GlobalEventName.GENEROUS_FUNDING, GenerousFunding_1.GenerousFunding],
    [GlobalEventName_1.GlobalEventName.SUCCESSFUL_ORGANISMS, SuccessfulOrganisms_1.SuccessfulOrganisms],
    [GlobalEventName_1.GlobalEventName.PRODUCTIVITY, Productivity_1.Productivity],
    [GlobalEventName_1.GlobalEventName.HOMEWORLD_SUPPORT, HomeworldSupport_1.HomeworldSupport],
    [GlobalEventName_1.GlobalEventName.VOLCANIC_ERUPTIONS, VolcanicEruptions_1.VolcanicEruptions],
    [GlobalEventName_1.GlobalEventName.DIVERSITY, Diversity_1.Diversity],
    [GlobalEventName_1.GlobalEventName.IMPROVED_ENERGY_TEMPLATES, ImprovedEnergyTemplates_1.ImprovedEnergyTemplates],
    [GlobalEventName_1.GlobalEventName.INTERPLANETARY_TRADE, InterplanetaryTrade_1.InterplanetaryTrade],
    [GlobalEventName_1.GlobalEventName.CELEBRITY_LEADERS, CelebrityLeaders_1.CelebrityLeaders],
    [GlobalEventName_1.GlobalEventName.SPINOFF_PRODUCTS, SpinoffProducts_1.SpinoffProducts],
    [GlobalEventName_1.GlobalEventName.ELECTION, Election_1.Election],
    [GlobalEventName_1.GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL, AquiferReleasedByPublicCouncil_1.AquiferReleasedByPublicCouncil],
    [GlobalEventName_1.GlobalEventName.SCIENTIFIC_COMMUNITY, ScientificCommunity_1.ScientificCommunity],
    [GlobalEventName_1.GlobalEventName.STRONG_SOCIETY, StrongSociety_1.StrongSociety],
]);
const NEGATIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.GLOBAL_DUST_STORM, GlobalDustStorm_1.GlobalDustStorm],
    [GlobalEventName_1.GlobalEventName.ECO_SABOTAGE, EcoSabotage_1.EcoSabotage],
    [GlobalEventName_1.GlobalEventName.MINERS_ON_STRIKE, MinersOnStrike_1.MinersOnStrike],
    [GlobalEventName_1.GlobalEventName.MUD_SLIDES, MudSlides_1.MudSlides],
    [GlobalEventName_1.GlobalEventName.REVOLUTION, Revolution_1.Revolution],
    [GlobalEventName_1.GlobalEventName.RIOTS, Riots_1.Riots],
    [GlobalEventName_1.GlobalEventName.SABOTAGE, Sabotage_1.Sabotage],
    [GlobalEventName_1.GlobalEventName.SNOW_COVER, SnowCover_1.SnowCover],
    [GlobalEventName_1.GlobalEventName.PANDEMIC, Pandemic_1.Pandemic],
    [GlobalEventName_1.GlobalEventName.WAR_ON_EARTH, WarOnEarth_1.WarOnEarth],
    [GlobalEventName_1.GlobalEventName.PARADIGM_BREAKDOWN, ParadigmBreakdown_1.ParadigmBreakdown],
    [GlobalEventName_1.GlobalEventName.DRY_DESERTS, DryDeserts_1.DryDeserts],
    [GlobalEventName_1.GlobalEventName.RED_INFLUENCE, RedInfluence_1.RedInfluence],
    [GlobalEventName_1.GlobalEventName.SOLARNET_SHUTDOWN, SolarnetShutdown_1.SolarnetShutdown],
    [GlobalEventName_1.GlobalEventName.SOLAR_FLARE, SolarFlare_1.SolarFlare],
]);
const COMMUNITY_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.LEADERSHIP_SUMMIT, LeadershipSummit_1.LeadershipSummit],
]);
const PATHFINDERS_POSITIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.BALANCED_DEVELOPMENT, BalancedDevelopment_1.BalancedDevelopment],
    [GlobalEventName_1.GlobalEventName.SPACE_RACE_TO_MARS, SpaceRaceToMars_1.SpaceRaceToMars],
]);
const PATHFINDERS_NEGATIVE_GLOBAL_EVENTS = new Map([
    [GlobalEventName_1.GlobalEventName.CONSTANT_STRUGGLE, ConstantStruggle_1.ConstantStruggle],
    [GlobalEventName_1.GlobalEventName.TIRED_EARTH, TiredEarth_1.TiredEarth],
    [GlobalEventName_1.GlobalEventName.MAGNETIC_FIELD_STIMULATION_DELAYS, MagneticFieldStimulationDelays_1.MagneticFieldStimulationDelays],
    [GlobalEventName_1.GlobalEventName.COMMUNICATION_BOOM, CommunicationBoom_1.CommunicationBoom],
]);
const RENAMED_GLOBAL_EVENTS = new Map([]);
exports.ALL_EVENTS = new Map([
    ...Array.from(POSITIVE_GLOBAL_EVENTS),
    ...Array.from(NEGATIVE_GLOBAL_EVENTS),
    ...Array.from(COLONY_ONLY_POSITIVE_GLOBAL_EVENTS),
    ...Array.from(COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS),
    ...Array.from(VENUS_COLONY_POSITIVE_GLOBAL_EVENTS),
    ...Array.from(VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS),
    ...Array.from(VENUS_POSITIVE_GLOBAL_EVENTS),
    ...Array.from(COMMUNITY_GLOBAL_EVENTS),
    ...Array.from(RENAMED_GLOBAL_EVENTS),
    ...Array.from(PATHFINDERS_POSITIVE_GLOBAL_EVENTS),
    ...Array.from(PATHFINDERS_NEGATIVE_GLOBAL_EVENTS),
]);
function getGlobalEventByName(globalEventName) {
    const Factory = exports.ALL_EVENTS.get(globalEventName);
    if (Factory !== undefined)
        return new Factory();
    console.warn(`unable to find global event ${globalEventName}`);
    return undefined;
}
exports.getGlobalEventByName = getGlobalEventByName;
function getGlobalEventModule(name) {
    if (PATHFINDERS_POSITIVE_GLOBAL_EVENTS.has(name))
        return 'pathfinders';
    if (PATHFINDERS_NEGATIVE_GLOBAL_EVENTS.has(name))
        return 'pathfinders';
    if (COMMUNITY_GLOBAL_EVENTS.has(name))
        return 'community';
    return 'turmoil';
}
exports.getGlobalEventModule = getGlobalEventModule;
class GlobalEventDealer {
    constructor(globalEventsDeck, discardedGlobalEvents) {
        this.globalEventsDeck = globalEventsDeck;
        this.discardedGlobalEvents = discardedGlobalEvents;
    }
    static newInstance(game) {
        const events = Array.from(POSITIVE_GLOBAL_EVENTS);
        if (!game.gameOptions.removeNegativeGlobalEventsOption) {
            events.push(...Array.from(NEGATIVE_GLOBAL_EVENTS));
            if (game.gameOptions.coloniesExtension)
                events.push(...Array.from(COLONY_ONLY_NEGATIVE_GLOBAL_EVENTS));
            if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
                events.push(...Array.from(VENUS_COLONY_NEGATIVE_GLOBAL_EVENTS));
            }
        }
        if (game.gameOptions.venusNextExtension)
            events.push(...Array.from(VENUS_POSITIVE_GLOBAL_EVENTS));
        if (game.gameOptions.coloniesExtension)
            events.push(...Array.from(COLONY_ONLY_POSITIVE_GLOBAL_EVENTS));
        if (game.gameOptions.venusNextExtension && game.gameOptions.coloniesExtension) {
            events.push(...Array.from(VENUS_COLONY_POSITIVE_GLOBAL_EVENTS));
        }
        if (game.gameOptions.communityCardsOption)
            events.push(...Array.from(COMMUNITY_GLOBAL_EVENTS));
        if (game.gameOptions.pathfindersExpansion) {
            events.push(...Array.from(PATHFINDERS_POSITIVE_GLOBAL_EVENTS));
            if (!game.gameOptions.removeNegativeGlobalEventsOption) {
                events.push(...Array.from(PATHFINDERS_NEGATIVE_GLOBAL_EVENTS));
            }
        }
        const globalEventsDeck = this.shuffle(events.map((cf) => new cf[1]));
        return new GlobalEventDealer(globalEventsDeck, []);
    }
    static shuffle(cards) {
        const deck = [];
        const copy = cards.slice();
        while (copy.length) {
            deck.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
        }
        return deck;
    }
    draw() {
        return this.globalEventsDeck.pop();
    }
    serialize() {
        return {
            deck: this.globalEventsDeck.map((card) => card.name),
            discarded: this.discardedGlobalEvents.map((card) => card.name),
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
