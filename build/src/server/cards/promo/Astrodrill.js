"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Astrodrill = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectCard_1 = require("../../inputs/SelectCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const LogHelper_1 = require("../../LogHelper");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class Astrodrill extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.ASTRODRILL,
            tags: [Tag_1.Tag.SPACE],
            startingMegaCredits: 40,
            resourceType: CardResource_1.CardResource.ASTEROID,
            behavior: {
                addResources: 4,
            },
            metadata: {
                cardNumber: 'R21',
                description: 'You start with 40 M€ and 4 asteroid resources.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(40).nbsp.resource(CardResource_1.CardResource.ASTEROID, { amount: 4, digit: Options_1.digit });
                    b.corpBox('action', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.action(undefined, (eb) => {
                            eb.empty().startAction.resource(CardResource_1.CardResource.ASTEROID).asterix().slash().wild(1).or();
                        });
                        ce.vSpace();
                        ce.action('Add an asteroid resource to ANY card OR gain any standard resource, OR remove an asteroid resource from this card to gain 3 titanium.', (eb) => {
                            eb.resource(CardResource_1.CardResource.ASTEROID).startAction.titanium(3, { digit: Options_1.digit });
                        });
                    });
                }),
            },
        });
    }
    canAct() {
        return true;
    }
    action(player) {
        const asteroidCards = player.getResourceCards(CardResource_1.CardResource.ASTEROID);
        const opts = [];
        const gainStandardResource = new SelectOption_1.SelectOption('Gain a standard resource', 'Gain').andThen(() => {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Gain 1 titanium', 'Gain titanium').andThen(() => {
                player.stock.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 steel', 'Gain steel').andThen(() => {
                player.stock.add(Resource_1.Resource.STEEL, 1, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 plant', 'Gain plant').andThen(() => {
                player.stock.add(Resource_1.Resource.PLANTS, 1, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 energy', 'Gain energy').andThen(() => {
                player.stock.add(Resource_1.Resource.ENERGY, 1, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 heat', 'Gain heat').andThen(() => {
                player.stock.add(Resource_1.Resource.HEAT, 1, { log: true });
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 M€', 'Gain M€').andThen(() => {
                player.stock.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
                return undefined;
            }));
        });
        const addResourceToSelf = new SelectOption_1.SelectOption('Add 1 asteroid to this card', 'Add asteroid').andThen(() => {
            player.addResourceTo(this, { log: true });
            return undefined;
        });
        const addResource = new SelectCard_1.SelectCard('Select card to add 1 asteroid', 'Add asteroid', asteroidCards)
            .andThen(([card]) => {
            player.addResourceTo(card, { log: true });
            return undefined;
        });
        const spendResource = new SelectOption_1.SelectOption('Remove 1 asteroid on this card to gain 3 titanium', 'Remove asteroid').andThen(() => {
            this.resourceCount--;
            player.titanium += 3;
            LogHelper_1.LogHelper.logRemoveResource(player, this, 1, 'gain 3 titanium');
            return undefined;
        });
        if (this.resourceCount > 0)
            opts.push(spendResource);
        asteroidCards.length === 1 ? opts.push(addResourceToSelf) : opts.push(addResource);
        opts.push(gainStandardResource);
        return new OrOptions_1.OrOptions(...opts);
    }
}
exports.Astrodrill = Astrodrill;
