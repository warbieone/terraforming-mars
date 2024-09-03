"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stratopolis = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class Stratopolis extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.STRATOPOLIS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.VENUS],
            cost: 20,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 2 },
            behavior: {
                production: { megacredits: 2 },
                city: { space: SpaceName_1.SpaceName.STRATOPOLIS },
            },
            action: {
                addResourcesToAnyCard: {
                    count: 2,
                    tag: Tag_1.Tag.VENUS,
                    type: CardResource_1.CardResource.FLOATER,
                    autoSelect: true,
                },
            },
            metadata: {
                cardNumber: '248',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 2 floaters to ANY VENUS CARD.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.FLOATER, { amount: 2, secondaryTag: Tag_1.Tag.VENUS });
                    }).br;
                    b.production((pb) => pb.megacredits(2)).city().asterix();
                    b.vpText('1 VP for every 2nd Floater on this card.');
                }),
                description: {
                    text: 'Requires 2 science tags. Increase your M€ production 2 steps. Place a city tile ON THE RESERVED AREA',
                    align: 'left',
                },
            },
        });
    }
}
exports.Stratopolis = Stratopolis;
