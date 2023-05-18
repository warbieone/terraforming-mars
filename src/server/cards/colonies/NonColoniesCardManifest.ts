import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {Airliners} from './Airliners';
import {AirRaid} from './AirRaid';
import {AtmoCollectors} from './AtmoCollectors';
import {CommunityServices} from './CommunityServices';
import {Conscription} from './Conscription';
import {CoronaExtractor} from './CoronaExtractor';
import {EarthElevator} from './EarthElevator';
import {FloaterLeasing} from './FloaterLeasing';
import {FloaterPrototypes} from './FloaterPrototypes';
import {FloaterTechnology} from './FloaterTechnology';
import {GalileanWaystation} from './GalileanWaystation';
import {HeavyTaxation} from './HeavyTaxation';
import {ImpactorSwarm} from './ImpactorSwarm';
import {JovianLanterns} from './JovianLanterns';
import {JupiterFloatingStation} from './JupiterFloatingStation';
import {LunaGovernor} from './LunaGovernor';
import {LunarExports} from './LunarExports';
import {LunarMining} from './LunarMining';
import {MartianZoo} from './MartianZoo';
import {NitrogenFromTitan} from './NitrogenFromTitan';
import {RedSpotObservatory} from './RedSpotObservatory';
import {RefugeeCamps} from './RefugeeCamps';
import {SolarProbe} from './SolarProbe';
import {SolarReflectors} from './SolarReflectors';
import {SpinoffDepartment} from './SpinoffDepartment';
import {SubZeroSaltFish} from './SubZeroSaltFish';
import {TitanAirScrapping} from './TitanAirScrapping';
import {TitanShuttles} from './TitanShuttles';
import {WarpDrive} from './WarpDrive';

export const NON_COLONIES_CARD_MANIFEST = new ModuleManifest({
  module: 'colonies',

  projectCards: {
    [CardName.AIRLINERS]: {Factory: Airliners},
    [CardName.AIR_RAID]: {Factory: AirRaid},
    [CardName.ATMO_COLLECTORS]: {Factory: AtmoCollectors},
    [CardName.COMMUNITY_SERVICES]: {Factory: CommunityServices},
    [CardName.CONSCRIPTION]: {Factory: Conscription},
    [CardName.CORONA_EXTRACTOR]: {Factory: CoronaExtractor},
    [CardName.EARTH_ELEVATOR]: {Factory: EarthElevator},
    [CardName.FLOATER_LEASING]: {Factory: FloaterLeasing},
    [CardName.FLOATER_PROTOTYPES]: {Factory: FloaterPrototypes},
    [CardName.FLOATER_TECHNOLOGY]: {Factory: FloaterTechnology},
    [CardName.GALILEAN_WAYSTATION]: {Factory: GalileanWaystation},
    [CardName.HEAVY_TAXATION]: {Factory: HeavyTaxation},
    [CardName.IMPACTOR_SWARM]: {Factory: ImpactorSwarm},
    [CardName.JOVIAN_LANTERNS]: {Factory: JovianLanterns},
    [CardName.JUPITER_FLOATING_STATION]: {Factory: JupiterFloatingStation},
    [CardName.LUNA_GOVERNOR]: {Factory: LunaGovernor},
    [CardName.LUNAR_EXPORTS]: {Factory: LunarExports},
    [CardName.LUNAR_MINING]: {Factory: LunarMining},
    [CardName.MARTIAN_ZOO]: {Factory: MartianZoo},
    [CardName.NITROGEN_FROM_TITAN]: {Factory: NitrogenFromTitan},
    [CardName.RED_SPOT_OBSERVATORY]: {Factory: RedSpotObservatory},
    [CardName.REFUGEE_CAMPS]: {Factory: RefugeeCamps},
    [CardName.SOLAR_PROBE]: {Factory: SolarProbe},
    [CardName.SOLAR_REFLECTORS]: {Factory: SolarReflectors},
    [CardName.SPINOFF_DEPARTMENT]: {Factory: SpinoffDepartment},
    [CardName.SUBZERO_SALT_FISH]: {Factory: SubZeroSaltFish},
    [CardName.TITAN_AIRSCRAPPING]: {Factory: TitanAirScrapping},
    [CardName.TITAN_SHUTTLES]: {Factory: TitanShuttles},
    [CardName.WARP_DRIVE]: {Factory: WarpDrive},
  },
});
