"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestrictedAreaAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const RestrictedArea_1 = require("../base/RestrictedArea");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class RestrictedAreaAres extends RestrictedArea_1.RestrictedArea {
    constructor() {
        super(CardName_1.CardName.RESTRICTED_AREA_ARES, { bonus: [SpaceBonus_1.SpaceBonus.DRAW_CARD] }, {
            cardNumber: 'A24',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.action('Spend 2 M€ to draw a card.', (eb) => {
                    eb.megacredits(2).startAction.cards(1);
                }).br;
                b.tile(TileType_1.TileType.RESTRICTED_AREA, false, true);
            }),
            description: 'Place this tile which grants an ADJACENCY BONUS of 1 card.',
        });
    }
}
exports.RestrictedAreaAres = RestrictedAreaAres;
