"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaTradeFederation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Resource_1 = require("../../../common/Resource");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class LunaTradeFederation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.LUNA_TRADE_FEDERATION,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            startingMegaCredits: 15,
            behavior: {
                stock: { titanium: 10 },
            },
            metadata: {
                description: 'You start with 15 M€ and 10 titanium.',
                cardNumber: 'MC9',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(15).titanium(10).br;
                    b.effect('When you place a mine tile on The Moon, raise your titanium production 1 step.', (eb) => {
                        eb.moonMine({ size: Size_1.Size.SMALL }).startEffect.production((pb) => pb.titanium(1)).nbsp;
                    });
                    b.br;
                    b.effect('You may use titanium resources as 2M€ each.', (eb) => {
                        eb.startEffect.text('X').titanium(1).equals().megacredits(2, { multiplier: Options_1.multiplier });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        player.canUseTitaniumAsMegacredits = true;
        return undefined;
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (activePlayer === cardOwner && MoonExpansion_1.MoonExpansion.spaceHasType(space, TileType_1.TileType.MOON_MINE)) {
            cardOwner.production.add(Resource_1.Resource.TITANIUM, 1, { log: true });
        }
    }
}
exports.LunaTradeFederation = LunaTradeFederation;
