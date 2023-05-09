"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHazardTileType = exports.GREENERY_TILES = exports.BASE_OCEAN_TILES = exports.OCEAN_TILES = exports.CITY_TILES = exports.OCEAN_UPGRADE_TILES = exports.HAZARD_TILES = exports.TileType = void 0;
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
})(TileType = exports.TileType || (exports.TileType = {}));
const TO_STRING_MAP = new Map([
    [TileType.GREENERY, 'greenery'],
    [TileType.OCEAN, 'ocean'],
    [TileType.CITY, 'city'],
    [TileType.CAPITAL, 'Capital'],
    [TileType.COMMERCIAL_DISTRICT, 'Commercial District'],
    [TileType.ECOLOGICAL_ZONE, 'Ecological Zone'],
    [TileType.INDUSTRIAL_CENTER, 'Industrial Center'],
    [TileType.LAVA_FLOWS, 'Lava Flows'],
    [TileType.MINING_AREA, 'Mining Area'],
    [TileType.MINING_RIGHTS, 'Mining Rights'],
    [TileType.MOHOLE_AREA, 'Mohole Area'],
    [TileType.NATURAL_PRESERVE, 'Natural Preserve'],
    [TileType.NUCLEAR_ZONE, 'Nuclear Zone'],
    [TileType.RESTRICTED_AREA, 'Restricted Area'],
    [TileType.DEIMOS_DOWN, 'Deimos Down'],
    [TileType.GREAT_DAM, 'Great Dam'],
    [TileType.MAGNETIC_FIELD_GENERATORS, 'Magnetic Field Generators'],
    [TileType.BIOFERTILIZER_FACILITY, 'Bio-Fertilizer Facility'],
    [TileType.METALLIC_ASTEROID, 'Metallic Asteroid'],
    [TileType.SOLAR_FARM, 'Solar Farm'],
    [TileType.OCEAN_CITY, 'Ocean City'],
    [TileType.OCEAN_FARM, 'Ocean Farm'],
    [TileType.OCEAN_SANCTUARY, 'Ocean Sanctuary'],
    [TileType.DUST_STORM_MILD, 'Mild Dust Storm'],
    [TileType.DUST_STORM_SEVERE, 'Severe Dust Storm'],
    [TileType.EROSION_MILD, 'Mild Erosion'],
    [TileType.EROSION_SEVERE, 'Severe Erosion'],
    [TileType.MINING_STEEL_BONUS, 'Mining (Steel)'],
    [TileType.MINING_TITANIUM_BONUS, 'Mining (Titanium)'],
    [TileType.MOON_MINE, 'Mine'],
    [TileType.MOON_HABITAT, 'Habitat'],
    [TileType.MOON_ROAD, 'Road'],
    [TileType.LUNA_TRADE_STATION, 'Luna Trade Station'],
    [TileType.LUNA_MINING_HUB, 'Luna Mining Hub'],
    [TileType.LUNA_TRAIN_STATION, 'Luna Train Station'],
    [TileType.LUNAR_MINE_URBANIZATION, 'Lunar Mine Urbanization'],
    [TileType.WETLANDS, 'Wetlands'],
    [TileType.RED_CITY, 'Red City'],
    [TileType.MARTIAN_NATURE_WONDERS, 'Martian Nature Wonders'],
]);
(function (TileType) {
    function toString(tileType) {
        return TO_STRING_MAP.get(tileType) || `(unnamed tile, id ${tileType})`;
    }
    TileType.toString = toString;
})(TileType = exports.TileType || (exports.TileType = {}));
exports.HAZARD_TILES = new Set([TileType.DUST_STORM_MILD, TileType.DUST_STORM_SEVERE, TileType.EROSION_MILD, TileType.EROSION_SEVERE]);
exports.OCEAN_UPGRADE_TILES = new Set([TileType.OCEAN_CITY, TileType.OCEAN_FARM, TileType.OCEAN_SANCTUARY]);
exports.CITY_TILES = new Set([TileType.CITY, TileType.CAPITAL, TileType.OCEAN_CITY, TileType.RED_CITY]);
exports.OCEAN_TILES = new Set([TileType.OCEAN, TileType.OCEAN_CITY, TileType.OCEAN_FARM, TileType.OCEAN_SANCTUARY, TileType.WETLANDS]);
exports.BASE_OCEAN_TILES = new Set([TileType.OCEAN, TileType.WETLANDS]);
exports.GREENERY_TILES = new Set([TileType.GREENERY, TileType.WETLANDS]);
function isHazardTileType(tile) {
    return exports.HAZARD_TILES.has(tile);
}
exports.isHazardTileType = isHazardTileType;
