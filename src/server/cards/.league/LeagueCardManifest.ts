import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {AmphibianFarming} from './league_project/AmphibianFarming';
import {AssemblyLines} from './league_project/AssemblyLines';
import {BankUnions} from './league_project/BankUnions';
import {BoringvillePopulationYou} from './league_project/BoringvillePopulationYou';
import {DNAExtractionFromSoil} from './league_project/DNAExtractionFromSoil';
import {DactylAndIda} from './league_project/DactylAndIda';
import {EdibleFungi} from './league_project/EdibleFungi';
import {FireSale} from './league_project/FireSale';
import {HeavyMetalBioremediation} from './league_project/HeavyMetalBioremediation';
import {Incinerator} from './league_project/Incinerator';
import {InvestmentBanks} from './league_project/InvestmentBanks';
import {LaboratoryMice} from './league_project/LaboratoryMice';
import {MarsHeavyIndustry} from './league_project/MarsHeavyIndustry';
import {MatingSeason} from './league_project/MatingSeason';
import {OuterRimUniversity} from './league_project/OuterRimUniversity';
import {RecycledProjects} from './league_project/RecycledProjects';
// import {Scavengers} from './league_corporation/Scavengers';
import {SoilEnhancers} from './league_project/SoilEnhancers';
import {SpaceDebrisCollection} from './league_project/SpaceDebrisCollection';
import {SteelCasting} from './league_project/SteelCasting';
//import {SulphuricImport} from './league_project/SulphuricImport';
import {TitaniumIsotopes} from './league_project/TitaniumIsotopes';
import {WorldGovernmentPartnership} from './league_project/WorldGovernmentPartnership';

export const LEAGUE_CARD_MANIFEST = new ModuleManifest({
  module: 'league',
  projectCards: {
    [CardName.AMPHIBIAN_FARMING]: {Factory: AmphibianFarming},
    [CardName.ASSEMBLY_LINES]: {Factory: AssemblyLines},
    [CardName.BANK_UNIONS]: {Factory: BankUnions},
    [CardName.BORINGVILLE_POPULATION_YOU]: {Factory: BoringvillePopulationYou},
    [CardName.DACTYL_AND_IDA]: {Factory: DactylAndIda},
    [CardName.DNA_EXTRACTION_FROM_SOIL]: {Factory: DNAExtractionFromSoil},
    [CardName.EDIBLE_FUNGI]: {Factory: EdibleFungi},
    [CardName.FIRE_SALE]: {Factory: FireSale},
    [CardName.HEAVY_METAL_BIOREMEDIATION]: {Factory: HeavyMetalBioremediation},
    [CardName.INCINERATOR]: {Factory: Incinerator},
    [CardName.INVESTMENT_BANKS]: {Factory: InvestmentBanks},
    [CardName.LABORATORY_MICE]: {Factory: LaboratoryMice},
    [CardName.MARS_HEAVY_INDUSTRY]: {Factory: MarsHeavyIndustry},
    [CardName.MATING_SEASON]: {Factory: MatingSeason},
    [CardName.OUTER_RIM_UNIVERSITY]: {Factory: OuterRimUniversity},
    [CardName.RECYCLED_PROJECTS]: {Factory: RecycledProjects},
    [CardName.SOIL_ENHANCERS]: {Factory: SoilEnhancers},
    [CardName.SPACE_DEBRIS_COLLECTION]: {Factory: SpaceDebrisCollection},
    [CardName.STEEL_CASTING]: {Factory: SteelCasting},
    //[CardName.SULPHURIC_IMPORT]: {Factory: SulphuricImport},
    [CardName.TITANIUM_ISOTOPES]: {Factory: TitaniumIsotopes},
    [CardName.WORLD_GOVERNMENT_PARTNERSHIP]: {Factory: WorldGovernmentPartnership},
  },
/*   corporationCards: {
    [CardName.SCAVENGERS]: {Factory: Scavengers},
  }, */

  cardsToRemove: [
    // projects
    //CardName.PHOBOS_SPACE_HAVEN,
  ],
});
