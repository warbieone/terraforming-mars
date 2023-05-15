"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecializedSettlement = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const SelectResourceTypeDeferred_1 = require("../../deferredActions/SelectResourceTypeDeferred");
class SpecializedSettlement extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SPECIALIZED_SETTLEMENT,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING, Tag_1.Tag.MARS],
            cost: 20,
            metadata: {
                cardNumber: 'PF57',
                description: 'Decrease your energy production 1 step and increase your M€ production 3 steps. ' +
                    'Place a city tile on Mars. Increase your production by 1 of a resource on the map gained by placement bonus.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                        pb.plus().wild(1);
                    }).nbsp.city();
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.production.energy >= 1 &&
            player.game.board.getAvailableSpacesForCity(player).length > 0;
    }
    bonusResources(space) {
        const resources = new Set();
        space.bonus.forEach((bonus) => {
            switch (bonus) {
                case SpaceBonus_1.SpaceBonus.STEEL:
                    resources.add(Resource_1.Resource.STEEL);
                    break;
                case SpaceBonus_1.SpaceBonus.TITANIUM:
                    resources.add(Resource_1.Resource.TITANIUM);
                    break;
                case SpaceBonus_1.SpaceBonus.PLANT:
                    resources.add(Resource_1.Resource.PLANTS);
                    break;
                case SpaceBonus_1.SpaceBonus.ENERGY:
                    resources.add(Resource_1.Resource.ENERGY);
                    break;
                case SpaceBonus_1.SpaceBonus.HEAT:
                    resources.add(Resource_1.Resource.HEAT);
                    break;
            }
        });
        return Array.from(resources);
    }
    bespokePlay(player) {
        this.defaultProduce(player);
        return new SelectSpace_1.SelectSpace('Select space for city tile', player.game.board.getAvailableSpacesForCity(player), (space) => {
            const coveringExistingTile = space.tile !== undefined;
            player.game.addCityTile(player, space);
            if (coveringExistingTile)
                return;
            const bonusResources = this.bonusResources(space);
            if (bonusResources.length === 0)
                return;
            player.game.defer(new SelectResourceTypeDeferred_1.SelectResourceTypeDeferred(player, bonusResources, 'Select a resource to gain 1 unit of production', (resource) => {
                player.production.add(resource, 1, { log: true });
                this.bonusResource = [resource];
            }));
            return undefined;
        });
    }
    produce(player) {
        this.defaultProduce(player);
        if (this.bonusResource && this.bonusResource.length === 1) {
            player.production.add(this.bonusResource[0], 1, { log: true });
        }
    }
    defaultProduce(player) {
        player.production.add(Resource_1.Resource.ENERGY, -1);
        player.production.add(Resource_1.Resource.MEGACREDITS, 3);
    }
    produceForTile(player, bonusResources) {
        if (bonusResources.length === 0)
            return;
        player.game.defer(new SelectResourceTypeDeferred_1.SelectResourceTypeDeferred(player, bonusResources, 'Select a resource to gain 1 unit of production', (resource) => {
            player.production.add(resource, 1, { log: true });
            this.bonusResource = [resource];
        }));
    }
}
exports.SpecializedSettlement = SpecializedSettlement;
//# sourceMappingURL=SpecializedSettlement.js.map