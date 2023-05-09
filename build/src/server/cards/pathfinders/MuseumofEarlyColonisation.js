"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuseumofEarlyColonisation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class MuseumofEarlyColonisation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MUSEUM_OF_EARLY_COLONISATION,
            cost: 20,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.MARS],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(1).cities(1, { all: Options_1.all }).greeneries(1, { all: Options_1.all })),
            behavior: {
                production: { energy: -1, steel: 1, titanium: 1, plants: 1 },
                tr: 1,
            },
            metadata: {
                cardNumber: 'Pf11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production(((pb) => pb.minus().energy(1).nbsp.steel(1).titanium(1).plants(1)));
                    b.br.tr(1);
                }),
                description: 'Requires 1 ocean, 1 city and one greenery on Mars. ' +
                    'Decrease your energy production 1 step. Raise your steel, titanium, and plant production 1 step. ' +
                    'Gain 1 TR.',
            },
        });
    }
}
exports.MuseumofEarlyColonisation = MuseumofEarlyColonisation;
