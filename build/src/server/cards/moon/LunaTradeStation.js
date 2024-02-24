"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaTradeStation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const MoonSpaces_1 = require("../../../common/moon/MoonSpaces");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
const Options_1 = require("../Options");
class LunaTradeStation extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_TRADE_STATION,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 10,
            reserveUnits: { titanium: 2 },
            action: {
                stock: { megacredits: { moon: { habitat: {} }, each: 2 } },
            },
            behavior: {
                moon: {
                    tile: {
                        type: TileType_1.TileType.LUNA_TRADE_STATION,
                        space: MoonSpaces_1.MoonSpaces.LUNA_TRADE_STATION,
                    },
                },
            },
            metadata: {
                description: 'Spend 2 titanium. Place this tile ON THE RESERVED AREA.',
                cardNumber: 'M13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Gain 2 M€ for each habitat tile on The Moon.', (eb) => eb.empty().startAction.megacredits(2).slash().moonHabitat({ all: Options_1.all }));
                    b.br.minus().titanium(2).tile(TileType_1.TileType.LUNA_TRADE_STATION, true).asterix();
                }),
            },
        });
    }
}
exports.LunaTradeStation = LunaTradeStation;
