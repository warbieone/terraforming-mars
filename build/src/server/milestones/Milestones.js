"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMilestoneByNameOrThrow = exports.getMilestoneByName = exports.ALL_MILESTONES = exports.MODULAR_MILESTONES = exports.UNDERWORLD_MILESTONES = exports.VASTITAS_BOREALIS_MILESTONES = exports.TERRA_CIMMERIA_MILESTONES = exports.ARABIA_TERRA_MILESTONES = exports.AMAZONIS_PLANITIA_MILESTONES = exports.MOON_MILESTONES = exports.ARES_MILESTONES = exports.HELLAS_MILESTONES = exports.UTOPIA_PLANITIA_MILESTONES = exports.ELYSIUM_MILESTONES = exports.VENUS_MILESTONES = exports.THARSIS_MILESTONES = void 0;
const Terraformer_1 = require("./Terraformer");
const Mayor_1 = require("./Mayor");
const Gardener_1 = require("./Gardener");
const Builder_1 = require("./Builder");
const Planner_1 = require("./Planner");
const Hoverlord_1 = require("./Hoverlord");
const Generalist_1 = require("./Generalist");
const Specialist_1 = require("./Specialist");
const Ecologist_1 = require("./Ecologist");
const Tycoon_1 = require("./Tycoon");
const Legend_1 = require("./Legend");
const Diversifier_1 = require("./Diversifier");
const Tactician_1 = require("./Tactician");
const PolarExplorer_1 = require("./PolarExplorer");
const Energizer_1 = require("./Energizer");
const RimSettler_1 = require("./RimSettler");
const Networker_1 = require("./Networker");
const OneGiantStep_1 = require("../moon/OneGiantStep");
const Lunarchitect_1 = require("../moon/Lunarchitect");
const Economizer_1 = require("./arabiaTerra/Economizer");
const Pioneer_1 = require("./arabiaTerra/Pioneer");
const LandSpecialist_1 = require("./arabiaTerra/LandSpecialist");
const Martian_1 = require("./arabiaTerra/Martian");
const Businessperson_1 = require("./arabiaTerra/Businessperson");
const Capitalist_1 = require("./Capitalist");
const Electrician_1 = require("./Electrician");
const Irrigator_1 = require("./Irrigator");
const Smith_1 = require("./Smith");
const Tradesman_1 = require("./Tradesman");
const Colonizer_1 = require("./amazonisPlanitia/Colonizer");
const Farmer_1 = require("./amazonisPlanitia/Farmer");
const Minimalist_1 = require("./amazonisPlanitia/Minimalist");
const Terran_1 = require("./amazonisPlanitia/Terran");
const Tropicalist_1 = require("./amazonisPlanitia/Tropicalist");
const Collector_1 = require("./terraCimmeria/Collector");
const Firestarter_1 = require("./terraCimmeria/Firestarter");
const Gambler_1 = require("./terraCimmeria/Gambler");
const Spacefarer_1 = require("./terraCimmeria/Spacefarer");
const TerraPioneer_1 = require("./terraCimmeria/TerraPioneer");
const Risktaker_1 = require("./underworld/Risktaker");
const Tunneler_1 = require("./underworld/Tunneler");
const Fundraiser_1 = require("./modular/Fundraiser");
const Geologist_1 = require("./modular/Geologist");
const Landshaper_1 = require("./modular/Landshaper");
const Philantropist_1 = require("./modular/Philantropist");
const Planetologist_1 = require("./modular/Planetologist");
const Producer_1 = require("./modular/Producer");
const Researcher_1 = require("./modular/Researcher");
const Sponsor_1 = require("./modular/Sponsor");
const Lobbyist_1 = require("./modular/Lobbyist");
const Breeder_1 = require("./modular/Breeder");
const ThermoEngineer_1 = require("./modular/ThermoEngineer");
const Hydrologist_1 = require("./modular/Hydrologist");
const Thawer_1 = require("./modular/Thawer");
exports.THARSIS_MILESTONES = [
    new Terraformer_1.Terraformer(),
    new Mayor_1.Mayor(),
    new Gardener_1.Gardener(),
    new Builder_1.Builder(),
    new Planner_1.Planner(),
];
exports.VENUS_MILESTONES = [
    new Hoverlord_1.Hoverlord(),
];
exports.ELYSIUM_MILESTONES = [
    new Generalist_1.Generalist(),
    new Specialist_1.Specialist(),
    new Ecologist_1.Ecologist(),
    new Tycoon_1.Tycoon(),
    new Legend_1.Legend(),
];
exports.UTOPIA_PLANITIA_MILESTONES = [];
exports.HELLAS_MILESTONES = [
    new Diversifier_1.Diversifier(),
    new Tactician_1.Tactician(),
    new PolarExplorer_1.PolarExplorer(),
    new Energizer_1.Energizer(),
    new RimSettler_1.RimSettler(),
];
exports.ARES_MILESTONES = [
    new Networker_1.Networker(),
];
exports.MOON_MILESTONES = [
    new OneGiantStep_1.OneGiantStep(),
    new Lunarchitect_1.Lunarchitect(),
];
exports.AMAZONIS_PLANITIA_MILESTONES = [
    new Colonizer_1.Colonizer(),
    new Farmer_1.Farmer(),
    new Minimalist_1.Minimalist(),
    new Terran_1.Terran(),
    new Tropicalist_1.Tropicalist(),
];
exports.ARABIA_TERRA_MILESTONES = [
    new Economizer_1.Economizer(),
    new Pioneer_1.Pioneer(),
    new LandSpecialist_1.LandSpecialist(),
    new Martian_1.Martian(),
    new Businessperson_1.Businessperson(),
];
exports.TERRA_CIMMERIA_MILESTONES = [
    new Collector_1.Collector(),
    new Firestarter_1.Firestarter(),
    new TerraPioneer_1.TerraPioneer(),
    new Spacefarer_1.Spacefarer(),
    new Gambler_1.Gambler(),
];
exports.VASTITAS_BOREALIS_MILESTONES = [
    new Electrician_1.Electrician(),
    new Smith_1.Smith(),
    new Tradesman_1.Tradesman(),
    new Irrigator_1.Irrigator(),
    new Capitalist_1.Capitalist(),
];
exports.UNDERWORLD_MILESTONES = [
    new Risktaker_1.Risktaker(),
    new Tunneler_1.Tunneler(),
];
exports.MODULAR_MILESTONES = [
    new Breeder_1.Breeder(),
    new Fundraiser_1.Fundraiser(),
    new Geologist_1.Geologist(),
    new Hydrologist_1.Hydrologist(),
    new Landshaper_1.Landshaper(),
    new Lobbyist_1.Lobbyist(),
    new Philantropist_1.Philantropist(),
    new Planetologist_1.Planetologist(),
    new Producer_1.Producer(),
    new Researcher_1.Researcher(),
    new Sponsor_1.Sponsor(),
    new Thawer_1.Thawer(),
    new ThermoEngineer_1.ThermoEngineer(),
];
exports.ALL_MILESTONES = [
    ...exports.THARSIS_MILESTONES,
    ...exports.ELYSIUM_MILESTONES,
    ...exports.HELLAS_MILESTONES,
    ...exports.UTOPIA_PLANITIA_MILESTONES,
    ...exports.VENUS_MILESTONES,
    ...exports.ARES_MILESTONES,
    ...exports.MOON_MILESTONES,
    ...exports.AMAZONIS_PLANITIA_MILESTONES,
    ...exports.ARABIA_TERRA_MILESTONES,
    ...exports.TERRA_CIMMERIA_MILESTONES,
    ...exports.VASTITAS_BOREALIS_MILESTONES,
    ...exports.UNDERWORLD_MILESTONES,
    ...exports.MODULAR_MILESTONES,
];
function getMilestoneByName(name) {
    return exports.ALL_MILESTONES.find((m) => m.name === name);
}
exports.getMilestoneByName = getMilestoneByName;
function getMilestoneByNameOrThrow(name) {
    const milestone = getMilestoneByName(name);
    if (milestone) {
        return milestone;
    }
    throw new Error(`Milestone ${name} not found.`);
}
exports.getMilestoneByNameOrThrow = getMilestoneByNameOrThrow;
