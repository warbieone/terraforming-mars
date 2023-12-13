"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GREENERY_TILES = exports.BASE_OCEAN_TILES = exports.OCEAN_TILES = exports.CITY_TILES = exports.OCEAN_UPGRADE_TILES = exports.HAZARD_TILES = exports.tileTypeToString = exports.TileType = void 0;
const CardName_1 = require("./cards/CardName");
var TileType;
(function (TileType) {
    TileType[TileType["GREENERY"] = 0] = "GREENERY";
    TileType[TileType["OCEAN"] = 1] = "OCEAN";
    TileType[TileType["CITY"] = 2] = "CITY";
    TileType[TileType["CAPITAL"] = 3] = "CAPITAL";
    TileType[TileType["COMMERCIAL_DISTRICT"] = 4] = "COMMERCIAL_DISTRICT";
    TileType[TileType["ECOLOGICAL_ZONE"] = 5] = "ECOLOGICAL_ZONE";
    TileType[TileType["INDUSTRIAL_CENTER"] = 6] = "INDUSTRIAL_CENTER";
    TileType[TileType["LAVA_FLOWS"] = 7] = "LAVA_FLOWS";
    TileType[TileType["MINING_AREA"] = 8] = "MINING_AREA";
    TileType[TileType["MINING_RIGHTS"] = 9] = "MINING_RIGHTS";
    TileType[TileType["MOHOLE_AREA"] = 10] = "MOHOLE_AREA";
    TileType[TileType["NATURAL_PRESERVE"] = 11] = "NATURAL_PRESERVE";
    TileType[TileType["NUCLEAR_ZONE"] = 12] = "NUCLEAR_ZONE";
    TileType[TileType["RESTRICTED_AREA"] = 13] = "RESTRICTED_AREA";
    TileType[TileType["DEIMOS_DOWN"] = 14] = "DEIMOS_DOWN";
    TileType[TileType["GREAT_DAM"] = 15] = "GREAT_DAM";
    TileType[TileType["MAGNETIC_FIELD_GENERATORS"] = 16] = "MAGNETIC_FIELD_GENERATORS";
    TileType[TileType["BIOFERTILIZER_FACILITY"] = 17] = "BIOFERTILIZER_FACILITY";
    TileType[TileType["METALLIC_ASTEROID"] = 18] = "METALLIC_ASTEROID";
    TileType[TileType["SOLAR_FARM"] = 19] = "SOLAR_FARM";
    TileType[TileType["OCEAN_CITY"] = 20] = "OCEAN_CITY";
    TileType[TileType["OCEAN_FARM"] = 21] = "OCEAN_FARM";
    TileType[TileType["OCEAN_SANCTUARY"] = 22] = "OCEAN_SANCTUARY";
    TileType[TileType["DUST_STORM_MILD"] = 23] = "DUST_STORM_MILD";
    TileType[TileType["DUST_STORM_SEVERE"] = 24] = "DUST_STORM_SEVERE";
    TileType[TileType["EROSION_MILD"] = 25] = "EROSION_MILD";
    TileType[TileType["EROSION_SEVERE"] = 26] = "EROSION_SEVERE";
    TileType[TileType["MINING_STEEL_BONUS"] = 27] = "MINING_STEEL_BONUS";
    TileType[TileType["MINING_TITANIUM_BONUS"] = 28] = "MINING_TITANIUM_BONUS";
    TileType[TileType["MOON_MINE"] = 29] = "MOON_MINE";
    TileType[TileType["MOON_HABITAT"] = 30] = "MOON_HABITAT";
    TileType[TileType["MOON_ROAD"] = 31] = "MOON_ROAD";
    TileType[TileType["LUNA_TRADE_STATION"] = 32] = "LUNA_TRADE_STATION";
    TileType[TileType["LUNA_MINING_HUB"] = 33] = "LUNA_MINING_HUB";
    TileType[TileType["LUNA_TRAIN_STATION"] = 34] = "LUNA_TRAIN_STATION";
    TileType[TileType["LUNAR_MINE_URBANIZATION"] = 35] = "LUNAR_MINE_URBANIZATION";
    TileType[TileType["WETLANDS"] = 36] = "WETLANDS";
    TileType[TileType["RED_CITY"] = 37] = "RED_CITY";
    TileType[TileType["MARTIAN_NATURE_WONDERS"] = 38] = "MARTIAN_NATURE_WONDERS";
    TileType[TileType["CRASHLANDING"] = 39] = "CRASHLANDING";
    TileType[TileType["MARS_NOMADS"] = 40] = "MARS_NOMADS";
    TileType[TileType["REY_SKYWALKER"] = 41] = "REY_SKYWALKER";
    TileType[TileType["MAN_MADE_VOLCANO"] = 42] = "MAN_MADE_VOLCANO";
})(TileType = exports.TileType || (exports.TileType = {}));
exports.tileTypeToString = {
    [TileType.GREENERY]: 'greenery',
    [TileType.OCEAN]: 'ocean',
    [TileType.CITY]: 'city',
    [TileType.CAPITAL]: CardName_1.CardName.CAPITAL,
    [TileType.COMMERCIAL_DISTRICT]: CardName_1.CardName.COMMERCIAL_DISTRICT,
    [TileType.ECOLOGICAL_ZONE]: CardName_1.CardName.ECOLOGICAL_ZONE,
    [TileType.INDUSTRIAL_CENTER]: CardName_1.CardName.INDUSTRIAL_CENTER,
    [TileType.LAVA_FLOWS]: CardName_1.CardName.LAVA_FLOWS,
    [TileType.MINING_AREA]: CardName_1.CardName.MINING_AREA,
    [TileType.MINING_RIGHTS]: CardName_1.CardName.MINING_RIGHTS,
    [TileType.MOHOLE_AREA]: CardName_1.CardName.MOHOLE_AREA,
    [TileType.NATURAL_PRESERVE]: CardName_1.CardName.NATURAL_PRESERVE,
    [TileType.NUCLEAR_ZONE]: CardName_1.CardName.NUCLEAR_ZONE,
    [TileType.RESTRICTED_AREA]: CardName_1.CardName.RESTRICTED_AREA,
    [TileType.DEIMOS_DOWN]: CardName_1.CardName.DEIMOS_DOWN,
    [TileType.GREAT_DAM]: CardName_1.CardName.GREAT_DAM,
    [TileType.MAGNETIC_FIELD_GENERATORS]: CardName_1.CardName.MAGNETIC_FIELD_GENERATORS,
    [TileType.BIOFERTILIZER_FACILITY]: CardName_1.CardName.BIOFERTILIZER_FACILITY,
    [TileType.METALLIC_ASTEROID]: CardName_1.CardName.METALLIC_ASTEROID,
    [TileType.SOLAR_FARM]: CardName_1.CardName.SOLAR_FARM,
    [TileType.OCEAN_CITY]: CardName_1.CardName.OCEAN_CITY,
    [TileType.OCEAN_FARM]: CardName_1.CardName.OCEAN_FARM,
    [TileType.OCEAN_SANCTUARY]: CardName_1.CardName.OCEAN_SANCTUARY,
    [TileType.DUST_STORM_MILD]: 'Mild Dust Storm',
    [TileType.DUST_STORM_SEVERE]: 'Severe Dust Storm',
    [TileType.EROSION_MILD]: 'Mild Erosion',
    [TileType.EROSION_SEVERE]: 'Severe Erosion',
    [TileType.MINING_STEEL_BONUS]: 'Mining (Steel)',
    [TileType.MINING_TITANIUM_BONUS]: 'Mining (Titanium)',
    [TileType.MOON_MINE]: 'Mine',
    [TileType.MOON_HABITAT]: 'Habitat',
    [TileType.MOON_ROAD]: 'Road',
    [TileType.LUNA_TRADE_STATION]: CardName_1.CardName.LUNA_TRADE_STATION,
    [TileType.LUNA_MINING_HUB]: CardName_1.CardName.LUNA_MINING_HUB,
    [TileType.LUNA_TRAIN_STATION]: CardName_1.CardName.LUNA_TRAIN_STATION,
    [TileType.LUNAR_MINE_URBANIZATION]: CardName_1.CardName.LUNAR_MINE_URBANIZATION,
    [TileType.WETLANDS]: CardName_1.CardName.WETLANDS,
    [TileType.RED_CITY]: CardName_1.CardName.RED_CITY,
    [TileType.MARTIAN_NATURE_WONDERS]: CardName_1.CardName.MARTIAN_NATURE_WONDERS,
    [TileType.CRASHLANDING]: CardName_1.CardName.CRASHLANDING,
    [TileType.MARS_NOMADS]: CardName_1.CardName.MARS_NOMADS,
    [TileType.REY_SKYWALKER]: CardName_1.CardName.REY_SKYWALKER,
    [TileType.MAN_MADE_VOLCANO]: CardName_1.CardName.MAN_MADE_VOLCANO,
};
exports.HAZARD_TILES = new Set([TileType.DUST_STORM_MILD, TileType.DUST_STORM_SEVERE, TileType.EROSION_MILD, TileType.EROSION_SEVERE]);
exports.OCEAN_UPGRADE_TILES = new Set([TileType.OCEAN_CITY, TileType.OCEAN_FARM, TileType.OCEAN_SANCTUARY]);
exports.CITY_TILES = new Set([TileType.CITY, TileType.CAPITAL, TileType.OCEAN_CITY, TileType.RED_CITY]);
exports.OCEAN_TILES = new Set([TileType.OCEAN, TileType.OCEAN_CITY, TileType.OCEAN_FARM, TileType.OCEAN_SANCTUARY, TileType.WETLANDS]);
exports.BASE_OCEAN_TILES = new Set([TileType.OCEAN, TileType.WETLANDS]);
exports.GREENERY_TILES = new Set([TileType.GREENERY, TileType.WETLANDS]);
//# sourceMappingURL=TileType.js.map