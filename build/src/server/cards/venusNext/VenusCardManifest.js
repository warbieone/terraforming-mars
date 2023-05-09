"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENUS_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AerialMappers_1 = require("./AerialMappers");
const AerosportTournament_1 = require("./AerosportTournament");
const AirScrappingStandardProject_1 = require("./AirScrappingStandardProject");
const AirScrappingExpedition_1 = require("./AirScrappingExpedition");
const Aphrodite_1 = require("./Aphrodite");
const AtalantaPlanitiaLab_1 = require("./AtalantaPlanitiaLab");
const Atmoscoop_1 = require("./Atmoscoop");
const Celestic_1 = require("./Celestic");
const CometForVenus_1 = require("./CometForVenus");
const CorroderSuits_1 = require("./CorroderSuits");
const DawnCity_1 = require("./DawnCity");
const DeuteriumExport_1 = require("./DeuteriumExport");
const Dirigibles_1 = require("./Dirigibles");
const ExtractorBalloons_1 = require("./ExtractorBalloons");
const Extremophiles_1 = require("./Extremophiles");
const FloatingHabs_1 = require("./FloatingHabs");
const ForcedPrecipitation_1 = require("./ForcedPrecipitation");
const FreyjaBiodomes_1 = require("./FreyjaBiodomes");
const GHGImportFromVenus_1 = require("./GHGImportFromVenus");
const GiantSolarShade_1 = require("./GiantSolarShade");
const Gyropolis_1 = require("./Gyropolis");
const HydrogenToVenus_1 = require("./HydrogenToVenus");
const IoSulphurResearch_1 = require("./IoSulphurResearch");
const IshtarMining_1 = require("./IshtarMining");
const JetStreamMicroscrappers_1 = require("./JetStreamMicroscrappers");
const LocalShading_1 = require("./LocalShading");
const LunaMetropolis_1 = require("./LunaMetropolis");
const LuxuryFoods_1 = require("./LuxuryFoods");
const Manutech_1 = require("./Manutech");
const MaxwellBase_1 = require("./MaxwellBase");
const MiningQuota_1 = require("./MiningQuota");
const MorningStarInc_1 = require("./MorningStarInc");
const NeutralizerFactory_1 = require("./NeutralizerFactory");
const Omnicourt_1 = require("./Omnicourt");
const OrbitalReflectors_1 = require("./OrbitalReflectors");
const RotatorImpacts_1 = require("./RotatorImpacts");
const SisterPlanetSupport_1 = require("./SisterPlanetSupport");
const Solarnet_1 = require("./Solarnet");
const SpinInducingAsteroid_1 = require("./SpinInducingAsteroid");
const SponsoredAcademies_1 = require("./SponsoredAcademies");
const Stratopolis_1 = require("./Stratopolis");
const StratosphericBirds_1 = require("./StratosphericBirds");
const SulphurEatingBacteria_1 = require("./SulphurEatingBacteria");
const SulphurExports_1 = require("./SulphurExports");
const TerraformingContract_1 = require("./TerraformingContract");
const Thermophiles_1 = require("./Thermophiles");
const VenusGovernor_1 = require("./VenusGovernor");
const VenusianAnimals_1 = require("./VenusianAnimals");
const VenusianInsects_1 = require("./VenusianInsects");
const VenusianPlants_1 = require("./VenusianPlants");
const VenusMagnetizer_1 = require("./VenusMagnetizer");
const VenusSoils_1 = require("./VenusSoils");
const VenusWaystation_1 = require("./VenusWaystation");
const Viron_1 = require("./Viron");
const WaterToVenus_1 = require("./WaterToVenus");
const AirScrappingStandardProjectVariant_1 = require("./AirScrappingStandardProjectVariant");
exports.VENUS_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'venus',
    projectCards: {
        [CardName_1.CardName.AERIAL_MAPPERS]: { Factory: AerialMappers_1.AerialMappers },
        [CardName_1.CardName.AEROSPORT_TOURNAMENT]: { Factory: AerosportTournament_1.AerosportTournament },
        [CardName_1.CardName.AIR_SCRAPPING_EXPEDITION]: { Factory: AirScrappingExpedition_1.AirScrappingExpedition },
        [CardName_1.CardName.ATALANTA_PLANITIA_LAB]: { Factory: AtalantaPlanitiaLab_1.AtalantaPlanitiaLab },
        [CardName_1.CardName.ATMOSCOOP]: { Factory: Atmoscoop_1.Atmoscoop },
        [CardName_1.CardName.COMET_FOR_VENUS]: { Factory: CometForVenus_1.CometForVenus },
        [CardName_1.CardName.CORRODER_SUITS]: { Factory: CorroderSuits_1.CorroderSuits },
        [CardName_1.CardName.DAWN_CITY]: { Factory: DawnCity_1.DawnCity },
        [CardName_1.CardName.DEUTERIUM_EXPORT]: { Factory: DeuteriumExport_1.DeuteriumExport },
        [CardName_1.CardName.DIRIGIBLES]: { Factory: Dirigibles_1.Dirigibles },
        [CardName_1.CardName.EXTRACTOR_BALLOONS]: { Factory: ExtractorBalloons_1.ExtractorBalloons },
        [CardName_1.CardName.EXTREMOPHILES]: { Factory: Extremophiles_1.Extremophiles },
        [CardName_1.CardName.FLOATING_HABS]: { Factory: FloatingHabs_1.FloatingHabs },
        [CardName_1.CardName.FORCED_PRECIPITATION]: { Factory: ForcedPrecipitation_1.ForcedPrecipitation },
        [CardName_1.CardName.FREYJA_BIODOMES]: { Factory: FreyjaBiodomes_1.FreyjaBiodomes },
        [CardName_1.CardName.GIANT_SOLAR_SHADE]: { Factory: GiantSolarShade_1.GiantSolarShade },
        [CardName_1.CardName.GHG_IMPORT_FROM_VENUS]: { Factory: GHGImportFromVenus_1.GHGImportFromVenus },
        [CardName_1.CardName.GYROPOLIS]: { Factory: Gyropolis_1.Gyropolis },
        [CardName_1.CardName.HYDROGEN_TO_VENUS]: { Factory: HydrogenToVenus_1.HydrogenToVenus },
        [CardName_1.CardName.IO_SULPHUR_RESEARCH]: { Factory: IoSulphurResearch_1.IoSulphurResearch },
        [CardName_1.CardName.ISHTAR_MINING]: { Factory: IshtarMining_1.IshtarMining },
        [CardName_1.CardName.JET_STREAM_MICROSCRAPPERS]: { Factory: JetStreamMicroscrappers_1.JetStreamMicroscrappers },
        [CardName_1.CardName.LUNA_METROPOLIS]: { Factory: LunaMetropolis_1.LunaMetropolis },
        [CardName_1.CardName.LOCAL_SHADING]: { Factory: LocalShading_1.LocalShading },
        [CardName_1.CardName.MAXWELL_BASE]: { Factory: MaxwellBase_1.MaxwellBase },
        [CardName_1.CardName.ROTATOR_IMPACTS]: { Factory: RotatorImpacts_1.RotatorImpacts },
        [CardName_1.CardName.SISTER_PLANET_SUPPORT]: { Factory: SisterPlanetSupport_1.SisterPlanetSupport },
        [CardName_1.CardName.SOLARNET]: { Factory: Solarnet_1.Solarnet },
        [CardName_1.CardName.SPIN_INDUCING_ASTEROID]: { Factory: SpinInducingAsteroid_1.SpinInducingAsteroid },
        [CardName_1.CardName.SPONSORED_ACADEMIES]: { Factory: SponsoredAcademies_1.SponsoredAcademies },
        [CardName_1.CardName.STRATOPOLIS]: { Factory: Stratopolis_1.Stratopolis },
        [CardName_1.CardName.STRATOSPHERIC_BIRDS]: { Factory: StratosphericBirds_1.StratosphericBirds },
        [CardName_1.CardName.SULPHUR_EATING_BACTERIA]: { Factory: SulphurEatingBacteria_1.SulphurEatingBacteria },
        [CardName_1.CardName.SULPHUR_EXPORTS]: { Factory: SulphurExports_1.SulphurExports },
        [CardName_1.CardName.TERRAFORMING_CONTRACT]: { Factory: TerraformingContract_1.TerraformingContract },
        [CardName_1.CardName.THERMOPHILES]: { Factory: Thermophiles_1.Thermophiles },
        [CardName_1.CardName.VENUS_GOVERNOR]: { Factory: VenusGovernor_1.VenusGovernor },
        [CardName_1.CardName.VENUSIAN_ANIMALS]: { Factory: VenusianAnimals_1.VenusianAnimals },
        [CardName_1.CardName.VENUSIAN_INSECTS]: { Factory: VenusianInsects_1.VenusianInsects },
        [CardName_1.CardName.VENUSIAN_PLANTS]: { Factory: VenusianPlants_1.VenusianPlants },
        [CardName_1.CardName.VENUS_MAGNETIZER]: { Factory: VenusMagnetizer_1.VenusMagnetizer },
        [CardName_1.CardName.VENUS_SOILS]: { Factory: VenusSoils_1.VenusSoils },
        [CardName_1.CardName.VENUS_WAYSTATION]: { Factory: VenusWaystation_1.VenusWaystation },
        [CardName_1.CardName.WATER_TO_VENUS]: { Factory: WaterToVenus_1.WaterToVenus },
        [CardName_1.CardName.LUXURY_FOODS]: { Factory: LuxuryFoods_1.LuxuryFoods },
        [CardName_1.CardName.NEUTRALIZER_FACTORY]: { Factory: NeutralizerFactory_1.NeutralizerFactory },
        [CardName_1.CardName.ORBITAL_REFLECTORS]: { Factory: OrbitalReflectors_1.OrbitalReflectors },
        [CardName_1.CardName.OMNICOURT]: { Factory: Omnicourt_1.Omnicourt },
        [CardName_1.CardName.MINING_QUOTA]: { Factory: MiningQuota_1.MiningQuota },
    },
    standardProjects: {
        [CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT]: { Factory: AirScrappingStandardProject_1.AirScrappingStandardProject },
        [CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT_VARIANT]: { Factory: AirScrappingStandardProjectVariant_1.AirScrappingStandardProjectVariant },
    },
    corporationCards: {
        [CardName_1.CardName.APHRODITE]: { Factory: Aphrodite_1.Aphrodite, compatibility: 'venus' },
        [CardName_1.CardName.CELESTIC]: { Factory: Celestic_1.Celestic, compatibility: 'venus' },
        [CardName_1.CardName.MANUTECH]: { Factory: Manutech_1.Manutech },
        [CardName_1.CardName.MORNING_STAR_INC]: { Factory: MorningStarInc_1.MorningStarInc, compatibility: 'venus' },
        [CardName_1.CardName.VIRON]: { Factory: Viron_1.Viron },
    },
});
