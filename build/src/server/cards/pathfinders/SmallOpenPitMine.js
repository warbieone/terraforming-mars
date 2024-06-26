"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallOpenPitMine = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
class SmallOpenPitMine extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SMALL_OPEN_PIT_MINE,
            cost: 10,
            tags: [Tag_1.Tag.BUILDING],
            metadata: {
                cardNumber: 'Pf31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.steel(2)).or().production((pb) => pb.titanium(1));
                }),
                description: 'Increase your steel production 2 steps OR increase your titanium production 1 step.',
            },
        });
    }
    produce(player) {
        player.defer(() => {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Increase your steel production 2 steps').andThen(() => {
                player.production.add(Resource_1.Resource.STEEL, 2, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Increase your titanium production 1 step').andThen(() => {
                player.production.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                return undefined;
            }));
        });
    }
    bespokePlay(player) {
        this.produce(player);
        return undefined;
    }
}
exports.SmallOpenPitMine = SmallOpenPitMine;
