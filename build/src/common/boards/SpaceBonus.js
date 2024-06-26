"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceBonus = void 0;
var SpaceBonus;
(function (SpaceBonus) {
    SpaceBonus[SpaceBonus["TITANIUM"] = 0] = "TITANIUM";
    SpaceBonus[SpaceBonus["STEEL"] = 1] = "STEEL";
    SpaceBonus[SpaceBonus["PLANT"] = 2] = "PLANT";
    SpaceBonus[SpaceBonus["DRAW_CARD"] = 3] = "DRAW_CARD";
    SpaceBonus[SpaceBonus["HEAT"] = 4] = "HEAT";
    SpaceBonus[SpaceBonus["OCEAN"] = 5] = "OCEAN";
    SpaceBonus[SpaceBonus["MEGACREDITS"] = 6] = "MEGACREDITS";
    SpaceBonus[SpaceBonus["ANIMAL"] = 7] = "ANIMAL";
    SpaceBonus[SpaceBonus["MICROBE"] = 8] = "MICROBE";
    SpaceBonus[SpaceBonus["ENERGY"] = 9] = "ENERGY";
    SpaceBonus[SpaceBonus["DATA"] = 10] = "DATA";
    SpaceBonus[SpaceBonus["SCIENCE"] = 11] = "SCIENCE";
    SpaceBonus[SpaceBonus["ENERGY_PRODUCTION"] = 12] = "ENERGY_PRODUCTION";
    SpaceBonus[SpaceBonus["TEMPERATURE"] = 13] = "TEMPERATURE";
    SpaceBonus[SpaceBonus["_RESTRICTED"] = 14] = "_RESTRICTED";
    SpaceBonus[SpaceBonus["ASTEROID"] = 15] = "ASTEROID";
    SpaceBonus[SpaceBonus["DELEGATE"] = 16] = "DELEGATE";
    SpaceBonus[SpaceBonus["COLONY"] = 17] = "COLONY";
})(SpaceBonus = exports.SpaceBonus || (exports.SpaceBonus = {}));
const TO_STRING_MAP = {
    [SpaceBonus.TITANIUM]: 'Titanium',
    [SpaceBonus.STEEL]: 'Steel',
    [SpaceBonus.PLANT]: 'Plant',
    [SpaceBonus.DRAW_CARD]: 'Card',
    [SpaceBonus.HEAT]: 'Heat',
    [SpaceBonus.OCEAN]: 'Ocean',
    [SpaceBonus.MEGACREDITS]: 'M€',
    [SpaceBonus.ANIMAL]: 'Animal',
    [SpaceBonus.MICROBE]: 'Microbe',
    [SpaceBonus.ENERGY]: 'Energy',
    [SpaceBonus.DATA]: 'Data',
    [SpaceBonus.SCIENCE]: 'Science',
    [SpaceBonus.ENERGY_PRODUCTION]: 'Energy Production',
    [SpaceBonus.TEMPERATURE]: 'Temperature',
    [SpaceBonus._RESTRICTED]: 'UNUSED',
    [SpaceBonus.ASTEROID]: 'Asteroid',
    [SpaceBonus.DELEGATE]: 'Delegate',
    [SpaceBonus.COLONY]: 'Colony',
};
(function (SpaceBonus) {
    function toString(spaceBonus) {
        return TO_STRING_MAP[spaceBonus];
    }
    SpaceBonus.toString = toString;
})(SpaceBonus = exports.SpaceBonus || (exports.SpaceBonus = {}));
