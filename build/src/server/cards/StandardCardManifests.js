"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORP_ERA_CARD_MANIFEST = exports.BASE_CARD_MANIFEST = void 0;
const CardName_1 = require("../../common/cards/CardName");
const AcquiredCompany_1 = require("./base/AcquiredCompany");
const AdaptationTechnology_1 = require("./base/AdaptationTechnology");
const AdaptedLichen_1 = require("./base/AdaptedLichen");
const AdvancedAlloys_1 = require("./base/AdvancedAlloys");
const AdvancedEcosystems_1 = require("./base/AdvancedEcosystems");
const AerobrakedAmmoniaAsteroid_1 = require("./base/AerobrakedAmmoniaAsteroid");
const AICentral_1 = require("./base/AICentral");
const Algae_1 = require("./base/Algae");
const AntiGravityTechnology_1 = require("./base/AntiGravityTechnology");
const Ants_1 = require("./base/Ants");
const AquiferPumping_1 = require("./base/AquiferPumping");
const ArchaeBacteria_1 = require("./base/ArchaeBacteria");
const ArcticAlgae_1 = require("./base/ArcticAlgae");
const ArtificialLake_1 = require("./base/ArtificialLake");
const ArtificialPhotosynthesis_1 = require("./base/ArtificialPhotosynthesis");
const Asteroid_1 = require("./base/Asteroid");
const AsteroidMining_1 = require("./base/AsteroidMining");
const AsteroidMiningConsortium_1 = require("./base/AsteroidMiningConsortium");
const BeamFromAThoriumAsteroid_1 = require("./base/BeamFromAThoriumAsteroid");
const BeginnerCorporation_1 = require("./corporation/BeginnerCorporation");
const BigAsteroid_1 = require("./base/BigAsteroid");
const BiomassCombustors_1 = require("./base/BiomassCombustors");
const Birds_1 = require("./base/Birds");
const BlackPolarDust_1 = require("./base/BlackPolarDust");
const BreathingFilters_1 = require("./base/BreathingFilters");
const BribedCommittee_1 = require("./base/BribedCommittee");
const BuildingIndustries_1 = require("./base/BuildingIndustries");
const Bushes_1 = require("./base/Bushes");
const BusinessContacts_1 = require("./base/BusinessContacts");
const BusinessNetwork_1 = require("./base/BusinessNetwork");
const CallistoPenalMines_1 = require("./base/CallistoPenalMines");
const Capital_1 = require("./base/Capital");
const CarbonateProcessing_1 = require("./base/CarbonateProcessing");
const ModuleManifest_1 = require("./ModuleManifest");
const CaretakerContract_1 = require("./base/CaretakerContract");
const Cartel_1 = require("./base/Cartel");
const CEOsFavoriteProject_1 = require("./base/CEOsFavoriteProject");
const CloudSeeding_1 = require("./base/CloudSeeding");
const ColonizerTrainingCamp_1 = require("./base/ColonizerTrainingCamp");
const Comet_1 = require("./base/Comet");
const CommercialDistrict_1 = require("./base/CommercialDistrict");
const ConvoyFromEuropa_1 = require("./base/ConvoyFromEuropa");
const CorporateStronghold_1 = require("./base/CorporateStronghold");
const CrediCor_1 = require("./corporation/CrediCor");
const EcoLine_1 = require("./corporation/EcoLine");
const Helion_1 = require("./corporation/Helion");
const InterplanetaryCinematics_1 = require("./corporation/InterplanetaryCinematics");
const Inventrix_1 = require("./corporation/Inventrix");
const MiningGuild_1 = require("./corporation/MiningGuild");
const PhoboLog_1 = require("./corporation/PhoboLog");
const SaturnSystems_1 = require("./corporation/SaturnSystems");
const Teractor_1 = require("./corporation/Teractor");
const TharsisRepublic_1 = require("./corporation/TharsisRepublic");
const Thorgate_1 = require("./corporation/Thorgate");
const UnitedNationsMarsInitiative_1 = require("./corporation/UnitedNationsMarsInitiative");
const CupolaCity_1 = require("./base/CupolaCity");
const Decomposers_1 = require("./base/Decomposers");
const DeepWellHeating_1 = require("./base/DeepWellHeating");
const DeimosDown_1 = require("./base/DeimosDown");
const DesignedMicroOrganisms_1 = require("./base/DesignedMicroOrganisms");
const DevelopmentCenter_1 = require("./base/DevelopmentCenter");
const DomedCrater_1 = require("./base/DomedCrater");
const DustSeals_1 = require("./base/DustSeals");
const EarthCatapult_1 = require("./base/EarthCatapult");
const EarthOffice_1 = require("./base/EarthOffice");
const EcologicalZone_1 = require("./base/EcologicalZone");
const ElectroCatapult_1 = require("./base/ElectroCatapult");
const EnergySaving_1 = require("./base/EnergySaving");
const EnergyTapping_1 = require("./base/EnergyTapping");
const EOSChasmaNationalPark_1 = require("./base/EOSChasmaNationalPark");
const EquatorialMagnetizer_1 = require("./base/EquatorialMagnetizer");
const ExtremeColdFungus_1 = require("./base/ExtremeColdFungus");
const Farming_1 = require("./base/Farming");
const Fish_1 = require("./base/Fish");
const Flooding_1 = require("./base/Flooding");
const FoodFactory_1 = require("./base/FoodFactory");
const FueledGenerators_1 = require("./base/FueledGenerators");
const FuelFactory_1 = require("./base/FuelFactory");
const FusionPower_1 = require("./base/FusionPower");
const GanymedeColony_1 = require("./base/GanymedeColony");
const GeneRepair_1 = require("./base/GeneRepair");
const GeothermalPower_1 = require("./base/GeothermalPower");
const GHGFactories_1 = require("./base/GHGFactories");
const GHGProducingBacteria_1 = require("./base/GHGProducingBacteria");
const GiantIceAsteroid_1 = require("./base/GiantIceAsteroid");
const GiantSpaceMirror_1 = require("./base/GiantSpaceMirror");
const Grass_1 = require("./base/Grass");
const GreatDam_1 = require("./base/GreatDam");
const GreatEscarpmentConsortium_1 = require("./base/GreatEscarpmentConsortium");
const Greenhouses_1 = require("./base/Greenhouses");
const Hackers_1 = require("./base/Hackers");
const Heather_1 = require("./base/Heather");
const HeatTrappers_1 = require("./base/HeatTrappers");
const Herbivores_1 = require("./base/Herbivores");
const HiredRaiders_1 = require("./base/HiredRaiders");
const IceAsteroid_1 = require("./base/IceAsteroid");
const IceCapMelting_1 = require("./base/IceCapMelting");
const ImmigrantCity_1 = require("./base/ImmigrantCity");
const ImmigrationShuttles_1 = require("./base/ImmigrationShuttles");
const ImportedGHG_1 = require("./base/ImportedGHG");
const ImportedHydrogen_1 = require("./base/ImportedHydrogen");
const ImportedNitrogen_1 = require("./base/ImportedNitrogen");
const ImportOfAdvancedGHG_1 = require("./base/ImportOfAdvancedGHG");
const IndenturedWorkers_1 = require("./base/IndenturedWorkers");
const IndustrialCenter_1 = require("./base/IndustrialCenter");
const IndustrialMicrobes_1 = require("./base/IndustrialMicrobes");
const Insects_1 = require("./base/Insects");
const Insulation_1 = require("./base/Insulation");
const InterstellarColonyShip_1 = require("./base/InterstellarColonyShip");
const InventionContest_1 = require("./base/InventionContest");
const InventorsGuild_1 = require("./base/InventorsGuild");
const InvestmentLoan_1 = require("./base/InvestmentLoan");
const IoMiningIndustries_1 = require("./base/IoMiningIndustries");
const Ironworks_1 = require("./base/Ironworks");
const KelpFarming_1 = require("./base/KelpFarming");
const LagrangeObservatory_1 = require("./base/LagrangeObservatory");
const LakeMarineris_1 = require("./base/LakeMarineris");
const LandClaim_1 = require("./base/LandClaim");
const LargeConvoy_1 = require("./base/LargeConvoy");
const LavaFlows_1 = require("./base/LavaFlows");
const Lichen_1 = require("./base/Lichen");
const LightningHarvest_1 = require("./base/LightningHarvest");
const Livestock_1 = require("./base/Livestock");
const LocalHeatTrapping_1 = require("./base/LocalHeatTrapping");
const LunarBeam_1 = require("./base/LunarBeam");
const MagneticFieldDome_1 = require("./base/MagneticFieldDome");
const MagneticFieldGenerators_1 = require("./base/MagneticFieldGenerators");
const Mangrove_1 = require("./base/Mangrove");
const MarsUniversity_1 = require("./base/MarsUniversity");
const MartianRails_1 = require("./base/MartianRails");
const MassConverter_1 = require("./base/MassConverter");
const MediaArchives_1 = require("./base/MediaArchives");
const MediaGroup_1 = require("./base/MediaGroup");
const MedicalLab_1 = require("./base/MedicalLab");
const MethaneFromTitan_1 = require("./base/MethaneFromTitan");
const MicroMills_1 = require("./base/MicroMills");
const Mine_1 = require("./base/Mine");
const MineralDeposit_1 = require("./base/MineralDeposit");
const MiningArea_1 = require("./base/MiningArea");
const MiningExpedition_1 = require("./base/MiningExpedition");
const MiningRights_1 = require("./base/MiningRights");
const MirandaResort_1 = require("./base/MirandaResort");
const MoholeArea_1 = require("./base/MoholeArea");
const Moss_1 = require("./base/Moss");
const NaturalPreserve_1 = require("./base/NaturalPreserve");
const NitriteReducingBacteria_1 = require("./base/NitriteReducingBacteria");
const NitrogenRichAsteroid_1 = require("./base/NitrogenRichAsteroid");
const NitrophilicMoss_1 = require("./base/NitrophilicMoss");
const NoctisCity_1 = require("./base/NoctisCity");
const NoctisFarming_1 = require("./base/NoctisFarming");
const NuclearPower_1 = require("./base/NuclearPower");
const NuclearZone_1 = require("./base/NuclearZone");
const OlympusConference_1 = require("./base/OlympusConference");
const OpenCity_1 = require("./base/OpenCity");
const OptimalAerobraking_1 = require("./base/OptimalAerobraking");
const OreProcessor_1 = require("./base/OreProcessor");
const PermafrostExtraction_1 = require("./base/PermafrostExtraction");
const PeroxidePower_1 = require("./base/PeroxidePower");
const Pets_1 = require("./base/Pets");
const PhobosSpaceHaven_1 = require("./base/PhobosSpaceHaven");
const PhysicsComplex_1 = require("./base/PhysicsComplex");
const Plantation_1 = require("./base/Plantation");
const PowerGrid_1 = require("./base/PowerGrid");
const PowerInfrastructure_1 = require("./base/PowerInfrastructure");
const PowerPlant_1 = require("./base/PowerPlant");
const PowerSupplyConsortium_1 = require("./base/PowerSupplyConsortium");
const Predators_1 = require("./base/Predators");
const ProtectedHabitats_1 = require("./base/ProtectedHabitats");
const ProtectedValley_1 = require("./base/ProtectedValley");
const QuantumExtractor_1 = require("./base/QuantumExtractor");
const RadChemFactory_1 = require("./base/RadChemFactory");
const RadSuits_1 = require("./base/RadSuits");
const RegolithEaters_1 = require("./base/RegolithEaters");
const ReleaseOfInertGases_1 = require("./base/ReleaseOfInertGases");
const Research_1 = require("./base/Research");
const ResearchOutpost_1 = require("./base/ResearchOutpost");
const RestrictedArea_1 = require("./base/RestrictedArea");
const RoboticWorkforce_1 = require("./base/RoboticWorkforce");
const RoverConstruction_1 = require("./base/RoverConstruction");
const Sabotage_1 = require("./base/Sabotage");
const Satellites_1 = require("./base/Satellites");
const SearchForLife_1 = require("./base/SearchForLife");
const SecurityFleet_1 = require("./base/SecurityFleet");
const Shuttles_1 = require("./base/Shuttles");
const SmallAnimals_1 = require("./base/SmallAnimals");
const SoilFactory_1 = require("./base/SoilFactory");
const SolarPower_1 = require("./base/SolarPower");
const SolarWindPower_1 = require("./base/SolarWindPower");
const Soletta_1 = require("./base/Soletta");
const SpaceElevator_1 = require("./base/SpaceElevator");
const SpaceMirrors_1 = require("./base/SpaceMirrors");
const SpaceStation_1 = require("./base/SpaceStation");
const SpecialDesign_1 = require("./base/SpecialDesign");
const Sponsors_1 = require("./base/Sponsors");
const StandardTechnology_1 = require("./base/StandardTechnology");
const Steelworks_1 = require("./base/Steelworks");
const StripMine_1 = require("./base/StripMine");
const SubterraneanReservoir_1 = require("./base/SubterraneanReservoir");
const SymbioticFungus_1 = require("./base/SymbioticFungus");
const Tardigrades_1 = require("./base/Tardigrades");
const TechnologyDemonstration_1 = require("./base/TechnologyDemonstration");
const TectonicStressPower_1 = require("./base/TectonicStressPower");
const TerraformingGanymede_1 = require("./base/TerraformingGanymede");
const TitaniumMine_1 = require("./base/TitaniumMine");
const TollStation_1 = require("./base/TollStation");
const TowingAComet_1 = require("./base/TowingAComet");
const TransNeptuneProbe_1 = require("./base/TransNeptuneProbe");
const Trees_1 = require("./base/Trees");
const TropicalResort_1 = require("./base/TropicalResort");
const TundraFarming_1 = require("./base/TundraFarming");
const UndergroundCity_1 = require("./base/UndergroundCity");
const UndergroundDetonations_1 = require("./base/UndergroundDetonations");
const UrbanizedArea_1 = require("./base/UrbanizedArea");
const VestaShipyard_1 = require("./base/VestaShipyard");
const ViralEnhancers_1 = require("./base/ViralEnhancers");
const Virus_1 = require("./base/Virus");
const WaterImportFromEuropa_1 = require("./base/WaterImportFromEuropa");
const WaterSplittingPlant_1 = require("./base/WaterSplittingPlant");
const WavePower_1 = require("./base/WavePower");
const Windmills_1 = require("./base/Windmills");
const Worms_1 = require("./base/Worms");
const Zeppelins_1 = require("./base/Zeppelins");
const AquiferStandardProject_1 = require("./base/standardProjects/AquiferStandardProject");
const CityStandardProject_1 = require("./base/standardProjects/CityStandardProject");
const PowerPlantStandardProject_1 = require("./base/standardProjects/PowerPlantStandardProject");
const GreeneryStandardProject_1 = require("./base/standardProjects/GreeneryStandardProject");
const AsteroidStandardProject_1 = require("./base/standardProjects/AsteroidStandardProject");
const SellPatentsStandardProject_1 = require("./base/standardProjects/SellPatentsStandardProject");
const ConvertPlants_1 = require("./base/standardActions/ConvertPlants");
const ConvertHeat_1 = require("./base/standardActions/ConvertHeat");
const BufferGasStandardProject_1 = require("./prelude/BufferGasStandardProject");
exports.BASE_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'base',
    projectCards: {
        [CardName_1.CardName.ADAPTATION_TECHNOLOGY]: { Factory: AdaptationTechnology_1.AdaptationTechnology },
        [CardName_1.CardName.ADAPTED_LICHEN]: { Factory: AdaptedLichen_1.AdaptedLichen },
        [CardName_1.CardName.ADVANCED_ECOSYSTEMS]: { Factory: AdvancedEcosystems_1.AdvancedEcosystems },
        [CardName_1.CardName.AEROBRAKED_AMMONIA_ASTEROID]: { Factory: AerobrakedAmmoniaAsteroid_1.AerobrakedAmmoniaAsteroid },
        [CardName_1.CardName.ANTS]: { Factory: Ants_1.Ants },
        [CardName_1.CardName.AQUIFER_PUMPING]: { Factory: AquiferPumping_1.AquiferPumping },
        [CardName_1.CardName.ALGAE]: { Factory: Algae_1.Algae },
        [CardName_1.CardName.ARCHAEBACTERIA]: { Factory: ArchaeBacteria_1.ArchaeBacteria },
        [CardName_1.CardName.ARCTIC_ALGAE]: { Factory: ArcticAlgae_1.ArcticAlgae },
        [CardName_1.CardName.ARTIFICIAL_LAKE]: { Factory: ArtificialLake_1.ArtificialLake },
        [CardName_1.CardName.ARTIFICIAL_PHOTOSYNTHESIS]: { Factory: ArtificialPhotosynthesis_1.ArtificialPhotosynthesis },
        [CardName_1.CardName.ASTEROID]: { Factory: Asteroid_1.Asteroid },
        [CardName_1.CardName.ASTEROID_MINING]: { Factory: AsteroidMining_1.AsteroidMining },
        [CardName_1.CardName.BEAM_FROM_A_THORIUM_ASTEROID]: { Factory: BeamFromAThoriumAsteroid_1.BeamFromAThoriumAsteroid },
        [CardName_1.CardName.BIG_ASTEROID]: { Factory: BigAsteroid_1.BigAsteroid },
        [CardName_1.CardName.BIOMASS_COMBUSTORS]: { Factory: BiomassCombustors_1.BiomassCombustors },
        [CardName_1.CardName.BIRDS]: { Factory: Birds_1.Birds },
        [CardName_1.CardName.BLACK_POLAR_DUST]: { Factory: BlackPolarDust_1.BlackPolarDust },
        [CardName_1.CardName.BREATHING_FILTERS]: { Factory: BreathingFilters_1.BreathingFilters },
        [CardName_1.CardName.BUSHES]: { Factory: Bushes_1.Bushes },
        [CardName_1.CardName.CAPITAL]: { Factory: Capital_1.Capital },
        [CardName_1.CardName.CARBONATE_PROCESSING]: { Factory: CarbonateProcessing_1.CarbonateProcessing },
        [CardName_1.CardName.CLOUD_SEEDING]: { Factory: CloudSeeding_1.CloudSeeding },
        [CardName_1.CardName.COLONIZER_TRAINING_CAMP]: { Factory: ColonizerTrainingCamp_1.ColonizerTrainingCamp },
        [CardName_1.CardName.COMET]: { Factory: Comet_1.Comet },
        [CardName_1.CardName.CONVOY_FROM_EUROPA]: { Factory: ConvoyFromEuropa_1.ConvoyFromEuropa },
        [CardName_1.CardName.CUPOLA_CITY]: { Factory: CupolaCity_1.CupolaCity },
        [CardName_1.CardName.DECOMPOSERS]: { Factory: Decomposers_1.Decomposers },
        [CardName_1.CardName.DEEP_WELL_HEATING]: { Factory: DeepWellHeating_1.DeepWellHeating },
        [CardName_1.CardName.DEIMOS_DOWN]: { Factory: DeimosDown_1.DeimosDown },
        [CardName_1.CardName.DESIGNED_MICROORGANISMS]: { Factory: DesignedMicroOrganisms_1.DesignedMicroOrganisms },
        [CardName_1.CardName.DOMED_CRATER]: { Factory: DomedCrater_1.DomedCrater },
        [CardName_1.CardName.DUST_SEALS]: { Factory: DustSeals_1.DustSeals },
        [CardName_1.CardName.ECOLOGICAL_ZONE]: { Factory: EcologicalZone_1.EcologicalZone },
        [CardName_1.CardName.ENERGY_SAVING]: { Factory: EnergySaving_1.EnergySaving },
        [CardName_1.CardName.EOS_CHASMA_NATIONAL_PARK]: { Factory: EOSChasmaNationalPark_1.EosChasmaNationalPark },
        [CardName_1.CardName.EQUATORIAL_MAGNETIZER]: { Factory: EquatorialMagnetizer_1.EquatorialMagnetizer },
        [CardName_1.CardName.EXTREME_COLD_FUNGUS]: { Factory: ExtremeColdFungus_1.ExtremeColdFungus },
        [CardName_1.CardName.FARMING]: { Factory: Farming_1.Farming },
        [CardName_1.CardName.FISH]: { Factory: Fish_1.Fish },
        [CardName_1.CardName.FLOODING]: { Factory: Flooding_1.Flooding },
        [CardName_1.CardName.FOOD_FACTORY]: { Factory: FoodFactory_1.FoodFactory },
        [CardName_1.CardName.FUSION_POWER]: { Factory: FusionPower_1.FusionPower },
        [CardName_1.CardName.FUELED_GENERATORS]: { Factory: FueledGenerators_1.FueledGenerators },
        [CardName_1.CardName.GANYMEDE_COLONY]: { Factory: GanymedeColony_1.GanymedeColony },
        [CardName_1.CardName.GEOTHERMAL_POWER]: { Factory: GeothermalPower_1.GeothermalPower },
        [CardName_1.CardName.GHG_FACTORIES]: { Factory: GHGFactories_1.GHGFactories },
        [CardName_1.CardName.GHG_PRODUCING_BACTERIA]: { Factory: GHGProducingBacteria_1.GHGProducingBacteria },
        [CardName_1.CardName.GIANT_ICE_ASTEROID]: { Factory: GiantIceAsteroid_1.GiantIceAsteroid },
        [CardName_1.CardName.GIANT_SPACE_MIRROR]: { Factory: GiantSpaceMirror_1.GiantSpaceMirror },
        [CardName_1.CardName.GRASS]: { Factory: Grass_1.Grass },
        [CardName_1.CardName.GREAT_DAM]: { Factory: GreatDam_1.GreatDam },
        [CardName_1.CardName.GREENHOUSES]: { Factory: Greenhouses_1.Greenhouses },
        [CardName_1.CardName.HEATHER]: { Factory: Heather_1.Heather },
        [CardName_1.CardName.HEAT_TRAPPERS]: { Factory: HeatTrappers_1.HeatTrappers },
        [CardName_1.CardName.HERBIVORES]: { Factory: Herbivores_1.Herbivores },
        [CardName_1.CardName.ICE_ASTEROID]: { Factory: IceAsteroid_1.IceAsteroid },
        [CardName_1.CardName.ICE_CAP_MELTING]: { Factory: IceCapMelting_1.IceCapMelting },
        [CardName_1.CardName.IMMIGRANT_CITY]: { Factory: ImmigrantCity_1.ImmigrantCity },
        [CardName_1.CardName.IMMIGRATION_SHUTTLES]: { Factory: ImmigrationShuttles_1.ImmigrationShuttles },
        [CardName_1.CardName.IMPORTED_GHG]: { Factory: ImportedGHG_1.ImportedGHG },
        [CardName_1.CardName.IMPORTED_HYDROGEN]: { Factory: ImportedHydrogen_1.ImportedHydrogen },
        [CardName_1.CardName.IMPORTED_NITROGEN]: { Factory: ImportedNitrogen_1.ImportedNitrogen },
        [CardName_1.CardName.IMPORT_OF_ADVANCED_GHG]: { Factory: ImportOfAdvancedGHG_1.ImportOfAdvancedGHG },
        [CardName_1.CardName.INDUSTRIAL_MICROBES]: { Factory: IndustrialMicrobes_1.IndustrialMicrobes },
        [CardName_1.CardName.INSECTS]: { Factory: Insects_1.Insects },
        [CardName_1.CardName.INSULATION]: { Factory: Insulation_1.Insulation },
        [CardName_1.CardName.IRONWORKS]: { Factory: Ironworks_1.Ironworks },
        [CardName_1.CardName.KELP_FARMING]: { Factory: KelpFarming_1.KelpFarming },
        [CardName_1.CardName.LAKE_MARINERIS]: { Factory: LakeMarineris_1.LakeMarineris },
        [CardName_1.CardName.LARGE_CONVOY]: { Factory: LargeConvoy_1.LargeConvoy },
        [CardName_1.CardName.LAVA_FLOWS]: { Factory: LavaFlows_1.LavaFlows },
        [CardName_1.CardName.LICHEN]: { Factory: Lichen_1.Lichen },
        [CardName_1.CardName.LIVESTOCK]: { Factory: Livestock_1.Livestock },
        [CardName_1.CardName.LOCAL_HEAT_TRAPPING]: { Factory: LocalHeatTrapping_1.LocalHeatTrapping },
        [CardName_1.CardName.LUNAR_BEAM]: { Factory: LunarBeam_1.LunarBeam },
        [CardName_1.CardName.MAGNETIC_FIELD_DOME]: { Factory: MagneticFieldDome_1.MagneticFieldDome },
        [CardName_1.CardName.MAGNETIC_FIELD_GENERATORS]: { Factory: MagneticFieldGenerators_1.MagneticFieldGenerators },
        [CardName_1.CardName.MANGROVE]: { Factory: Mangrove_1.Mangrove },
        [CardName_1.CardName.MARTIAN_RAILS]: { Factory: MartianRails_1.MartianRails },
        [CardName_1.CardName.METHANE_FROM_TITAN]: { Factory: MethaneFromTitan_1.MethaneFromTitan },
        [CardName_1.CardName.MICRO_MILLS]: { Factory: MicroMills_1.MicroMills },
        [CardName_1.CardName.MINING_EXPEDITION]: { Factory: MiningExpedition_1.MiningExpedition },
        [CardName_1.CardName.MINING_RIGHTS]: { Factory: MiningRights_1.MiningRights },
        [CardName_1.CardName.MOHOLE_AREA]: { Factory: MoholeArea_1.MoholeArea },
        [CardName_1.CardName.MOSS]: { Factory: Moss_1.Moss },
        [CardName_1.CardName.NATURAL_PRESERVE]: { Factory: NaturalPreserve_1.NaturalPreserve },
        [CardName_1.CardName.NITRITE_REDUCING_BACTERIA]: { Factory: NitriteReducingBacteria_1.NitriteReducingBacteria },
        [CardName_1.CardName.NITROGEN_RICH_ASTEROID]: { Factory: NitrogenRichAsteroid_1.NitrogenRichAsteroid },
        [CardName_1.CardName.NITROPHILIC_MOSS]: { Factory: NitrophilicMoss_1.NitrophilicMoss },
        [CardName_1.CardName.NOCTIS_CITY]: { Factory: NoctisCity_1.NoctisCity },
        [CardName_1.CardName.NOCTIS_FARMING]: { Factory: NoctisFarming_1.NoctisFarming },
        [CardName_1.CardName.NUCLEAR_POWER]: { Factory: NuclearPower_1.NuclearPower },
        [CardName_1.CardName.NUCLEAR_ZONE]: { Factory: NuclearZone_1.NuclearZone },
        [CardName_1.CardName.OPEN_CITY]: { Factory: OpenCity_1.OpenCity },
        [CardName_1.CardName.OPTIMAL_AEROBRAKING]: { Factory: OptimalAerobraking_1.OptimalAerobraking },
        [CardName_1.CardName.ORE_PROCESSOR]: { Factory: OreProcessor_1.OreProcessor },
        [CardName_1.CardName.PERMAFROST_EXTRACTION]: { Factory: PermafrostExtraction_1.PermafrostExtraction },
        [CardName_1.CardName.PEROXIDE_POWER]: { Factory: PeroxidePower_1.PeroxidePower },
        [CardName_1.CardName.PETS]: { Factory: Pets_1.Pets },
        [CardName_1.CardName.PHOBOS_SPACE_HAVEN]: { Factory: PhobosSpaceHaven_1.PhobosSpaceHaven },
        [CardName_1.CardName.PLANTATION]: { Factory: Plantation_1.Plantation },
        [CardName_1.CardName.POWER_GRID]: { Factory: PowerGrid_1.PowerGrid },
        [CardName_1.CardName.POWER_PLANT]: { Factory: PowerPlant_1.PowerPlant },
        [CardName_1.CardName.PREDATORS]: { Factory: Predators_1.Predators },
        [CardName_1.CardName.PROTECTED_VALLEY]: { Factory: ProtectedValley_1.ProtectedValley },
        [CardName_1.CardName.RAD_CHEM_FACTORY]: { Factory: RadChemFactory_1.RadChemFactory },
        [CardName_1.CardName.REGOLITH_EATERS]: { Factory: RegolithEaters_1.RegolithEaters },
        [CardName_1.CardName.RELEASE_OF_INERT_GASES]: { Factory: ReleaseOfInertGases_1.ReleaseOfInertGases },
        [CardName_1.CardName.RESEARCH_OUTPOST]: { Factory: ResearchOutpost_1.ResearchOutpost },
        [CardName_1.CardName.ROVER_CONSTRUCTION]: { Factory: RoverConstruction_1.RoverConstruction },
        [CardName_1.CardName.SEARCH_FOR_LIFE]: { Factory: SearchForLife_1.SearchForLife },
        [CardName_1.CardName.SHUTTLES]: { Factory: Shuttles_1.Shuttles },
        [CardName_1.CardName.SMALL_ANIMALS]: { Factory: SmallAnimals_1.SmallAnimals },
        [CardName_1.CardName.SOIL_FACTORY]: { Factory: SoilFactory_1.SoilFactory },
        [CardName_1.CardName.SOLAR_POWER]: { Factory: SolarPower_1.SolarPower },
        [CardName_1.CardName.SOLAR_WIND_POWER]: { Factory: SolarWindPower_1.SolarWindPower },
        [CardName_1.CardName.SOLETTA]: { Factory: Soletta_1.Soletta },
        [CardName_1.CardName.SPACE_MIRRORS]: { Factory: SpaceMirrors_1.SpaceMirrors },
        [CardName_1.CardName.SPECIAL_DESIGN]: { Factory: SpecialDesign_1.SpecialDesign },
        [CardName_1.CardName.STEELWORKS]: { Factory: Steelworks_1.Steelworks },
        [CardName_1.CardName.STRIP_MINE]: { Factory: StripMine_1.StripMine },
        [CardName_1.CardName.SUBTERRANEAN_RESERVOIR]: { Factory: SubterraneanReservoir_1.SubterraneanReservoir },
        [CardName_1.CardName.SYMBIOTIC_FUNGUS]: { Factory: SymbioticFungus_1.SymbioticFungus },
        [CardName_1.CardName.TECTONIC_STRESS_POWER]: { Factory: TectonicStressPower_1.TectonicStressPower },
        [CardName_1.CardName.TOWING_A_COMET]: { Factory: TowingAComet_1.TowingAComet },
        [CardName_1.CardName.TREES]: { Factory: Trees_1.Trees },
        [CardName_1.CardName.TUNDRA_FARMING]: { Factory: TundraFarming_1.TundraFarming },
        [CardName_1.CardName.UNDERGROUND_CITY]: { Factory: UndergroundCity_1.UndergroundCity },
        [CardName_1.CardName.UNDERGROUND_DETONATIONS]: { Factory: UndergroundDetonations_1.UndergroundDetonations },
        [CardName_1.CardName.URBANIZED_AREA]: { Factory: UrbanizedArea_1.UrbanizedArea },
        [CardName_1.CardName.WATER_IMPORT_FROM_EUROPA]: { Factory: WaterImportFromEuropa_1.WaterImportFromEuropa },
        [CardName_1.CardName.WATER_SPLITTING_PLANT]: { Factory: WaterSplittingPlant_1.WaterSplittingPlant },
        [CardName_1.CardName.WAVE_POWER]: { Factory: WavePower_1.WavePower },
        [CardName_1.CardName.WINDMILLS]: { Factory: Windmills_1.Windmills },
        [CardName_1.CardName.WORMS]: { Factory: Worms_1.Worms },
        [CardName_1.CardName.ZEPPELINS]: { Factory: Zeppelins_1.Zeppelins },
    },
    corporationCards: {
        [CardName_1.CardName.BEGINNER_CORPORATION]: { Factory: BeginnerCorporation_1.BeginnerCorporation },
        [CardName_1.CardName.CREDICOR]: { Factory: CrediCor_1.CrediCor },
        [CardName_1.CardName.ECOLINE]: { Factory: EcoLine_1.EcoLine },
        [CardName_1.CardName.HELION]: { Factory: Helion_1.Helion },
        [CardName_1.CardName.INTERPLANETARY_CINEMATICS]: { Factory: InterplanetaryCinematics_1.InterplanetaryCinematics },
        [CardName_1.CardName.INVENTRIX]: { Factory: Inventrix_1.Inventrix },
        [CardName_1.CardName.MINING_GUILD]: { Factory: MiningGuild_1.MiningGuild },
        [CardName_1.CardName.PHOBOLOG]: { Factory: PhoboLog_1.PhoboLog },
        [CardName_1.CardName.THARSIS_REPUBLIC]: { Factory: TharsisRepublic_1.TharsisRepublic },
        [CardName_1.CardName.THORGATE]: { Factory: Thorgate_1.Thorgate },
        [CardName_1.CardName.UNITED_NATIONS_MARS_INITIATIVE]: { Factory: UnitedNationsMarsInitiative_1.UnitedNationsMarsInitiative },
    },
    standardProjects: {
        [CardName_1.CardName.AQUIFER_STANDARD_PROJECT]: { Factory: AquiferStandardProject_1.AquiferStandardProject },
        [CardName_1.CardName.CITY_STANDARD_PROJECT]: { Factory: CityStandardProject_1.CityStandardProject },
        [CardName_1.CardName.POWER_PLANT_STANDARD_PROJECT]: { Factory: PowerPlantStandardProject_1.PowerPlantStandardProject },
        [CardName_1.CardName.GREENERY_STANDARD_PROJECT]: { Factory: GreeneryStandardProject_1.GreeneryStandardProject },
        [CardName_1.CardName.ASTEROID_STANDARD_PROJECT]: { Factory: AsteroidStandardProject_1.AsteroidStandardProject },
        [CardName_1.CardName.SELL_PATENTS_STANDARD_PROJECT]: { Factory: SellPatentsStandardProject_1.SellPatentsStandardProject },
        [CardName_1.CardName.BUFFER_GAS_STANDARD_PROJECT]: { Factory: BufferGasStandardProject_1.BufferGasStandardProject },
    },
    standardActions: {
        [CardName_1.CardName.CONVERT_PLANTS]: { Factory: ConvertPlants_1.ConvertPlants },
        [CardName_1.CardName.CONVERT_HEAT]: { Factory: ConvertHeat_1.ConvertHeat },
    },
});
exports.CORP_ERA_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'corpera',
    projectCards: {
        [CardName_1.CardName.ACQUIRED_COMPANY]: { Factory: AcquiredCompany_1.AcquiredCompany },
        [CardName_1.CardName.ADVANCED_ALLOYS]: { Factory: AdvancedAlloys_1.AdvancedAlloys },
        [CardName_1.CardName.AI_CENTRAL]: { Factory: AICentral_1.AICentral },
        [CardName_1.CardName.ANTI_GRAVITY_TECHNOLOGY]: { Factory: AntiGravityTechnology_1.AntiGravityTechnology },
        [CardName_1.CardName.ASTEROID_MINING_CONSORTIUM]: { Factory: AsteroidMiningConsortium_1.AsteroidMiningConsortium },
        [CardName_1.CardName.BRIBED_COMMITTEE]: { Factory: BribedCommittee_1.BribedCommittee },
        [CardName_1.CardName.BUILDING_INDUSTRIES]: { Factory: BuildingIndustries_1.BuildingIndustries },
        [CardName_1.CardName.BUSINESS_CONTACTS]: { Factory: BusinessContacts_1.BusinessContacts },
        [CardName_1.CardName.BUSINESS_NETWORK]: { Factory: BusinessNetwork_1.BusinessNetwork },
        [CardName_1.CardName.CALLISTO_PENAL_MINES]: { Factory: CallistoPenalMines_1.CallistoPenalMines },
        [CardName_1.CardName.CARETAKER_CONTRACT]: { Factory: CaretakerContract_1.CaretakerContract },
        [CardName_1.CardName.CARTEL]: { Factory: Cartel_1.Cartel },
        [CardName_1.CardName.CEOS_FAVORITE_PROJECT]: { Factory: CEOsFavoriteProject_1.CEOsFavoriteProject },
        [CardName_1.CardName.COMMERCIAL_DISTRICT]: { Factory: CommercialDistrict_1.CommercialDistrict },
        [CardName_1.CardName.CORPORATE_STRONGHOLD]: { Factory: CorporateStronghold_1.CorporateStronghold },
        [CardName_1.CardName.DEVELOPMENT_CENTER]: { Factory: DevelopmentCenter_1.DevelopmentCenter },
        [CardName_1.CardName.EARTH_CATAPULT]: { Factory: EarthCatapult_1.EarthCatapult },
        [CardName_1.CardName.EARTH_OFFICE]: { Factory: EarthOffice_1.EarthOffice },
        [CardName_1.CardName.ELECTRO_CATAPULT]: { Factory: ElectroCatapult_1.ElectroCatapult },
        [CardName_1.CardName.ENERGY_TAPPING]: { Factory: EnergyTapping_1.EnergyTapping },
        [CardName_1.CardName.FUEL_FACTORY]: { Factory: FuelFactory_1.FuelFactory },
        [CardName_1.CardName.GENE_REPAIR]: { Factory: GeneRepair_1.GeneRepair },
        [CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM]: { Factory: GreatEscarpmentConsortium_1.GreatEscarpmentConsortium },
        [CardName_1.CardName.HACKERS]: { Factory: Hackers_1.Hackers },
        [CardName_1.CardName.HIRED_RAIDERS]: { Factory: HiredRaiders_1.HiredRaiders },
        [CardName_1.CardName.INDENTURED_WORKERS]: { Factory: IndenturedWorkers_1.IndenturedWorkers },
        [CardName_1.CardName.INDUSTRIAL_CENTER]: { Factory: IndustrialCenter_1.IndustrialCenter },
        [CardName_1.CardName.INTERSTELLAR_COLONY_SHIP]: { Factory: InterstellarColonyShip_1.InterstellarColonyShip },
        [CardName_1.CardName.INVENTION_CONTEST]: { Factory: InventionContest_1.InventionContest },
        [CardName_1.CardName.INVENTORS_GUILD]: { Factory: InventorsGuild_1.InventorsGuild },
        [CardName_1.CardName.INVESTMENT_LOAN]: { Factory: InvestmentLoan_1.InvestmentLoan },
        [CardName_1.CardName.IO_MINING_INDUSTRIES]: { Factory: IoMiningIndustries_1.IoMiningIndustries },
        [CardName_1.CardName.LAGRANGE_OBSERVATORY]: { Factory: LagrangeObservatory_1.LagrangeObservatory },
        [CardName_1.CardName.LAND_CLAIM]: { Factory: LandClaim_1.LandClaim },
        [CardName_1.CardName.LIGHTNING_HARVEST]: { Factory: LightningHarvest_1.LightningHarvest },
        [CardName_1.CardName.MARS_UNIVERSITY]: { Factory: MarsUniversity_1.MarsUniversity },
        [CardName_1.CardName.MASS_CONVERTER]: { Factory: MassConverter_1.MassConverter },
        [CardName_1.CardName.MEDIA_ARCHIVES]: { Factory: MediaArchives_1.MediaArchives },
        [CardName_1.CardName.MEDIA_GROUP]: { Factory: MediaGroup_1.MediaGroup },
        [CardName_1.CardName.MEDICAL_LAB]: { Factory: MedicalLab_1.MedicalLab },
        [CardName_1.CardName.MINE]: { Factory: Mine_1.Mine },
        [CardName_1.CardName.MINERAL_DEPOSIT]: { Factory: MineralDeposit_1.MineralDeposit },
        [CardName_1.CardName.MINING_AREA]: { Factory: MiningArea_1.MiningArea },
        [CardName_1.CardName.MIRANDA_RESORT]: { Factory: MirandaResort_1.MirandaResort },
        [CardName_1.CardName.OLYMPUS_CONFERENCE]: { Factory: OlympusConference_1.OlympusConference },
        [CardName_1.CardName.PHYSICS_COMPLEX]: { Factory: PhysicsComplex_1.PhysicsComplex },
        [CardName_1.CardName.POWER_INFRASTRUCTURE]: { Factory: PowerInfrastructure_1.PowerInfrastructure },
        [CardName_1.CardName.POWER_SUPPLY_CONSORTIUM]: { Factory: PowerSupplyConsortium_1.PowerSupplyConsortium },
        [CardName_1.CardName.PROTECTED_HABITATS]: { Factory: ProtectedHabitats_1.ProtectedHabitats },
        [CardName_1.CardName.QUANTUM_EXTRACTOR]: { Factory: QuantumExtractor_1.QuantumExtractor },
        [CardName_1.CardName.RAD_SUITS]: { Factory: RadSuits_1.RadSuits },
        [CardName_1.CardName.RESEARCH]: { Factory: Research_1.Research },
        [CardName_1.CardName.RESTRICTED_AREA]: { Factory: RestrictedArea_1.RestrictedArea },
        [CardName_1.CardName.ROBOTIC_WORKFORCE]: { Factory: RoboticWorkforce_1.RoboticWorkforce },
        [CardName_1.CardName.SABOTAGE]: { Factory: Sabotage_1.Sabotage },
        [CardName_1.CardName.SATELLITES]: { Factory: Satellites_1.Satellites },
        [CardName_1.CardName.SECURITY_FLEET]: { Factory: SecurityFleet_1.SecurityFleet },
        [CardName_1.CardName.SPACE_ELEVATOR]: { Factory: SpaceElevator_1.SpaceElevator },
        [CardName_1.CardName.SPACE_STATION]: { Factory: SpaceStation_1.SpaceStation },
        [CardName_1.CardName.SPONSORS]: { Factory: Sponsors_1.Sponsors },
        [CardName_1.CardName.STANDARD_TECHNOLOGY]: { Factory: StandardTechnology_1.StandardTechnology },
        [CardName_1.CardName.TARDIGRADES]: { Factory: Tardigrades_1.Tardigrades },
        [CardName_1.CardName.TECHNOLOGY_DEMONSTRATION]: { Factory: TechnologyDemonstration_1.TechnologyDemonstration },
        [CardName_1.CardName.TERRAFORMING_GANYMEDE]: { Factory: TerraformingGanymede_1.TerraformingGanymede },
        [CardName_1.CardName.TITANIUM_MINE]: { Factory: TitaniumMine_1.TitaniumMine },
        [CardName_1.CardName.TOLL_STATION]: { Factory: TollStation_1.TollStation },
        [CardName_1.CardName.TRANS_NEPTUNE_PROBE]: { Factory: TransNeptuneProbe_1.TransNeptuneProbe },
        [CardName_1.CardName.TROPICAL_RESORT]: { Factory: TropicalResort_1.TropicalResort },
        [CardName_1.CardName.VESTA_SHIPYARD]: { Factory: VestaShipyard_1.VestaShipyard },
        [CardName_1.CardName.VIRAL_ENHANCERS]: { Factory: ViralEnhancers_1.ViralEnhancers },
        [CardName_1.CardName.VIRUS]: { Factory: Virus_1.Virus },
    },
    corporationCards: {
        [CardName_1.CardName.SATURN_SYSTEMS]: { Factory: SaturnSystems_1.SaturnSystems },
        [CardName_1.CardName.TERACTOR]: { Factory: Teractor_1.Teractor },
    },
});
