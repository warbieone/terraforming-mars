"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRELUDE_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AcquiredSpaceAgency_1 = require("./AcquiredSpaceAgency");
const AlliedBanks_1 = require("./AlliedBanks");
const AquiferTurbines_1 = require("./AquiferTurbines");
const Biofuels_1 = require("./Biofuels");
const Biolab_1 = require("./Biolab");
const BiosphereSupport_1 = require("./BiosphereSupport");
const BusinessEmpire_1 = require("./BusinessEmpire");
const CheungShingMARS_1 = require("./CheungShingMARS");
const DomeFarming_1 = require("./DomeFarming");
const Donation_1 = require("./Donation");
const EarlySettlement_1 = require("./EarlySettlement");
const EccentricSponsor_1 = require("./EccentricSponsor");
const EcologyExperts_1 = require("./EcologyExperts");
const ExperimentalForest_1 = require("./ExperimentalForest");
const GalileanMining_1 = require("./GalileanMining");
const GreatAquifer_1 = require("./GreatAquifer");
const HousePrinting_1 = require("./HousePrinting");
const HugeAsteroid_1 = require("./HugeAsteroid");
const IoResearchOutpost_1 = require("./IoResearchOutpost");
const LavaTubeSettlement_1 = require("./LavaTubeSettlement");
const Loan_1 = require("./Loan");
const MartianIndustries_1 = require("./MartianIndustries");
const MartianSurvey_1 = require("./MartianSurvey");
const MetalRichAsteroid_1 = require("./MetalRichAsteroid");
const MetalsCompany_1 = require("./MetalsCompany");
const MiningOperations_1 = require("./MiningOperations");
const Mohole_1 = require("./Mohole");
const MoholeExcavation_1 = require("./MoholeExcavation");
const NitrogenShipment_1 = require("./NitrogenShipment");
const OrbitalConstructionYard_1 = require("./OrbitalConstructionYard");
const PointLuna_1 = require("./PointLuna");
const PolarIndustries_1 = require("./PolarIndustries");
const PowerGeneration_1 = require("./PowerGeneration");
const Psychrophiles_1 = require("./Psychrophiles");
const ResearchCoordination_1 = require("./ResearchCoordination");
const ResearchNetwork_1 = require("./ResearchNetwork");
const RobinsonIndustries_1 = require("./RobinsonIndustries");
const SelfSufficientSettlement_1 = require("./SelfSufficientSettlement");
const SFMemorial_1 = require("./SFMemorial");
const SmeltingPlant_1 = require("./SmeltingPlant");
const SocietySupport_1 = require("./SocietySupport");
const SpaceHotels_1 = require("./SpaceHotels");
const Supplier_1 = require("./Supplier");
const SupplyDrop_1 = require("./SupplyDrop");
const UNMIContractor_1 = require("./UNMIContractor");
const ValleyTrust_1 = require("./ValleyTrust");
const Vitor_1 = require("./Vitor");
exports.PRELUDE_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'prelude',
    projectCards: {
        [CardName_1.CardName.SF_MEMORIAL]: { Factory: SFMemorial_1.SFMemorial },
        [CardName_1.CardName.HOUSE_PRINTING]: { Factory: HousePrinting_1.HousePrinting },
        [CardName_1.CardName.SPACE_HOTELS]: { Factory: SpaceHotels_1.SpaceHotels },
        [CardName_1.CardName.MARTIAN_SURVEY]: { Factory: MartianSurvey_1.MartianSurvey },
        [CardName_1.CardName.RESEARCH_COORDINATION]: { Factory: ResearchCoordination_1.ResearchCoordination },
        [CardName_1.CardName.LAVA_TUBE_SETTLEMENT]: { Factory: LavaTubeSettlement_1.LavaTubeSettlement },
        [CardName_1.CardName.PSYCHROPHILES]: { Factory: Psychrophiles_1.Psychrophiles },
    },
    corporationCards: {
        [CardName_1.CardName.CHEUNG_SHING_MARS]: { Factory: CheungShingMARS_1.CheungShingMARS },
        [CardName_1.CardName.POINT_LUNA]: { Factory: PointLuna_1.PointLuna },
        [CardName_1.CardName.ROBINSON_INDUSTRIES]: { Factory: RobinsonIndustries_1.RobinsonIndustries },
        [CardName_1.CardName.VALLEY_TRUST]: { Factory: ValleyTrust_1.ValleyTrust },
        [CardName_1.CardName.VITOR]: { Factory: Vitor_1.Vitor },
    },
    preludeCards: {
        [CardName_1.CardName.ALLIED_BANK]: { Factory: AlliedBanks_1.AlliedBanks },
        [CardName_1.CardName.BIOSPHERE_SUPPORT]: { Factory: BiosphereSupport_1.BiosphereSupport },
        [CardName_1.CardName.AQUIFER_TURBINES]: { Factory: AquiferTurbines_1.AquiferTurbines },
        [CardName_1.CardName.MOHOLE_EXCAVATION]: { Factory: MoholeExcavation_1.MoholeExcavation },
        [CardName_1.CardName.EARLY_SETTLEMENT]: { Factory: EarlySettlement_1.EarlySettlement },
        [CardName_1.CardName.BIOFUELS]: { Factory: Biofuels_1.Biofuels },
        [CardName_1.CardName.POWER_GENERATION]: { Factory: PowerGeneration_1.PowerGeneration },
        [CardName_1.CardName.SELF_SUFFICIENT_SETTLEMENT]: { Factory: SelfSufficientSettlement_1.SelfSufficientSettlement },
        [CardName_1.CardName.MINING_OPERATIONS]: { Factory: MiningOperations_1.MiningOperations },
        [CardName_1.CardName.UNMI_CONTRACTOR]: { Factory: UNMIContractor_1.UNMIContractor },
        [CardName_1.CardName.DOME_FARMING]: { Factory: DomeFarming_1.DomeFarming },
        [CardName_1.CardName.BUSINESS_EMPIRE]: { Factory: BusinessEmpire_1.BusinessEmpire },
        [CardName_1.CardName.DONATION]: { Factory: Donation_1.Donation },
        [CardName_1.CardName.NITROGEN_SHIPMENT]: { Factory: NitrogenShipment_1.NitrogenShipment },
        [CardName_1.CardName.SMELTING_PLANT]: { Factory: SmeltingPlant_1.SmeltingPlant },
        [CardName_1.CardName.SUPPLIER]: { Factory: Supplier_1.Supplier },
        [CardName_1.CardName.SUPPLY_DROP]: { Factory: SupplyDrop_1.SupplyDrop },
        [CardName_1.CardName.GREAT_AQUIFER]: { Factory: GreatAquifer_1.GreatAquifer },
        [CardName_1.CardName.BIOLAB]: { Factory: Biolab_1.Biolab },
        [CardName_1.CardName.MARTIAN_INDUSTRIES]: { Factory: MartianIndustries_1.MartianIndustries },
        [CardName_1.CardName.IO_RESEARCH_OUTPOST]: { Factory: IoResearchOutpost_1.IoResearchOutpost },
        [CardName_1.CardName.POLAR_INDUSTRIES]: { Factory: PolarIndustries_1.PolarIndustries },
        [CardName_1.CardName.SOCIETY_SUPPORT]: { Factory: SocietySupport_1.SocietySupport },
        [CardName_1.CardName.GALILEAN_MINING]: { Factory: GalileanMining_1.GalileanMining },
        [CardName_1.CardName.HUGE_ASTEROID]: { Factory: HugeAsteroid_1.HugeAsteroid },
        [CardName_1.CardName.METALS_COMPANY]: { Factory: MetalsCompany_1.MetalsCompany },
        [CardName_1.CardName.LOAN]: { Factory: Loan_1.Loan },
        [CardName_1.CardName.MOHOLE]: { Factory: Mohole_1.Mohole },
        [CardName_1.CardName.METAL_RICH_ASTEROID]: { Factory: MetalRichAsteroid_1.MetalRichAsteroid },
        [CardName_1.CardName.ORBITAL_CONSTRUCTION_YARD]: { Factory: OrbitalConstructionYard_1.OrbitalConstructionYard },
        [CardName_1.CardName.ACQUIRED_SPACE_AGENCY]: { Factory: AcquiredSpaceAgency_1.AcquiredSpaceAgency },
        [CardName_1.CardName.RESEARCH_NETWORK]: { Factory: ResearchNetwork_1.ResearchNetwork },
        [CardName_1.CardName.ECCENTRIC_SPONSOR]: { Factory: EccentricSponsor_1.EccentricSponsor },
        [CardName_1.CardName.ECOLOGY_EXPERTS]: { Factory: EcologyExperts_1.EcologyExperts },
        [CardName_1.CardName.EXPERIMENTAL_FOREST]: { Factory: ExperimentalForest_1.ExperimentalForest },
    },
});
