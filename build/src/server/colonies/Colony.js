"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colony = exports.ShouldIncreaseTrack = void 0;
const AddResourcesToCard_1 = require("../deferredActions/AddResourcesToCard");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const Priority_1 = require("../deferredActions/Priority");
const DiscardCards_1 = require("../deferredActions/DiscardCards");
const DrawCards_1 = require("../deferredActions/DrawCards");
const GiveColonyBonus_1 = require("../deferredActions/GiveColonyBonus");
const IncreaseColonyTrack_1 = require("../deferredActions/IncreaseColonyTrack");
const LogHelper_1 = require("../LogHelper");
const constants_1 = require("../../common/constants");
const PlaceOceanTile_1 = require("../deferredActions/PlaceOceanTile");
const Resource_1 = require("../../common/Resource");
const ScienceTagCard_1 = require("../cards/community/ScienceTagCard");
const SelectColony_1 = require("../inputs/SelectColony");
const SelectPlayer_1 = require("../inputs/SelectPlayer");
const StealResources_1 = require("../deferredActions/StealResources");
const Tag_1 = require("../../common/cards/Tag");
const SendDelegateToArea_1 = require("../deferredActions/SendDelegateToArea");
const Turmoil_1 = require("../turmoil/Turmoil");
const IColonyMetadata_1 = require("../../common/colonies/IColonyMetadata");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const utils_1 = require("../../common/utils/utils");
const MessageBuilder_1 = require("../logs/MessageBuilder");
const PlaceHazardTile_1 = require("../deferredActions/PlaceHazardTile");
const TileType_1 = require("../../../src/common/TileType");
const ErodeSpacesDeferred_1 = require("../underworld/ErodeSpacesDeferred");
const CardName_1 = require("../../common/cards/CardName");
var ShouldIncreaseTrack;
(function (ShouldIncreaseTrack) {
    ShouldIncreaseTrack[ShouldIncreaseTrack["YES"] = 0] = "YES";
    ShouldIncreaseTrack[ShouldIncreaseTrack["NO"] = 1] = "NO";
    ShouldIncreaseTrack[ShouldIncreaseTrack["ASK"] = 2] = "ASK";
})(ShouldIncreaseTrack = exports.ShouldIncreaseTrack || (exports.ShouldIncreaseTrack = {}));
class Colony {
    constructor(metadata) {
        this.isActive = true;
        this.visitor = undefined;
        this.colonies = [];
        this.trackPosition = 1;
        this.metadata = (0, IColonyMetadata_1.colonyMetadata)(metadata);
    }
    get name() {
        return this.metadata.name;
    }
    endGeneration(game) {
        if (this.isActive) {
            this.increaseTrack();
        }
        if (game.syndicatePirateRaider) {
            if (game.syndicatePirateRaider === this.visitor) {
                this.visitor = undefined;
            }
        }
        else {
            this.visitor = undefined;
        }
    }
    increaseTrack(value = 1) {
        this.trackPosition = Math.min(this.trackPosition + value, constants_1.MAX_COLONY_TRACK_POSITION);
    }
    decreaseTrack(value = 1) {
        this.trackPosition = Math.max(this.trackPosition - value, this.colonies.length);
    }
    isFull() {
        return this.colonies.length >= constants_1.MAX_COLONIES_PER_TILE;
    }
    addColony(player, options) {
        player.game.log('${0} built a colony on ${1}', (b) => b.player(player).colony(this));
        this.giveBonus(player, this.metadata.buildType, this.metadata.buildQuantity[this.colonies.length], this.metadata.buildResource);
        if (options?.giveBonusTwice === true) {
            this.giveBonus(player, this.metadata.buildType, this.metadata.buildQuantity[this.colonies.length], this.metadata.buildResource);
        }
        this.colonies.push(player.id);
        if (this.trackPosition < this.colonies.length) {
            this.trackPosition = this.colonies.length;
        }
        for (const cardOwner of player.game.getPlayers()) {
            for (const card of cardOwner.tableau) {
                card.onColonyAdded?.(player, cardOwner);
            }
        }
        if (this.name === ColonyName_1.ColonyName.LEAVITT) {
            for (const card of player.tableau) {
                card.onColonyAddedToLeavitt?.(player);
            }
        }
    }
    trade(player, tradeOptions = {}, bonusTradeOffset = 0) {
        const tradeOffset = player.colonies.tradeOffset + bonusTradeOffset;
        const maxTrackPosition = Math.min(this.trackPosition + tradeOffset, constants_1.MAX_COLONY_TRACK_POSITION);
        const steps = maxTrackPosition - this.trackPosition;
        if (steps === 0 ||
            this.metadata.shouldIncreaseTrack === 'no' ||
            tradeOptions.selfishTrade === true) {
            this.handleTrade(player, tradeOptions);
            return;
        }
        if (this.metadata.shouldIncreaseTrack === 'yes' || (this.metadata.tradeResource !== undefined && this.metadata.tradeResource[this.trackPosition] === this.metadata.tradeResource[maxTrackPosition])) {
            this.increaseTrack(steps);
            LogHelper_1.LogHelper.logColonyTrackIncrease(player, this, steps);
            this.handleTrade(player, tradeOptions);
            return;
        }
        player.game.defer(new IncreaseColonyTrack_1.IncreaseColonyTrack(player, this, steps))
            .andThen(() => this.handleTrade(player, tradeOptions));
    }
    handleTrade(player, options) {
        const resource = Array.isArray(this.metadata.tradeResource) ? this.metadata.tradeResource[this.trackPosition] : this.metadata.tradeResource;
        this.giveBonus(player, this.metadata.tradeType, this.metadata.tradeQuantity[this.trackPosition], resource);
        if (options.giveColonyBonuses !== false) {
            player.game.defer(new GiveColonyBonus_1.GiveColonyBonus(player, this, options.selfishTrade));
        }
        if (options.usesTradeFleet !== false) {
            this.visitor = player.id;
            player.colonies.tradesThisGeneration++;
        }
        if (player.cardIsInEffect(CardName_1.CardName.VENUS_TRADE_HUB)) {
            player.stock.add(Resource_1.Resource.MEGACREDITS, 3, { log: true });
        }
        if (options.decreaseTrackAfterTrade !== false) {
            player.defer(() => {
                this.trackPosition = this.colonies.length;
            }, Priority_1.Priority.DECREASE_COLONY_TRACK_AFTER_TRADE);
        }
    }
    giveColonyBonus(player, isGiveColonyBonus = false) {
        return this.giveBonus(player, this.metadata.colonyBonusType, this.metadata.colonyBonusQuantity, this.metadata.colonyBonusResource, isGiveColonyBonus);
    }
    giveBonus(player, bonusType, quantity, resource, isGiveColonyBonus = false) {
        const game = player.game;
        let action = undefined;
        switch (bonusType) {
            case ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD:
                const cardResource = this.metadata.cardResource;
                action = new AddResourcesToCard_1.AddResourcesToCard(player, cardResource, { count: quantity });
                break;
            case ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_VENUS_CARD:
                action = new AddResourcesToCard_1.AddResourcesToCard(player, undefined, {
                    count: quantity,
                    restrictedTag: Tag_1.Tag.VENUS,
                    title: (0, MessageBuilder_1.message)('Select Venus card to add ${0} resource(s)', (b) => b.number(quantity)),
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.COPY_TRADE:
                const openColonies = game.colonies.filter((colony) => colony.isActive);
                action = new DeferredAction_1.SimpleDeferredAction(player, () => new SelectColony_1.SelectColony('Select colony to gain trade income from', 'Select', openColonies)
                    .andThen((colony) => {
                    game.log('${0} gained ${1} trade bonus', (b) => b.player(player).colony(colony));
                    colony.handleTrade(player, {
                        usesTradeFleet: false,
                        decreaseTrackAfterTrade: false,
                        giveColonyBonuses: false,
                    });
                    return undefined;
                }));
                break;
            case ColonyBenefit_1.ColonyBenefit.DRAW_CARDS:
                action = DrawCards_1.DrawCards.keepAll(player, quantity);
                break;
            case ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_BUY_ONE:
                action = DrawCards_1.DrawCards.keepSome(player, 1, { paying: true, logDrawnCard: true });
                break;
            case ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_DISCARD_ONE:
                player.defer(() => {
                    player.drawCard();
                    player.game.defer(new DiscardCards_1.DiscardCards(player, 1, 1, this.name + ' colony bonus. Select a card to discard'), Priority_1.Priority.SUPERPOWER);
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_KEEP_ONE:
                action = DrawCards_1.DrawCards.keepSome(player, quantity, { keepMax: 1 });
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_CARD_DISCOUNT:
                player.colonies.cardDiscount += 1;
                game.log('Cards played by ${0} cost 1 M€ less this generation', (b) => b.player(player));
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION:
                if (resource === undefined)
                    throw new Error('Resource cannot be undefined');
                player.production.add(resource, quantity, { log: true });
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES:
                if (resource === undefined)
                    throw new Error('Resource cannot be undefined');
                player.stock.add(resource, quantity, { log: true });
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_SCIENCE_TAG:
                player.tags.gainScienceTag(1);
                player.playCard(new ScienceTagCard_1.ScienceTagCard(), undefined, 'nothing');
                game.log('${0} gained 1 Science tag', (b) => b.player(player));
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_SCIENCE_TAGS_AND_CLONE_TAG:
                player.tags.gainScienceTag(2);
                player.playCard(new ScienceTagCard_1.ScienceTagCard(), undefined, 'nothing');
                game.log('${0} gained 2 Science tags', (b) => b.player(player));
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_INFLUENCE:
                Turmoil_1.Turmoil.ifTurmoil(game, (turmoil) => {
                    turmoil.addInfluenceBonus(player);
                    game.log('${0} gained 1 influence', (b) => b.player(player));
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.PLACE_DELEGATES:
                Turmoil_1.Turmoil.ifTurmoil(game, (turmoil) => {
                    const availablePlayerDelegates = turmoil.getAvailableDelegateCount(player);
                    const qty = Math.min(quantity, availablePlayerDelegates);
                    for (let i = 0; i < qty; i++) {
                        game.defer(new SendDelegateToArea_1.SendDelegateToArea(player));
                    }
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.GIVE_MC_PER_DELEGATE:
                Turmoil_1.Turmoil.ifTurmoil(game, (turmoil) => {
                    const partyDelegateCount = (0, utils_1.sum)(turmoil.parties.map((party) => party.delegates.get(player)));
                    player.stock.add(Resource_1.Resource.MEGACREDITS, partyDelegateCount, { log: true });
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.PLACE_HAZARD_TILE:
                const spaces = game.board.getAvailableSpacesOnLand(player)
                    .filter(((space) => space.tile === undefined))
                    .filter((space) => {
                    const adjacentSpaces = game.board.getAdjacentSpaces(space);
                    return adjacentSpaces.filter((space) => space.tile !== undefined).length === 0;
                });
                game.defer(new PlaceHazardTile_1.PlaceHazardTile(player, TileType_1.TileType.EROSION_MILD, { title: 'Select space next to no other tile for hazard', spaces }));
                break;
            case ColonyBenefit_1.ColonyBenefit.ERODE_SPACES_ADJACENT_TO_HAZARDS:
                game.defer(new ErodeSpacesDeferred_1.ErodeSpacesDeferred(player, quantity));
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_MC_PER_HAZARD_TILE:
                player.stock.megacredits += game.board.getHazards().length;
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_TR:
                if (quantity > 0) {
                    player.increaseTerraformRating(quantity, { log: true });
                }
                break;
            case ColonyBenefit_1.ColonyBenefit.GAIN_VP:
                if (quantity > 0) {
                    player.colonies.victoryPoints += quantity;
                    game.log('${0} gained ${1} VP', (b) => b.player(player).number(quantity));
                }
                break;
            case ColonyBenefit_1.ColonyBenefit.INCREASE_VENUS_SCALE:
                game.increaseVenusScaleLevel(player, quantity);
                game.log('${0} increased Venus scale ${1} step(s)', (b) => b.player(player).number(quantity));
                break;
            case ColonyBenefit_1.ColonyBenefit.LOSE_RESOURCES:
                if (resource === undefined) {
                    throw new Error('Resource cannot be undefined');
                }
                player.stock.deduct(resource, Math.min(player.stock.get(resource), quantity), { log: true });
                break;
            case ColonyBenefit_1.ColonyBenefit.OPPONENT_DISCARD:
                if (game.isSoloMode())
                    break;
                action = new DeferredAction_1.SimpleDeferredAction(player, () => {
                    const playersWithCards = game.getPlayers().filter((p) => p.cardsInHand.length > 0);
                    if (playersWithCards.length === 0)
                        return undefined;
                    return new SelectPlayer_1.SelectPlayer(playersWithCards, 'Select player to discard a card', 'Select')
                        .andThen((selectedPlayer) => {
                        game.defer(new DiscardCards_1.DiscardCards(selectedPlayer, 1, 1, this.name + ' colony effect. Select a card to discard'));
                        return undefined;
                    });
                });
                break;
            case ColonyBenefit_1.ColonyBenefit.PLACE_OCEAN_TILE:
                action = new PlaceOceanTile_1.PlaceOceanTile(player);
                break;
            case ColonyBenefit_1.ColonyBenefit.STEAL_RESOURCES:
                if (resource === undefined)
                    throw new Error('Resource cannot be undefined');
                action = new StealResources_1.StealResources(player, resource, quantity);
                break;
            default:
                throw new Error('Unsupported benefit type');
        }
        if (action !== undefined) {
            if (isGiveColonyBonus) {
                return action.execute();
            }
            else {
                game.defer(action);
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    serialize() {
        return {
            name: this.name,
            colonies: this.colonies,
            isActive: this.isActive,
            trackPosition: this.trackPosition,
            visitor: this.visitor,
        };
    }
}
exports.Colony = Colony;
