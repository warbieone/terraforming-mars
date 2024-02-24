"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARES_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const BioengineeringEnclosure_1 = require("./BioengineeringEnclosure");
const BiofertilizerFacility_1 = require("./BiofertilizerFacility");
const ButterflyEffect_1 = require("./ButterflyEffect");
const CapitalAres_1 = require("./CapitalAres");
const CommercialDistrictAres_1 = require("./CommercialDistrictAres");
const DeimosDownAres_1 = require("./DeimosDownAres");
const DesperateMeasures_1 = require("./DesperateMeasures");
const EcologicalSurvey_1 = require("./EcologicalSurvey");
const EcologicalZoneAres_1 = require("./EcologicalZoneAres");
const GeologicalSurvey_1 = require("./GeologicalSurvey");
const GreatDamAres_1 = require("./GreatDamAres");
const IndustrialCenterAres_1 = require("./IndustrialCenterAres");
const LavaFlowsAres_1 = require("./LavaFlowsAres");
const MagneticFieldGeneratorsAres_1 = require("./MagneticFieldGeneratorsAres");
const MarketingExperts_1 = require("./MarketingExperts");
const MetallicAsteroid_1 = require("./MetallicAsteroid");
const MiningAreaAres_1 = require("./MiningAreaAres");
const MiningRightsAres_1 = require("./MiningRightsAres");
const MoholeAreaAres_1 = require("./MoholeAreaAres");
const NaturalPreserveAres_1 = require("./NaturalPreserveAres");
const NuclearZoneAres_1 = require("./NuclearZoneAres");
const OceanCity_1 = require("./OceanCity");
const OceanFarm_1 = require("./OceanFarm");
const OceanSanctuary_1 = require("./OceanSanctuary");
const RestrictedAreaAres_1 = require("./RestrictedAreaAres");
const SolarFarm_1 = require("./SolarFarm");
exports.ARES_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'ares',
    projectCards: {
        [CardName_1.CardName.BIOENGINEERING_ENCLOSURE]: { Factory: BioengineeringEnclosure_1.BioengineeringEnclosure },
        [CardName_1.CardName.BIOFERTILIZER_FACILITY]: { Factory: BiofertilizerFacility_1.BiofertilizerFacility },
        [CardName_1.CardName.BUTTERFLY_EFFECT]: { Factory: ButterflyEffect_1.ButterflyEffect },
        [CardName_1.CardName.CAPITAL_ARES]: { Factory: CapitalAres_1.CapitalAres },
        [CardName_1.CardName.COMMERCIAL_DISTRICT_ARES]: { Factory: CommercialDistrictAres_1.CommercialDistrictAres },
        [CardName_1.CardName.DEIMOS_DOWN_ARES]: { Factory: DeimosDownAres_1.DeimosDownAres },
        [CardName_1.CardName.DESPERATE_MEASURES]: { Factory: DesperateMeasures_1.DesperateMeasures },
        [CardName_1.CardName.ECOLOGICAL_SURVEY]: { Factory: EcologicalSurvey_1.EcologicalSurvey },
        [CardName_1.CardName.ECOLOGICAL_ZONE_ARES]: { Factory: EcologicalZoneAres_1.EcologicalZoneAres },
        [CardName_1.CardName.GEOLOGICAL_SURVEY]: { Factory: GeologicalSurvey_1.GeologicalSurvey },
        [CardName_1.CardName.INDUSTRIAL_CENTER_ARES]: { Factory: IndustrialCenterAres_1.IndustrialCenterAres },
        [CardName_1.CardName.GREAT_DAM_ARES]: { Factory: GreatDamAres_1.GreatDamAres },
        [CardName_1.CardName.LAVA_FLOWS_ARES]: { Factory: LavaFlowsAres_1.LavaFlowsAres },
        [CardName_1.CardName.MAGNETIC_FIELD_GENERATORS_ARES]: { Factory: MagneticFieldGeneratorsAres_1.MagneticFieldGeneratorsAres },
        [CardName_1.CardName.MARKETING_EXPERTS]: { Factory: MarketingExperts_1.MarketingExperts },
        [CardName_1.CardName.METALLIC_ASTEROID]: { Factory: MetallicAsteroid_1.MetallicAsteroid },
        [CardName_1.CardName.MINING_AREA_ARES]: { Factory: MiningAreaAres_1.MiningAreaAres },
        [CardName_1.CardName.MINING_RIGHTS_ARES]: { Factory: MiningRightsAres_1.MiningRightsAres },
        [CardName_1.CardName.MOHOLE_AREA_ARES]: { Factory: MoholeAreaAres_1.MoholeAreaAres },
        [CardName_1.CardName.NATURAL_PRESERVE_ARES]: { Factory: NaturalPreserveAres_1.NaturalPreserveAres },
        [CardName_1.CardName.NUCLEAR_ZONE_ARES]: { Factory: NuclearZoneAres_1.NuclearZoneAres },
        [CardName_1.CardName.OCEAN_CITY]: { Factory: OceanCity_1.OceanCity },
        [CardName_1.CardName.OCEAN_FARM]: { Factory: OceanFarm_1.OceanFarm },
        [CardName_1.CardName.OCEAN_SANCTUARY]: { Factory: OceanSanctuary_1.OceanSanctuary },
        [CardName_1.CardName.RESTRICTED_AREA_ARES]: { Factory: RestrictedAreaAres_1.RestrictedAreaAres },
        [CardName_1.CardName.SOLAR_FARM]: { Factory: SolarFarm_1.SolarFarm },
    },
    cardsToRemove: [
        CardName_1.CardName.CAPITAL,
        CardName_1.CardName.COMMERCIAL_DISTRICT,
        CardName_1.CardName.DEIMOS_DOWN,
        CardName_1.CardName.DEIMOS_DOWN_PROMO,
        CardName_1.CardName.ECOLOGICAL_ZONE,
        CardName_1.CardName.GREAT_DAM,
        CardName_1.CardName.GREAT_DAM_PROMO,
        CardName_1.CardName.INDUSTRIAL_CENTER,
        CardName_1.CardName.LAVA_FLOWS,
        CardName_1.CardName.MAGNETIC_FIELD_GENERATORS,
        CardName_1.CardName.MAGNETIC_FIELD_GENERATORS_PROMO,
        CardName_1.CardName.MINING_AREA,
        CardName_1.CardName.MINING_RIGHTS,
        CardName_1.CardName.MOHOLE_AREA,
        CardName_1.CardName.NATURAL_PRESERVE,
        CardName_1.CardName.NUCLEAR_ZONE,
        CardName_1.CardName.RESTRICTED_AREA,
    ],
});
