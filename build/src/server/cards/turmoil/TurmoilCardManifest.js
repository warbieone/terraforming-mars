"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TURMOIL_CARD_MANIFEST = void 0;
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AerialLenses_1 = require("./AerialLenses");
const BannedDelegate_1 = require("./BannedDelegate");
const CulturalMetropolis_1 = require("./CulturalMetropolis");
const DiasporaMovement_1 = require("./DiasporaMovement");
const EventAnalysts_1 = require("./EventAnalysts");
const GMOContract_1 = require("./GMOContract");
const LakefrontResorts_1 = require("./LakefrontResorts");
const MartianMediaCenter_1 = require("./MartianMediaCenter");
const ParliamentHall_1 = require("./ParliamentHall");
const PoliticalAlliance_1 = require("./PoliticalAlliance");
const Pristar_1 = require("./Pristar");
const PROffice_1 = require("./PROffice");
const PublicCelebrations_1 = require("./PublicCelebrations");
const Recruitment_1 = require("./Recruitment");
const RedTourismWave_1 = require("./RedTourismWave");
const SeptumTribus_1 = require("./SeptumTribus");
const SponsoredMohole_1 = require("./SponsoredMohole");
const SupportedResearch_1 = require("./SupportedResearch");
const TerralabsResearch_1 = require("./TerralabsResearch");
const UtopiaInvest_1 = require("./UtopiaInvest");
const VoteOfNoConfidence_1 = require("./VoteOfNoConfidence");
const WildlifeDome_1 = require("./WildlifeDome");
const AquiferReleasedByPublicCouncil_1 = require("../../turmoil/globalEvents/AquiferReleasedByPublicCouncil");
const CelebrityLeaders_1 = require("../../turmoil/globalEvents/CelebrityLeaders");
const CloudSocieties_1 = require("../../turmoil/globalEvents/CloudSocieties");
const CorrosiveRain_1 = require("../../turmoil/globalEvents/CorrosiveRain");
const Diversity_1 = require("../../turmoil/globalEvents/Diversity");
const DryDeserts_1 = require("../../turmoil/globalEvents/DryDeserts");
const EcoSabotage_1 = require("../../turmoil/globalEvents/EcoSabotage");
const Election_1 = require("../../turmoil/globalEvents/Election");
const GenerousFunding_1 = require("../../turmoil/globalEvents/GenerousFunding");
const GlobalDustStorm_1 = require("../../turmoil/globalEvents/GlobalDustStorm");
const HomeworldSupport_1 = require("../../turmoil/globalEvents/HomeworldSupport");
const ImprovedEnergyTemplates_1 = require("../../turmoil/globalEvents/ImprovedEnergyTemplates");
const JovianTaxRights_1 = require("../../turmoil/globalEvents/JovianTaxRights");
const MicrogravityHealthProblems_1 = require("../../turmoil/globalEvents/MicrogravityHealthProblems");
const MinersOnStrike_1 = require("../../turmoil/globalEvents/MinersOnStrike");
const MudSlides_1 = require("../../turmoil/globalEvents/MudSlides");
const Pandemic_1 = require("../../turmoil/globalEvents/Pandemic");
const ParadigmBreakdown_1 = require("../../turmoil/globalEvents/ParadigmBreakdown");
const Productivity_1 = require("../../turmoil/globalEvents/Productivity");
const RedInfluence_1 = require("../../turmoil/globalEvents/RedInfluence");
const Revolution_1 = require("../../turmoil/globalEvents/Revolution");
const Riots_1 = require("../../turmoil/globalEvents/Riots");
const ScientificCommunity_1 = require("../../turmoil/globalEvents/ScientificCommunity");
const SnowCover_1 = require("../../turmoil/globalEvents/SnowCover");
const SolarFlare_1 = require("../../turmoil/globalEvents/SolarFlare");
const SolarnetShutdown_1 = require("../../turmoil/globalEvents/SolarnetShutdown");
const SpinoffProducts_1 = require("../../turmoil/globalEvents/SpinoffProducts");
const SponsoredProjects_1 = require("../../turmoil/globalEvents/SponsoredProjects");
const StrongSociety_1 = require("../../turmoil/globalEvents/StrongSociety");
const SuccessfulOrganisms_1 = require("../../turmoil/globalEvents/SuccessfulOrganisms");
const VenusInfrastructure_1 = require("../../turmoil/globalEvents/VenusInfrastructure");
const VolcanicEruptions_1 = require("../../turmoil/globalEvents/VolcanicEruptions");
const WarOnEarth_1 = require("../../turmoil/globalEvents/WarOnEarth");
const AsteroidMining_1 = require("../../turmoil/globalEvents/AsteroidMining");
const Sabotage_1 = require("../../turmoil/globalEvents/Sabotage");
const InterplanetaryTrade_1 = require("../../turmoil/globalEvents/InterplanetaryTrade");
exports.TURMOIL_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'turmoil',
    projectCards: {
        [CardName_1.CardName.AERIAL_LENSES]: { Factory: AerialLenses_1.AerialLenses },
        [CardName_1.CardName.BANNED_DELEGATE]: { Factory: BannedDelegate_1.BannedDelegate },
        [CardName_1.CardName.CULTURAL_METROPOLIS]: { Factory: CulturalMetropolis_1.CulturalMetropolis },
        [CardName_1.CardName.DIASPORA_MOVEMENT]: { Factory: DiasporaMovement_1.DiasporaMovement },
        [CardName_1.CardName.EVENT_ANALYSTS]: { Factory: EventAnalysts_1.EventAnalysts },
        [CardName_1.CardName.GMO_CONTRACT]: { Factory: GMOContract_1.GMOContract },
        [CardName_1.CardName.MARTIAN_MEDIA_CENTER]: { Factory: MartianMediaCenter_1.MartianMediaCenter },
        [CardName_1.CardName.PARLIAMENT_HALL]: { Factory: ParliamentHall_1.ParliamentHall },
        [CardName_1.CardName.PR_OFFICE]: { Factory: PROffice_1.PROffice },
        [CardName_1.CardName.POLITICAL_ALLIANCE]: { Factory: PoliticalAlliance_1.PoliticalAlliance },
        [CardName_1.CardName.PUBLIC_CELEBRATIONS]: { Factory: PublicCelebrations_1.PublicCelebrations },
        [CardName_1.CardName.RECRUITMENT]: { Factory: Recruitment_1.Recruitment },
        [CardName_1.CardName.RED_TOURISM_WAVE]: { Factory: RedTourismWave_1.RedTourismWave },
        [CardName_1.CardName.SPONSORED_MOHOLE]: { Factory: SponsoredMohole_1.SponsoredMohole },
        [CardName_1.CardName.SUPPORTED_RESEARCH]: { Factory: SupportedResearch_1.SupportedResearch },
        [CardName_1.CardName.WILDLIFE_DOME]: { Factory: WildlifeDome_1.WildlifeDome },
        [CardName_1.CardName.VOTE_OF_NO_CONFIDENCE]: { Factory: VoteOfNoConfidence_1.VoteOfNoConfidence },
    },
    corporationCards: {
        [CardName_1.CardName.LAKEFRONT_RESORTS]: { Factory: LakefrontResorts_1.LakefrontResorts },
        [CardName_1.CardName.PRISTAR]: { Factory: Pristar_1.Pristar },
        [CardName_1.CardName.TERRALABS_RESEARCH]: { Factory: TerralabsResearch_1.TerralabsResearch },
        [CardName_1.CardName.UTOPIA_INVEST]: { Factory: UtopiaInvest_1.UtopiaInvest },
        [CardName_1.CardName.SEPTUM_TRIBUS]: { Factory: SeptumTribus_1.SeptumTribus, compatibility: 'turmoil' },
    },
    globalEvents: {
        [GlobalEventName_1.GlobalEventName.JOVIAN_TAX_RIGHTS]: { Factory: JovianTaxRights_1.JovianTaxRights, compatibility: 'colonies' },
        [GlobalEventName_1.GlobalEventName.MICROGRAVITY_HEALTH_PROBLEMS]: { Factory: MicrogravityHealthProblems_1.MicrogravityHealthProblems, compatibility: 'colonies', negative: true },
        [GlobalEventName_1.GlobalEventName.CLOUD_SOCIETIES]: { Factory: CloudSocieties_1.CloudSocieties, compatibility: ['venus', 'colonies'] },
        [GlobalEventName_1.GlobalEventName.CORROSIVE_RAIN]: { Factory: CorrosiveRain_1.CorrosiveRain, compatibility: ['venus', 'colonies'], negative: true },
        [GlobalEventName_1.GlobalEventName.VENUS_INFRASTRUCTURE]: { Factory: VenusInfrastructure_1.VenusInfrastructure, compatibility: 'venus' },
        [GlobalEventName_1.GlobalEventName.SPONSORED_PROJECTS]: { Factory: SponsoredProjects_1.SponsoredProjects },
        [GlobalEventName_1.GlobalEventName.ASTEROID_MINING]: { Factory: AsteroidMining_1.AsteroidMining },
        [GlobalEventName_1.GlobalEventName.GENEROUS_FUNDING]: { Factory: GenerousFunding_1.GenerousFunding },
        [GlobalEventName_1.GlobalEventName.SUCCESSFUL_ORGANISMS]: { Factory: SuccessfulOrganisms_1.SuccessfulOrganisms },
        [GlobalEventName_1.GlobalEventName.PRODUCTIVITY]: { Factory: Productivity_1.Productivity },
        [GlobalEventName_1.GlobalEventName.HOMEWORLD_SUPPORT]: { Factory: HomeworldSupport_1.HomeworldSupport },
        [GlobalEventName_1.GlobalEventName.VOLCANIC_ERUPTIONS]: { Factory: VolcanicEruptions_1.VolcanicEruptions },
        [GlobalEventName_1.GlobalEventName.DIVERSITY]: { Factory: Diversity_1.Diversity },
        [GlobalEventName_1.GlobalEventName.IMPROVED_ENERGY_TEMPLATES]: { Factory: ImprovedEnergyTemplates_1.ImprovedEnergyTemplates },
        [GlobalEventName_1.GlobalEventName.INTERPLANETARY_TRADE]: { Factory: InterplanetaryTrade_1.InterplanetaryTrade },
        [GlobalEventName_1.GlobalEventName.CELEBRITY_LEADERS]: { Factory: CelebrityLeaders_1.CelebrityLeaders },
        [GlobalEventName_1.GlobalEventName.SPINOFF_PRODUCTS]: { Factory: SpinoffProducts_1.SpinoffProducts },
        [GlobalEventName_1.GlobalEventName.ELECTION]: { Factory: Election_1.Election },
        [GlobalEventName_1.GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL]: { Factory: AquiferReleasedByPublicCouncil_1.AquiferReleasedByPublicCouncil },
        [GlobalEventName_1.GlobalEventName.SCIENTIFIC_COMMUNITY]: { Factory: ScientificCommunity_1.ScientificCommunity },
        [GlobalEventName_1.GlobalEventName.STRONG_SOCIETY]: { Factory: StrongSociety_1.StrongSociety },
        [GlobalEventName_1.GlobalEventName.GLOBAL_DUST_STORM]: { Factory: GlobalDustStorm_1.GlobalDustStorm, negative: true },
        [GlobalEventName_1.GlobalEventName.ECO_SABOTAGE]: { Factory: EcoSabotage_1.EcoSabotage, negative: true },
        [GlobalEventName_1.GlobalEventName.MINERS_ON_STRIKE]: { Factory: MinersOnStrike_1.MinersOnStrike, negative: true },
        [GlobalEventName_1.GlobalEventName.MUD_SLIDES]: { Factory: MudSlides_1.MudSlides, negative: true },
        [GlobalEventName_1.GlobalEventName.REVOLUTION]: { Factory: Revolution_1.Revolution, negative: true },
        [GlobalEventName_1.GlobalEventName.RIOTS]: { Factory: Riots_1.Riots, negative: true },
        [GlobalEventName_1.GlobalEventName.SABOTAGE]: { Factory: Sabotage_1.Sabotage, negative: true },
        [GlobalEventName_1.GlobalEventName.SNOW_COVER]: { Factory: SnowCover_1.SnowCover, negative: true },
        [GlobalEventName_1.GlobalEventName.PANDEMIC]: { Factory: Pandemic_1.Pandemic, negative: true },
        [GlobalEventName_1.GlobalEventName.WAR_ON_EARTH]: { Factory: WarOnEarth_1.WarOnEarth, negative: true },
        [GlobalEventName_1.GlobalEventName.PARADIGM_BREAKDOWN]: { Factory: ParadigmBreakdown_1.ParadigmBreakdown, negative: true },
        [GlobalEventName_1.GlobalEventName.DRY_DESERTS]: { Factory: DryDeserts_1.DryDeserts, negative: true },
        [GlobalEventName_1.GlobalEventName.RED_INFLUENCE]: { Factory: RedInfluence_1.RedInfluence, negative: true },
        [GlobalEventName_1.GlobalEventName.SOLARNET_SHUTDOWN]: { Factory: SolarnetShutdown_1.SolarnetShutdown, negative: true },
        [GlobalEventName_1.GlobalEventName.SOLAR_FLARE]: { Factory: SolarFlare_1.SolarFlare, negative: true },
    },
});
//# sourceMappingURL=TurmoilCardManifest.js.map