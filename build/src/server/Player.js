"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const constants = require("../common/constants");
const constants_1 = require("../common/constants");
const createCard_1 = require("./createCard");
const CardName_1 = require("../common/cards/CardName");
const CardType_1 = require("../common/cards/CardType");
const Payment_1 = require("../common/inputs/Payment");
const Spendable_1 = require("../common/inputs/Spendable");
const ICard_1 = require("./cards/ICard");
const OrOptions_1 = require("./inputs/OrOptions");
const PartyHooks_1 = require("./turmoil/parties/PartyHooks");
const PartyName_1 = require("../common/turmoil/PartyName");
const Phase_1 = require("../common/Phase");
const Resource_1 = require("../common/Resource");
const CardResource_1 = require("../common/CardResource");
const SelectCard_1 = require("./inputs/SelectCard");
const SellPatentsStandardProject_1 = require("./cards/base/standardProjects/SellPatentsStandardProject");
const DeferredAction_1 = require("./deferredActions/DeferredAction");
const Priority_1 = require("./deferredActions/Priority");
const SelectPaymentDeferred_1 = require("./deferredActions/SelectPaymentDeferred");
const SelectProjectCardToPlay_1 = require("./inputs/SelectProjectCardToPlay");
const SelectOption_1 = require("./inputs/SelectOption");
const SelectSpace_1 = require("./inputs/SelectSpace");
const SelfReplicatingRobots_1 = require("./cards/promo/SelfReplicatingRobots");
const Tag_1 = require("../common/cards/Tag");
const Timer_1 = require("../common/Timer");
const TurmoilHandler_1 = require("./turmoil/TurmoilHandler");
const GameCards_1 = require("./GameCards");
const DrawCards_1 = require("./deferredActions/DrawCards");
const Units_1 = require("../common/Units");
const MoonExpansion_1 = require("./moon/MoonExpansion");
const ConvertPlants_1 = require("./cards/base/standardActions/ConvertPlants");
const ConvertHeat_1 = require("./cards/base/standardActions/ConvertHeat");
const LogHelper_1 = require("./LogHelper");
const UndoActionOption_1 = require("./inputs/UndoActionOption");
const Turmoil_1 = require("./turmoil/Turmoil");
const PathfindersExpansion_1 = require("./pathfinders/PathfindersExpansion");
const cardSerialization_1 = require("./cards/cardSerialization");
const ColoniesHandler_1 = require("./colonies/ColoniesHandler");
const Tags_1 = require("./player/Tags");
const Colonies_1 = require("./player/Colonies");
const Production_1 = require("./player/Production");
const Stock_1 = require("./player/Stock");
const Merger_1 = require("./cards/promo/Merger");
const BehaviorExecutor_1 = require("./behavior/BehaviorExecutor");
const CeoExtension_1 = require("./CeoExtension");
const ICeoCard_1 = require("./cards/ceos/ICeoCard");
const MessageBuilder_1 = require("./logs/MessageBuilder");
const calculateVictoryPoints_1 = require("./game/calculateVictoryPoints");
const Supercapacitors_1 = require("./cards/promo/Supercapacitors");
const IPlayer_1 = require("./IPlayer");
const utils_1 = require("../common/utils/utils");
const PreludesExpansion_1 = require("./preludes/PreludesExpansion");
const ChooseCards_1 = require("./deferredActions/ChooseCards");
const UnderworldExpansion_1 = require("./underworld/UnderworldExpansion");
const Counter_1 = require("./behavior/Counter");
const Draft_1 = require("./Draft");
const THROW_STATE_ERRORS = Boolean(process.env.THROW_STATE_ERRORS);
class Player {
    get megaCredits() {
        return this.stock.megacredits;
    }
    get steel() {
        return this.stock.steel;
    }
    get titanium() {
        return this.stock.titanium;
    }
    get plants() {
        return this.stock.plants;
    }
    get energy() {
        return this.stock.energy;
    }
    get heat() {
        return this.stock.heat;
    }
    set megaCredits(megacredits) {
        this.stock.megacredits = megacredits;
    }
    set steel(steel) {
        this.stock.steel = steel;
    }
    set titanium(titanium) {
        this.stock.titanium = titanium;
    }
    set plants(plants) {
        this.stock.plants = plants;
    }
    set energy(energy) {
        this.stock.energy = energy;
    }
    set heat(heat) {
        this.stock.heat = heat;
    }
    constructor(name, color, beginner, handicap = 0, id) {
        this.name = name;
        this.color = color;
        this.beginner = beginner;
        this.handicap = handicap;
        this.corporations = [];
        this.terraformRating = 20;
        this.hasIncreasedTerraformRatingThisGeneration = false;
        this.titaniumValue = 3;
        this.steelValue = 2;
        this.canUseHeatAsMegaCredits = false;
        this.canUsePlantsAsMegacredits = false;
        this.canUseTitaniumAsMegacredits = false;
        this.canUseCorruptionAsMegacredits = false;
        this.actionsTakenThisRound = 0;
        this.actionsThisGeneration = new Set();
        this.pendingInitialActions = [];
        this.dealtCorporationCards = [];
        this.dealtPreludeCards = [];
        this.dealtCeoCards = [];
        this.dealtProjectCards = [];
        this.cardsInHand = [];
        this.preludeCardsInHand = [];
        this.ceoCardsInHand = [];
        this.playedCards = [];
        this.draftedCards = [];
        this.draftHand = [];
        this.cardCost = constants.CARD_COST;
        this.timer = Timer_1.Timer.newInstance();
        this.autopass = false;
        this.turmoilPolicyActionUsed = false;
        this.politicalAgendasActionUsedCount = 0;
        this.oceanBonus = constants.OCEAN_BONUS;
        this.scienceTagCount = 0;
        this.hasTurmoilScienceTagBonus = false;
        this.plantsNeededForGreenery = 8;
        this.removingPlayers = [];
        this.removedFromPlayCards = [];
        this.underworldData = UnderworldExpansion_1.UnderworldExpansion.initializePlayer();
        this.availableActionsThisRound = 2;
        this.actionsTakenThisGame = 0;
        this.victoryPointsByGeneration = [];
        this.totalDelegatesPlaced = 0;
        this.id = id;
        this.game = undefined;
        this.tags = new Tags_1.Tags(this);
        this.colonies = new Colonies_1.Colonies(this);
        this.production = new Production_1.Production(this);
        this.stock = new Stock_1.Stock(this);
    }
    static initialize(name, color, beginner, handicap = 0, id) {
        const player = new Player(name, color, beginner, handicap, id);
        return player;
    }
    tearDown() {
        this.game = undefined;
    }
    get tableau() {
        return [...this.corporations, ...this.playedCards];
    }
    isCorporation(corporationName) {
        return this.getCorporation(corporationName) !== undefined;
    }
    getCorporation(corporationName) {
        return this.corporations.find((c) => c.name === corporationName);
    }
    getCorporationOrThrow(corporationName) {
        const corporation = this.getCorporation(corporationName);
        if (corporation === undefined) {
            throw new Error(`player ${this.name} does not have corporation ${corporationName}`);
        }
        return corporation;
    }
    getTitaniumValue() {
        return this.titaniumValue;
    }
    increaseTitaniumValue() {
        this.titaniumValue++;
    }
    decreaseTitaniumValue() {
        if (this.titaniumValue > 0) {
            this.titaniumValue--;
        }
    }
    getSelfReplicatingRobotsTargetCards() {
        const selfReplicatingRobots = this.playedCards.find((card) => card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots);
        if (selfReplicatingRobots instanceof SelfReplicatingRobots_1.SelfReplicatingRobots) {
            return selfReplicatingRobots.targetCards;
        }
        return [];
    }
    getSteelValue() {
        return this.steelValue;
    }
    increaseSteelValue() {
        this.steelValue++;
    }
    decreaseSteelValue() {
        if (this.steelValue > 0) {
            this.steelValue--;
        }
    }
    getTerraformRating() {
        return this.terraformRating;
    }
    increaseTerraformRating(steps = 1, opts = {}) {
        const raiseRating = () => {
            this.terraformRating += steps;
            this.hasIncreasedTerraformRatingThisGeneration = true;
            if (opts.log === true) {
                this.game.log('${0} gained ${1} TR', (b) => b.player(this).number(steps));
            }
            this.game.getPlayersInGenerationOrder().forEach((player) => {
                player.corporations.forEach((corp) => {
                    corp.onIncreaseTerraformRating?.(this, player, steps);
                });
                player.playedCards.filter((card) => card.type === CardType_1.CardType.CEO).forEach((ceo) => {
                    ceo.onIncreaseTerraformRating?.(this, player, steps);
                });
            });
        };
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(this, PartyName_1.PartyName.REDS, 'rp01')) {
            if (!this.canAfford(constants_1.REDS_RULING_POLICY_COST * steps)) {
                return;
            }
            this.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(this, constants_1.REDS_RULING_POLICY_COST * steps, { title: 'Select how to pay for TR increase' }), Priority_1.Priority.COST)
                .andThen(raiseRating);
        }
        else {
            raiseRating();
        }
    }
    decreaseTerraformRating(steps = 1, opts = {}) {
        this.terraformRating -= steps;
        if (opts.log === true) {
            this.game.log('${0} lost ${1} TR', (b) => b.player(this).number(steps));
        }
    }
    setTerraformRating(value) {
        return this.terraformRating = value;
    }
    logUnitDelta(resource, amount, unitType, from, stealing = false) {
        if (amount === 0) {
            return;
        }
        const modifier = amount > 0 ? 'increased' : 'decreased';
        const absAmount = Math.abs(amount);
        let message = '${0}\'s ${1} ' + unitType + ' ${2} by ${3}';
        if (from !== undefined) {
            if (stealing === true) {
                message = message + ' stolen';
            }
            message = message + ' by ${4}';
        }
        this.game.log(message, (b) => {
            b.player(this)
                .string(resource)
                .string(modifier)
                .number(absAmount);
            if ((0, IPlayer_1.isIPlayer)(from)) {
                b.player(from);
            }
            else if (typeof (from) === 'object') {
                b.cardName(from.name);
            }
            else if (typeof (from) === 'string') {
                b.globalEventName(from);
            }
        });
    }
    getActionsThisGeneration() {
        return this.actionsThisGeneration;
    }
    addActionThisGeneration(cardName) {
        this.actionsThisGeneration.add(cardName);
        return;
    }
    getVictoryPoints() {
        return (0, calculateVictoryPoints_1.calculateVictoryPoints)(this);
    }
    cardIsInEffect(cardName) {
        return this.playedCards.some((playedCard) => playedCard.name === cardName);
    }
    hasProtectedHabitats() {
        return this.cardIsInEffect(CardName_1.CardName.PROTECTED_HABITATS);
    }
    plantsAreProtected() {
        return this.hasProtectedHabitats() || this.cardIsInEffect(CardName_1.CardName.ASTEROID_DEFLECTION_SYSTEM);
    }
    alloysAreProtected() {
        return this.cardIsInEffect(CardName_1.CardName.LUNAR_SECURITY_STATIONS);
    }
    canHaveProductionReduced(resource, minQuantity, attacker) {
        const reducable = this.production[resource] + (resource === Resource_1.Resource.MEGACREDITS ? 5 : 0);
        if (reducable < minQuantity)
            return false;
        if (resource === Resource_1.Resource.STEEL || resource === Resource_1.Resource.TITANIUM) {
            if (this.alloysAreProtected())
                return false;
        }
        if (this.game.gameOptions.pathfindersExpansion && this.productionIsProtected(attacker))
            return false;
        return true;
    }
    maybeBlockAttack(perpetrator, cb) {
        this.defer(UnderworldExpansion_1.UnderworldExpansion.maybeBlockAttack(this, perpetrator, cb));
    }
    productionIsProtected(attacker) {
        return attacker !== this && this.cardIsInEffect(CardName_1.CardName.PRIVATE_SECURITY);
    }
    resolveInsurance() {
        const game = this.game;
        if (game.monsInsuranceOwner !== undefined && game.monsInsuranceOwner !== this.id) {
            const monsInsuranceOwner = game.getPlayerById(game.monsInsuranceOwner);
            const monsInsurance = monsInsuranceOwner.getCorporationOrThrow(CardName_1.CardName.MONS_INSURANCE);
            monsInsurance.payDebt(monsInsuranceOwner, this);
        }
    }
    resolveInsuranceInSoloGame() {
        const monsInsurance = this.getCorporation(CardName_1.CardName.MONS_INSURANCE);
        monsInsurance?.payDebt(this, undefined);
    }
    getColoniesCount() {
        if (!this.game.gameOptions.coloniesExtension)
            return 0;
        let coloniesCount = 0;
        this.game.colonies.forEach((colony) => {
            coloniesCount += colony.colonies.filter((owner) => owner === this.id).length;
        });
        return coloniesCount;
    }
    getPlayedEventsCount() {
        let count = this.playedCards.filter((card) => card.type === CardType_1.CardType.EVENT).length;
        if (this.getCorporation(CardName_1.CardName.PHARMACY_UNION)?.isDisabled)
            count++;
        return count;
    }
    getGlobalParameterRequirementBonus(parameter) {
        let requirementsBonus = 0;
        for (const card of this.tableau) {
            requirementsBonus += card.getGlobalParameterRequirementBonus(this, parameter);
        }
        if (PartyHooks_1.PartyHooks.shouldApplyPolicy(this, PartyName_1.PartyName.SCIENTISTS, 'sp02')) {
            requirementsBonus += 2;
        }
        return requirementsBonus;
    }
    removeResourceFrom(card, count = 1, options) {
        const removingPlayer = options?.removingPlayer;
        if (card.resourceCount) {
            const amountRemoved = Math.min(card.resourceCount, count);
            if (amountRemoved === 0)
                return;
            card.resourceCount -= amountRemoved;
            if (removingPlayer !== undefined && removingPlayer !== this)
                this.resolveInsurance();
            if (options?.log ?? true === true) {
                this.game.log('${0} removed ${1} resource(s) from ${2}\'s ${3}', (b) => b.player(options?.removingPlayer ?? this)
                    .number(amountRemoved)
                    .player(this)
                    .card(card));
            }
            if (removingPlayer !== undefined && removingPlayer !== this && this.removingPlayers.includes(removingPlayer.id) === false) {
                this.removingPlayers.push(removingPlayer.id);
            }
        }
    }
    addResourceTo(card, options = 1) {
        const count = typeof (options) === 'number' ? options : (options.qty ?? 1);
        if (card.resourceCount !== undefined) {
            card.resourceCount += count;
        }
        if (typeof (options) !== 'number' && options.log === true) {
            if (options.logZero === true || count !== 0) {
                LogHelper_1.LogHelper.logAddResource(this, card, count);
            }
        }
        if (count > 0) {
            for (const playedCard of this.tableau) {
                playedCard.onResourceAdded?.(this, card, count);
            }
        }
    }
    getCardsWithResources(resource) {
        let result = this.tableau.filter((card) => card.resourceType !== undefined && card.resourceCount && card.resourceCount > 0);
        if (resource !== undefined) {
            result = result.filter((card) => card.resourceType === resource);
        }
        return result;
    }
    getResourceCards(resource) {
        let result = this.tableau.filter((card) => card.resourceType !== undefined);
        if (resource !== undefined) {
            result = result.filter((card) => card.resourceType === resource || card.resourceType === CardResource_1.CardResource.WARE);
        }
        return result;
    }
    getResourceCount(resource) {
        return (0, utils_1.sum)(this.getCardsWithResources(resource).map((card) => card.resourceCount));
    }
    runInput(input, pi) {
        const result = pi.process(input, this);
        this.defer(result, Priority_1.Priority.DEFAULT);
    }
    getAvailableBlueActionCount() {
        return this.getPlayableActionCards().length;
    }
    getPlayableActionCards() {
        const result = [];
        for (const playedCard of this.tableau) {
            if ((0, ICard_1.isIActionCard)(playedCard) && !this.actionsThisGeneration.has(playedCard.name) && !(0, ICeoCard_1.isCeoCard)(playedCard) && playedCard.canAct(this)) {
                result.push(playedCard);
            }
        }
        return result;
    }
    getUsableOPGCeoCards() {
        const result = [];
        for (const playedCard of this.tableau) {
            if ((0, ICeoCard_1.isCeoCard)(playedCard) && playedCard.canAct(this)) {
                result.push(playedCard);
            }
        }
        return result;
    }
    runProductionPhase() {
        this.actionsThisGeneration.clear();
        this.removingPlayers = [];
        this.turmoilPolicyActionUsed = false;
        this.politicalAgendasActionUsedCount = 0;
        if (this.cardIsInEffect(CardName_1.CardName.SUPERCAPACITORS)) {
            Supercapacitors_1.Supercapacitors.onProduction(this);
        }
        else {
            this.heat += this.energy;
            this.energy = 0;
            this.finishProductionPhase();
        }
    }
    finishProductionPhase() {
        this.megaCredits += this.production.megacredits + this.terraformRating;
        this.steel += this.production.steel;
        this.titanium += this.production.titanium;
        this.plants += this.production.plants;
        this.energy += this.production.energy;
        this.heat += this.production.heat;
        this.tableau.forEach((card) => card.onProductionPhase?.(this));
        for (const card of this.playedCards) {
            if ((0, ICeoCard_1.isCeoCard)(card)) {
                card.opgActionIsActive = false;
            }
        }
    }
    doneWorldGovernmentTerraforming() {
        this.game.deferredActions.runAll(() => this.game.doneWorldGovernmentTerraforming());
    }
    worldGovernmentTerraforming() {
        const action = new OrOptions_1.OrOptions();
        action.title = 'Select action for World Government Terraforming';
        action.buttonLabel = 'Confirm';
        const game = this.game;
        if (game.getTemperature() < constants.MAX_TEMPERATURE) {
            action.options.push(new SelectOption_1.SelectOption('Increase temperature', 'Increase').andThen(() => {
                game.increaseTemperature(this, 1);
                game.log('${0} acted as World Government and increased temperature', (b) => b.player(this));
                return undefined;
            }));
        }
        if (game.getOxygenLevel() < constants.MAX_OXYGEN_LEVEL) {
            action.options.push(new SelectOption_1.SelectOption('Increase oxygen', 'Increase').andThen(() => {
                game.increaseOxygenLevel(this, 1);
                game.log('${0} acted as World Government and increased oxygen level', (b) => b.player(this));
                return undefined;
            }));
        }
        if (game.canAddOcean()) {
            action.options.push(new SelectSpace_1.SelectSpace('Add an ocean', game.board.getAvailableSpacesForOcean(this))
                .andThen((space) => {
                game.addOcean(this, space);
                game.log('${0} acted as World Government and placed an ocean', (b) => b.player(this));
                return undefined;
            }));
        }
        if (game.getVenusScaleLevel() < constants.MAX_VENUS_SCALE && game.gameOptions.venusNextExtension) {
            action.options.push(new SelectOption_1.SelectOption('Increase Venus scale', 'Increase').andThen(() => {
                game.increaseVenusScaleLevel(this, 1);
                game.log('${0} acted as World Government and increased Venus scale', (b) => b.player(this));
                return undefined;
            }));
        }
        MoonExpansion_1.MoonExpansion.ifMoon(game, (moonData) => {
            if (moonData.habitatRate < constants.MAXIMUM_HABITAT_RATE) {
                action.options.push(new SelectOption_1.SelectOption('Increase the Moon habitat rate', 'Increase').andThen(() => {
                    MoonExpansion_1.MoonExpansion.raiseHabitatRate(this, 1);
                    return undefined;
                }));
            }
            if (moonData.miningRate < constants.MAXIMUM_MINING_RATE) {
                action.options.push(new SelectOption_1.SelectOption('Increase the Moon mining rate', 'Increase').andThen(() => {
                    MoonExpansion_1.MoonExpansion.raiseMiningRate(this, 1);
                    return undefined;
                }));
            }
            if (moonData.logisticRate < constants.MAXIMUM_LOGISTICS_RATE) {
                action.options.push(new SelectOption_1.SelectOption('Increase the Moon logistics rate', 'Increase').andThen(() => {
                    MoonExpansion_1.MoonExpansion.raiseLogisticRate(this, 1);
                    return undefined;
                }));
            }
        });
        this.setWaitingFor(action, () => {
            this.doneWorldGovernmentTerraforming();
        });
    }
    spendableMegacredits() {
        let total = this.megaCredits;
        if (this.canUseHeatAsMegaCredits)
            total += this.availableHeat();
        if (this.canUseTitaniumAsMegacredits)
            total += this.titanium * (this.titaniumValue - 1);
        return total;
    }
    runResearchPhase() {
        if (!this.game.gameOptions.draftVariant || this.game.isSoloMode()) {
            this.draftedCards = (0, Draft_1.newStandardDraft)(this.game).draw(this);
        }
        let selectable = this.draftedCards.length;
        if (this.isCorporation(CardName_1.CardName.MARS_MATHS) && !this.isCorporation(CardName_1.CardName.LUNA_PROJECT_OFFICE)) {
            selectable--;
        }
        const action = new ChooseCards_1.ChooseCards(this, (0, utils_1.copyAndClear)(this.draftedCards), { paying: true, keepMax: selectable }).execute();
        this.setWaitingFor(action, () => this.game.playerIsFinishedWithResearchPhase(this));
    }
    getCardCost(card) {
        let cost = card.cost;
        cost -= this.colonies.cardDiscount;
        this.tableau.forEach((playedCard) => {
            cost -= playedCard.getCardDiscount?.(this, card) ?? 0;
        });
        this.removedFromPlayCards.forEach((removedFromPlayCard) => {
            if (removedFromPlayCard.getCardDiscount !== undefined) {
                cost -= removedFromPlayCard.getCardDiscount(this, card);
            }
        });
        if (card.tags.includes(Tag_1.Tag.SPACE) && PartyHooks_1.PartyHooks.shouldApplyPolicy(this, PartyName_1.PartyName.UNITY, 'up04')) {
            cost -= 2;
        }
        return Math.max(cost, 0);
    }
    paymentOptionsForCard(card) {
        return {
            heat: this.canUseHeatAsMegaCredits,
            steel: this.lastCardPlayed === CardName_1.CardName.LAST_RESORT_INGENUITY || card.tags.includes(Tag_1.Tag.BUILDING),
            plants: card.tags.includes(Tag_1.Tag.BUILDING) && this.cardIsInEffect(CardName_1.CardName.MARTIAN_LUMBER_CORP),
            titanium: this.lastCardPlayed === CardName_1.CardName.LAST_RESORT_INGENUITY || card.tags.includes(Tag_1.Tag.SPACE),
            lunaTradeFederationTitanium: this.canUseTitaniumAsMegacredits,
            seeds: card.tags.includes(Tag_1.Tag.PLANT) || card.name === CardName_1.CardName.GREENERY_STANDARD_PROJECT,
            floaters: card.tags.includes(Tag_1.Tag.VENUS),
            microbes: card.tags.includes(Tag_1.Tag.PLANT),
            lunaArchivesScience: card.tags.includes(Tag_1.Tag.MOON),
            spireScience: card.type === CardType_1.CardType.STANDARD_PROJECT,
            auroraiData: card.type === CardType_1.CardType.STANDARD_PROJECT,
            graphene: card.tags.includes(Tag_1.Tag.CITY) || card.tags.includes(Tag_1.Tag.SPACE),
            kuiperAsteroids: card.name === CardName_1.CardName.AQUIFER_STANDARD_PROJECT || card.name === CardName_1.CardName.ASTEROID_STANDARD_PROJECT,
            corruption: card.tags.includes(Tag_1.Tag.EARTH) && this.cardIsInEffect(CardName_1.CardName.FRIENDS_IN_HIGH_PLACES),
        };
    }
    checkPaymentAndPlayCard(selectedCard, payment, cardAction = 'add') {
        const cardCost = this.getCardCost(selectedCard);
        const reserved = MoonExpansion_1.MoonExpansion.adjustedReserveCosts(this, selectedCard);
        if (!this.canSpend(payment, reserved)) {
            throw new Error('You do not have that many resources to spend');
        }
        if (payment.floaters > 0) {
            if (selectedCard.name === CardName_1.CardName.STRATOSPHERIC_BIRDS && payment.floaters === this.getSpendable('floaters')) {
                const cardsWithFloater = this.getCardsWithResources(CardResource_1.CardResource.FLOATER);
                if (cardsWithFloater.length === 1) {
                    throw new Error('Cannot spend all floaters to play Stratospheric Birds');
                }
            }
        }
        if (payment.microbes > 0) {
            if (selectedCard.name === CardName_1.CardName.SOIL_ENRICHMENT && payment.microbes === this.getSpendable('microbes')) {
                const cardsWithMicrobe = this.getCardsWithResources(CardResource_1.CardResource.MICROBE);
                if (cardsWithMicrobe.length === 1) {
                    throw new Error('Cannot spend all microbes to play Soil Enrichment');
                }
            }
        }
        const totalToPay = this.payingAmount(payment, this.paymentOptionsForCard(selectedCard));
        if (totalToPay < cardCost) {
            throw new Error('Did not spend enough to pay for card');
        }
        return this.playCard(selectedCard, payment, cardAction);
    }
    resourcesOnCard(name) {
        const card = this.tableau.find((card) => card.name === name);
        return card?.resourceCount ?? 0;
    }
    getSpendable(SpendableResource) {
        return this.resourcesOnCard(Spendable_1.CARD_FOR_SPENDABLE_RESOURCE[SpendableResource]);
    }
    pay(payment) {
        const standardUnits = Units_1.Units.of({
            megacredits: payment.megaCredits,
            steel: payment.steel,
            titanium: payment.titanium,
            plants: payment.plants,
        });
        this.stock.deductUnits(standardUnits);
        if (payment.heat > 0) {
            this.defer(this.spendHeat(payment.heat));
        }
        const removeResourcesOnCard = (name, count) => {
            if (count === 0) {
                return;
            }
            const card = this.tableau.find((card) => card.name === name);
            if (card === undefined) {
                throw new Error('Card ' + name + ' not found');
            }
            this.removeResourceFrom(card, count, { log: true });
        };
        removeResourcesOnCard(CardName_1.CardName.PSYCHROPHILES, payment.microbes);
        removeResourcesOnCard(CardName_1.CardName.DIRIGIBLES, payment.floaters);
        removeResourcesOnCard(CardName_1.CardName.LUNA_ARCHIVES, payment.lunaArchivesScience);
        removeResourcesOnCard(CardName_1.CardName.SPIRE, payment.spireScience);
        removeResourcesOnCard(CardName_1.CardName.CARBON_NANOSYSTEMS, payment.graphene);
        removeResourcesOnCard(CardName_1.CardName.SOYLENT_SEEDLING_SYSTEMS, payment.seeds);
        removeResourcesOnCard(CardName_1.CardName.AURORAI, payment.auroraiData);
        removeResourcesOnCard(CardName_1.CardName.KUIPER_COOPERATIVE, payment.kuiperAsteroids);
        if (payment.corruption > 0) {
            UnderworldExpansion_1.UnderworldExpansion.loseCorruption(this, payment.corruption);
        }
        if (payment.megaCredits > 0 || payment.steel > 0 || payment.titanium > 0) {
            PathfindersExpansion_1.PathfindersExpansion.addToSolBank(this);
        }
    }
    playCard(selectedCard, payment, cardAction = 'add') {
        if (payment !== undefined) {
            this.pay(payment);
        }
        ColoniesHandler_1.ColoniesHandler.onCardPlayed(this.game, selectedCard);
        if (selectedCard.type !== CardType_1.CardType.PROXY) {
            this.lastCardPlayed = selectedCard.name;
            this.game.log('${0} played ${1}', (b) => b.player(this).card(selectedCard));
        }
        const action = selectedCard.play(this);
        this.defer(action, Priority_1.Priority.DEFAULT);
        if (cardAction !== 'discard') {
            const projectCardIndex = this.cardsInHand.findIndex((card) => card.name === selectedCard.name);
            const preludeCardIndex = this.preludeCardsInHand.findIndex((card) => card.name === selectedCard.name);
            if (projectCardIndex !== -1) {
                this.cardsInHand.splice(projectCardIndex, 1);
            }
            else if (preludeCardIndex !== -1) {
                this.preludeCardsInHand.splice(preludeCardIndex, 1);
            }
            const selfReplicatingRobots = this.playedCards.find((card) => card.name === CardName_1.CardName.SELF_REPLICATING_ROBOTS);
            if (selfReplicatingRobots instanceof SelfReplicatingRobots_1.SelfReplicatingRobots) {
                if ((0, utils_1.inplaceRemove)(selfReplicatingRobots.targetCards, selectedCard)) {
                    selectedCard.resourceCount = 0;
                }
            }
        }
        switch (cardAction) {
            case 'add':
                if (selectedCard.name !== CardName_1.CardName.LAW_SUIT && selectedCard.name !== CardName_1.CardName.PRIVATE_INVESTIGATOR) {
                    this.playedCards.push(selectedCard);
                }
                break;
            case 'discard':
                this.discardPlayedCard(selectedCard);
                break;
            case 'nothing':
                break;
            case 'action-only':
                break;
        }
        if (!selectedCard.tags.includes(Tag_1.Tag.CLONE) && cardAction !== 'action-only') {
            this.onCardPlayed(selectedCard);
        }
        return undefined;
    }
    triggerOtherCorpEffects(playedCorporationCard) {
        for (const somePlayer of this.game.getPlayers()) {
            for (const corporation of somePlayer.corporations) {
                if (somePlayer === this && corporation.name === playedCorporationCard.name) {
                    continue;
                }
                if (corporation.onCorpCardPlayed === undefined) {
                    continue;
                }
                this.defer(corporation.onCorpCardPlayed(this, playedCorporationCard, somePlayer));
            }
        }
    }
    onCardPlayed(card) {
        if (card.type === CardType_1.CardType.PROXY) {
            return;
        }
        for (const playedCard of this.playedCards) {
            const actionFromPlayedCard = playedCard.onCardPlayed?.(this, card);
            this.defer(actionFromPlayedCard);
        }
        TurmoilHandler_1.TurmoilHandler.applyOnCardPlayedEffect(this, card);
        for (const somePlayer of this.game.getPlayersInGenerationOrder()) {
            for (const corporationCard of somePlayer.corporations) {
                const actionFromPlayedCard = corporationCard.onCardPlayed?.(this, card);
                this.defer(actionFromPlayedCard);
            }
            for (const someCard of somePlayer.playedCards) {
                const actionFromPlayedCard = someCard.onCardPlayedFromAnyPlayer?.(somePlayer, this, card);
                this.defer(actionFromPlayedCard);
            }
        }
        PathfindersExpansion_1.PathfindersExpansion.onCardPlayed(this, card);
    }
    playActionCard() {
        return new SelectCard_1.SelectCard('Perform an action from a played card', 'Take action', this.getPlayableActionCards(), { selectBlueCardAction: true })
            .andThen(([card]) => {
            this.game.log('${0} used ${1} action', (b) => b.player(this).card(card));
            const action = card.action(this);
            this.defer(action);
            this.actionsThisGeneration.add(card.name);
            return undefined;
        });
    }
    playCeoOPGAction() {
        return new SelectCard_1.SelectCard('Use CEO once per game action', 'Take action', this.getUsableOPGCeoCards(), { selectBlueCardAction: true })
            .andThen(([card]) => {
            this.game.log('${0} used ${1} action', (b) => b.player(this).card(card));
            const action = card.action?.(this);
            this.defer(action);
            this.actionsThisGeneration.add(card.name);
            return undefined;
        });
    }
    playAdditionalCorporationCard(corporationCard) {
        if (this.corporations.length === 0) {
            throw new Error('Cannot add additional corporation when it does not have a starting corporation.');
        }
        return this._playCorporationCard(corporationCard, true);
    }
    playCorporationCard(corporationCard) {
        if (this.corporations.length > 0) {
            throw new Error('Cannot add additional corporation without specifying it explicitly.');
        }
        return this._playCorporationCard(corporationCard, false);
    }
    _playCorporationCard(corporationCard, additionalCorp = false) {
        this.corporations.push(corporationCard);
        if (additionalCorp) {
            this.megaCredits += corporationCard.startingMegaCredits;
            this.cardCost = Merger_1.Merger.setCardCost(this);
        }
        else {
            this.megaCredits = corporationCard.startingMegaCredits;
            if (corporationCard.cardCost !== undefined) {
                this.cardCost = corporationCard.cardCost;
            }
        }
        if (additionalCorp === false && corporationCard.name !== CardName_1.CardName.BEGINNER_CORPORATION) {
            const diff = this.cardsInHand.length * this.cardCost;
            this.stock.deduct(Resource_1.Resource.MEGACREDITS, diff);
        }
        this.game.log('${0} played ${1}', (b) => b.player(this).card(corporationCard));
        const numberOfCardInHand = this.cardsInHand.length;
        corporationCard.play(this);
        if (corporationCard.initialAction !== undefined || corporationCard.firstAction !== undefined) {
            this.pendingInitialActions.push(corporationCard);
        }
        if (additionalCorp === false) {
            this.game.log('${0} kept ${1} project cards', (b) => b.player(this).number(numberOfCardInHand));
        }
        this.triggerOtherCorpEffects(corporationCard);
        ColoniesHandler_1.ColoniesHandler.onCardPlayed(this.game, corporationCard);
        PathfindersExpansion_1.PathfindersExpansion.onCardPlayed(this, corporationCard);
        if (!additionalCorp) {
            this.game.playerIsFinishedWithResearchPhase(this);
        }
    }
    drawCard(count, options) {
        return DrawCards_1.DrawCards.keepAll(this, count, options).execute();
    }
    drawCardKeepSome(count, options) {
        this.game.defer(DrawCards_1.DrawCards.keepSome(this, count, options));
    }
    discardPlayedCard(card) {
        const found = (0, utils_1.inplaceRemove)(this.playedCards, card);
        if (found === false) {
            console.error(`Error: card ${card.name} not in ${this.id}'s hand`);
            return;
        }
        this.game.projectDeck.discard(card);
        card.onDiscard?.(this);
        this.game.log('${0} discarded ${1}', (b) => b.player(this).card(card));
    }
    discardCardFromHand(card, options) {
        const found = (0, utils_1.inplaceRemove)(this.cardsInHand, card);
        if (found === false) {
            console.error(`Error: card ${card.name} not in ${this.id}'s hand`);
            return;
        }
        this.game.projectDeck.discard(card);
        if (options?.log === true) {
            this.game.log('${0} discarded ${1}', (b) => b.player(this).card(card), { reservedFor: this });
        }
    }
    availableHeat() {
        const floaters = this.resourcesOnCard(CardName_1.CardName.STORMCRAFT_INCORPORATED);
        return this.heat + (floaters * 2);
    }
    spendHeat(amount, cb = () => undefined) {
        this.stock.deduct(Resource_1.Resource.HEAT, amount);
        return cb();
    }
    claimableMilestones() {
        if (this.game.allMilestonesClaimed()) {
            return [];
        }
        if ((this.canAfford(this.milestoneCost()) || this.cardIsInEffect(CardName_1.CardName.VANALLEN))) {
            return this.game.milestones
                .filter((milestone) => !this.game.milestoneClaimed(milestone) && milestone.canClaim(this));
        }
        return [];
    }
    claimMilestone(milestone) {
        if (this.game.milestoneClaimed(milestone)) {
            throw new Error(milestone.name + ' is already claimed');
        }
        this.game.claimedMilestones.push({
            player: this,
            milestone: milestone,
        });
        const vanAllen = this.game.getCardPlayerOrUndefined(CardName_1.CardName.VANALLEN);
        if (vanAllen !== undefined) {
            vanAllen.stock.add(Resource_1.Resource.MEGACREDITS, 3, { log: true, from: this });
        }
        if (!this.cardIsInEffect(CardName_1.CardName.VANALLEN)) {
            const cost = this.milestoneCost();
            this.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(this, cost, { title: 'Select how to pay for milestone' }));
        }
        this.game.log('${0} claimed ${1} milestone', (b) => b.player(this).milestone(milestone));
    }
    isStagedProtestsActive() {
        const owner = this.game.getCardPlayerOrUndefined(CardName_1.CardName.STAGED_PROTESTS);
        if (owner === undefined) {
            return false;
        }
        const stagedProtests = owner.playedCards.find((card) => card.name === CardName_1.CardName.STAGED_PROTESTS);
        return stagedProtests?.generationUsed === this.game.generation;
    }
    milestoneCost() {
        if (this.isCorporation(CardName_1.CardName.NIRGAL_ENTERPRISES)) {
            return 0;
        }
        return this.isStagedProtestsActive() ? constants_1.MILESTONE_COST + 8 : constants_1.MILESTONE_COST;
    }
    awardFundingCost() {
        if (this.isCorporation(CardName_1.CardName.NIRGAL_ENTERPRISES)) {
            return 0;
        }
        const plus8 = this.isStagedProtestsActive() ? 8 : 0;
        return this.game.getAwardFundingCost() + plus8;
    }
    fundAward(award) {
        return new SelectOption_1.SelectOption(award.name, 'Fund - ' + '(' + award.name + ')').andThen(() => {
            this.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(this, this.awardFundingCost(), { title: 'Select how to pay for award' }));
            this.game.fundAward(this, award);
            return undefined;
        });
    }
    endTurnOption() {
        return new SelectOption_1.SelectOption('End Turn', 'End').andThen(() => {
            this.actionsTakenThisRound = this.availableActionsThisRound;
            this.game.log('${0} ended turn', (b) => b.player(this));
            return undefined;
        });
    }
    pass() {
        this.game.playerHasPassed(this);
        this.lastCardPlayed = undefined;
        this.autopass = false;
        this.game.log('${0} passed', (b) => b.player(this));
    }
    passOption() {
        return new SelectOption_1.SelectOption('Pass for this generation', 'Pass').andThen(() => {
            this.pass();
            return undefined;
        });
    }
    takeActionForFinalGreenery() {
        const resolveFinalGreeneryDeferredActions = () => {
            this.game.deferredActions.runAll(() => this.takeActionForFinalGreenery());
        };
        if (this.game.deferredActions.length > 0) {
            resolveFinalGreeneryDeferredActions();
            return;
        }
        if (this.game.canPlaceGreenery(this)) {
            const action = new OrOptions_1.OrOptions();
            action.title = 'Place any final greenery from plants';
            action.buttonLabel = 'Confirm';
            action.options.push(new SelectSpace_1.SelectSpace('Select space for greenery tile', this.game.board.getAvailableSpacesForGreenery(this))
                .andThen((space) => {
                this.game.addGreenery(this, space, false);
                this.stock.deduct(Resource_1.Resource.PLANTS, this.plantsNeededForGreenery);
                this.takeActionForFinalGreenery();
                if (this.game.deferredActions.length > 0)
                    resolveFinalGreeneryDeferredActions();
                return undefined;
            }));
            action.options.push(new SelectOption_1.SelectOption('Don\'t place a greenery').andThen(() => {
                this.game.playerIsDoneWithGame(this);
                return undefined;
            }));
            this.setWaitingForSafely(action);
            return;
        }
        if (this.game.deferredActions.length > 0) {
            resolveFinalGreeneryDeferredActions();
        }
        else {
            this.game.playerIsDoneWithGame(this);
        }
    }
    getPlayableCeoCards() {
        return this.ceoCardsInHand.filter((card) => card.canPlay?.(this) === true);
    }
    getPlayableCards() {
        const candidateCards = [...this.cardsInHand];
        const card = this.playedCards.find((card) => card.name === CardName_1.CardName.SELF_REPLICATING_ROBOTS);
        if (card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots) {
            candidateCards.push(...card.targetCards);
        }
        const playableCards = [];
        for (const card of candidateCards) {
            card.warnings.clear();
            const canPlay = this.canPlay(card);
            if (canPlay !== false) {
                playableCards.push({
                    card,
                    details: canPlay,
                });
            }
        }
        return playableCards;
    }
    affordOptionsForCard(card) {
        let trSource = undefined;
        if (card.tr) {
            trSource = card.tr;
        }
        else {
            const computedTr = card.computeTr?.(this);
            if (computedTr !== undefined) {
                trSource = computedTr;
            }
            else if (card.behavior !== undefined) {
                trSource = (0, BehaviorExecutor_1.getBehaviorExecutor)().toTRSource(card.behavior, new Counter_1.Counter(this, card));
            }
        }
        const cost = this.getCardCost(card);
        const paymentOptionsForCard = this.paymentOptionsForCard(card);
        return {
            cost,
            ...paymentOptionsForCard,
            reserveUnits: MoonExpansion_1.MoonExpansion.adjustedReserveCosts(this, card),
            tr: trSource,
        };
    }
    canPlay(card) {
        const options = this.affordOptionsForCard(card);
        const canAfford = this.newCanAfford(options);
        if (!canAfford.canAfford) {
            return false;
        }
        const canPlay = card.canPlay(this, options);
        if (canPlay === false) {
            return false;
        }
        if (canAfford.redsCost > 0) {
            if (typeof canPlay === 'boolean') {
                return { redsCost: canAfford.redsCost };
            }
            else {
                return { ...canPlay, redsCost: canAfford.redsCost };
            }
        }
        return canPlay;
    }
    maxSpendable(reserveUnits = Units_1.Units.EMPTY) {
        return {
            megaCredits: this.megaCredits - reserveUnits.megacredits,
            steel: this.steel - reserveUnits.steel,
            titanium: this.titanium - reserveUnits.titanium,
            plants: this.plants - reserveUnits.plants,
            heat: this.availableHeat() - reserveUnits.heat,
            floaters: this.getSpendable('floaters'),
            microbes: this.getSpendable('microbes'),
            lunaArchivesScience: this.getSpendable('lunaArchivesScience'),
            spireScience: this.getSpendable('spireScience'),
            seeds: this.getSpendable('seeds'),
            auroraiData: this.getSpendable('auroraiData'),
            graphene: this.getSpendable('graphene'),
            kuiperAsteroids: this.getSpendable('kuiperAsteroids'),
            corruption: this.underworldData.corruption,
        };
    }
    canSpend(payment, reserveUnits) {
        const maxPayable = this.maxSpendable(reserveUnits);
        return Spendable_1.SPENDABLE_RESOURCES.every((key) => 0 <= payment[key] && payment[key] <= maxPayable[key]);
    }
    payingAmount(payment, options) {
        const multiplier = {
            ...Payment_1.DEFAULT_PAYMENT_VALUES,
            steel: this.getSteelValue(),
            titanium: this.getTitaniumValue(),
        };
        const usable = {
            megaCredits: true,
            steel: options?.steel ?? false,
            titanium: options?.titanium ?? false,
            heat: this.canUseHeatAsMegaCredits,
            plants: options?.plants ?? false,
            microbes: options?.microbes ?? false,
            floaters: options?.floaters ?? false,
            lunaArchivesScience: options?.lunaArchivesScience ?? false,
            spireScience: options?.spireScience ?? false,
            seeds: options?.seeds ?? false,
            auroraiData: options?.auroraiData ?? false,
            graphene: options?.graphene ?? false,
            kuiperAsteroids: options?.kuiperAsteroids ?? false,
            corruption: options?.corruption ?? false,
        };
        if (usable.titanium === false && payment.titanium > 0 && this.isCorporation(CardName_1.CardName.LUNA_TRADE_FEDERATION)) {
            usable.titanium = true;
            multiplier.titanium -= 1;
        }
        let totalToPay = 0;
        for (const key of Spendable_1.SPENDABLE_RESOURCES) {
            if (usable[key])
                totalToPay += payment[key] * multiplier[key];
        }
        return totalToPay;
    }
    newCanAfford(o) {
        const options = typeof (o) === 'number' ? { cost: o } : { ...o };
        options.heat = this.canUseHeatAsMegaCredits;
        options.lunaTradeFederationTitanium = this.canUseTitaniumAsMegacredits;
        const reserveUnits = options.reserveUnits ?? Units_1.Units.EMPTY;
        if (reserveUnits.heat > 0) {
            const unitsWithoutHeat = { ...reserveUnits, heat: 0 };
            if (!this.stock.has(unitsWithoutHeat)) {
                return Player.CANNOT_AFFORD;
            }
            if (this.availableHeat() < reserveUnits.heat) {
                return Player.CANNOT_AFFORD;
            }
        }
        else {
            if (!this.stock.has(reserveUnits)) {
                return Player.CANNOT_AFFORD;
            }
        }
        const maxPayable = this.maxSpendable(reserveUnits);
        const redsCost = TurmoilHandler_1.TurmoilHandler.computeTerraformRatingBump(this, options.tr) * constants_1.REDS_RULING_POLICY_COST;
        if (redsCost > 0) {
            const usableForRedsCost = this.payingAmount(maxPayable, {});
            if (usableForRedsCost < redsCost) {
                return Player.CANNOT_AFFORD;
            }
        }
        const usable = this.payingAmount(maxPayable, options);
        const canAfford = options.cost + redsCost <= usable;
        return { canAfford, redsCost };
    }
    canAfford(o) {
        return this.newCanAfford(o).canAfford;
    }
    getStandardProjects() {
        const gameOptions = this.game.gameOptions;
        return new GameCards_1.GameCards(gameOptions)
            .getStandardProjects()
            .filter((card) => {
            switch (card.name) {
                case CardName_1.CardName.SELL_PATENTS_STANDARD_PROJECT:
                    return false;
                case CardName_1.CardName.BUFFER_GAS_STANDARD_PROJECT:
                    return this.game.isSoloMode() && gameOptions.soloTR;
                case CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT:
                    return gameOptions.altVenusBoard === false;
                case CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT_VARIANT:
                    return gameOptions.altVenusBoard === true;
                case CardName_1.CardName.MOON_HABITAT_STANDARD_PROJECT_V2:
                case CardName_1.CardName.MOON_MINE_STANDARD_PROJECT_V2:
                case CardName_1.CardName.MOON_ROAD_STANDARD_PROJECT_V2:
                    return gameOptions.moonStandardProjectVariant === true;
                case CardName_1.CardName.EXCAVATE_STANDARD_PROJECT:
                    return gameOptions.underworldExpansion === true;
                case CardName_1.CardName.COLLUSION_STANDARD_PROJECT:
                    return gameOptions.underworldExpansion === true && gameOptions.turmoilExtension === true;
                default:
                    return true;
            }
        })
            .sort((a, b) => a.cost - b.cost);
    }
    getStandardProjectOption() {
        const standardProjects = this.getStandardProjects();
        return new SelectCard_1.SelectCard('Standard projects', 'Confirm', standardProjects, { enabled: standardProjects.map((card) => card.canAct(this)) })
            .andThen(([card]) => card.action(this));
    }
    headStartIsInEffect() {
        if (this.game.phase === Phase_1.Phase.PRELUDES && this.cardIsInEffect(CardName_1.CardName.HEAD_START)) {
            if (this.actionsTakenThisRound < 2) {
                return true;
            }
        }
        return false;
    }
    takeAction(saveBeforeTakingAction = true) {
        const game = this.game;
        if (game.deferredActions.length > 0) {
            game.deferredActions.runAll(() => this.takeAction());
            return;
        }
        if (this.actionsTakenThisRound === 0 || game.gameOptions.undoOption)
            game.save();
        if (this.autopass) {
            this.passOption().cb();
        }
        const headStartIsInEffect = this.headStartIsInEffect();
        if (!headStartIsInEffect) {
            if (this.preludeCardsInHand.length > 0) {
                game.phase = Phase_1.Phase.PRELUDES;
                const selectPrelude = PreludesExpansion_1.PreludesExpansion.playPrelude(this, this.preludeCardsInHand);
                this.setWaitingFor(selectPrelude, () => {
                    if (this.preludeCardsInHand.length === 0 && !this.headStartIsInEffect()) {
                        game.playerIsFinishedTakingActions();
                        return;
                    }
                    this.takeAction();
                });
                return;
            }
            if (this.ceoCardsInHand.length > 0) {
                game.phase = Phase_1.Phase.CEOS;
                const playableCeoCards = this.getPlayableCeoCards();
                for (let i = playableCeoCards.length - 1; i >= 0; i--) {
                    const card = this.ceoCardsInHand[i];
                    this.playCard(card);
                }
                this.ceoCardsInHand = [];
                this.takeAction();
            }
            else {
                game.phase = Phase_1.Phase.ACTION;
            }
            if (game.hasPassedThisActionPhase(this) || (this.allOtherPlayersHavePassed() === false && this.actionsTakenThisRound >= this.availableActionsThisRound)) {
                this.actionsTakenThisRound = 0;
                this.availableActionsThisRound = 2;
                game.resettable = true;
                game.playerIsFinishedTakingActions();
                return;
            }
        }
        const vitor = this.getCorporation(CardName_1.CardName.VITOR);
        if (vitor !== undefined && this.game.allAwardsFunded()) {
            this.pendingInitialActions = this.pendingInitialActions.filter((card) => card !== vitor);
        }
        if (this.pendingInitialActions.length > 0) {
            const orOptions = new OrOptions_1.OrOptions();
            this.pendingInitialActions.forEach((corp) => {
                const option = new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Take first action of ${0} corporation', (b) => b.card(corp)), corp.initialActionText)
                    .andThen(() => {
                    game.log('${0} took the first action of ${1} corporation', (b) => b.player(this).card(corp)),
                        this.deferInitialAction(corp);
                    this.pendingInitialActions.splice(this.pendingInitialActions.indexOf(corp), 1);
                    return undefined;
                });
                orOptions.options.push(option);
            });
            if (!headStartIsInEffect) {
                orOptions.options.push(this.passOption());
            }
            this.setWaitingFor(orOptions, () => {
                this.actionsTakenThisRound++;
                this.actionsTakenThisGame++;
                this.timer.rebate(constants.BONUS_SECONDS_PER_ACTION * 1000);
                this.takeAction();
            });
            return;
        }
        this.setWaitingFor(this.getActions(), () => {
            this.incrementActionsTaken();
            this.takeAction();
        });
    }
    deferInitialAction(corp) {
        this.defer(() => {
            if (corp.initialAction) {
                return corp.initialAction(this);
            }
            else if (corp.firstAction !== undefined) {
                (0, BehaviorExecutor_1.getBehaviorExecutor)().execute(corp.firstAction, this, corp);
            }
            return undefined;
        });
    }
    incrementActionsTaken() {
        this.actionsTakenThisRound++;
        this.actionsTakenThisGame++;
    }
    getActions() {
        const action = new OrOptions_1.OrOptions();
        action.title = this.actionsTakenThisRound === 0 ?
            'Take your first action' : 'Take your next action';
        action.buttonLabel = 'Take action';
        const claimableMilestones = this.claimableMilestones();
        if (claimableMilestones.length > 0) {
            const milestoneOption = new OrOptions_1.OrOptions();
            milestoneOption.title = 'Claim a milestone';
            milestoneOption.options = claimableMilestones.map((milestone) => new SelectOption_1.SelectOption(milestone.name, 'Claim - ' + '(' + milestone.name + ')').andThen(() => {
                this.claimMilestone(milestone);
                return undefined;
            }));
            action.options.push(milestoneOption);
        }
        const convertPlants = new ConvertPlants_1.ConvertPlants();
        if (convertPlants.canAct(this)) {
            action.options.push(convertPlants.action(this));
        }
        const convertHeat = new ConvertHeat_1.ConvertHeat();
        if (convertHeat.canAct(this)) {
            const option = new SelectOption_1.SelectOption('Convert 8 heat into temperature', 'Convert heat').andThen(() => {
                return convertHeat.action(this);
            });
            if (convertHeat.warnings.size > 0) {
                option.warnings = Array.from(convertHeat.warnings);
                if (convertHeat.warnings.has('maxtemp')) {
                    option.eligibleForDefault = false;
                }
            }
            action.options.push(option);
        }
        const turmoilInput = TurmoilHandler_1.TurmoilHandler.partyAction(this);
        if (turmoilInput !== undefined) {
            action.options.push(turmoilInput);
        }
        if (this.getPlayableActionCards().length > 0) {
            action.options.push(this.playActionCard());
        }
        if (CeoExtension_1.CeoExtension.ceoActionIsUsable(this)) {
            action.options.push(this.playCeoOPGAction());
        }
        const playableCards = this.getPlayableCards();
        if (playableCards.length !== 0) {
            action.options.push(new SelectProjectCardToPlay_1.SelectProjectCardToPlay(this, playableCards));
        }
        const coloniesTradeAction = this.colonies.coloniesTradeAction();
        if (coloniesTradeAction !== undefined) {
            action.options.push(coloniesTradeAction);
        }
        Turmoil_1.Turmoil.ifTurmoil(this.game, (turmoil) => {
            const input = turmoil.getSendDelegateInput(this);
            if (input !== undefined) {
                action.options.push(input);
            }
        });
        if (this.game.getPlayers().length > 1 &&
            this.actionsTakenThisRound > 0 &&
            !this.game.gameOptions.fastModeOption &&
            this.allOtherPlayersHavePassed() === false) {
            action.options.push(this.endTurnOption());
        }
        const fundingCost = this.awardFundingCost();
        if (this.canAfford(fundingCost) && !this.game.allAwardsFunded()) {
            const remainingAwards = new OrOptions_1.OrOptions();
            remainingAwards.title = (0, MessageBuilder_1.message)('Fund an award (${0} M€)', (b) => b.number(fundingCost)),
                remainingAwards.buttonLabel = 'Confirm';
            remainingAwards.options = this.game.awards
                .filter((award) => this.game.hasBeenFunded(award) === false)
                .map((award) => this.fundAward(award));
            action.options.push(remainingAwards);
        }
        action.options.push(this.getStandardProjectOption());
        action.options.push(this.passOption());
        const sellPatents = new SellPatentsStandardProject_1.SellPatentsStandardProject();
        if (sellPatents.canAct(this)) {
            action.options.push(sellPatents.action(this));
        }
        if (this.actionsTakenThisRound > 0 && this.game.gameOptions.undoOption) {
            action.options.push(new UndoActionOption_1.UndoActionOption());
        }
        return action;
    }
    allOtherPlayersHavePassed() {
        const game = this.game;
        if (game.isSoloMode())
            return true;
        const players = game.getPlayers();
        const passedPlayers = game.getPassedPlayers();
        return passedPlayers.length === players.length - 1 && passedPlayers.includes(this.color) === false;
    }
    process(input) {
        if (this.waitingFor === undefined || this.waitingForCb === undefined) {
            throw new Error('Not waiting for anything');
        }
        const waitingFor = this.waitingFor;
        const waitingForCb = this.waitingForCb;
        this.waitingFor = undefined;
        this.waitingForCb = undefined;
        try {
            this.timer.stop();
            this.runInput(input, waitingFor);
            waitingForCb();
        }
        catch (err) {
            this.setWaitingFor(waitingFor, waitingForCb);
            throw err;
        }
    }
    getWaitingFor() {
        return this.waitingFor;
    }
    setWaitingFor(input, cb = () => { }) {
        if (this.waitingFor !== undefined) {
            const message = `Overwriting waitingFor ${this.waitingFor.type} with ${input?.type}`;
            if (THROW_STATE_ERRORS) {
                throw new Error(message);
            }
            else {
                console.warn(message);
            }
        }
        this.timer.start();
        this.waitingFor = input;
        this.waitingForCb = cb;
        this.game.inputsThisRound++;
    }
    setWaitingForSafely(input, cb = () => { }) {
        if (this.waitingFor === undefined) {
            this.setWaitingFor(input, cb);
        }
        else {
            const oldcb = this.waitingForCb;
            this.waitingForCb =
                oldcb === undefined ?
                    cb :
                    () => {
                        oldcb();
                        this.setWaitingForSafely(input, cb);
                    };
        }
    }
    serialize() {
        const result = {
            id: this.id,
            corporations: this.corporations.map((corporation) => {
                const serialized = {
                    name: corporation.name,
                    resourceCount: corporation.resourceCount,
                    isDisabled: false,
                };
                corporation.serialize?.(serialized);
                return serialized;
            }),
            pickedCorporationCard: this.pickedCorporationCard?.name,
            terraformRating: this.terraformRating,
            hasIncreasedTerraformRatingThisGeneration: this.hasIncreasedTerraformRatingThisGeneration,
            megaCredits: this.megaCredits,
            megaCreditProduction: this.production.megacredits,
            steel: this.steel,
            steelProduction: this.production.steel,
            titanium: this.titanium,
            titaniumProduction: this.production.titanium,
            plants: this.plants,
            plantProduction: this.production.plants,
            energy: this.energy,
            energyProduction: this.production.energy,
            heat: this.heat,
            heatProduction: this.production.heat,
            titaniumValue: this.titaniumValue,
            steelValue: this.steelValue,
            canUseHeatAsMegaCredits: this.canUseHeatAsMegaCredits,
            canUsePlantsAsMegaCredits: this.canUsePlantsAsMegacredits,
            canUseTitaniumAsMegacredits: this.canUseTitaniumAsMegacredits,
            canUseCorruptionAsMegacredits: this.canUseCorruptionAsMegacredits,
            actionsTakenThisRound: this.actionsTakenThisRound,
            actionsThisGeneration: Array.from(this.actionsThisGeneration),
            pendingInitialActions: this.pendingInitialActions.map((c) => c.name),
            dealtCorporationCards: this.dealtCorporationCards.map((c) => c.name),
            dealtPreludeCards: this.dealtPreludeCards.map((c) => c.name),
            dealtCeoCards: this.dealtCeoCards.map((c) => c.name),
            dealtProjectCards: this.dealtProjectCards.map((c) => c.name),
            cardsInHand: this.cardsInHand.map((c) => c.name),
            preludeCardsInHand: this.preludeCardsInHand.map((c) => c.name),
            ceoCardsInHand: this.ceoCardsInHand.map((c) => c.name),
            playedCards: this.playedCards.map(cardSerialization_1.serializeProjectCard),
            draftedCards: this.draftedCards.map((c) => c.name),
            cardCost: this.cardCost,
            needsToDraft: this.needsToDraft,
            cardDiscount: this.colonies.cardDiscount,
            fleetSize: this.colonies.getFleetSize(),
            tradesThisGeneration: this.colonies.tradesThisGeneration,
            colonyTradeOffset: this.colonies.tradeOffset,
            colonyTradeDiscount: this.colonies.tradeDiscount,
            colonyVictoryPoints: this.colonies.victoryPoints,
            turmoilPolicyActionUsed: this.turmoilPolicyActionUsed,
            politicalAgendasActionUsedCount: this.politicalAgendasActionUsedCount,
            hasTurmoilScienceTagBonus: this.hasTurmoilScienceTagBonus,
            oceanBonus: this.oceanBonus,
            scienceTagCount: this.scienceTagCount,
            plantsNeededForGreenery: this.plantsNeededForGreenery,
            removingPlayers: this.removingPlayers,
            removedFromPlayCards: this.removedFromPlayCards.map((c) => c.name),
            name: this.name,
            color: this.color,
            beginner: this.beginner,
            handicap: this.handicap,
            timer: this.timer.serialize(),
            actionsTakenThisGame: this.actionsTakenThisGame,
            victoryPointsByGeneration: this.victoryPointsByGeneration,
            totalDelegatesPlaced: this.totalDelegatesPlaced,
            underworldData: this.underworldData,
            draftHand: this.draftHand.map((c) => c.name),
            autoPass: this.autopass,
        };
        if (this.lastCardPlayed !== undefined) {
            result.lastCardPlayed = this.lastCardPlayed;
        }
        return result;
    }
    static deserialize(d) {
        const player = new Player(d.name, d.color, d.beginner, Number(d.handicap), d.id);
        player.actionsTakenThisGame = d.actionsTakenThisGame;
        player.actionsTakenThisRound = d.actionsTakenThisRound;
        player.canUseHeatAsMegaCredits = d.canUseHeatAsMegaCredits;
        player.canUsePlantsAsMegacredits = d.canUsePlantsAsMegaCredits;
        player.canUseTitaniumAsMegacredits = d.canUseTitaniumAsMegacredits;
        player.canUseCorruptionAsMegacredits = d.canUseCorruptionAsMegacredits;
        player.cardCost = d.cardCost;
        player.colonies.cardDiscount = d.cardDiscount;
        player.colonies.tradeDiscount = d.colonyTradeDiscount;
        player.colonies.tradeOffset = d.colonyTradeOffset;
        player.colonies.setFleetSize(d.fleetSize);
        player.colonies.victoryPoints = d.colonyVictoryPoints;
        player.victoryPointsByGeneration = d.victoryPointsByGeneration;
        player.energy = d.energy;
        player.hasIncreasedTerraformRatingThisGeneration = d.hasIncreasedTerraformRatingThisGeneration;
        player.hasTurmoilScienceTagBonus = d.hasTurmoilScienceTagBonus;
        player.heat = d.heat;
        player.megaCredits = d.megaCredits;
        player.needsToDraft = d.needsToDraft;
        player.oceanBonus = d.oceanBonus;
        player.plants = d.plants;
        player.plantsNeededForGreenery = d.plantsNeededForGreenery;
        player.production.override(Units_1.Units.of({
            energy: d.energyProduction,
            heat: d.heatProduction,
            megacredits: d.megaCreditProduction,
            plants: d.plantProduction,
            steel: d.steelProduction,
            titanium: d.titaniumProduction,
        }));
        player.removingPlayers = d.removingPlayers;
        player.scienceTagCount = d.scienceTagCount;
        player.steel = d.steel;
        player.steelValue = d.steelValue;
        player.terraformRating = d.terraformRating;
        player.titanium = d.titanium;
        player.titaniumValue = d.titaniumValue;
        player.totalDelegatesPlaced = d.totalDelegatesPlaced;
        player.colonies.tradesThisGeneration = d.tradesThisGeneration;
        player.turmoilPolicyActionUsed = d.turmoilPolicyActionUsed;
        player.politicalAgendasActionUsedCount = d.politicalAgendasActionUsedCount;
        player.lastCardPlayed = d.lastCardPlayed;
        player.removedFromPlayCards = (0, createCard_1.cardsFromJSON)(d.removedFromPlayCards);
        player.actionsThisGeneration = new Set(d.actionsThisGeneration);
        if (d.pickedCorporationCard !== undefined) {
            player.pickedCorporationCard = (0, createCard_1.newCorporationCard)(d.pickedCorporationCard);
        }
        const corporations = d.corporations;
        if (corporations !== undefined) {
            for (const corporation of corporations) {
                const card = (0, createCard_1.newCorporationCard)(corporation.name);
                if (card === undefined) {
                    continue;
                }
                if (corporation.resourceCount !== undefined) {
                    card.resourceCount = corporation.resourceCount;
                }
                card.deserialize?.(corporation);
                player.corporations.push(card);
            }
        }
        player.pendingInitialActions = (0, createCard_1.corporationCardsFromJSON)(d.pendingInitialActions ?? []);
        player.dealtCorporationCards = (0, createCard_1.corporationCardsFromJSON)(d.dealtCorporationCards);
        player.dealtPreludeCards = (0, createCard_1.cardsFromJSON)(d.dealtPreludeCards);
        player.dealtCeoCards = (0, createCard_1.ceosFromJSON)(d.dealtCeoCards);
        player.dealtProjectCards = (0, createCard_1.cardsFromJSON)(d.dealtProjectCards);
        player.cardsInHand = (0, createCard_1.cardsFromJSON)(d.cardsInHand);
        player.preludeCardsInHand = (0, createCard_1.cardsFromJSON)(d.preludeCardsInHand);
        player.ceoCardsInHand = (0, createCard_1.ceosFromJSON)(d.ceoCardsInHand);
        player.playedCards = d.playedCards.map((element) => (0, cardSerialization_1.deserializeProjectCard)(element));
        player.draftedCards = (0, createCard_1.cardsFromJSON)(d.draftedCards);
        player.autopass = d.autoPass ?? false;
        player.timer = Timer_1.Timer.deserialize(d.timer);
        if (d.underworldData !== undefined) {
            player.underworldData = d.underworldData;
        }
        player.draftHand = (0, createCard_1.cardsFromJSON)(d.draftHand);
        return player;
    }
    getOpponents() {
        return this.game.getPlayers().filter((p) => p !== this);
    }
    defer(input, priority = Priority_1.Priority.DEFAULT) {
        if (input === undefined) {
            return;
        }
        const cb = typeof (input) === 'function' ? input : () => input;
        const action = new DeferredAction_1.SimpleDeferredAction(this, cb, priority);
        this.game.defer(action);
    }
}
exports.Player = Player;
Player.CANNOT_AFFORD = { canAfford: false, redsCost: 0 };
