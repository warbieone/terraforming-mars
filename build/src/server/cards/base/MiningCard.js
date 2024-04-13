"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningCard = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const Tag_1 = require("../../../common/cards/Tag");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const SelectResourceTypeDeferred_1 = require("../../deferredActions/SelectResourceTypeDeferred");
class MiningCard extends Card_1.Card {
    constructor(name, cost, metadata) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.BUILDING],
            cost,
            metadata,
        });
        this.isAres = false;
        this.placeTile = true;
    }
    bespokeCanPlay(player, canAffordOptions) {
        return this.getAvailableSpaces(player, canAffordOptions).length > 0;
    }
    getAdjacencyBonus(bonusType) {
        if (this.isAres) {
            return { bonus: [bonusType] };
        }
        return undefined;
    }
    getAvailableSpaces(player, canAffordOptions) {
        return player.game.board.getAvailableSpacesOnLand(player, canAffordOptions)
            .filter((space) => space.tile === undefined)
            .filter((space) => space.bonus.includes(SpaceBonus_1.SpaceBonus.STEEL) || space.bonus.includes(SpaceBonus_1.SpaceBonus.TITANIUM));
    }
    getTileType(bonus) {
        if (this.isAres) {
            return bonus === SpaceBonus_1.SpaceBonus.STEEL ? TileType_1.TileType.MINING_STEEL_BONUS : TileType_1.TileType.MINING_TITANIUM_BONUS;
        }
        if (this.name === CardName_1.CardName.MINING_RIGHTS) {
            return TileType_1.TileType.MINING_RIGHTS;
        }
        return TileType_1.TileType.MINING_AREA;
    }
    produce(player) {
        if (this.bonusResource && this.bonusResource.length === 1) {
            player.production.add(this.bonusResource[0], 1, { log: true });
        }
    }
    bespokePlay(player) {
        return new SelectSpace_1.SelectSpace(this.title, this.getAvailableSpaces(player))
            .andThen((space) => {
            this.spaceSelected(player, space);
            return undefined;
        });
    }
    spaceSelected(player, space) {
        const bonusResources = [];
        if (space.bonus.includes(SpaceBonus_1.SpaceBonus.STEEL)) {
            bonusResources.push(Resource_1.Resource.STEEL);
        }
        if (space.bonus.includes(SpaceBonus_1.SpaceBonus.TITANIUM)) {
            bonusResources.push(Resource_1.Resource.TITANIUM);
        }
        player.game.defer(new SelectResourceTypeDeferred_1.SelectResourceTypeDeferred(player, bonusResources, 'Select a resource to gain 1 unit of production'))
            .andThen((resource) => {
            player.production.add(resource, 1, { log: true });
            this.bonusResource = [resource];
            if (this.placeTile) {
                const spaceBonus = resource === Resource_1.Resource.TITANIUM ? SpaceBonus_1.SpaceBonus.TITANIUM : SpaceBonus_1.SpaceBonus.STEEL;
                player.game.addTile(player, space, { tileType: this.getTileType(spaceBonus) });
                space.adjacency = this.getAdjacencyBonus(spaceBonus);
            }
        });
    }
}
exports.MiningCard = MiningCard;
