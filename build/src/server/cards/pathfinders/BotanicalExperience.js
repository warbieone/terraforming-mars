"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotanicalExperience = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
const Board_1 = require("../../boards/Board");
const CardResource_1 = require("../../../common/CardResource");
const Resource_1 = require("../../../common/Resource");
class BotanicalExperience extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.BOTANICAL_EXPERIENCE,
            cost: 14,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.MARS, Tag_1.Tag.SCIENCE],
            requirements: { greeneries: 1, all: Options_1.all },
            resourceType: CardResource_1.CardResource.DATA,
            metadata: {
                cardNumber: 'Pf50',
                hasExternalHelp: true,
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.greenery({ size: Size_1.Size.SMALL, withO2: false, any: true }).colon().data({ size: Size_1.Size.SMALL });
                    b.nbsp;
                    b.data({ amount: 3, digit: true }).asterix().colon().production((pb) => pb.plants(1));
                    b.br;
                    b.text('(EFFECT: Whenever a greenery tile is placed, add 1 data on this card.) ' +
                        '(EFFECT: Whenever this card has at least 3 data, automatically remove 3 data to raise your plant production 1 step.) ' +
                        '(EFFECT: Players may remove your plants, but you only lose half, rounded up.)', Size_1.Size.SMALL, false, false);
                }),
                description: 'Requires one greenery tile on Mars.',
            },
        });
    }
    onTilePlaced(cardOwner, _activePlayer, space) {
        if (Board_1.Board.isGreenerySpace(space)) {
            cardOwner.addResourceTo(this, 1);
        }
    }
    onResourceAdded(player, playedCard) {
        if (playedCard.name !== this.name)
            return;
        if (this.resourceCount >= 3) {
            const delta = Math.floor(this.resourceCount / 3);
            const deducted = delta * 3;
            this.resourceCount -= deducted;
            player.production.add(Resource_1.Resource.PLANTS, delta, { log: false });
            player.game.log('${0} removed ${1} data from ${2} to increase plant production ${3} steps.', (b) => b.player(player).number(deducted).card(this).number(delta));
        }
    }
}
exports.BotanicalExperience = BotanicalExperience;
