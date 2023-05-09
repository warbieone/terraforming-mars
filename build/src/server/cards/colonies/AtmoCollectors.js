"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtmoCollectors = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const ActionCard_1 = require("../ActionCard");
class AtmoCollectors extends ActionCard_1.ActionCard {
    constructor() {
        super({
            cost: 15,
            name: CardName_1.CardName.ATMO_COLLECTORS,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            behavior: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 2 },
            },
            action: {
                or: {
                    behaviors: [
                        {
                            title: 'Remove 1 floater to gain 2 titanium',
                            spend: { resourcesHere: 1 },
                            stock: { titanium: 2 },
                        },
                        {
                            title: 'Remove 1 floater to gain 3 energy',
                            spend: { resourcesHere: 1 },
                            stock: { energy: 3 },
                        },
                        {
                            title: 'Remove 1 floater to gain 4 heat',
                            spend: { resourcesHere: 1 },
                            stock: { heat: 4 },
                        },
                        {
                            title: 'Add 1 floater to this card',
                            addResources: 1,
                        },
                    ],
                    autoSelect: true,
                },
            },
            metadata: {
                description: 'Add 2 floaters to ANY card.',
                cardNumber: 'C03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add one floater here.', (eb) => {
                        eb.empty().startAction.floaters(1).or(Size_1.Size.SMALL);
                    }).br;
                    b.action('Spend 1 floater here to gain 2 titanium, or 3 energy, or 4 heat.', (eb) => {
                        eb.floaters(1).startAction.titanium(2, { digit: Options_1.digit }).slash(Size_1.Size.SMALL).energy(3, { digit: Options_1.digit }).slash(Size_1.Size.SMALL).heat(4, { digit: Options_1.digit });
                    }).br;
                    b.floaters(2).asterix();
                }),
            },
        });
    }
}
exports.AtmoCollectors = AtmoCollectors;
