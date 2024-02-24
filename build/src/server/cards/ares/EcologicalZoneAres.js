"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologicalZoneAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const EcologicalZone_1 = require("../base/EcologicalZone");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class EcologicalZoneAres extends EcologicalZone_1.EcologicalZone {
    constructor() {
        super(CardName_1.CardName.ECOLOGICAL_ZONE_ARES, 11, { bonus: [SpaceBonus_1.SpaceBonus.ANIMAL] }, {
            description: {
                text: 'Requires that YOU have a greenery tile. Place this tile adjacent to ANY greenery.',
                align: 'left',
            },
            cardNumber: 'A08',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.effect('When you play an animal or plant tag INCLUDING THESE, add an animal to this card.', (eb) => {
                    eb.animals(1, { played: Options_1.played }).slash().plants(1, { played: Options_1.played }).startEffect;
                    eb.animals(1).tile(TileType_1.TileType.ECOLOGICAL_ZONE, false, true);
                }).br;
                b.vpText('The tile grants an ADJACENCY BONUS of 1 animal. 1 VP per 2 animals on this card.');
            }),
        });
    }
}
exports.EcologicalZoneAres = EcologicalZoneAres;
