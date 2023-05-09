"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOON_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AIControlledMineNetwork_1 = require("./AIControlledMineNetwork");
const AlgaeBioreactors_1 = require("./AlgaeBioreactors");
const AncientShipyards_1 = require("./AncientShipyards");
const AnOfferYouCantRefuse_1 = require("./AnOfferYouCantRefuse");
const ArchimedesHydroponicsStation_1 = require("./ArchimedesHydroponicsStation");
const AristarchusRoadNetwork_1 = require("./AristarchusRoadNetwork");
const BasicInfrastructure_1 = require("./BasicInfrastructure");
const ColonistShuttles_1 = require("./ColonistShuttles");
const CopernicusSolarArrays_1 = require("./CopernicusSolarArrays");
const CopernicusTower_1 = require("./CopernicusTower");
const CoreMine_1 = require("./CoreMine");
const CosmicRadiation_1 = require("./CosmicRadiation");
const CrescentResearchAssociation_1 = require("./CrescentResearchAssociation");
const DarksideIncubationPlant_1 = require("./DarksideIncubationPlant");
const DarksideMeteorBombardment_1 = require("./DarksideMeteorBombardment");
const DarksideMiningSyndicate_1 = require("./DarksideMiningSyndicate");
const DarksideObservatory_1 = require("./DarksideObservatory");
const DeepLunarMining_1 = require("./DeepLunarMining");
const EarthEmbassy_1 = require("./EarthEmbassy");
const FirstLunarSettlement_1 = require("./FirstLunarSettlement");
const GeodesicTents_1 = require("./GeodesicTents");
const GrandLunaAcademy_1 = require("./GrandLunaAcademy");
const Habitat14_1 = require("./Habitat14");
const HE3FusionPlant_1 = require("./HE3FusionPlant");
const HE3Lobbyists_1 = require("./HE3Lobbyists");
const HE3ProductionQuotas_1 = require("./HE3ProductionQuotas");
const HE3Refinery_1 = require("./HE3Refinery");
const HeavyDutyRovers_1 = require("./HeavyDutyRovers");
const HeliostatMirrorArray_1 = require("./HeliostatMirrorArray");
const HypersensitiveSiliconChipFactory_1 = require("./HypersensitiveSiliconChipFactory");
const ImprovedMoonConcrete_1 = require("./ImprovedMoonConcrete");
const IntragenSanctuaryHeadquarters_1 = require("./IntragenSanctuaryHeadquarters");
const IronExtractionCenter_1 = require("./IronExtractionCenter");
const LTFHeadquarters_1 = require("./LTFHeadquarters");
const LTFPrivileges_1 = require("./LTFPrivileges");
const LunaArchives_1 = require("./LunaArchives");
const LunaConference_1 = require("./LunaConference");
const LunaEcumenopolis_1 = require("./LunaEcumenopolis");
const LunaFirstIncorporated_1 = require("./LunaFirstIncorporated");
const LunaHyperloopCorporation_1 = require("./LunaHyperloopCorporation");
const LunaMiningHub_1 = require("./LunaMiningHub");
const LunaPoliticalInstitute_1 = require("./LunaPoliticalInstitute");
const LunaProjectOffice_1 = require("./LunaProjectOffice");
const LunarDustProcessingPlant_1 = require("./LunarDustProcessingPlant");
const LunaResort_1 = require("./LunaResort");
const LunarIndustryComplex_1 = require("./LunarIndustryComplex");
const LunarMineUrbanization_1 = require("./LunarMineUrbanization");
const LunarObservationPost_1 = require("./LunarObservationPost");
const LunarPlanningOffice_1 = require("./LunarPlanningOffice");
const LunarSecurityStations_1 = require("./LunarSecurityStations");
const LunarSteel_1 = require("./LunarSteel");
const LunarTradeFleet_1 = require("./LunarTradeFleet");
const LunaSenate_1 = require("./LunaSenate");
const LunaStagingStation_1 = require("./LunaStagingStation");
const LunaTradeStation_1 = require("./LunaTradeStation");
const LunaTrainStation_1 = require("./LunaTrainStation");
const LunaTradeFederation_1 = require("./LunaTradeFederation");
const MareImbriumMine_1 = require("./MareImbriumMine");
const MareNectarisMine_1 = require("./MareNectarisMine");
const MareNubiumMine_1 = require("./MareNubiumMine");
const MareSerenitatisMine_1 = require("./MareSerenitatisMine");
const MartianEmbassy_1 = require("./MartianEmbassy");
const MicrosingularityPlant_1 = require("./MicrosingularityPlant");
const MiningComplex_1 = require("./MiningComplex");
const MiningRobotsManufCenter_1 = require("./MiningRobotsManufCenter");
const MomentumViriumHabitat_1 = require("./MomentumViriumHabitat");
const MoonHabitatStandardProject_1 = require("./MoonHabitatStandardProject");
const MoonStandardProjectVariants_1 = require("./MoonStandardProjectVariants");
const MooncrateBlockFactory_1 = require("./MooncrateBlockFactory");
const MooncrateConvoysToMars_1 = require("./MooncrateConvoysToMars");
const MoonMineStandardProject_1 = require("./MoonMineStandardProject");
const MoonStandardProjectVariants_2 = require("./MoonStandardProjectVariants");
const MoonRoadStandardProject_1 = require("./MoonRoadStandardProject");
const MoonStandardProjectVariants_3 = require("./MoonStandardProjectVariants");
const MoonTether_1 = require("./MoonTether");
const NanotechIndustries_1 = require("./NanotechIndustries");
const NewColonyPlanningInitiaitives_1 = require("./NewColonyPlanningInitiaitives");
const OffWorldCityLiving_1 = require("./OffWorldCityLiving");
const PreliminaryDarkside_1 = require("./PreliminaryDarkside");
const OrbitalPowerGrid_1 = require("./OrbitalPowerGrid");
const PrideoftheEarthArkship_1 = require("./PrideoftheEarthArkship");
const ProcessorFactory_1 = require("./ProcessorFactory");
const RevoltingColonists_1 = require("./RevoltingColonists");
const RoverDriversUnion_1 = require("./RoverDriversUnion");
const RustEatingBacteria_1 = require("./RustEatingBacteria");
const SinusIridiumRoadNetwork_1 = require("./SinusIridiumRoadNetwork");
const SmallDutyRovers_1 = require("./SmallDutyRovers");
const SolarPanelFoundry_1 = require("./SolarPanelFoundry");
const SphereHabitats_1 = require("./SphereHabitats");
const StagingStationBehemoth_1 = require("./StagingStationBehemoth");
const SteelMarketMonopolists_1 = require("./SteelMarketMonopolists");
const SubterraneanHabitats_1 = require("./SubterraneanHabitats");
const SyndicatePirateRaids_1 = require("./SyndicatePirateRaids");
const TempestConsultancy_1 = require("./TempestConsultancy");
const TheArchaicFoundationInstitute_1 = require("./TheArchaicFoundationInstitute");
const TheDarksideofTheMoonSyndicate_1 = require("./TheDarksideofTheMoonSyndicate");
const TheGrandLunaCapitalGroup_1 = require("./TheGrandLunaCapitalGroup");
const TheWomb_1 = require("./TheWomb");
const ThoriumRush_1 = require("./ThoriumRush");
const TitaniumExtractionCenter_1 = require("./TitaniumExtractionCenter");
const TitaniumMarketMonopolists_1 = require("./TitaniumMarketMonopolists");
const TychoRoadNetwork_1 = require("./TychoRoadNetwork");
const UndergroundDetonators_1 = require("./UndergroundDetonators");
const UndermoonDrugLordsNetwork_1 = require("./UndermoonDrugLordsNetwork");
const WaterTreatmentComplex_1 = require("./WaterTreatmentComplex");
const WeGrowAsOne_1 = require("./WeGrowAsOne");
exports.MOON_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'moon',
    projectCards: {
        [CardName_1.CardName.MARE_NECTARIS_MINE]: { Factory: MareNectarisMine_1.MareNectarisMine },
        [CardName_1.CardName.MARE_NUBIUM_MINE]: { Factory: MareNubiumMine_1.MareNubiumMine },
        [CardName_1.CardName.MARE_IMBRIUM_MINE]: { Factory: MareImbriumMine_1.MareImbriumMine },
        [CardName_1.CardName.MARE_SERENITATIS_MINE]: { Factory: MareSerenitatisMine_1.MareSerenitatisMine },
        [CardName_1.CardName.HABITAT_14]: { Factory: Habitat14_1.Habitat14 },
        [CardName_1.CardName.GEODESIC_TENTS]: { Factory: GeodesicTents_1.GeodesicTents },
        [CardName_1.CardName.SPHERE_HABITATS]: { Factory: SphereHabitats_1.SphereHabitats },
        [CardName_1.CardName.THE_WOMB]: { Factory: TheWomb_1.TheWomb },
        [CardName_1.CardName.TYCHO_ROAD_NETWORK]: { Factory: TychoRoadNetwork_1.TychoRoadNetwork },
        [CardName_1.CardName.ARISTARCHUS_ROAD_NETWORK]: { Factory: AristarchusRoadNetwork_1.AristarchusRoadNetwork },
        [CardName_1.CardName.SINUS_IRIDIUM_ROAD_NETWORK]: { Factory: SinusIridiumRoadNetwork_1.SinusIridiumRoadNetwork },
        [CardName_1.CardName.MOMENTUM_VIRUM_HABITAT]: { Factory: MomentumViriumHabitat_1.MomentumViriumHabitat },
        [CardName_1.CardName.LUNA_TRADE_STATION]: { Factory: LunaTradeStation_1.LunaTradeStation },
        [CardName_1.CardName.LUNA_MINING_HUB]: { Factory: LunaMiningHub_1.LunaMiningHub },
        [CardName_1.CardName.LUNA_TRAIN_STATION]: { Factory: LunaTrainStation_1.LunaTrainStation },
        [CardName_1.CardName.COLONIST_SHUTTLES]: { Factory: ColonistShuttles_1.ColonistShuttles },
        [CardName_1.CardName.LUNAR_DUST_PROCESSING_PLANT]: { Factory: LunarDustProcessingPlant_1.LunarDustProcessingPlant },
        [CardName_1.CardName.DEEP_LUNAR_MINING]: { Factory: DeepLunarMining_1.DeepLunarMining },
        [CardName_1.CardName.ANCIENT_SHIPYARDS]: { Factory: AncientShipyards_1.AncientShipyards },
        [CardName_1.CardName.LUNA_PROJECT_OFFICE]: { Factory: LunaProjectOffice_1.LunaProjectOffice },
        [CardName_1.CardName.LUNA_RESORT]: { Factory: LunaResort_1.LunaResort },
        [CardName_1.CardName.LUNAR_OBSERVATION_POST]: { Factory: LunarObservationPost_1.LunarObservationPost },
        [CardName_1.CardName.MINING_ROBOTS_MANUF_CENTER]: { Factory: MiningRobotsManufCenter_1.MiningRobotsManufCenter },
        [CardName_1.CardName.PRIDE_OF_THE_EARTH_ARKSHIP]: { Factory: PrideoftheEarthArkship_1.PrideoftheEarthArkship },
        [CardName_1.CardName.IRON_EXTRACTION_CENTER]: { Factory: IronExtractionCenter_1.IronExtractionCenter },
        [CardName_1.CardName.TITANIUM_EXTRACTION_CENTER]: { Factory: TitaniumExtractionCenter_1.TitaniumExtractionCenter },
        [CardName_1.CardName.ARCHIMEDES_HYDROPONICS_STATION]: { Factory: ArchimedesHydroponicsStation_1.ArchimedesHydroponicsStation },
        [CardName_1.CardName.STEEL_MARKET_MONOPOLISTS]: { Factory: SteelMarketMonopolists_1.SteelMarketMonopolists },
        [CardName_1.CardName.TITANIUM_MARKET_MONOPOLISTS]: { Factory: TitaniumMarketMonopolists_1.TitaniumMarketMonopolists },
        [CardName_1.CardName.LUNA_STAGING_STATION]: { Factory: LunaStagingStation_1.LunaStagingStation },
        [CardName_1.CardName.NEW_COLONY_PLANNING_INITIAITIVES]: { Factory: NewColonyPlanningInitiaitives_1.NewColonyPlanningInitiaitives },
        [CardName_1.CardName.AI_CONTROLLED_MINE_NETWORK]: { Factory: AIControlledMineNetwork_1.AIControlledMineNetwork },
        [CardName_1.CardName.DARKSIDE_METEOR_BOMBARDMENT]: { Factory: DarksideMeteorBombardment_1.DarksideMeteorBombardment },
        [CardName_1.CardName.UNDERGROUND_DETONATORS]: { Factory: UndergroundDetonators_1.UndergroundDetonators },
        [CardName_1.CardName.LUNAR_TRADE_FLEET]: { Factory: LunarTradeFleet_1.LunarTradeFleet },
        [CardName_1.CardName.SUBTERRANEAN_HABITATS]: { Factory: SubterraneanHabitats_1.SubterraneanHabitats },
        [CardName_1.CardName.IMPROVED_MOON_CONCRETE]: { Factory: ImprovedMoonConcrete_1.ImprovedMoonConcrete },
        [CardName_1.CardName.MOONCRATE_BLOCK_FACTORY]: { Factory: MooncrateBlockFactory_1.MooncrateBlockFactory },
        [CardName_1.CardName.HEAVY_DUTY_ROVERS]: { Factory: HeavyDutyRovers_1.HeavyDutyRovers },
        [CardName_1.CardName.MICROSINGULARITY_PLANT]: { Factory: MicrosingularityPlant_1.MicrosingularityPlant },
        [CardName_1.CardName.HELIOSTAT_MIRROR_ARRAY]: { Factory: HeliostatMirrorArray_1.HeliostatMirrorArray },
        [CardName_1.CardName.LUNAR_SECURITY_STATIONS]: { Factory: LunarSecurityStations_1.LunarSecurityStations },
        [CardName_1.CardName.HYPERSENSITIVE_SILICON_CHIP_FACTORY]: { Factory: HypersensitiveSiliconChipFactory_1.HypersensitiveSiliconChipFactory },
        [CardName_1.CardName.COPERNICUS_SOLAR_ARRAYS]: { Factory: CopernicusSolarArrays_1.CopernicusSolarArrays },
        [CardName_1.CardName.DARKSIDE_INCUBATION_PLANT]: { Factory: DarksideIncubationPlant_1.DarksideIncubationPlant },
        [CardName_1.CardName.WATER_TREATMENT_COMPLEX]: { Factory: WaterTreatmentComplex_1.WaterTreatmentComplex },
        [CardName_1.CardName.ALGAE_BIOREACTORS]: { Factory: AlgaeBioreactors_1.AlgaeBioreactors },
        [CardName_1.CardName.HE3_FUSION_PLANT]: { Factory: HE3FusionPlant_1.HE3FusionPlant },
        [CardName_1.CardName.HE3_REFINERY]: { Factory: HE3Refinery_1.HE3Refinery },
        [CardName_1.CardName.HE3_LOBBYISTS]: { Factory: HE3Lobbyists_1.HE3Lobbyists },
        [CardName_1.CardName.REVOLTING_COLONISTS]: { Factory: RevoltingColonists_1.RevoltingColonists },
        [CardName_1.CardName.COSMIC_RADIATION]: { Factory: CosmicRadiation_1.CosmicRadiation },
        [CardName_1.CardName.OFF_WORLD_CITY_LIVING]: { Factory: OffWorldCityLiving_1.OffWorldCityLiving },
        [CardName_1.CardName.LUNAR_MINE_URBANIZATION]: { Factory: LunarMineUrbanization_1.LunarMineUrbanization },
        [CardName_1.CardName.THORIUM_RUSH]: { Factory: ThoriumRush_1.ThoriumRush },
        [CardName_1.CardName.HE3_PRODUCTION_QUOTAS]: { Factory: HE3ProductionQuotas_1.HE3ProductionQuotas, compatibility: 'turmoil' },
        [CardName_1.CardName.LUNA_CONFERENCE]: { Factory: LunaConference_1.LunaConference, compatibility: 'turmoil' },
        [CardName_1.CardName.WE_GROW_AS_ONE]: { Factory: WeGrowAsOne_1.WeGrowAsOne, compatibility: ['turmoil', 'colonies'] },
        [CardName_1.CardName.MOONCRATE_CONVOYS_TO_MARS]: { Factory: MooncrateConvoysToMars_1.MooncrateConvoysToMars, compatibility: ['turmoil'] },
        [CardName_1.CardName.AN_OFFER_YOU_CANT_REFUSE]: { Factory: AnOfferYouCantRefuse_1.AnOfferYouCantRefuse, compatibility: 'turmoil' },
        [CardName_1.CardName.PRELIMINARY_DARKSIDE]: { Factory: PreliminaryDarkside_1.PreliminaryDarkside },
        [CardName_1.CardName.SYNDICATE_PIRATE_RAIDS]: { Factory: SyndicatePirateRaids_1.SyndicatePirateRaids, compatibility: 'colonies' },
        [CardName_1.CardName.DARKSIDE_MINING_SYNDICATE]: { Factory: DarksideMiningSyndicate_1.DarksideMiningSyndicate },
        [CardName_1.CardName.STAGING_STATION_BEHEMOTH]: { Factory: StagingStationBehemoth_1.StagingStationBehemoth, compatibility: 'colonies' },
        [CardName_1.CardName.LUNA_ARCHIVES]: { Factory: LunaArchives_1.LunaArchives },
        [CardName_1.CardName.LUNA_SENATE]: { Factory: LunaSenate_1.LunaSenate },
        [CardName_1.CardName.LUNA_POLITICAL_INSTITUTE]: { Factory: LunaPoliticalInstitute_1.LunaPoliticalInstitute, compatibility: 'turmoil' },
        [CardName_1.CardName.COPERNICUS_TOWER]: { Factory: CopernicusTower_1.CopernicusTower },
        [CardName_1.CardName.SMALL_DUTY_ROVERS]: { Factory: SmallDutyRovers_1.SmallDutyRovers },
        [CardName_1.CardName.LUNAR_INDUSTRY_COMPLEX]: { Factory: LunarIndustryComplex_1.LunarIndustryComplex },
        [CardName_1.CardName.DARKSIDE_OBSERVATORY]: { Factory: DarksideObservatory_1.DarksideObservatory },
        [CardName_1.CardName.MARTIAN_EMBASSY]: { Factory: MartianEmbassy_1.MartianEmbassy, compatibility: 'pathfinders' },
        [CardName_1.CardName.EARTH_EMBASSY]: { Factory: EarthEmbassy_1.EarthEmbassy },
        [CardName_1.CardName.ROVER_DRIVERS_UNION]: { Factory: RoverDriversUnion_1.RoverDriversUnion },
        [CardName_1.CardName.LTF_HEADQUARTERS]: { Factory: LTFHeadquarters_1.LTFHeadquarters, compatibility: 'colonies' },
        [CardName_1.CardName.UNDERMOON_DRUG_LORDS_NETWORK]: { Factory: UndermoonDrugLordsNetwork_1.UndermoonDrugLordsNetwork },
        [CardName_1.CardName.LTF_PRIVILEGES]: { Factory: LTFPrivileges_1.LTFPrivileges },
        [CardName_1.CardName.GRAND_LUNA_ACADEMY]: { Factory: GrandLunaAcademy_1.GrandLunaAcademy },
        [CardName_1.CardName.LUNA_ECUMENOPOLIS]: { Factory: LunaEcumenopolis_1.LunaEcumenopolis },
        [CardName_1.CardName.ORBITAL_POWER_GRID]: { Factory: OrbitalPowerGrid_1.OrbitalPowerGrid },
        [CardName_1.CardName.PROCESSOR_FACTORY]: { Factory: ProcessorFactory_1.ProcessorFactory },
        [CardName_1.CardName.LUNAR_STEEL]: { Factory: LunarSteel_1.LunarSteel },
        [CardName_1.CardName.RUST_EATING_BACTERIA]: { Factory: RustEatingBacteria_1.RustEatingBacteria },
        [CardName_1.CardName.SOLAR_PANEL_FOUNDRY]: { Factory: SolarPanelFoundry_1.SolarPanelFoundry },
        [CardName_1.CardName.MOON_TETHER]: { Factory: MoonTether_1.MoonTether },
    },
    corporationCards: {
        [CardName_1.CardName.NANOTECH_INDUSTRIES]: { Factory: NanotechIndustries_1.NanotechIndustries, compatibility: 'moon' },
        [CardName_1.CardName.TEMPEST_CONSULTANCY]: { Factory: TempestConsultancy_1.TempestConsultancy, compatibility: ['turmoil', 'moon'] },
        [CardName_1.CardName.THE_DARKSIDE_OF_THE_MOON_SYNDICATE]: { Factory: TheDarksideofTheMoonSyndicate_1.TheDarksideofTheMoonSyndicate, compatibility: 'moon' },
        [CardName_1.CardName.LUNA_HYPERLOOP_CORPORATION]: { Factory: LunaHyperloopCorporation_1.LunaHyperloopCorporation, compatibility: 'moon' },
        [CardName_1.CardName.CRESCENT_RESEARCH_ASSOCIATION]: { Factory: CrescentResearchAssociation_1.CrescentResearchAssociation, compatibility: 'moon' },
        [CardName_1.CardName.LUNA_FIRST_INCORPORATED]: { Factory: LunaFirstIncorporated_1.LunaFirstIncorporated, compatibility: 'moon' },
        [CardName_1.CardName.THE_GRAND_LUNA_CAPITAL_GROUP]: { Factory: TheGrandLunaCapitalGroup_1.TheGrandLunaCapitalGroup, compatibility: 'moon' },
        [CardName_1.CardName.INTRAGEN_SANCTUARY_HEADQUARTERS]: { Factory: IntragenSanctuaryHeadquarters_1.IntragenSanctuaryHeadquarters, compatibility: 'moon' },
        [CardName_1.CardName.LUNA_TRADE_FEDERATION]: { Factory: LunaTradeFederation_1.LunaTradeFederation, compatibility: 'moon' },
        [CardName_1.CardName.THE_ARCHAIC_FOUNDATION_INSTITUTE]: { Factory: TheArchaicFoundationInstitute_1.TheArchaicFoundationInstitute, compatibility: 'moon' },
    },
    standardProjects: {
        [CardName_1.CardName.MOON_HABITAT_STANDARD_PROJECT]: { Factory: MoonHabitatStandardProject_1.MoonHabitatStandardProject },
        [CardName_1.CardName.MOON_HABITAT_STANDARD_PROJECT_V2]: { Factory: MoonStandardProjectVariants_1.MoonHabitatStandardProjectVariant2 },
        [CardName_1.CardName.MOON_MINE_STANDARD_PROJECT]: { Factory: MoonMineStandardProject_1.MoonMineStandardProject },
        [CardName_1.CardName.MOON_MINE_STANDARD_PROJECT_V2]: { Factory: MoonStandardProjectVariants_2.MoonMineStandardProjectVariant2 },
        [CardName_1.CardName.MOON_ROAD_STANDARD_PROJECT]: { Factory: MoonRoadStandardProject_1.MoonRoadStandardProject },
        [CardName_1.CardName.MOON_ROAD_STANDARD_PROJECT_V2]: { Factory: MoonStandardProjectVariants_3.MoonRoadStandardProjectVariant2 },
    },
    preludeCards: {
        [CardName_1.CardName.FIRST_LUNAR_SETTLEMENT]: { Factory: FirstLunarSettlement_1.FirstLunarSettlement, compatibility: 'moon' },
        [CardName_1.CardName.CORE_MINE]: { Factory: CoreMine_1.CoreMine, compatibility: 'moon' },
        [CardName_1.CardName.BASIC_INFRASTRUCTURE]: { Factory: BasicInfrastructure_1.BasicInfrastructure, compatibility: ['moon', 'colonies'] },
        [CardName_1.CardName.LUNAR_PlANNING_OFFICE]: { Factory: LunarPlanningOffice_1.LunarPlanningOffice, compatibility: 'moon' },
        [CardName_1.CardName.MINING_COMPLEX]: { Factory: MiningComplex_1.MiningComplex, compatibility: 'moon' },
    },
});
