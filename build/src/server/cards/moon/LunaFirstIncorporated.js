"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaFirstIncorporated = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class LunaFirstIncorporated extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.LUNA_FIRST_INCORPORATED,
            tags: [Tag_1.Tag.MOON],
            startingMegaCredits: 40,
            behavior: {
                stock: { steel: 1, titanium: 1 },
            },
            metadata: {
                description: 'You start with 40 M€, 1 steel, and 1 titanium.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(40).steel(1).titanium(1).br;
                    b.effect('When you raise any Moon Rate, increase your M€ production 1 step per step.', (eb) => {
                        eb.moonHabitatRate({ size: Size_1.Size.SMALL }).slash()
                            .moonMiningRate({ size: Size_1.Size.SMALL }).slash()
                            .moonLogisticsRate({ size: Size_1.Size.SMALL })
                            .startEffect.production((pb) => pb.megacredits(1));
                    }).br,
                        b.effect('When any player raises any Moon Rate, gain 1M€ per step.', (eb) => {
                            eb.moonHabitatRate({ size: Size_1.Size.SMALL, all: Options_1.all }).slash()
                                .moonMiningRate({ size: Size_1.Size.SMALL, all: Options_1.all }).slash()
                                .moonLogisticsRate({ size: Size_1.Size.SMALL, all: Options_1.all })
                                .startEffect.megacredits(1);
                        }).br;
                }),
            },
        });
    }
    bespokePlay(player) {
        MoonExpansion_1.MoonExpansion.moonData(player.game).lunaFirstPlayer = player;
        return undefined;
    }
}
exports.LunaFirstIncorporated = LunaFirstIncorporated;
