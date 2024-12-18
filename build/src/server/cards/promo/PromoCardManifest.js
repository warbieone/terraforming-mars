"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMO_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const Advertising_1 = require("./Advertising");
const AntidesertificationTechniques_1 = require("./AntidesertificationTechniques");
const AqueductSystems_1 = require("./AqueductSystems");
const ArcadianCommunities_1 = require("./ArcadianCommunities");
const AsteroidDeflectionSystem_1 = require("./AsteroidDeflectionSystem");
const AsteroidHollowing_1 = require("./AsteroidHollowing");
const AsteroidRights_1 = require("./AsteroidRights");
const AstraMechanica_1 = require("./AstraMechanica");
const Astrodrill_1 = require("./Astrodrill");
const BactoviralResearch_1 = require("./BactoviralResearch");
const BioPrintingFacility_1 = require("./BioPrintingFacility");
const CarbonNanosystems_1 = require("./CarbonNanosystems");
const Casinos_1 = require("./Casinos");
const CityPark_1 = require("./CityPark");
const CometAiming_1 = require("./CometAiming");
const CorporateArchives_1 = require("./CorporateArchives");
const CrashSiteCleanup_1 = require("./CrashSiteCleanup");
const CuttingEdgeTechnology_1 = require("./CuttingEdgeTechnology");
const CyberiaSystems_1 = require("./CyberiaSystems");
const DeimosDownPromo_1 = require("./DeimosDownPromo");
const DirectedHeatUsage_1 = require("./DirectedHeatUsage");
const DirectedImpactors_1 = require("./DirectedImpactors");
const DiversitySupport_1 = require("./DiversitySupport");
const DoubleDown_1 = require("./DoubleDown");
const DuskLaserMining_1 = require("./DuskLaserMining");
const EnergyMarket_1 = require("./EnergyMarket");
const Factorum_1 = require("./Factorum");
const FieldCappedCity_1 = require("./FieldCappedCity");
const FloydContinuum_1 = require("./FloydContinuum");
const GiantSolarCollector_1 = require("./GiantSolarCollector");
const GreatDamPromo_1 = require("./GreatDamPromo");
const Harvest_1 = require("./Harvest");
const HermeticOrderofMars_1 = require("./HermeticOrderofMars");
const HiTechLab_1 = require("./HiTechLab");
const HomeostasisBureau_1 = require("./HomeostasisBureau");
const IcyImpactors_1 = require("./IcyImpactors");
const ImportedNutrients_1 = require("./ImportedNutrients");
const InterplanetaryTrade_1 = require("./InterplanetaryTrade");
const JovianEmbassy_1 = require("./JovianEmbassy");
const KaguyaTech_1 = require("./KaguyaTech");
const KuiperCooperative_1 = require("./KuiperCooperative");
const LawSuit_1 = require("./LawSuit");
const MagneticFieldGeneratorsPromo_1 = require("./MagneticFieldGeneratorsPromo");
const MagneticShield_1 = require("./MagneticShield");
const MarsNomads_1 = require("./MarsNomads");
const MartianLumberCorp_1 = require("./MartianLumberCorp");
const MeatIndustry_1 = require("./MeatIndustry");
const Meltworks_1 = require("./Meltworks");
const MercurianAlloys_1 = require("./MercurianAlloys");
const Merger_1 = require("./Merger");
const MoholeLake_1 = require("./MoholeLake");
const MonsInsurance_1 = require("./MonsInsurance");
const NeptunianPowerConsultants_1 = require("./NeptunianPowerConsultants");
const NewPartner_1 = require("./NewPartner");
const OrbitalCleanup_1 = require("./OrbitalCleanup");
const OutdoorSports_1 = require("./OutdoorSports");
const Penguins_1 = require("./Penguins");
const PharmacyUnion_1 = require("./PharmacyUnion");
const Philares_1 = require("./Philares");
const Potatoes_1 = require("./Potatoes");
const ProjectInspection_1 = require("./ProjectInspection");
const _16Psyche_1 = require("./16Psyche");
const PublicBaths_1 = require("./PublicBaths");
const Recyclon_1 = require("./Recyclon");
const RedShips_1 = require("./RedShips");
const RegoPlastics_1 = require("./RegoPlastics");
const RobotPollinators_1 = require("./RobotPollinators");
const SaturnSurfing_1 = require("./SaturnSurfing");
const SelfReplicatingRobots_1 = require("./SelfReplicatingRobots");
const SmallAsteroid_1 = require("./SmallAsteroid");
const SnowAlgae_1 = require("./SnowAlgae");
const SoilEnrichment_1 = require("./SoilEnrichment");
const SolarLogistics_1 = require("./SolarLogistics");
const Splice_1 = require("./Splice");
const StanfordTorus_1 = require("./StanfordTorus");
const StJosephOfCupertinoMission_1 = require("./StJosephOfCupertinoMission");
const SubCrustMeasurements_1 = require("./SubCrustMeasurements");
const Supercapacitors_1 = require("./Supercapacitors");
const Supermarkets_1 = require("./Supermarkets");
const Teslaract_1 = require("./Teslaract");
const TopsoilContract_1 = require("./TopsoilContract");
const TychoMagnetics_1 = require("./TychoMagnetics");
const StrategicBasePlanning_1 = require("./StrategicBasePlanning");
const Hospitals_1 = require("./Hospitals");
exports.PROMO_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'promo',
    projectCards: {
        [CardName_1.CardName.PENGUINS]: { Factory: Penguins_1.Penguins },
        [CardName_1.CardName.SELF_REPLICATING_ROBOTS]: { Factory: SelfReplicatingRobots_1.SelfReplicatingRobots },
        [CardName_1.CardName.SMALL_ASTEROID]: { Factory: SmallAsteroid_1.SmallAsteroid },
        [CardName_1.CardName.SNOW_ALGAE]: { Factory: SnowAlgae_1.SnowAlgae },
        [CardName_1.CardName.DUSK_LASER_MINING]: { Factory: DuskLaserMining_1.DuskLaserMining },
        [CardName_1.CardName.MERCURIAN_ALLOYS]: { Factory: MercurianAlloys_1.MercurianAlloys },
        [CardName_1.CardName.REGO_PLASTICS]: { Factory: RegoPlastics_1.RegoPlastics },
        [CardName_1.CardName.INTERPLANETARY_TRADE]: { Factory: InterplanetaryTrade_1.InterplanetaryTrade },
        [CardName_1.CardName.ORBITAL_CLEANUP]: { Factory: OrbitalCleanup_1.OrbitalCleanup },
        [CardName_1.CardName.PROJECT_INSPECTION]: { Factory: ProjectInspection_1.ProjectInspection },
        [CardName_1.CardName.HI_TECH_LAB]: { Factory: HiTechLab_1.HiTechLab },
        [CardName_1.CardName.ENERGY_MARKET]: { Factory: EnergyMarket_1.EnergyMarket },
        [CardName_1.CardName.LAW_SUIT]: { Factory: LawSuit_1.LawSuit },
        [CardName_1.CardName.STANFORD_TORUS]: { Factory: StanfordTorus_1.StanfordTorus },
        [CardName_1.CardName.ASTEROID_HOLLOWING]: { Factory: AsteroidHollowing_1.AsteroidHollowing },
        [CardName_1.CardName.ASTEROID_RIGHTS]: { Factory: AsteroidRights_1.AsteroidRights },
        [CardName_1.CardName.COMET_AIMING]: { Factory: CometAiming_1.CometAiming },
        [CardName_1.CardName.CUTTING_EDGE_TECHNOLOGY]: { Factory: CuttingEdgeTechnology_1.CuttingEdgeTechnology },
        [CardName_1.CardName.CRASH_SITE_CLEANUP]: { Factory: CrashSiteCleanup_1.CrashSiteCleanup },
        [CardName_1.CardName.DIRECTED_IMPACTORS]: { Factory: DirectedImpactors_1.DirectedImpactors },
        [CardName_1.CardName.FIELD_CAPPED_CITY]: { Factory: FieldCappedCity_1.FieldCappedCity },
        [CardName_1.CardName.MAGNETIC_SHIELD]: { Factory: MagneticShield_1.MagneticShield },
        [CardName_1.CardName.MELTWORKS]: { Factory: Meltworks_1.Meltworks },
        [CardName_1.CardName.MOHOLE_LAKE]: { Factory: MoholeLake_1.MoholeLake },
        [CardName_1.CardName.DIVERSITY_SUPPORT]: { Factory: DiversitySupport_1.DiversitySupport },
        [CardName_1.CardName.JOVIAN_EMBASSY]: { Factory: JovianEmbassy_1.JovianEmbassy },
        [CardName_1.CardName.TOPSOIL_CONTRACT]: { Factory: TopsoilContract_1.TopsoilContract },
        [CardName_1.CardName.IMPORTED_NUTRIENTS]: { Factory: ImportedNutrients_1.ImportedNutrients },
        [CardName_1.CardName.ASTEROID_DEFLECTION_SYSTEM]: { Factory: AsteroidDeflectionSystem_1.AsteroidDeflectionSystem },
        [CardName_1.CardName.SUB_CRUST_MEASUREMENTS]: { Factory: SubCrustMeasurements_1.SubCrustMeasurements },
        [CardName_1.CardName.POTATOES]: { Factory: Potatoes_1.Potatoes },
        [CardName_1.CardName.MEAT_INDUSTRY]: { Factory: MeatIndustry_1.MeatIndustry },
        [CardName_1.CardName.ADVERTISING]: { Factory: Advertising_1.Advertising },
        [CardName_1.CardName.DEIMOS_DOWN_PROMO]: { Factory: DeimosDownPromo_1.DeimosDownPromo },
        [CardName_1.CardName.GREAT_DAM_PROMO]: { Factory: GreatDamPromo_1.GreatDamPromo },
        [CardName_1.CardName.MAGNETIC_FIELD_GENERATORS_PROMO]: { Factory: MagneticFieldGeneratorsPromo_1.MagneticFieldGeneratorsPromo },
        [CardName_1.CardName.SATURN_SURFING]: { Factory: SaturnSurfing_1.SaturnSurfing },
        [CardName_1.CardName.BIO_PRINTING_FACILITY]: { Factory: BioPrintingFacility_1.BioPrintingFacility },
        [CardName_1.CardName.BACTOVIRAL_RESEARCH]: { Factory: BactoviralResearch_1.BactoviralResearch },
        [CardName_1.CardName.HARVEST]: { Factory: Harvest_1.Harvest },
        [CardName_1.CardName.OUTDOOR_SPORTS]: { Factory: OutdoorSports_1.OutdoorSports },
        [CardName_1.CardName.PSYCHE]: { Factory: _16Psyche_1.Psyche },
        [CardName_1.CardName.ROBOT_POLLINATORS]: { Factory: RobotPollinators_1.RobotPollinators },
        [CardName_1.CardName.SUPERCAPACITORS]: { Factory: Supercapacitors_1.Supercapacitors },
        [CardName_1.CardName.FLOYD_CONTINUUM]: { Factory: FloydContinuum_1.FloydContinuum },
        [CardName_1.CardName.AQUEDUCT_SYSTEMS]: { Factory: AqueductSystems_1.AqueductSystems },
        [CardName_1.CardName.ASTRA_MECHANICA]: { Factory: AstraMechanica_1.AstraMechanica },
        [CardName_1.CardName.ST_JOSEPH_OF_CUPERTINO_MISSION]: { Factory: StJosephOfCupertinoMission_1.StJosephOfCupertinoMission },
        [CardName_1.CardName.CARBON_NANOSYSTEMS]: { Factory: CarbonNanosystems_1.CarbonNanosystems },
        [CardName_1.CardName.CYBERIA_SYSTEMS]: { Factory: CyberiaSystems_1.CyberiaSystems },
        [CardName_1.CardName.HERMETIC_ORDER_OF_MARS]: { Factory: HermeticOrderofMars_1.HermeticOrderOfMars },
        [CardName_1.CardName.HOMEOSTASIS_BUREAU]: { Factory: HomeostasisBureau_1.HomeostasisBureau },
        [CardName_1.CardName.KAGUYA_TECH]: { Factory: KaguyaTech_1.KaguyaTech },
        [CardName_1.CardName.MARS_NOMADS]: { Factory: MarsNomads_1.MarsNomads },
        [CardName_1.CardName.NEPTUNIAN_POWER_CONSULTANTS]: { Factory: NeptunianPowerConsultants_1.NeptunianPowerConsultants },
        [CardName_1.CardName.MARTIAN_LUMBER_CORP]: { Factory: MartianLumberCorp_1.MartianLumberCorp },
        [CardName_1.CardName.RED_SHIPS]: { Factory: RedShips_1.RedShips },
        [CardName_1.CardName.SOLAR_LOGISTICS]: { Factory: SolarLogistics_1.SolarLogistics },
        [CardName_1.CardName.TESLARACT]: { Factory: Teslaract_1.Teslaract },
        [CardName_1.CardName.DIRECTED_HEAT_USAGE]: { Factory: DirectedHeatUsage_1.DirectedHeatUsage },
        [CardName_1.CardName.ICY_IMPACTORS]: { Factory: IcyImpactors_1.IcyImpactors },
        [CardName_1.CardName.SOIL_ENRICHMENT]: { Factory: SoilEnrichment_1.SoilEnrichment },
        [CardName_1.CardName.CITY_PARK]: { Factory: CityPark_1.CityPark },
        [CardName_1.CardName.SUPERMARKETS]: { Factory: Supermarkets_1.Supermarkets },
        [CardName_1.CardName.HOSPITALS]: { Factory: Hospitals_1.Hospitals },
        [CardName_1.CardName.CASINOS]: { Factory: Casinos_1.Casinos },
        [CardName_1.CardName.PUBLIC_BATHS]: { Factory: PublicBaths_1.PublicBaths },
    },
    preludeCards: {
        [CardName_1.CardName.NEW_PARTNER]: { Factory: NewPartner_1.NewPartner },
        [CardName_1.CardName.MERGER]: { Factory: Merger_1.Merger },
        [CardName_1.CardName.CORPORATE_ARCHIVES]: { Factory: CorporateArchives_1.CorporateArchives },
        [CardName_1.CardName.DOUBLE_DOWN]: { Factory: DoubleDown_1.DoubleDown, compatibility: 'prelude' },
        [CardName_1.CardName.ANTI_DESERTIFICATION_TECHNIQUES]: { Factory: AntidesertificationTechniques_1.AntidesertificationTechniques },
        [CardName_1.CardName.GIANT_SOLAR_COLLECTOR]: { Factory: GiantSolarCollector_1.GiantSolarCollector, compatibility: 'venus' },
        [CardName_1.CardName.STRATEGIC_BASE_PLANNING]: { Factory: StrategicBasePlanning_1.StrategicBasePlanning, compatibility: 'colonies' },
    },
    cardsToRemove: [
        CardName_1.CardName.DEIMOS_DOWN,
        CardName_1.CardName.GREAT_DAM,
        CardName_1.CardName.MAGNETIC_FIELD_GENERATORS
    ],
    corporationCards: {
        [CardName_1.CardName.ARCADIAN_COMMUNITIES]: { Factory: ArcadianCommunities_1.ArcadianCommunities },
        [CardName_1.CardName.ASTRODRILL]: { Factory: Astrodrill_1.Astrodrill },
        [CardName_1.CardName.FACTORUM]: { Factory: Factorum_1.Factorum },
        [CardName_1.CardName.PHARMACY_UNION]: { Factory: PharmacyUnion_1.PharmacyUnion },
        [CardName_1.CardName.PHILARES]: { Factory: Philares_1.Philares },
        [CardName_1.CardName.MONS_INSURANCE]: { Factory: MonsInsurance_1.MonsInsurance },
        [CardName_1.CardName.RECYCLON]: { Factory: Recyclon_1.Recyclon },
        [CardName_1.CardName.SPLICE]: { Factory: Splice_1.Splice },
        [CardName_1.CardName.TYCHO_MAGNETICS]: { Factory: TychoMagnetics_1.TychoMagnetics },
        [CardName_1.CardName.KUIPER_COOPERATIVE]: { Factory: KuiperCooperative_1.KuiperCooperative },
    },
});
