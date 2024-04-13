"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATHFINDERS_CARD_MANIFEST = void 0;
const ModuleManifest_1 = require("../ModuleManifest");
const CardName_1 = require("../../../common/cards/CardName");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const AdhaiHighOrbitConstructions_1 = require("./AdhaiHighOrbitConstructions");
const AdvancedPowerGrid_1 = require("./AdvancedPowerGrid");
const AgroDrones_1 = require("./AgroDrones");
const Ambient_1 = require("./Ambient");
const Anthozoa_1 = require("./Anthozoa");
const AsteroidResources_1 = require("./AsteroidResources");
const Aurorai_1 = require("./Aurorai");
const BalancedDevelopment_1 = require("./BalancedDevelopment");
const BioSol_1 = require("./BioSol");
const BotanicalExperience_1 = require("./BotanicalExperience");
const BreedingFarms_1 = require("./BreedingFarms");
const CassiniStation_1 = require("./CassiniStation");
const CeresSpaceport_1 = require("./CeresSpaceport");
const CharityDonation_1 = require("./CharityDonation");
const Chimera_1 = require("./Chimera");
const CO2Reducers_1 = require("./CO2Reducers");
const CollegiumCopernicus_1 = require("./CollegiumCopernicus");
const CommunicationBoom_1 = require("./CommunicationBoom");
const CommunicationCenter_1 = require("./CommunicationCenter");
const ConstantStruggle_1 = require("./ConstantStruggle");
const ControlledBloom_1 = require("./ControlledBloom");
const CoordinatedRaid_1 = require("./CoordinatedRaid");
const Crashlanding_1 = require("./Crashlanding");
const CrewTraining_1 = require("./CrewTraining");
const Cryptocurrency_1 = require("./Cryptocurrency");
const CultivationOfVenus_1 = require("./CultivationOfVenus");
const Cyanobacteria_1 = require("./Cyanobacteria");
const DataLeak_1 = require("./DataLeak");
const DeclarationOfIndependence_1 = require("./DeclarationOfIndependence");
const DeepSpaceOperations_1 = require("./DeepSpaceOperations");
const DesignCompany_1 = require("./DesignCompany");
const DesignedOrganisms_1 = require("./DesignedOrganisms");
const DustStorm_1 = require("./DustStorm");
const DysonScreens_1 = require("./DysonScreens");
const EarlyExpedition_1 = require("./EarlyExpedition");
const EconomicEspionage_1 = require("./EconomicEspionage");
const EconomicHelp_1 = require("./EconomicHelp");
const ExpeditionToTheSurfaceVenus_1 = require("./ExpeditionToTheSurfaceVenus");
const ExperiencedMartians_1 = require("./ExperiencedMartians");
const FlatMarsTheory_1 = require("./FlatMarsTheory");
const FloaterUrbanism_1 = require("./FloaterUrbanism");
const GagarinMobileBase_1 = require("./GagarinMobileBase");
const GeologicalExpedition_1 = require("./GeologicalExpedition");
const HabitatMarte_1 = require("./HabitatMarte");
const HighTempSuperconductors_1 = require("./HighTempSuperconductors");
const HuygensObservatory_1 = require("./HuygensObservatory");
const HydrogenBombardment_1 = require("./HydrogenBombardment");
const HydrogenProcessingPlant_1 = require("./HydrogenProcessingPlant");
const InterplanetaryTransport_1 = require("./InterplanetaryTransport");
const Kickstarter_1 = require("./Kickstarter");
const LastResortIngenuity_1 = require("./LastResortIngenuity");
const LobbyHalls_1 = require("./LobbyHalls");
const LunarEmbassy_1 = require("./LunarEmbassy");
const LuxuryEstate_1 = require("./LuxuryEstate");
const MagneticFieldStimulationDelays_1 = require("./MagneticFieldStimulationDelays");
const MarsDirect_1 = require("./MarsDirect");
const MarsMaths_1 = require("./MarsMaths");
const MartianCulture_1 = require("./MartianCulture");
const MartianDustProcessingPlant_1 = require("./MartianDustProcessingPlant");
const MartianInsuranceGroup_1 = require("./MartianInsuranceGroup");
const MartianMonuments_1 = require("./MartianMonuments");
const MartianNatureWonders_1 = require("./MartianNatureWonders");
const MartianRepository_1 = require("./MartianRepository");
const MicrobiologyPatents_1 = require("./MicrobiologyPatents");
const MindSetMars_1 = require("./MindSetMars");
const MuseumofEarlyColonisation_1 = require("./MuseumofEarlyColonisation");
const NewVenice_1 = require("./NewVenice");
const NobelLabs_1 = require("./NobelLabs");
const Odyssey_1 = require("./Odyssey");
const OrbitalLaboratories_1 = require("./OrbitalLaboratories");
const OumuamuaTypeObjectSurvey_1 = require("./OumuamuaTypeObjectSurvey");
const OzoneGenerators_1 = require("./OzoneGenerators");
const PersonalAgenda_1 = require("./PersonalAgenda");
const Polaris_1 = require("./Polaris");
const Pollinators_1 = require("./Pollinators");
const PowerPlant_1 = require("./PowerPlant");
const PrefabricationofHumanHabitats_1 = require("./PrefabricationofHumanHabitats");
const PrivateSecurity_1 = require("./PrivateSecurity");
const PublicSponsoredGrant_1 = require("./PublicSponsoredGrant");
const RareEarthElements_1 = require("./RareEarthElements");
const RedCity_1 = require("./RedCity");
const ResearchGrant_1 = require("./ResearchGrant");
const ReturntoAbandonedTechnology_1 = require("./ReturntoAbandonedTechnology");
const RichDeposits_1 = require("./RichDeposits");
const Ringcom_1 = require("./Ringcom");
const RobinHaulings_1 = require("./RobinHaulings");
const SecretLabs_1 = require("./SecretLabs");
const SmallComet_1 = require("./SmallComet");
const SmallOpenPitMine_1 = require("./SmallOpenPitMine");
const SocialEvents_1 = require("./SocialEvents");
const SoilDetoxification_1 = require("./SoilDetoxification");
const Solarpedia_1 = require("./Solarpedia");
const SolarStorm_1 = require("./SolarStorm");
const SolBank_1 = require("./SolBank");
const SoylentSeedlingSystems_1 = require("./SoylentSeedlingSystems");
const SpaceDebrisCleaningOperation_1 = require("./SpaceDebrisCleaningOperation");
const SpaceRaceToMars_1 = require("./SpaceRaceToMars");
const SpaceRelay_1 = require("./SpaceRelay");
const SpecializedSettlement_1 = require("./SpecializedSettlement");
const Steelaris_1 = require("./Steelaris");
const StrategicBasePlanning_1 = require("./StrategicBasePlanning");
const SurveyMission_1 = require("./SurveyMission");
const TerraformingControlStation_1 = require("./TerraformingControlStation");
const TerraformingRobots_1 = require("./TerraformingRobots");
const TheNewSpaceRace_1 = require("./TheNewSpaceRace");
const ThinkTank_1 = require("./ThinkTank");
const TiredEarth_1 = require("./TiredEarth");
const ValuableGases_1 = require("./ValuableGases");
const VeneraBase_1 = require("./VeneraBase");
const VenusFirst_1 = require("./VenusFirst");
const VitalColony_1 = require("./VitalColony");
const Wetlands_1 = require("./Wetlands");
exports.PATHFINDERS_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'pathfinders',
    projectCards: {
        [CardName_1.CardName.BREEDING_FARMS]: { Factory: BreedingFarms_1.BreedingFarms },
        [CardName_1.CardName.PREFABRICATION_OF_HUMAN_HABITATS]: { Factory: PrefabricationofHumanHabitats_1.PrefabricationofHumanHabitats },
        [CardName_1.CardName.NEW_VENICE]: { Factory: NewVenice_1.NewVenice },
        [CardName_1.CardName.AGRO_DRONES]: { Factory: AgroDrones_1.AgroDrones },
        [CardName_1.CardName.WETLANDS]: { Factory: Wetlands_1.Wetlands },
        [CardName_1.CardName.RARE_EARTH_ELEMENTS]: { Factory: RareEarthElements_1.RareEarthElements },
        [CardName_1.CardName.ORBITAL_LABORATORIES]: { Factory: OrbitalLaboratories_1.OrbitalLaboratories },
        [CardName_1.CardName.DUST_STORM]: { Factory: DustStorm_1.DustStorm },
        [CardName_1.CardName.MARTIAN_MONUMENTS]: { Factory: MartianMonuments_1.MartianMonuments },
        [CardName_1.CardName.MARTIAN_NATURE_WONDERS]: { Factory: MartianNatureWonders_1.MartianNatureWonders },
        [CardName_1.CardName.MUSEUM_OF_EARLY_COLONISATION]: { Factory: MuseumofEarlyColonisation_1.MuseumofEarlyColonisation },
        [CardName_1.CardName.TERRAFORMING_CONTROL_STATION]: { Factory: TerraformingControlStation_1.TerraformingControlStation, compatibility: 'venus' },
        [CardName_1.CardName.CERES_SPACEPORT]: { Factory: CeresSpaceport_1.CeresSpaceport },
        [CardName_1.CardName.DYSON_SCREENS]: { Factory: DysonScreens_1.DysonScreens },
        [CardName_1.CardName.LUNAR_EMBASSY]: { Factory: LunarEmbassy_1.LunarEmbassy },
        [CardName_1.CardName.GEOLOGICAL_EXPEDITION]: { Factory: GeologicalExpedition_1.GeologicalExpedition },
        [CardName_1.CardName.EARLY_EXPEDITION]: { Factory: EarlyExpedition_1.EarlyExpedition },
        [CardName_1.CardName.HYDROGEN_PROCESSING_PLANT]: { Factory: HydrogenProcessingPlant_1.HydrogenProcessingPlant },
        [CardName_1.CardName.POWER_PLANT_PATHFINDERS]: { Factory: PowerPlant_1.PowerPlant },
        [CardName_1.CardName.LUXURY_ESTATE]: { Factory: LuxuryEstate_1.LuxuryEstate },
        [CardName_1.CardName.RETURN_TO_ABANDONED_TECHNOLOGY]: { Factory: ReturntoAbandonedTechnology_1.ReturntoAbandonedTechnology },
        [CardName_1.CardName.DESIGNED_ORGANISMS]: { Factory: DesignedOrganisms_1.DesignedOrganisms },
        [CardName_1.CardName.SPACE_DEBRIS_CLEANING_OPERATION]: { Factory: SpaceDebrisCleaningOperation_1.SpaceDebrisCleaningOperation },
        [CardName_1.CardName.PRIVATE_SECURITY]: { Factory: PrivateSecurity_1.PrivateSecurity },
        [CardName_1.CardName.SECRET_LABS]: { Factory: SecretLabs_1.SecretLabs },
        [CardName_1.CardName.CYANOBACTERIA]: { Factory: Cyanobacteria_1.Cyanobacteria },
        [CardName_1.CardName.COMMUNICATION_CENTER]: { Factory: CommunicationCenter_1.CommunicationCenter },
        [CardName_1.CardName.MARTIAN_REPOSITORY]: { Factory: MartianRepository_1.MartianRepository },
        [CardName_1.CardName.DATA_LEAK]: { Factory: DataLeak_1.DataLeak },
        [CardName_1.CardName.SMALL_OPEN_PIT_MINE]: { Factory: SmallOpenPitMine_1.SmallOpenPitMine },
        [CardName_1.CardName.SOLAR_STORM]: { Factory: SolarStorm_1.SolarStorm },
        [CardName_1.CardName.SPACE_RELAY]: { Factory: SpaceRelay_1.SpaceRelay },
        [CardName_1.CardName.DECLARATION_OF_INDEPENDENCE]: { Factory: DeclarationOfIndependence_1.DeclarationOfIndependence, compatibility: 'turmoil' },
        [CardName_1.CardName.MARTIAN_CULTURE]: { Factory: MartianCulture_1.MartianCulture },
        [CardName_1.CardName.OZONE_GENERATORS]: { Factory: OzoneGenerators_1.OzoneGenerators },
        [CardName_1.CardName.SMALL_COMET]: { Factory: SmallComet_1.SmallComet },
        [CardName_1.CardName.ECONOMIC_ESPIONAGE]: { Factory: EconomicEspionage_1.EconomicEspionage },
        [CardName_1.CardName.FLAT_MARS_THEORY]: { Factory: FlatMarsTheory_1.FlatMarsTheory },
        [CardName_1.CardName.ASTEROID_RESOURCES]: { Factory: AsteroidResources_1.AsteroidResources },
        [CardName_1.CardName.KICKSTARTER]: { Factory: Kickstarter_1.Kickstarter },
        [CardName_1.CardName.ECONOMIC_HELP]: { Factory: EconomicHelp_1.EconomicHelp },
        [CardName_1.CardName.INTERPLANETARY_TRANSPORT]: { Factory: InterplanetaryTransport_1.InterplanetaryTransport },
        [CardName_1.CardName.MARTIAN_DUST_PROCESSING_PLANT]: { Factory: MartianDustProcessingPlant_1.MartianDustProcessingPlant },
        [CardName_1.CardName.CULTIVATION_OF_VENUS]: { Factory: CultivationOfVenus_1.CultivationOfVenus, compatibility: 'venus' },
        [CardName_1.CardName.EXPEDITION_TO_THE_SURFACE_VENUS]: { Factory: ExpeditionToTheSurfaceVenus_1.ExpeditionToTheSurfaceVenus, compatibility: 'venus' },
        [CardName_1.CardName.LAST_RESORT_INGENUITY]: { Factory: LastResortIngenuity_1.LastResortIngenuity },
        [CardName_1.CardName.CRASHLANDING]: { Factory: Crashlanding_1.Crashlanding, compatibility: 'ares' },
        [CardName_1.CardName.THINK_TANK]: { Factory: ThinkTank_1.ThinkTank },
        [CardName_1.CardName.BOTANICAL_EXPERIENCE]: { Factory: BotanicalExperience_1.BotanicalExperience },
        [CardName_1.CardName.CRYPTOCURRENCY]: { Factory: Cryptocurrency_1.Cryptocurrency },
        [CardName_1.CardName.RICH_DEPOSITS]: { Factory: RichDeposits_1.RichDeposits },
        [CardName_1.CardName.OUMUAMUA_TYPE_OBJECT_SURVEY]: { Factory: OumuamuaTypeObjectSurvey_1.OumuamuaTypeObjectSurvey },
        [CardName_1.CardName.SOLARPEDIA]: { Factory: Solarpedia_1.Solarpedia, compatibility: 'venus' },
        [CardName_1.CardName.ANTHOZOA]: { Factory: Anthozoa_1.Anthozoa },
        [CardName_1.CardName.ADVANCED_POWER_GRID]: { Factory: AdvancedPowerGrid_1.AdvancedPowerGrid },
        [CardName_1.CardName.SPECIALIZED_SETTLEMENT]: { Factory: SpecializedSettlement_1.SpecializedSettlement },
        [CardName_1.CardName.CHARITY_DONATION]: { Factory: CharityDonation_1.CharityDonation },
        [CardName_1.CardName.NOBEL_LABS]: { Factory: NobelLabs_1.NobelLabs },
        [CardName_1.CardName.HUYGENS_OBSERVATORY]: { Factory: HuygensObservatory_1.HuygensObservatory, compatibility: 'colonies' },
        [CardName_1.CardName.CASSINI_STATION]: { Factory: CassiniStation_1.CassiniStation, compatibility: 'colonies' },
        [CardName_1.CardName.MICROBIOLOGY_PATENTS]: { Factory: MicrobiologyPatents_1.MicrobiologyPatents },
        [CardName_1.CardName.COORDINATED_RAID]: { Factory: CoordinatedRaid_1.CoordinatedRaid, compatibility: 'colonies' },
        [CardName_1.CardName.LOBBY_HALLS]: { Factory: LobbyHalls_1.LobbyHalls, compatibility: 'turmoil' },
        [CardName_1.CardName.RED_CITY]: { Factory: RedCity_1.RedCity, compatibility: 'turmoil' },
        [CardName_1.CardName.VENERA_BASE]: { Factory: VeneraBase_1.VeneraBase, compatibility: ['turmoil', 'venus'] },
        [CardName_1.CardName.FLOATER_URBANISM]: { Factory: FloaterUrbanism_1.FloaterUrbanism, compatibility: 'venus' },
        [CardName_1.CardName.SOIL_DETOXIFICATION]: { Factory: SoilDetoxification_1.SoilDetoxification, compatibility: 'turmoil' },
        [CardName_1.CardName.HIGH_TEMP_SUPERCONDUCTORS]: { Factory: HighTempSuperconductors_1.HighTempSuperconductors, compatibility: 'turmoil' },
        [CardName_1.CardName.PUBLIC_SPONSORED_GRANT]: { Factory: PublicSponsoredGrant_1.PublicSponsoredGrant, compatibility: 'turmoil' },
        [CardName_1.CardName.POLLINATORS]: { Factory: Pollinators_1.Pollinators },
        [CardName_1.CardName.SOCIAL_EVENTS]: { Factory: SocialEvents_1.SocialEvents },
        [CardName_1.CardName.CONTROLLED_BLOOM]: { Factory: ControlledBloom_1.ControlledBloom },
        [CardName_1.CardName.TERRAFORMING_ROBOTS]: { Factory: TerraformingRobots_1.TerraformingRobots },
    },
    corporationCards: {
        [CardName_1.CardName.POLARIS]: { Factory: Polaris_1.Polaris },
        [CardName_1.CardName.AMBIENT]: { Factory: Ambient_1.Ambient, compatibility: 'venus' },
        [CardName_1.CardName.RINGCOM]: { Factory: Ringcom_1.Ringcom },
        [CardName_1.CardName.CHIMERA]: { Factory: Chimera_1.Chimera },
        [CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS]: { Factory: SoylentSeedlingSystems_1.SoylentSeedlingSystems },
        [CardName_1.CardName.STEELARIS]: { Factory: Steelaris_1.Steelaris },
        [CardName_1.CardName.MARS_MATHS]: { Factory: MarsMaths_1.MarsMaths },
        [CardName_1.CardName.MARS_DIRECT]: { Factory: MarsDirect_1.MarsDirect, compatibility: 'pathfinders' },
        [CardName_1.CardName.MARTIAN_INSURANCE_GROUP]: { Factory: MartianInsuranceGroup_1.MartianInsuranceGroup, compatibility: 'pathfinders' },
        [CardName_1.CardName.SOLBANK]: { Factory: SolBank_1.SolBank },
        [CardName_1.CardName.BIO_SOL]: { Factory: BioSol_1.BioSol },
        [CardName_1.CardName.AURORAI]: { Factory: Aurorai_1.Aurorai, compatibility: 'pathfinders' },
        [CardName_1.CardName.COLLEGIUM_COPERNICUS]: { Factory: CollegiumCopernicus_1.CollegiumCopernicus, compatibility: 'colonies' },
        [CardName_1.CardName.ROBIN_HAULINGS]: { Factory: RobinHaulings_1.RobinHaulings, compatibility: ['venus', 'pathfinders'] },
        [CardName_1.CardName.ODYSSEY]: { Factory: Odyssey_1.Odyssey },
        [CardName_1.CardName.GAGARIN_MOBILE_BASE]: { Factory: GagarinMobileBase_1.GagarinMobileBase },
        [CardName_1.CardName.MIND_SET_MARS]: { Factory: MindSetMars_1.MindSetMars, compatibility: 'turmoil' },
        [CardName_1.CardName.HABITAT_MARTE]: { Factory: HabitatMarte_1.HabitatMarte, compatibility: 'pathfinders' },
        [CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS]: { Factory: AdhaiHighOrbitConstructions_1.AdhaiHighOrbitConstructions, compatibility: 'colonies' },
    },
    preludeCards: {
        [CardName_1.CardName.VENUS_FIRST]: { Factory: VenusFirst_1.VenusFirst, compatibility: 'venus' },
        [CardName_1.CardName.VALUABLE_GASES_PATHFINDERS]: { Factory: ValuableGases_1.ValuableGases, compatibility: 'venus' },
        [CardName_1.CardName.CO2_REDUCERS]: { Factory: CO2Reducers_1.CO2Reducers, compatibility: 'venus' },
        [CardName_1.CardName.HYDROGEN_BOMBARDMENT]: { Factory: HydrogenBombardment_1.HydrogenBombardment, compatibility: 'venus' },
        [CardName_1.CardName.RESEARCH_GRANT_PATHFINDERS]: { Factory: ResearchGrant_1.ResearchGrant },
        [CardName_1.CardName.CREW_TRAINING]: { Factory: CrewTraining_1.CrewTraining, compatibility: 'pathfinders' },
        [CardName_1.CardName.SURVEY_MISSION]: { Factory: SurveyMission_1.SurveyMission },
        [CardName_1.CardName.DESIGN_COMPANY]: { Factory: DesignCompany_1.DesignCompany },
        [CardName_1.CardName.PERSONAL_AGENDA]: { Factory: PersonalAgenda_1.PersonalAgenda },
        [CardName_1.CardName.VITAL_COLONY]: { Factory: VitalColony_1.VitalColony, compatibility: 'colonies' },
        [CardName_1.CardName.STRATEGIC_BASE_PLANNING]: { Factory: StrategicBasePlanning_1.StrategicBasePlanning, compatibility: 'colonies' },
        [CardName_1.CardName.DEEP_SPACE_OPERATIONS]: { Factory: DeepSpaceOperations_1.DeepSpaceOperations },
        [CardName_1.CardName.EXPERIENCED_MARTIANS]: { Factory: ExperiencedMartians_1.ExperiencedMartians, compatibility: ['turmoil', 'pathfinders'] },
        [CardName_1.CardName.THE_NEW_SPACE_RACE]: { Factory: TheNewSpaceRace_1.TheNewSpaceRace, compatibility: 'turmoil' },
    },
    globalEvents: {
        [GlobalEventName_1.GlobalEventName.BALANCED_DEVELOPMENT]: { Factory: BalancedDevelopment_1.BalancedDevelopment },
        [GlobalEventName_1.GlobalEventName.SPACE_RACE_TO_MARS]: { Factory: SpaceRaceToMars_1.SpaceRaceToMars },
        [GlobalEventName_1.GlobalEventName.CONSTANT_STRUGGLE]: { Factory: ConstantStruggle_1.ConstantStruggle, negative: true },
        [GlobalEventName_1.GlobalEventName.TIRED_EARTH]: { Factory: TiredEarth_1.TiredEarth, negative: true },
        [GlobalEventName_1.GlobalEventName.MAGNETIC_FIELD_STIMULATION_DELAYS]: { Factory: MagneticFieldStimulationDelays_1.MagneticFieldStimulationDelays, negative: true },
        [GlobalEventName_1.GlobalEventName.COMMUNICATION_BOOM]: { Factory: CommunicationBoom_1.CommunicationBoom, negative: true },
    },
    cardsToRemove: [
        CardName_1.CardName.RESEARCH_GRANT,
        CardName_1.CardName.VALUABLE_GASES,
    ],
});
