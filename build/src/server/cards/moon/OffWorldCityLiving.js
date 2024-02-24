"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffWorldCityLiving = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class OffWorldCityLiving extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.OFF_WORLD_CITY_LIVING,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.SPACE],
            cost: 35,
            victoryPoints: { cities: {}, all: true, per: 3 },
            behavior: {
                moon: { habitatRate: 1 },
                production: { megacredits: { cities: { where: 'offmars' } } },
            },
            metadata: {
                description: 'Increase your M€ production 1 step per city tile NOT ON MARS. Increase habitat rate 1 step.',
                cardNumber: 'M53',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().city({ all: Options_1.all, secondaryTag: Tag_1.Tag.SPACE }).br;
                    b.moonHabitatRate().br;
                    b.vpText('1 VP for every 3rd City in play.');
                }),
            },
        });
    }
}
exports.OffWorldCityLiving = OffWorldCityLiving;
