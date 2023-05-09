"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningRights = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const MiningCard_1 = require("./MiningCard");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class MiningRights extends MiningCard_1.MiningCard {
    constructor(name = CardName_1.CardName.MINING_RIGHTS, metadata = {
        cardNumber: '067',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.tile(TileType_1.TileType.MINING_RIGHTS, true).asterix().br;
            b.production((pb) => {
                pb.steel(1).or().titanium(1);
            }).asterix();
        }),
        description: 'Place this tile on an area with a steel or titanium placement bonus. Increase that production 1 step.',
    }) {
        super(name, 9, metadata);
    }
}
exports.MiningRights = MiningRights;
