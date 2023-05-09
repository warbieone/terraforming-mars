"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentumViriumHabitat = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const MoonSpaces_1 = require("../../../common/moon/MoonSpaces");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MomentumViriumHabitat extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MOMENTUM_VIRUM_HABITAT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.SPACE],
            cost: 23,
            behavior: {
                production: { heat: 2, megacredits: 3 },
                moon: {
                    habitatTile: { space: MoonSpaces_1.MoonSpaces.MOMENTUM_VIRIUM },
                },
            },
            reserveUnits: { titanium: 1 },
            metadata: {
                description: 'Spend 1 titanium. Increase your heat production 2 steps and your M€ production 3 steps. ' +
                    'Place a habitat tile ON THE RESERVED AREA and raise the habitat rate 1 step.',
                cardNumber: 'M12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).br;
                    b.production((pb) => {
                        pb.heat(2).megacredits(3);
                    }).br;
                    b.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE }).asterix();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.MomentumViriumHabitat = MomentumViriumHabitat;
