"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLONIES_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const Airliners_1 = require("./Airliners");
const AirRaid_1 = require("./AirRaid");
const Aridor_1 = require("./Aridor");
const Arklight_1 = require("./Arklight");
const AtmoCollectors_1 = require("./AtmoCollectors");
const CommunityServices_1 = require("./CommunityServices");
const Conscription_1 = require("./Conscription");
const CoronaExtractor_1 = require("./CoronaExtractor");
const CryoSleep_1 = require("./CryoSleep");
const EarthElevator_1 = require("./EarthElevator");
const EcologyResearch_1 = require("./EcologyResearch");
const FloaterLeasing_1 = require("./FloaterLeasing");
const FloaterPrototypes_1 = require("./FloaterPrototypes");
const FloaterTechnology_1 = require("./FloaterTechnology");
const GalileanWaystation_1 = require("./GalileanWaystation");
const HeavyTaxation_1 = require("./HeavyTaxation");
const IceMoonColony_1 = require("./IceMoonColony");
const ImpactorSwarm_1 = require("./ImpactorSwarm");
const InterplanetaryColonyShip_1 = require("./InterplanetaryColonyShip");
const JovianLanterns_1 = require("./JovianLanterns");
const JupiterFloatingStation_1 = require("./JupiterFloatingStation");
const LunaGovernor_1 = require("./LunaGovernor");
const LunarExports_1 = require("./LunarExports");
const LunarMining_1 = require("./LunarMining");
const MarketManipulation_1 = require("./MarketManipulation");
const MartianZoo_1 = require("./MartianZoo");
const MiningColony_1 = require("./MiningColony");
const MinorityRefuge_1 = require("./MinorityRefuge");
const MolecularPrinting_1 = require("./MolecularPrinting");
const NitrogenFromTitan_1 = require("./NitrogenFromTitan");
const PioneerSettlement_1 = require("./PioneerSettlement");
const Polyphemos_1 = require("./Polyphemos");
const Poseidon_1 = require("./Poseidon");
const ProductiveOutpost_1 = require("./ProductiveOutpost");
const QuantumCommunications_1 = require("./QuantumCommunications");
const RedSpotObservatory_1 = require("./RedSpotObservatory");
const RefugeeCamps_1 = require("./RefugeeCamps");
const ResearchColony_1 = require("./ResearchColony");
const RimFreighters_1 = require("./RimFreighters");
const SkyDocks_1 = require("./SkyDocks");
const SolarProbe_1 = require("./SolarProbe");
const SolarReflectors_1 = require("./SolarReflectors");
const SpacePort_1 = require("./SpacePort");
const SpacePortColony_1 = require("./SpacePortColony");
const SpinoffDepartment_1 = require("./SpinoffDepartment");
const StormCraftIncorporated_1 = require("./StormCraftIncorporated");
const SubZeroSaltFish_1 = require("./SubZeroSaltFish");
const TitanAirScrapping_1 = require("./TitanAirScrapping");
const TitanFloatingLaunchPad_1 = require("./TitanFloatingLaunchPad");
const TitanShuttles_1 = require("./TitanShuttles");
const TradeEnvoys_1 = require("./TradeEnvoys");
const TradingColony_1 = require("./TradingColony");
const UrbanDecomposers_1 = require("./UrbanDecomposers");
const WarpDrive_1 = require("./WarpDrive");
const BuildColonyStandardProject_1 = require("./BuildColonyStandardProject");
exports.COLONIES_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'colonies',
    projectCards: {
        [CardName_1.CardName.AIRLINERS]: { Factory: Airliners_1.Airliners },
        [CardName_1.CardName.AIR_RAID]: { Factory: AirRaid_1.AirRaid },
        [CardName_1.CardName.ATMO_COLLECTORS]: { Factory: AtmoCollectors_1.AtmoCollectors },
        [CardName_1.CardName.COMMUNITY_SERVICES]: { Factory: CommunityServices_1.CommunityServices },
        [CardName_1.CardName.CONSCRIPTION]: { Factory: Conscription_1.Conscription },
        [CardName_1.CardName.CORONA_EXTRACTOR]: { Factory: CoronaExtractor_1.CoronaExtractor },
        [CardName_1.CardName.CRYO_SLEEP]: { Factory: CryoSleep_1.CryoSleep },
        [CardName_1.CardName.EARTH_ELEVATOR]: { Factory: EarthElevator_1.EarthElevator },
        [CardName_1.CardName.ECOLOGY_RESEARCH]: { Factory: EcologyResearch_1.EcologyResearch },
        [CardName_1.CardName.FLOATER_LEASING]: { Factory: FloaterLeasing_1.FloaterLeasing },
        [CardName_1.CardName.FLOATER_PROTOTYPES]: { Factory: FloaterPrototypes_1.FloaterPrototypes },
        [CardName_1.CardName.FLOATER_TECHNOLOGY]: { Factory: FloaterTechnology_1.FloaterTechnology },
        [CardName_1.CardName.GALILEAN_WAYSTATION]: { Factory: GalileanWaystation_1.GalileanWaystation },
        [CardName_1.CardName.HEAVY_TAXATION]: { Factory: HeavyTaxation_1.HeavyTaxation },
        [CardName_1.CardName.ICE_MOON_COLONY]: { Factory: IceMoonColony_1.IceMoonColony },
        [CardName_1.CardName.IMPACTOR_SWARM]: { Factory: ImpactorSwarm_1.ImpactorSwarm },
        [CardName_1.CardName.INTERPLANETARY_COLONY_SHIP]: { Factory: InterplanetaryColonyShip_1.InterplanetaryColonyShip },
        [CardName_1.CardName.JOVIAN_LANTERNS]: { Factory: JovianLanterns_1.JovianLanterns },
        [CardName_1.CardName.JUPITER_FLOATING_STATION]: { Factory: JupiterFloatingStation_1.JupiterFloatingStation },
        [CardName_1.CardName.LUNA_GOVERNOR]: { Factory: LunaGovernor_1.LunaGovernor },
        [CardName_1.CardName.LUNAR_EXPORTS]: { Factory: LunarExports_1.LunarExports },
        [CardName_1.CardName.LUNAR_MINING]: { Factory: LunarMining_1.LunarMining },
        [CardName_1.CardName.MARTIAN_ZOO]: { Factory: MartianZoo_1.MartianZoo },
        [CardName_1.CardName.MARKET_MANIPULATION]: { Factory: MarketManipulation_1.MarketManipulation },
        [CardName_1.CardName.MINING_COLONY]: { Factory: MiningColony_1.MiningColony },
        [CardName_1.CardName.MINORITY_REFUGE]: { Factory: MinorityRefuge_1.MinorityRefuge },
        [CardName_1.CardName.MOLECULAR_PRINTING]: { Factory: MolecularPrinting_1.MolecularPrinting },
        [CardName_1.CardName.NITROGEN_FROM_TITAN]: { Factory: NitrogenFromTitan_1.NitrogenFromTitan },
        [CardName_1.CardName.PIONEER_SETTLEMENT]: { Factory: PioneerSettlement_1.PioneerSettlement },
        [CardName_1.CardName.PRODUCTIVE_OUTPOST]: { Factory: ProductiveOutpost_1.ProductiveOutpost },
        [CardName_1.CardName.QUANTUM_COMMUNICATIONS]: { Factory: QuantumCommunications_1.QuantumCommunications },
        [CardName_1.CardName.RED_SPOT_OBSERVATORY]: { Factory: RedSpotObservatory_1.RedSpotObservatory },
        [CardName_1.CardName.RESEARCH_COLONY]: { Factory: ResearchColony_1.ResearchColony },
        [CardName_1.CardName.RIM_FREIGHTERS]: { Factory: RimFreighters_1.RimFreighters },
        [CardName_1.CardName.REFUGEE_CAMPS]: { Factory: RefugeeCamps_1.RefugeeCamps },
        [CardName_1.CardName.SOLAR_PROBE]: { Factory: SolarProbe_1.SolarProbe },
        [CardName_1.CardName.SOLAR_REFLECTORS]: { Factory: SolarReflectors_1.SolarReflectors },
        [CardName_1.CardName.SKY_DOCKS]: { Factory: SkyDocks_1.SkyDocks },
        [CardName_1.CardName.SPACE_PORT]: { Factory: SpacePort_1.SpacePort },
        [CardName_1.CardName.SPACE_PORT_COLONY]: { Factory: SpacePortColony_1.SpacePortColony },
        [CardName_1.CardName.SPINOFF_DEPARTMENT]: { Factory: SpinoffDepartment_1.SpinoffDepartment },
        [CardName_1.CardName.SUBZERO_SALT_FISH]: { Factory: SubZeroSaltFish_1.SubZeroSaltFish },
        [CardName_1.CardName.TITAN_AIRSCRAPPING]: { Factory: TitanAirScrapping_1.TitanAirScrapping },
        [CardName_1.CardName.TITAN_FLOATING_LAUNCHPAD]: { Factory: TitanFloatingLaunchPad_1.TitanFloatingLaunchPad },
        [CardName_1.CardName.TITAN_SHUTTLES]: { Factory: TitanShuttles_1.TitanShuttles },
        [CardName_1.CardName.TRADING_COLONY]: { Factory: TradingColony_1.TradingColony },
        [CardName_1.CardName.TRADE_ENVOYS]: { Factory: TradeEnvoys_1.TradeEnvoys },
        [CardName_1.CardName.URBAN_DECOMPOSERS]: { Factory: UrbanDecomposers_1.UrbanDecomposers },
        [CardName_1.CardName.WARP_DRIVE]: { Factory: WarpDrive_1.WarpDrive },
    },
    standardProjects: {
        [CardName_1.CardName.BUILD_COLONY_STANDARD_PROJECT]: { Factory: BuildColonyStandardProject_1.BuildColonyStandardProject },
    },
    corporationCards: {
        [CardName_1.CardName.ARIDOR]: { Factory: Aridor_1.Aridor, compatibility: 'colonies' },
        [CardName_1.CardName.ARKLIGHT]: { Factory: Arklight_1.Arklight },
        [CardName_1.CardName.POLYPHEMOS]: { Factory: Polyphemos_1.Polyphemos },
        [CardName_1.CardName.POSEIDON]: { Factory: Poseidon_1.Poseidon, compatibility: 'colonies' },
        [CardName_1.CardName.STORMCRAFT_INCORPORATED]: { Factory: StormCraftIncorporated_1.StormCraftIncorporated },
    },
});
