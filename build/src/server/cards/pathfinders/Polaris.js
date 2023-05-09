"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polaris = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const GainResources_1 = require("../../deferredActions/GainResources");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const Size_1 = require("../../../common/cards/render/Size");
const Board_1 = require("../../boards/Board");
class Polaris extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.POLARIS,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 32,
            firstAction: {
                text: 'Place your initial ocean.',
                ocean: {},
            },
            metadata: {
                cardNumber: 'PfC1',
                description: 'You start with 32 M€. As your first action, place an ocean tile.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(32).oceans(1);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When any ocean tile is placed ON MARS, increase your M€ production 1 step. When you place an ocean tile, gain 4M€.', (eb) => {
                            eb.oceans(1, { size: Size_1.Size.SMALL, all: Options_1.all }).colon().production((pb) => pb.megacredits(1));
                            eb.nbsp;
                            eb.oceans(1, { size: Size_1.Size.SMALL }).startEffect.megacredits(4, { digit: Options_1.digit });
                        });
                    });
                }),
            },
        });
    }
    onTilePlaced(cardOwner, activePlayer, space) {
        if (Board_1.Board.isUncoveredOceanSpace(space)) {
            cardOwner.production.add(Resource_1.Resource.MEGACREDITS, 1);
            activePlayer.game.log('${0} gained 1 ${1} production from ${2}', (b) => b.player(cardOwner).string(Resource_1.Resource.MEGACREDITS).cardName(this.name));
            if (activePlayer.id === cardOwner.id) {
                cardOwner.game.defer(new GainResources_1.GainResources(cardOwner, Resource_1.Resource.MEGACREDITS, {
                    count: 4,
                    cb: () => activePlayer.game.log('${0} gained ${1} from ${2}', (b) => b.player(cardOwner).string(Resource_1.Resource.MEGACREDITS).cardName(this.name)),
                }), cardOwner.id !== activePlayer.id ? DeferredAction_1.Priority.OPPONENT_TRIGGER : undefined);
            }
        }
    }
}
exports.Polaris = Polaris;
