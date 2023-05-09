"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningGuild = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Phase_1 = require("../../../common/Phase");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const GainProduction_1 = require("../../deferredActions/GainProduction");
const CardRenderer_1 = require("../render/CardRenderer");
const BoardType_1 = require("../../boards/BoardType");
const Options_1 = require("../Options");
class MiningGuild extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.MINING_GUILD,
            tags: [Tag_1.Tag.BUILDING, Tag_1.Tag.BUILDING],
            startingMegaCredits: 30,
            behavior: {
                production: { steel: 1 },
                stock: { steel: 5 },
            },
            metadata: {
                cardNumber: 'R24',
                description: 'You start with 30 M€, 5 steel and 1 steel production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(30).nbsp.steel(5, { digit: Options_1.digit }).nbsp.production((pb) => pb.steel(1));
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each time you get any steel or titanium as a placement bonus on the map, increase your steel production 1 step.', (eb) => {
                            eb.steel(1).asterix().slash().titanium(1).asterix();
                            eb.startEffect.production((pb) => pb.steel(1));
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space, boardType) {
        var _a;
        if (boardType !== BoardType_1.BoardType.MARS) {
            return;
        }
        if (cardOwner.id !== activePlayer.id || cardOwner.game.phase === Phase_1.Phase.SOLAR) {
            return;
        }
        if (((_a = space.tile) === null || _a === void 0 ? void 0 : _a.covers) !== undefined) {
            return;
        }
        if (space.bonus.some((bonus) => bonus === SpaceBonus_1.SpaceBonus.STEEL || bonus === SpaceBonus_1.SpaceBonus.TITANIUM)) {
            cardOwner.game.defer(new GainProduction_1.GainProduction(cardOwner, Resource_1.Resource.STEEL));
        }
    }
}
exports.MiningGuild = MiningGuild;
