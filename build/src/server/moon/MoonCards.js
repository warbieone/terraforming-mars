"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonCards = void 0;
const CardName_1 = require("../../common/cards/CardName");
class MoonCards {
    constructor() {
        this.otherScienceCards = new Set([
            CardName_1.CardName.PHYSICS_COMPLEX,
            CardName_1.CardName.SEARCH_FOR_LIFE,
        ]);
    }
}
exports.MoonCards = MoonCards;
MoonCards.scienceCardsWithLessThan2VP = new Set([
    CardName_1.CardName.OLYMPUS_CONFERENCE,
    CardName_1.CardName.COPERNICUS_TOWER,
    CardName_1.CardName.LUNA_ARCHIVES,
    CardName_1.CardName.PRIDE_OF_THE_EARTH_ARKSHIP,
    CardName_1.CardName.NANOTECH_INDUSTRIES,
]);
