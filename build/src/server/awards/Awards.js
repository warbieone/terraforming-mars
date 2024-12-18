"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwardByNameOrThrow = exports.getAwardByName = exports.ALL_AWARDS = exports.MODULAR_AWARDS = exports.UNDERWORLD_AWARDS = exports.VASTITAS_BOREALIS_AWARDS = exports.TERRA_CIMMERIA_AWARDS = exports.ARABIA_TERRA_AWARDS = exports.AMAZONIS_PLANITIA_AWARDS = exports.MOON_AWARDS = exports.ARES_AWARDS = exports.HELLAS_AWARDS = exports.UTOPIA_PLANITIA_AWARDS = exports.ELYSIUM_AWARDS = exports.VENUS_AWARDS = exports.THARSIS_AWARDS = void 0;
const Landlord_1 = require("./Landlord");
const Banker_1 = require("./Banker");
const Scientist_1 = require("./Scientist");
const Thermalist_1 = require("./Thermalist");
const Miner_1 = require("./Miner");
const Venuphile_1 = require("./Venuphile");
const Industrialist_1 = require("./Industrialist");
const Celebrity_1 = require("./Celebrity");
const DesertSettler_1 = require("./DesertSettler");
const EstateDealer_1 = require("./EstateDealer");
const Benefactor_1 = require("./Benefactor");
const Cultivator_1 = require("./Cultivator");
const Magnate_1 = require("./Magnate");
const SpaceBaron_1 = require("./SpaceBaron");
const Excentric_1 = require("./Excentric");
const Contractor_1 = require("./Contractor");
const Entrepreneur_1 = require("./Entrepreneur");
const FullMoon_1 = require("../moon/FullMoon");
const LunarMagnate_1 = require("../moon/LunarMagnate");
const CosmicSettler_1 = require("./arabiaTerra/CosmicSettler");
const Botanist_1 = require("./arabiaTerra/Botanist");
const Coordinator_1 = require("./arabiaTerra/Coordinator");
const Zoologist_1 = require("./arabiaTerra/Zoologist");
const Manufacturer_1 = require("./arabiaTerra/Manufacturer");
const Adapter_1 = require("./Adapter");
const Edgedancer_1 = require("./Edgedancer");
const Hoarder_1 = require("./Hoarder");
const Naturalist_1 = require("./Naturalist");
const Voyager_1 = require("./Voyager");
const Curator_1 = require("./amazonisPlanitia/Curator");
const AmazonisEngineer_1 = require("./amazonisPlanitia/AmazonisEngineer");
const Tourist_1 = require("./amazonisPlanitia/Tourist");
const Biologist_1 = require("./terraCimmeria/Biologist");
const Economizer2_1 = require("./terraCimmeria/Economizer2");
const Politician_1 = require("./terraCimmeria/Politician");
const Urbanist_1 = require("./terraCimmeria/Urbanist");
const Warmonger_1 = require("./terraCimmeria/Warmonger");
const Zoologist_2 = require("./amazonisPlanitia/Zoologist");
const Kingpin_1 = require("./underworld/Kingpin");
const EdgeLord_1 = require("./underworld/EdgeLord");
const Administrator_1 = require("./modular/Administrator");
const Constructor_1 = require("./modular/Constructor");
const Founder_1 = require("./modular/Founder");
const Highlander_1 = require("./modular/Highlander");
const Investor_1 = require("./modular/Investor");
const Landscaper_1 = require("./modular/Landscaper");
const Metropolist_1 = require("./modular/Metropolist");
const Mogul_1 = require("./modular/Mogul");
const Traveller_1 = require("./modular/Traveller");
const Electrician_1 = require("./modular/Electrician");
const Collector_1 = require("./modular/Collector");
const Politician_2 = require("./modular/Politician");
const Manufacturer_2 = require("./modular/Manufacturer");
exports.THARSIS_AWARDS = [
    new Landlord_1.Landlord(),
    new Scientist_1.Scientist(),
    new Banker_1.Banker(),
    new Thermalist_1.Thermalist(),
    new Miner_1.Miner(),
];
exports.VENUS_AWARDS = [
    new Venuphile_1.Venuphile(),
];
exports.ELYSIUM_AWARDS = [
    new Celebrity_1.Celebrity(),
    new Industrialist_1.Industrialist(),
    new DesertSettler_1.DesertSettler(),
    new EstateDealer_1.EstateDealer(),
    new Benefactor_1.Benefactor(),
];
exports.UTOPIA_PLANITIA_AWARDS = [];
exports.HELLAS_AWARDS = [
    new Cultivator_1.Cultivator(),
    new Magnate_1.Magnate(),
    new SpaceBaron_1.SpaceBaron(),
    new Excentric_1.Excentric(),
    new Contractor_1.Contractor(),
];
exports.ARES_AWARDS = [
    new Entrepreneur_1.Entrepreneur(),
];
exports.MOON_AWARDS = [
    new FullMoon_1.FullMoon(),
    new LunarMagnate_1.LunarMagnate(),
];
exports.AMAZONIS_PLANITIA_AWARDS = [
    new Curator_1.Curator(),
    new AmazonisEngineer_1.AmazonisEngineer(),
    new Coordinator_1.Coordinator(),
    new Tourist_1.Tourist(),
    new Zoologist_2.Zoologist2(),
];
exports.ARABIA_TERRA_AWARDS = [
    new CosmicSettler_1.CosmicSettler(),
    new Botanist_1.Botanist(),
    new Coordinator_1.Coordinator(),
    new Zoologist_1.Zoologist(),
    new Manufacturer_1.AManufacturer(),
];
exports.TERRA_CIMMERIA_AWARDS = [
    new Biologist_1.Biologist(),
    new Economizer2_1.Economizer2(),
    new Politician_1.TPolitician(),
    new Urbanist_1.Urbanist(),
    new Warmonger_1.Warmonger(),
];
exports.VASTITAS_BOREALIS_AWARDS = [
    new Adapter_1.Adapter(),
    new Edgedancer_1.Edgedancer(),
    new Hoarder_1.Hoarder(),
    new Naturalist_1.Naturalist(),
    new Voyager_1.Voyager(),
];
exports.UNDERWORLD_AWARDS = [
    new Kingpin_1.Kingpin(),
    new EdgeLord_1.EdgeLord(),
];
exports.MODULAR_AWARDS = [
    new Administrator_1.Administrator(),
    new Collector_1.Collector(),
    new Constructor_1.Constructor(),
    new Electrician_1.Electrician(),
    new Founder_1.Founder(),
    new Highlander_1.Highlander(),
    new Investor_1.Investor(),
    new Landscaper_1.Landscaper(),
    new Manufacturer_2.Manufacturer(),
    new Metropolist_1.Metropolist(),
    new Mogul_1.Mogul(),
    new Politician_2.Politician(),
    new Traveller_1.Traveller(),
];
exports.ALL_AWARDS = [
    ...exports.THARSIS_AWARDS,
    ...exports.ELYSIUM_AWARDS,
    ...exports.HELLAS_AWARDS,
    ...exports.UTOPIA_PLANITIA_AWARDS,
    ...exports.VENUS_AWARDS,
    ...exports.ARES_AWARDS,
    ...exports.MOON_AWARDS,
    ...exports.AMAZONIS_PLANITIA_AWARDS,
    ...exports.ARABIA_TERRA_AWARDS,
    ...exports.TERRA_CIMMERIA_AWARDS,
    ...exports.VASTITAS_BOREALIS_AWARDS,
    ...exports.UNDERWORLD_AWARDS,
    ...exports.MODULAR_AWARDS,
];
function getAwardByName(name) {
    return exports.ALL_AWARDS.find((a) => a.name === name);
}
exports.getAwardByName = getAwardByName;
function getAwardByNameOrThrow(name) {
    const award = getAwardByName(name);
    if (award) {
        return award;
    }
    throw new Error(`Award ${name} not found.`);
}
exports.getAwardByNameOrThrow = getAwardByNameOrThrow;
