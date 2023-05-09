"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const constants = require("../common/constants");
const BeginnerCorporation_1 = require("./cards/corporation/BeginnerCorporation");
const Board_1 = require("./boards/Board");
const BoardName_1 = require("../common/boards/BoardName");
const CardFinder_1 = require("./CardFinder");
const CardName_1 = require("../common/cards/CardName");
const ClaimedMilestone_1 = require("./milestones/ClaimedMilestone");
const ColonyDealer_1 = require("./colonies/ColonyDealer");
const Color_1 = require("../common/Color");
const Database_1 = require("./database/Database");
const FundedAward_1 = require("./awards/FundedAward");
const LogBuilder_1 = require("./logs/LogBuilder");
const LogHelper_1 = require("./LogHelper");
const Milestones_1 = require("./milestones/Milestones");
const Awards_1 = require("./awards/Awards");
const PartyHooks_1 = require("./turmoil/parties/PartyHooks");
const Phase_1 = require("../common/Phase");
const Player_1 = require("./Player");
const CardResource_1 = require("../common/CardResource");
const Resource_1 = require("../common/Resource");
const DeferredAction_1 = require("./deferredActions/DeferredAction");
const DeferredActionsQueue_1 = require("./deferredActions/DeferredActionsQueue");
const SelectPaymentDeferred_1 = require("./deferredActions/SelectPaymentDeferred");
const SelectInitialCards_1 = require("./inputs/SelectInitialCards");
const PlaceOceanTile_1 = require("./deferredActions/PlaceOceanTile");
const RemoveColonyFromGame_1 = require("./deferredActions/RemoveColonyFromGame");
const GainResources_1 = require("./deferredActions/GainResources");
const SpaceBonus_1 = require("../common/boards/SpaceBonus");
const SpaceName_1 = require("./SpaceName");
const SpaceType_1 = require("../common/boards/SpaceType");
const TileType_1 = require("../common/TileType");
const Turmoil_1 = require("./turmoil/Turmoil");
const RandomMAOptionType_1 = require("../common/ma/RandomMAOptionType");
const AresHandler_1 = require("./ares/AresHandler");
const GameSetup_1 = require("./GameSetup");
const GameCards_1 = require("./GameCards");
const GlobalParameter_1 = require("../common/GlobalParameter");
const AresSetup_1 = require("./ares/AresSetup");
const IMoonData_1 = require("./moon/IMoonData");
const MoonExpansion_1 = require("./moon/MoonExpansion");
const TurmoilHandler_1 = require("./turmoil/TurmoilHandler");
const Random_1 = require("./Random");
const MilestoneAwardSelector_1 = require("./ma/MilestoneAwardSelector");
const BoardType_1 = require("./boards/BoardType");
const mnemonist_1 = require("mnemonist");
const GrantVenusAltTrackBonusDeferred_1 = require("./venusNext/GrantVenusAltTrackBonusDeferred");
const PathfindersExpansion_1 = require("./pathfinders/PathfindersExpansion");
const PathfindersData_1 = require("./pathfinders/PathfindersData");
const AddResourcesToCard_1 = require("./deferredActions/AddResourcesToCard");
const ColonyDeserializer_1 = require("./colonies/ColonyDeserializer");
const GameLoader_1 = require("./database/GameLoader");
const GameOptions_1 = require("./GameOptions");
const TheNewSpaceRace_1 = require("./cards/pathfinders/TheNewSpaceRace");
const Deck_1 = require("./cards/Deck");
const utils_1 = require("./database/utils");
const Tag_1 = require("../common/cards/Tag");
class Game {
    constructor(id, players, first, activePlayer, gameOptions, rng, board, projectDeck, corporationDeck, preludeDeck, ceoDeck) {
        this.id = id;
        this.players = players;
        this.gameOptions = gameOptions;
        this.lastSaveId = 0;
        this.deferredActions = new DeferredActionsQueue_1.DeferredActionsQueue();
        this.createdTime = new Date(0);
        this.gameAge = 0;
        this.gameLog = [];
        this.undoCount = 0;
        this.inputsThisRound = 0;
        this.resettable = false;
        this.generation = 1;
        this.phase = Phase_1.Phase.RESEARCH;
        this.oxygenLevel = constants.MIN_OXYGEN_LEVEL;
        this.temperature = constants.MIN_TEMPERATURE;
        this.venusScaleLevel = constants.MIN_VENUS_SCALE;
        this.donePlayers = new Set();
        this.passedPlayers = new Set();
        this.researchedPlayers = new Set();
        this.draftedPlayers = new Set();
        this.draftRound = 1;
        this.initialDraftIteration = 1;
        this.unDraftedCards = new Map();
        this.corporationsDraftDirection = 'before';
        this.corporationsToDraft = [];
        this.claimedMilestones = [];
        this.milestones = [];
        this.fundedAwards = [];
        this.awards = [];
        this.colonies = [];
        this.discardedColonies = [];
        this.someoneHasRemovedOtherPlayersPlants = false;
        const playerIds = players.map((p) => p.id);
        if (playerIds.includes(first.id) === false) {
            throw new Error('Cannot find first player ' + first.id + ' in ' + playerIds);
        }
        if (playerIds.includes(activePlayer) === false) {
            throw new Error('Cannot find active player ' + activePlayer + ' in ' + playerIds);
        }
        if (new Set(playerIds).size !== players.length) {
            throw new Error('Duplicate player found: ' + playerIds);
        }
        const colors = players.map((p) => p.color);
        if (new Set(colors).size !== players.length) {
            throw new Error('Duplicate color found: ' + colors);
        }
        this.activePlayer = activePlayer;
        this.first = first;
        this.rng = rng;
        this.projectDeck = projectDeck;
        this.corporationDeck = corporationDeck;
        this.preludeDeck = preludeDeck;
        this.ceoDeck = ceoDeck;
        this.board = board;
        this.players.forEach((player) => {
            player.game = this;
            if (player.isCorporation(CardName_1.CardName.MONS_INSURANCE))
                this.monsInsuranceOwner = player.id;
        });
        this.tags = Tag_1.ALL_TAGS.filter((tag) => {
            if (tag === Tag_1.Tag.VENUS)
                return gameOptions.venusNextExtension;
            if (tag === Tag_1.Tag.MOON)
                return gameOptions.moonExpansion;
            if (tag === Tag_1.Tag.MARS)
                return gameOptions.pathfindersExpansion;
            if (tag === Tag_1.Tag.CLONE)
                return gameOptions.pathfindersExpansion;
            return true;
        });
    }
    static newInstance(id, players, firstPlayer, gameOptions = Object.assign({}, GameOptions_1.DEFAULT_GAME_OPTIONS), seed = 0, spectatorId = undefined) {
        if (gameOptions.clonedGamedId !== undefined) {
            throw new Error('Cloning should not come through this execution path.');
        }
        const rng = new Random_1.SeededRandom(seed);
        const board = GameSetup_1.GameSetup.newBoard(gameOptions, rng);
        const gameCards = new GameCards_1.GameCards(gameOptions);
        const projectDeck = new Deck_1.ProjectDeck(gameCards.getProjectCards(), [], rng);
        projectDeck.shuffle();
        const corporationDeck = new Deck_1.CorporationDeck(gameCards.getCorporationCards(), [], rng);
        corporationDeck.shuffle(gameOptions.customCorporationsList);
        const preludeDeck = new Deck_1.PreludeDeck(gameCards.getPreludeCards(), [], rng);
        preludeDeck.shuffle(gameOptions.customPreludes);
        const ceoDeck = new Deck_1.CeoDeck(gameCards.getCeoCards(), [], rng);
        ceoDeck.shuffle(gameOptions.customCeos);
        const activePlayer = firstPlayer.id;
        if (players.length === 1) {
            gameOptions.draftVariant = false;
            gameOptions.initialDraftVariant = false;
            gameOptions.corporationsDraft = false;
            gameOptions.randomMA = RandomMAOptionType_1.RandomMAOptionType.NONE;
            players[0].setTerraformRating(14);
            players[0].terraformRatingAtGenerationStart = 14;
        }
        const game = new Game(id, players, firstPlayer, activePlayer, gameOptions, rng, board, projectDeck, corporationDeck, preludeDeck, ceoDeck);
        game.spectatorId = spectatorId;
        game.createdTime = new Date();
        if (gameOptions.aresExtension) {
            game.aresData = AresSetup_1.AresSetup.initialData(gameOptions.aresHazards, players);
        }
        const milestonesAwards = (0, MilestoneAwardSelector_1.chooseMilestonesAndAwards)(gameOptions);
        game.milestones = milestonesAwards.milestones;
        game.awards = milestonesAwards.awards;
        if (gameOptions.coloniesExtension) {
            const colonyDealer = new ColonyDealer_1.ColonyDealer(rng, gameOptions);
            colonyDealer.drawColonies(players.length);
            game.colonies = colonyDealer.colonies;
            game.discardedColonies = colonyDealer.discardedColonies;
        }
        if (gameOptions.turmoilExtension) {
            game.turmoil = Turmoil_1.Turmoil.newInstance(game, gameOptions.politicalAgendasExtension);
        }
        if (players.length === 1) {
            GameSetup_1.GameSetup.setupNeutralPlayer(game);
        }
        if (gameOptions.aresExtension && gameOptions.aresHazards) {
            AresSetup_1.AresSetup.setupHazards(game, players.length);
        }
        if (gameOptions.moonExpansion) {
            game.moonData = MoonExpansion_1.MoonExpansion.initialize();
        }
        if (gameOptions.pathfindersExpansion) {
            game.pathfindersData = PathfindersExpansion_1.PathfindersExpansion.initialize(gameOptions);
        }
        const minCorpsRequired = players.length * gameOptions.startingCorporations;
        if (minCorpsRequired > corporationDeck.drawPile.length) {
            gameOptions.startingCorporations = 2;
        }
        for (const player of game.getPlayersInGenerationOrder()) {
            player.setTerraformRating(player.getTerraformRating() + player.handicap);
            if (!gameOptions.corporateEra) {
                player.production.override({
                    megacredits: 1,
                    steel: 1,
                    titanium: 1,
                    plants: 1,
                    energy: 1,
                    heat: 1,
                });
            }
            if (!player.beginner ||
                gameOptions.ceoExtension ||
                gameOptions.preludeExtension ||
                gameOptions.venusNextExtension ||
                gameOptions.coloniesExtension ||
                gameOptions.turmoilExtension ||
                gameOptions.initialDraftVariant ||
                gameOptions.ceoExtension) {
                if (gameOptions.corporationsDraft === false) {
                    for (let i = 0; i < gameOptions.startingCorporations; i++) {
                        player.dealtCorporationCards.push(corporationDeck.draw(game));
                    }
                }
                if (gameOptions.initialDraftVariant === false) {
                    for (let i = 0; i < 10; i++) {
                        player.dealtProjectCards.push(projectDeck.draw(game));
                    }
                }
                if (gameOptions.preludeExtension) {
                    for (let i = 0; i < constants.PRELUDE_CARDS_DEALT_PER_PLAYER; i++) {
                        const prelude = preludeDeck.draw(game);
                        player.dealtPreludeCards.push(prelude);
                    }
                }
                if (gameOptions.ceoExtension) {
                    for (let i = 0; i < gameOptions.startingCeos; i++) {
                        const ceoCard = ceoDeck.draw(game);
                        player.dealtCeoCards.push(ceoCard);
                    }
                }
            }
            else {
                game.playerHasPickedCorporationCard(player, new BeginnerCorporation_1.BeginnerCorporation());
            }
        }
        if (players.length === 1) {
            game.log('The id of this game is ${0}', (b) => b.rawString(id));
        }
        players.forEach((player) => {
            game.log('Good luck ${0}!', (b) => b.player(player), { reservedFor: player });
        });
        game.log('Generation ${0}', (b) => b.forNewGeneration().number(game.generation));
        if (gameOptions.corporationsDraft) {
            game.phase = Phase_1.Phase.CORPORATIONDRAFTING;
            for (let i = 0; i < gameOptions.startingCorporations * players.length; i++) {
                game.corporationsToDraft.push(game.corporationDeck.draw(game));
            }
            const playerStartingCorporationsDraft = game.getPlayerBefore(firstPlayer);
            playerStartingCorporationsDraft.runDraftCorporationPhase(playerStartingCorporationsDraft.name, game.corporationsToDraft);
        }
        else {
            game.gotoInitialPhase();
        }
        return game;
    }
    gotoInitialPhase() {
        if (this.gameOptions.initialDraftVariant) {
            this.phase = Phase_1.Phase.INITIALDRAFTING;
            this.runDraftRound(true, false);
        }
        else {
            this.gotoInitialResearchPhase();
        }
    }
    save() {
        Database_1.Database.getInstance().saveGame(this);
    }
    toJSON() {
        return JSON.stringify(this.serialize());
    }
    serialize() {
        const result = {
            activePlayer: this.activePlayer,
            awards: this.awards.map((a) => a.name),
            board: this.board.serialize(),
            claimedMilestones: (0, ClaimedMilestone_1.serializeClaimedMilestones)(this.claimedMilestones),
            ceoDeck: this.ceoDeck.serialize(),
            colonies: this.colonies.map((colony) => colony.serialize()),
            corporationDeck: this.corporationDeck.serialize(),
            createdTimeMs: this.createdTime.getTime(),
            currentSeed: this.rng.current,
            deferredActions: [],
            donePlayers: Array.from(this.donePlayers),
            draftedPlayers: Array.from(this.draftedPlayers),
            draftRound: this.draftRound,
            first: this.first.id,
            fundedAwards: (0, FundedAward_1.serializeFundedAwards)(this.fundedAwards),
            gameAge: this.gameAge,
            gameLog: this.gameLog,
            gameOptions: this.gameOptions,
            generation: this.generation,
            id: this.id,
            initialDraftIteration: this.initialDraftIteration,
            lastSaveId: this.lastSaveId,
            milestones: this.milestones.map((m) => m.name),
            moonData: IMoonData_1.IMoonData.serialize(this.moonData),
            oxygenLevel: this.oxygenLevel,
            passedPlayers: Array.from(this.passedPlayers),
            pathfindersData: PathfindersData_1.PathfindersData.serialize(this.pathfindersData),
            phase: this.phase,
            players: this.players.map((p) => p.serialize()),
            preludeDeck: this.preludeDeck.serialize(),
            projectDeck: this.projectDeck.serialize(),
            researchedPlayers: Array.from(this.researchedPlayers),
            seed: this.rng.seed,
            someoneHasRemovedOtherPlayersPlants: this.someoneHasRemovedOtherPlayersPlants,
            spectatorId: this.spectatorId,
            syndicatePirateRaider: this.syndicatePirateRaider,
            temperature: this.temperature,
            undoCount: this.undoCount,
            unDraftedCards: Array.from(this.unDraftedCards.entries()).map((a) => {
                return [
                    a[0],
                    a[1].map((c) => c.name),
                ];
            }),
            venusScaleLevel: this.venusScaleLevel,
            corporationsDraftDirection: this.corporationsDraftDirection,
            corporationsToDraft: this.corporationsToDraft.map((c) => c.name),
        };
        if (this.aresData !== undefined) {
            result.aresData = this.aresData;
        }
        if (this.clonedGamedId !== undefined) {
            result.clonedGamedId = this.clonedGamedId;
        }
        if (this.turmoil !== undefined) {
            result.turmoil = this.turmoil.serialize();
        }
        return result;
    }
    isSoloMode() {
        return this.players.length === 1;
    }
    getPlayerById(id) {
        const player = this.players.find((p) => p.id === id);
        if (player === undefined) {
            throw new Error(`player ${id} does not exist on game ${this.id}`);
        }
        return player;
    }
    getPlayersById(ids) {
        return ids.map((id) => this.getPlayerById(id));
    }
    defer(action, priority) {
        if (priority !== undefined) {
            action.priority = priority;
        }
        this.deferredActions.push(action);
    }
    milestoneClaimed(milestone) {
        return this.claimedMilestones.some((claimedMilestone) => claimedMilestone.milestone.name === milestone.name);
    }
    marsIsTerraformed() {
        const oxygenMaxed = this.oxygenLevel >= constants.MAX_OXYGEN_LEVEL;
        const temperatureMaxed = this.temperature >= constants.MAX_TEMPERATURE;
        const oceansMaxed = !this.canAddOcean();
        let globalParametersMaxed = oxygenMaxed && temperatureMaxed && oceansMaxed;
        const venusMaxed = this.getVenusScaleLevel() === constants.MAX_VENUS_SCALE;
        MoonExpansion_1.MoonExpansion.ifMoon(this, (moonData) => {
            if (this.gameOptions.requiresMoonTrackCompletion) {
                const moonMaxed = moonData.colonyRate === constants.MAXIMUM_HABITAT_RATE &&
                    moonData.miningRate === constants.MAXIMUM_MINING_RATE &&
                    moonData.logisticRate === constants.MAXIMUM_LOGISTICS_RATE;
                globalParametersMaxed = globalParametersMaxed && moonMaxed;
            }
        });
        if (this.players.length === 1 && this.gameOptions.venusNextExtension) {
            return globalParametersMaxed && venusMaxed;
        }
        if (this.gameOptions.venusNextExtension && this.gameOptions.requiresVenusTrackCompletion) {
            return globalParametersMaxed && venusMaxed;
        }
        return globalParametersMaxed;
    }
    lastSoloGeneration() {
        let lastGeneration = 14;
        const options = this.gameOptions;
        if (options.preludeExtension) {
            lastGeneration -= 2;
        }
        if (options.moonExpansion) {
            if (!options.soloTR && options.requiresMoonTrackCompletion) {
                lastGeneration += 2;
            }
        }
        return lastGeneration;
    }
    isSoloModeWin() {
        if (this.gameOptions.soloTR) {
            return this.players[0].getTerraformRating() >= 63;
        }
        if (!this.marsIsTerraformed()) {
            return false;
        }
        return this.generation <= this.lastSoloGeneration();
    }
    getAwardFundingCost() {
        return 8 + (6 * this.fundedAwards.length);
    }
    fundAward(player, award) {
        if (this.allAwardsFunded()) {
            throw new Error('All awards already funded');
        }
        this.log('${0} funded ${1} award', (b) => b.player(player).award(award));
        if (this.hasBeenFunded(award)) {
            throw new Error(award.name + ' cannot is already funded.');
        }
        this.fundedAwards.push({
            award: award,
            player: player,
        });
    }
    hasBeenFunded(award) {
        return this.fundedAwards.some((fundedAward) => fundedAward.award.name === award.name);
    }
    allAwardsFunded() {
        if (this.players.length === 1)
            return true;
        return this.fundedAwards.length >= constants.MAX_AWARDS;
    }
    allMilestonesClaimed() {
        if (this.players.length === 1)
            return true;
        return this.claimedMilestones.length >= constants.MAX_MILESTONES;
    }
    playerHasPickedCorporationCard(player, corporationCard) {
        player.pickedCorporationCard = corporationCard;
        if (this.players.every((p) => p.pickedCorporationCard !== undefined)) {
            for (const somePlayer of this.getPlayersInGenerationOrder()) {
                if (somePlayer.pickedCorporationCard === undefined) {
                    throw new Error(`pickedCorporationCard is not defined for ${somePlayer.id}`);
                }
                somePlayer.playCorporationCard(somePlayer.pickedCorporationCard);
            }
        }
    }
    selectInitialCards(player) {
        return new SelectInitialCards_1.SelectInitialCards(player, (corporation) => {
            this.playerHasPickedCorporationCard(player, corporation);
            return undefined;
        });
    }
    hasPassedThisActionPhase(player) {
        return this.passedPlayers.has(player.id);
    }
    incrementFirstPlayer() {
        let firstIndex = this.players.map((x) => x.id).indexOf(this.first.id);
        if (firstIndex === -1) {
            throw new Error('Didn\'t even find player');
        }
        firstIndex = (firstIndex + 1) % this.players.length;
        this.first = this.players[firstIndex];
    }
    overrideFirstPlayer(newFirstPlayer) {
        if (newFirstPlayer.game.id !== this.id) {
            throw new Error(`player ${newFirstPlayer.id} is not part of this game`);
        }
        this.first = newFirstPlayer;
    }
    runDraftRound(initialDraft = false, preludeDraft = false) {
        this.save();
        this.draftedPlayers.clear();
        this.players.forEach((player) => {
            player.needsToDraft = true;
            if (this.draftRound === 1 && !preludeDraft) {
                player.askPlayerToDraft(initialDraft, this.giveDraftCardsTo(player).name);
            }
            else if (this.draftRound === 1 && preludeDraft) {
                player.askPlayerToDraft(initialDraft, this.giveDraftCardsTo(player).name, player.dealtPreludeCards);
            }
            else {
                const draftCardsFrom = this.getDraftCardsFrom(player).id;
                const cards = this.unDraftedCards.get(draftCardsFrom);
                this.unDraftedCards.delete(draftCardsFrom);
                player.askPlayerToDraft(initialDraft, this.giveDraftCardsTo(player).name, cards);
            }
        });
    }
    gotoInitialResearchPhase() {
        this.phase = Phase_1.Phase.RESEARCH;
        this.save();
        for (const player of this.players) {
            if (player.pickedCorporationCard === undefined && player.dealtCorporationCards.length > 0) {
                player.setWaitingFor(this.selectInitialCards(player));
            }
        }
        if (this.players.length === 1 && this.gameOptions.coloniesExtension) {
            this.players[0].production.add(Resource_1.Resource.MEGACREDITS, -2);
            this.defer(new RemoveColonyFromGame_1.RemoveColonyFromGame(this.players[0]));
        }
    }
    gotoResearchPhase() {
        this.phase = Phase_1.Phase.RESEARCH;
        this.researchedPlayers.clear();
        this.save();
        this.players.forEach((player) => {
            player.runResearchPhase(this.gameOptions.draftVariant);
        });
    }
    gotoDraftingPhase() {
        this.phase = Phase_1.Phase.DRAFTING;
        this.draftRound = 1;
        this.runDraftRound();
    }
    gameIsOver() {
        if (this.isSoloMode()) {
            return this.generation === this.lastSoloGeneration();
        }
        return this.marsIsTerraformed();
    }
    isDoneWithFinalProduction() {
        return this.phase === Phase_1.Phase.END || (this.gameIsOver() && this.phase === Phase_1.Phase.PRODUCTION);
    }
    gotoProductionPhase() {
        this.phase = Phase_1.Phase.PRODUCTION;
        this.passedPlayers.clear();
        this.someoneHasRemovedOtherPlayersPlants = false;
        this.players.forEach((player) => {
            player.colonies.cardDiscount = 0;
            player.runProductionPhase();
        });
        if (this.gameIsOver()) {
            this.log('Final greenery placement', (b) => b.forNewGeneration());
            this.takeNextFinalGreeneryAction();
            return;
        }
        else {
            this.players.forEach((player) => {
                player.colonies.returnTradeFleets();
            });
        }
        this.phase = Phase_1.Phase.SOLAR;
        if (this.gameOptions.solarPhaseOption && !this.marsIsTerraformed()) {
            this.gotoWorldGovernmentTerraforming();
            return;
        }
        this.gotoEndGeneration();
    }
    endGenerationForColonies() {
        if (this.gameOptions.coloniesExtension) {
            this.colonies.forEach((colony) => {
                colony.endGeneration(this);
            });
            this.syndicatePirateRaider = undefined;
        }
    }
    gotoEndGeneration() {
        this.endGenerationForColonies();
        Turmoil_1.Turmoil.ifTurmoil(this, (turmoil) => {
            turmoil.endGeneration(this);
        });
        if (this.deferredActions.length > 0) {
            this.deferredActions.runAll(() => this.goToDraftOrResearch());
        }
        else {
            this.phase = Phase_1.Phase.INTERGENERATION;
            this.goToDraftOrResearch();
        }
    }
    updateVPbyGeneration() {
        this.getPlayers().forEach((player) => {
            player.victoryPointsByGeneration.push(player.getVictoryPoints().total);
        });
    }
    goToDraftOrResearch() {
        this.updateVPbyGeneration();
        this.generation++;
        this.log('Generation ${0}', (b) => b.forNewGeneration().number(this.generation));
        this.incrementFirstPlayer();
        this.players.forEach((player) => {
            player.terraformRatingAtGenerationStart = player.getTerraformRating();
            player.hasIncreasedTerraformRatingThisGeneration = false;
        });
        if (this.gameOptions.draftVariant) {
            this.gotoDraftingPhase();
        }
        else {
            this.gotoResearchPhase();
        }
    }
    gotoWorldGovernmentTerraforming() {
        this.first.worldGovernmentTerraforming();
    }
    doneWorldGovernmentTerraforming() {
        this.gotoEndGeneration();
    }
    allPlayersHavePassed() {
        for (const player of this.players) {
            if (!this.hasPassedThisActionPhase(player)) {
                return false;
            }
        }
        return true;
    }
    playerHasPassed(player) {
        this.passedPlayers.add(player.id);
    }
    hasResearched(player) {
        return this.researchedPlayers.has(player.id);
    }
    hasDrafted(player) {
        return this.draftedPlayers.has(player.id);
    }
    allPlayersHaveFinishedResearch() {
        for (const player of this.players) {
            if (!this.hasResearched(player)) {
                return false;
            }
        }
        return true;
    }
    allPlayersHaveFinishedDraft() {
        for (const player of this.players) {
            if (!this.hasDrafted(player)) {
                return false;
            }
        }
        return true;
    }
    playerIsFinishedWithResearchPhase(player) {
        this.deferredActions.runAllFor(player, () => {
            this.researchedPlayers.add(player.id);
            if (this.allPlayersHaveFinishedResearch()) {
                this.phase = Phase_1.Phase.ACTION;
                this.passedPlayers.clear();
                TheNewSpaceRace_1.TheNewSpaceRace.potentiallyChangeFirstPlayer(this);
                this.startActionsForPlayer(this.first);
            }
        });
    }
    playerIsFinishedWithDraftingPhase(initialDraft, player, cards) {
        this.draftedPlayers.add(player.id);
        this.unDraftedCards.set(player.id, cards);
        player.needsToDraft = false;
        if (this.allPlayersHaveFinishedDraft() === false) {
            return;
        }
        if (cards.length > 1) {
            this.draftRound++;
            this.runDraftRound(initialDraft);
            return;
        }
        this.players.forEach((player) => {
            const lastCards = this.unDraftedCards.get(this.getDraftCardsFrom(player).id);
            if (lastCards !== undefined) {
                player.draftedCards.push(...lastCards);
            }
            player.needsToDraft = undefined;
            if (initialDraft) {
                if (this.initialDraftIteration === 2) {
                    player.dealtProjectCards = player.draftedCards;
                    player.draftedCards = [];
                }
                else if (this.initialDraftIteration === 3) {
                    player.dealtPreludeCards = player.draftedCards;
                    player.draftedCards = [];
                }
            }
        });
        if (initialDraft === false) {
            this.gotoResearchPhase();
            return;
        }
        if (this.initialDraftIteration === 1) {
            this.initialDraftIteration++;
            this.draftRound = 1;
            this.runDraftRound(true);
        }
        else if (this.initialDraftIteration === 2 && this.gameOptions.preludeExtension) {
            this.initialDraftIteration++;
            this.draftRound = 1;
            this.runDraftRound(true, true);
        }
        else {
            this.gotoInitialResearchPhase();
        }
    }
    playerIsFinishedWithDraftingCorporationPhase(player, cards) {
        const nextPlayer = this.corporationsDraftDirection === 'after' ? this.getPlayerAfter(player) : this.getPlayerBefore(player);
        const passTo = this.corporationsDraftDirection === 'after' ? this.getPlayerAfter(nextPlayer) : this.getPlayerBefore(nextPlayer);
        if (cards.length > 1) {
            if ((this.draftRound + 1) % this.players.length === 0) {
                nextPlayer.runDraftCorporationPhase(nextPlayer.name, cards);
            }
            else if (this.draftRound % this.players.length === 0) {
                player.runDraftCorporationPhase(nextPlayer.name, cards);
                this.corporationsDraftDirection = this.corporationsDraftDirection === 'after' ? 'before' : 'after';
            }
            else {
                nextPlayer.runDraftCorporationPhase(passTo.name, cards);
            }
            this.draftRound++;
            return;
        }
        nextPlayer.draftedCorporations.push(...cards);
        this.players.forEach((player) => {
            player.dealtCorporationCards = player.draftedCorporations;
        });
        this.initialDraftIteration = 1;
        this.draftRound = 1;
        this.gotoInitialPhase();
    }
    getDraftCardsFrom(player) {
        if (this.generation === 1 && this.initialDraftIteration === 2) {
            return this.getPlayerBefore(player);
        }
        return this.generation % 2 === 0 ? this.getPlayerBefore(player) : this.getPlayerAfter(player);
    }
    giveDraftCardsTo(player) {
        if (this.initialDraftIteration === 2 && this.generation === 1) {
            return this.getPlayerAfter(player);
        }
        return this.generation % 2 === 0 ? this.getPlayerAfter(player) : this.getPlayerBefore(player);
    }
    getPlayerBefore(player) {
        const playerIndex = this.players.indexOf(player);
        if (playerIndex === -1) {
            throw new Error(`Player ${player.id} not in game ${this.id}`);
        }
        return this.players[(playerIndex === 0) ? this.players.length - 1 : playerIndex - 1];
    }
    getPlayerAfter(player) {
        const playerIndex = this.players.indexOf(player);
        if (playerIndex === -1) {
            throw new Error(`Player ${player.id} not in game ${this.id}`);
        }
        return this.players[(playerIndex + 1 >= this.players.length) ? 0 : playerIndex + 1];
    }
    playerIsFinishedTakingActions() {
        if (this.deferredActions.length > 0) {
            this.deferredActions.runAll(() => this.playerIsFinishedTakingActions());
            return;
        }
        this.inputsThisRound = 0;
        if (this.allPlayersHavePassed()) {
            this.gotoProductionPhase();
            return;
        }
        const nextPlayer = this.getPlayerAfter(this.getPlayerById(this.activePlayer));
        if (!this.hasPassedThisActionPhase(nextPlayer)) {
            this.startActionsForPlayer(nextPlayer);
        }
        else {
            this.activePlayer = nextPlayer.id;
            this.playerIsFinishedTakingActions();
        }
    }
    gotoEndGame() {
        if (this.clonedGamedId !== undefined && this.clonedGamedId.startsWith('#')) {
            const clonedGamedId = this.clonedGamedId;
            this.log('This game was a clone from game ${0}', (b) => b.rawString(clonedGamedId));
        }
        else {
            const id = this.id;
            this.log('This game id was ${0}', (b) => b.rawString(id));
        }
        const scores = [];
        this.players.forEach((player) => {
            const corporation = player.corporations.map((c) => c.name).join('|');
            const vpb = player.getVictoryPoints();
            scores.push({ corporation: corporation, playerScore: vpb.total });
        });
        Database_1.Database.getInstance().saveGameResults(this.id, this.players.length, this.generation, this.gameOptions, scores);
        this.phase = Phase_1.Phase.END;
        Database_1.Database.getInstance().saveGame(this).then(() => {
            GameLoader_1.GameLoader.getInstance().mark(this.id);
            return Database_1.Database.getInstance().cleanGame(this.id);
        }).catch((err) => {
            console.error(err);
        });
    }
    canPlaceGreenery(player) {
        return !this.donePlayers.has(player.id) &&
            player.plants >= player.plantsNeededForGreenery &&
            this.board.getAvailableSpacesForGreenery(player).length > 0;
    }
    playerIsDoneWithGame(player) {
        this.donePlayers.add(player.id);
        this.takeNextFinalGreeneryAction();
    }
    takeNextFinalGreeneryAction() {
        for (const player of this.getPlayersInGenerationOrder()) {
            if (this.donePlayers.has(player.id)) {
                continue;
            }
            if (this.isSoloMode() && !this.isSoloModeWin()) {
                this.log('Final greenery phase is skipped since you did not complete the win condition.', (b) => b.forNewGeneration());
                continue;
            }
            if (this.canPlaceGreenery(player)) {
                this.activePlayer = player.id;
                player.takeActionForFinalGreenery();
                return;
            }
            else if (player.getWaitingFor() !== undefined) {
                return;
            }
            else {
                this.donePlayers.add(player.id);
            }
        }
        this.updateVPbyGeneration();
        this.gotoEndGame();
    }
    startActionsForPlayer(player) {
        this.activePlayer = player.id;
        player.actionsTakenThisRound = 0;
        player.takeAction();
    }
    increaseOxygenLevel(player, increments) {
        if (this.oxygenLevel >= constants.MAX_OXYGEN_LEVEL) {
            return undefined;
        }
        if (increments < 0) {
            this.oxygenLevel = Math.max(constants.MIN_OXYGEN_LEVEL, this.oxygenLevel + increments);
            return undefined;
        }
        const steps = Math.min(increments, constants.MAX_OXYGEN_LEVEL - this.oxygenLevel);
        if (this.phase !== Phase_1.Phase.SOLAR) {
            TurmoilHandler_1.TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter_1.GlobalParameter.OXYGEN, steps);
            player.increaseTerraformRatingSteps(steps);
        }
        if (this.oxygenLevel < 8 && this.oxygenLevel + steps >= 8) {
            this.increaseTemperature(player, 1);
        }
        this.oxygenLevel += steps;
        AresHandler_1.AresHandler.ifAres(this, (aresData) => {
            AresHandler_1.AresHandler.onOxygenChange(this, aresData);
        });
    }
    getOxygenLevel() {
        return this.oxygenLevel;
    }
    increaseVenusScaleLevel(player, increments) {
        if (this.venusScaleLevel >= constants.MAX_VENUS_SCALE) {
            return 0;
        }
        if (increments === -1) {
            this.venusScaleLevel = Math.max(constants.MIN_VENUS_SCALE, this.venusScaleLevel + increments * 2);
            return -1;
        }
        const steps = Math.min(increments, (constants.MAX_VENUS_SCALE - this.venusScaleLevel) / 2);
        if (this.phase !== Phase_1.Phase.SOLAR) {
            if (this.venusScaleLevel < 8 && this.venusScaleLevel + steps * 2 >= 8) {
                player.drawCard();
            }
            if (this.venusScaleLevel < 16 && this.venusScaleLevel + steps * 2 >= 16) {
                player.increaseTerraformRating();
            }
            if (this.gameOptions.altVenusBoard) {
                const newValue = this.venusScaleLevel + steps * 2;
                const minimalBaseline = Math.max(this.venusScaleLevel, 16);
                const maximumBaseline = Math.min(newValue, 30);
                const standardResourcesGranted = Math.max((maximumBaseline - minimalBaseline) / 2, 0);
                const grantWildResource = this.venusScaleLevel + (steps * 2) >= 30;
                if (grantWildResource || standardResourcesGranted > 0) {
                    this.defer(new GrantVenusAltTrackBonusDeferred_1.GrantVenusAltTrackBonusDeferred(player, standardResourcesGranted, grantWildResource));
                }
            }
            TurmoilHandler_1.TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter_1.GlobalParameter.VENUS, steps);
            player.increaseTerraformRatingSteps(steps);
        }
        const aphrodite = this.players.find((player) => player.isCorporation(CardName_1.CardName.APHRODITE));
        if (aphrodite !== undefined) {
            aphrodite.megaCredits += steps * 2;
        }
        this.venusScaleLevel += steps * 2;
        return steps;
    }
    getVenusScaleLevel() {
        return this.venusScaleLevel;
    }
    increaseTemperature(player, increments) {
        if (this.temperature >= constants.MAX_TEMPERATURE) {
            return undefined;
        }
        if (increments === -2 || increments === -1) {
            this.temperature = Math.max(constants.MIN_TEMPERATURE, this.temperature + increments * 2);
            return undefined;
        }
        const steps = Math.min(increments, (constants.MAX_TEMPERATURE - this.temperature) / 2);
        if (this.phase !== Phase_1.Phase.SOLAR) {
            if (this.temperature < -24 && this.temperature + steps * 2 >= -24) {
                player.production.add(Resource_1.Resource.HEAT, 1, { log: true });
            }
            if (this.temperature < -20 && this.temperature + steps * 2 >= -20) {
                player.production.add(Resource_1.Resource.HEAT, 1, { log: true });
            }
            TurmoilHandler_1.TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter_1.GlobalParameter.TEMPERATURE, steps);
            player.increaseTerraformRatingSteps(steps);
        }
        if (this.temperature < 0 && this.temperature + steps * 2 >= 0) {
            this.defer(new PlaceOceanTile_1.PlaceOceanTile(player, { title: 'Select space for ocean from temperature increase' }));
        }
        this.temperature += steps * 2;
        AresHandler_1.AresHandler.ifAres(this, (aresData) => {
            AresHandler_1.AresHandler.onTemperatureChange(this, aresData);
        });
        return undefined;
    }
    getTemperature() {
        return this.temperature;
    }
    getGeneration() {
        return this.generation;
    }
    getPassedPlayers() {
        const passedPlayersColors = [];
        this.passedPlayers.forEach((player) => {
            passedPlayersColors.push(this.getPlayerById(player).color);
        });
        return passedPlayersColors;
    }
    getCitiesOffMarsCount(player) {
        return this.getCitiesCount(player, (space) => space.spaceType === SpaceType_1.SpaceType.COLONY);
    }
    getCitiesOnMarsCount(player) {
        return this.getCitiesCount(player, (space) => space.spaceType !== SpaceType_1.SpaceType.COLONY);
    }
    getCitiesCount(player, filter) {
        let cities = this.board.spaces.filter(Board_1.Board.isCitySpace);
        if (player !== undefined)
            cities = cities.filter(Board_1.Board.ownedBy(player));
        if (filter)
            cities = cities.filter(filter);
        return cities.length;
    }
    getGreeneriesCount(player) {
        let greeneries = this.board.spaces.filter((space) => Board_1.Board.isGreenerySpace(space));
        if (player !== undefined)
            greeneries = greeneries.filter(Board_1.Board.ownedBy(player));
        return greeneries.length;
    }
    getSpaceCount(tileType, player) {
        return this.board.spaces.filter(Board_1.Board.ownedBy(player))
            .filter((space) => { var _a; return ((_a = space.tile) === null || _a === void 0 ? void 0 : _a.tileType) === tileType; })
            .length;
    }
    addTile(player, space, tile) {
        var _a;
        if (space.tile !== undefined && !(this.gameOptions.aresExtension || this.gameOptions.pathfindersExpansion)) {
            throw new Error('Selected space is occupied');
        }
        if (space.player !== undefined && space.player !== player) {
            throw new Error('This space is land claimed by ' + space.player.name);
        }
        if (!AresHandler_1.AresHandler.canCover(space, tile)) {
            throw new Error('Selected space is occupied: ' + space.id);
        }
        const subjectToHazardAdjacency = tile.tileType !== TileType_1.TileType.OCEAN;
        AresHandler_1.AresHandler.ifAres(this, () => {
            AresHandler_1.AresHandler.assertCanPay(player, space, subjectToHazardAdjacency);
        });
        AresHandler_1.AresHandler.ifAres(this, () => {
            AresHandler_1.AresHandler.payAdjacencyAndHazardCosts(player, space, subjectToHazardAdjacency);
        });
        if (space.id === SpaceName_1.SpaceName.HELLAS_OCEAN_TILE &&
            this.canAddOcean() &&
            this.gameOptions.boardName === BoardName_1.BoardName.HELLAS) {
            if (player.color !== Color_1.Color.NEUTRAL) {
                this.defer(new PlaceOceanTile_1.PlaceOceanTile(player, { title: 'Select space for ocean from placement bonus' }));
                this.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, constants.HELLAS_BONUS_OCEAN_COST, { title: 'Select how to pay for placement bonus ocean' }));
            }
        }
        TurmoilHandler_1.TurmoilHandler.resolveTilePlacementCosts(player);
        const arcadianCommunityBonus = space.player === player && player.isCorporation(CardName_1.CardName.ARCADIAN_COMMUNITIES);
        const initialTileTypeForAres = (_a = space.tile) === null || _a === void 0 ? void 0 : _a.tileType;
        const coveringExistingTile = space.tile !== undefined;
        this.simpleAddTile(player, space, tile);
        if (this.phase !== Phase_1.Phase.SOLAR) {
            if (!coveringExistingTile) {
                this.grantSpaceBonuses(player, space);
            }
            this.board.getAdjacentSpaces(space).forEach((adjacentSpace) => {
                if (Board_1.Board.isOceanSpace(adjacentSpace)) {
                    player.megaCredits += player.oceanBonus;
                }
            });
            AresHandler_1.AresHandler.ifAres(this, (aresData) => {
                AresHandler_1.AresHandler.earnAdjacencyBonuses(aresData, player, space);
            });
            TurmoilHandler_1.TurmoilHandler.resolveTilePlacementBonuses(player, space.spaceType);
            if (arcadianCommunityBonus) {
                this.defer(new GainResources_1.GainResources(player, Resource_1.Resource.MEGACREDITS, { count: 3 }));
            }
        }
        else {
            space.player = undefined;
        }
        this.players.forEach((p) => {
            p.tableau.forEach((playedCard) => {
                var _a;
                (_a = playedCard.onTilePlaced) === null || _a === void 0 ? void 0 : _a.call(playedCard, p, player, space, BoardType_1.BoardType.MARS);
            });
        });
        AresHandler_1.AresHandler.ifAres(this, () => {
            AresHandler_1.AresHandler.grantBonusForRemovingHazard(player, initialTileTypeForAres);
        });
    }
    simpleAddTile(player, space, tile) {
        space.tile = tile;
        space.player = player;
        if (tile.tileType === TileType_1.TileType.OCEAN || tile.tileType === TileType_1.TileType.MARTIAN_NATURE_WONDERS) {
            space.player = undefined;
        }
        LogHelper_1.LogHelper.logTilePlacement(player, space, tile.tileType);
    }
    grantSpaceBonuses(player, space) {
        const bonuses = mnemonist_1.MultiSet.from(space.bonus);
        bonuses.forEachMultiplicity((count, bonus) => {
            this.grantSpaceBonus(player, bonus, count);
        });
    }
    grantSpaceBonus(player, spaceBonus, count = 1) {
        switch (spaceBonus) {
            case SpaceBonus_1.SpaceBonus.DRAW_CARD:
                player.drawCard(count);
                break;
            case SpaceBonus_1.SpaceBonus.PLANT:
                player.addResource(Resource_1.Resource.PLANTS, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.STEEL:
                player.addResource(Resource_1.Resource.STEEL, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.TITANIUM:
                player.addResource(Resource_1.Resource.TITANIUM, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.HEAT:
                player.addResource(Resource_1.Resource.HEAT, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.OCEAN:
                break;
            case SpaceBonus_1.SpaceBonus.MICROBE:
                this.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.MICROBE, { count: count }));
                break;
            case SpaceBonus_1.SpaceBonus.ANIMAL:
                this.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.ANIMAL, { count: count }));
                break;
            case SpaceBonus_1.SpaceBonus.DATA:
                this.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.DATA, { count: count }));
                break;
            case SpaceBonus_1.SpaceBonus.ENERGY_PRODUCTION:
                player.production.add(Resource_1.Resource.ENERGY, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.SCIENCE:
                this.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.SCIENCE, { count: count }));
                break;
            case SpaceBonus_1.SpaceBonus.TEMPERATURE:
                if (this.getTemperature() < constants.MAX_TEMPERATURE) {
                    this.defer(new DeferredAction_1.SimpleDeferredAction(player, () => this.increaseTemperature(player, 1)));
                    this.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, constants.VASTITAS_BOREALIS_BONUS_TEMPERATURE_COST, { title: 'Select how to pay for placement bonus temperature' }));
                }
                break;
            case SpaceBonus_1.SpaceBonus.ENERGY:
                player.addResource(Resource_1.Resource.ENERGY, count, { log: true });
                break;
            case SpaceBonus_1.SpaceBonus.ASTEROID:
                this.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.ASTEROID, { count: count }));
                break;
            default:
                throw new Error('Unhandled space bonus ' + spaceBonus + '. Report this exact error, please.');
        }
    }
    addGreenery(player, space, shouldRaiseOxygen = true) {
        this.addTile(player, space, {
            tileType: TileType_1.TileType.GREENERY,
        });
        PartyHooks_1.PartyHooks.applyGreensRulingPolicy(player, space);
        if (shouldRaiseOxygen)
            this.increaseOxygenLevel(player, 1);
        return undefined;
    }
    addCityTile(player, space, cardName = undefined) {
        this.addTile(player, space, {
            tileType: TileType_1.TileType.CITY,
            card: cardName,
        });
    }
    canAddOcean() {
        return this.board.getOceanCount() < constants.MAX_OCEAN_TILES;
    }
    canRemoveOcean() {
        const count = this.board.getOceanCount();
        return count > 0 && count < constants.MAX_OCEAN_TILES;
    }
    addOceanTile(player, space) {
        if (this.canAddOcean() === false)
            return;
        this.addTile(player, space, {
            tileType: TileType_1.TileType.OCEAN,
        });
        if (this.phase !== Phase_1.Phase.SOLAR) {
            TurmoilHandler_1.TurmoilHandler.onGlobalParameterIncrease(player, GlobalParameter_1.GlobalParameter.OCEANS);
            player.increaseTerraformRating();
        }
        AresHandler_1.AresHandler.ifAres(this, (aresData) => {
            AresHandler_1.AresHandler.onOceanPlaced(aresData, player);
        });
    }
    removeTile(spaceId) {
        const space = this.board.getSpace(spaceId);
        space.tile = undefined;
        space.player = undefined;
    }
    getPlayers() {
        return this.players;
    }
    getPlayersInGenerationOrder() {
        const ret = [];
        let insertIdx = 0;
        for (const p of this.players) {
            if (p.id === this.first.id || insertIdx > 0) {
                ret.splice(insertIdx, 0, p);
                insertIdx++;
            }
            else {
                ret.push(p);
            }
        }
        return ret;
    }
    getCardPlayerOrThrow(name) {
        const player = this.getCardPlayerOrUndefined(name);
        if (player === undefined) {
            throw new Error(`No player has played ${name}`);
        }
        return player;
    }
    getCardPlayerOrUndefined(name) {
        for (const player of this.players) {
            for (const card of player.tableau) {
                if (card.name === name) {
                    return player;
                }
            }
        }
        return undefined;
    }
    getCardHolder(name) {
        for (const player of this.players) {
            for (const card of [...player.preludeCardsInHand, ...player.cardsInHand]) {
                if (card.name === name) {
                    return [player, card];
                }
            }
        }
        return [undefined, undefined];
    }
    getCardsInHandByResource(player, resourceType) {
        return player.cardsInHand.filter((card) => card.resourceType === resourceType);
    }
    getCardsInHandByType(player, cardType) {
        return player.cardsInHand.filter((card) => card.type === cardType);
    }
    log(message, f, options) {
        var _a;
        const builder = new LogBuilder_1.LogBuilder(message);
        f === null || f === void 0 ? void 0 : f(builder);
        const logMessage = builder.build();
        logMessage.playerId = (_a = options === null || options === void 0 ? void 0 : options.reservedFor) === null || _a === void 0 ? void 0 : _a.id;
        this.gameLog.push(logMessage);
        this.gameAge++;
    }
    someoneCanHaveProductionReduced(resource, minQuantity = 1) {
        if (this.isSoloMode())
            return true;
        return this.getPlayers().some((p) => {
            if (p.production[resource] < minQuantity)
                return false;
            if (this.gameOptions.pathfindersExpansion && p.cardIsInEffect(CardName_1.CardName.PRIVATE_SECURITY))
                return false;
            return true;
        });
    }
    discardForCost(cardCount, toPlace) {
        if (cardCount === 1) {
            const card = this.projectDeck.draw(this);
            this.projectDeck.discard(card);
            this.log('Drew and discarded ${0} (cost ${1}) to place a ${2}', (b) => b.card(card).number(card.cost).tileType(toPlace));
            return card.cost;
        }
        else {
            const card1 = this.projectDeck.draw(this);
            this.projectDeck.discard(card1);
            const card2 = this.projectDeck.draw(this);
            this.projectDeck.discard(card2);
            this.log('Drew and discarded ${0} (cost ${1}) and ${2} (cost ${3}) to place a ${4}', (b) => b.card(card1).number(card1.cost).card(card2).number(card2.cost).tileType(toPlace));
            return card1.cost + card2.cost;
        }
    }
    getSpaceByOffset(direction, toPlace, cardCount = 1) {
        const cost = this.discardForCost(cardCount, toPlace);
        const distance = Math.max(cost - 1, 0);
        const space = this.board.getNthAvailableLandSpace(distance, direction, undefined, (space) => {
            const adjacentSpaces = this.board.getAdjacentSpaces(space);
            return adjacentSpaces.every((sp) => { var _a; return ((_a = sp.tile) === null || _a === void 0 ? void 0 : _a.tileType) !== TileType_1.TileType.CITY; }) &&
                adjacentSpaces.some((sp) => this.board.canPlaceTile(sp));
        });
        if (space === undefined) {
            throw new Error('Couldn\'t find space when card cost is ' + cost);
        }
        return space;
    }
    expectedPurgeTimeMs() {
        if (this.createdTime.getTime() === 0) {
            return 0;
        }
        const days = (0, utils_1.dayStringToDays)(process.env.MAX_GAME_DAYS, 10);
        return (0, utils_1.addDays)(this.createdTime, days).getTime();
    }
    static deserialize(d) {
        var _a, _b, _c;
        const gameOptions = d.gameOptions;
        gameOptions.bannedCards = (_a = gameOptions.bannedCards) !== null && _a !== void 0 ? _a : [];
        const players = d.players.map((element) => Player_1.Player.deserialize(element));
        const first = players.find((player) => player.id === d.first);
        if (first === undefined) {
            throw new Error(`Player ${d.first} not found when rebuilding First Player`);
        }
        const board = GameSetup_1.GameSetup.deserializeBoard(players, gameOptions, d);
        const rng = new Random_1.SeededRandom(d.seed, d.currentSeed);
        const projectDeck = Deck_1.ProjectDeck.deserialize(d.projectDeck, rng);
        const corporationDeck = Deck_1.CorporationDeck.deserialize(d.corporationDeck, rng);
        const preludeDeck = Deck_1.PreludeDeck.deserialize(d.preludeDeck, rng);
        const ceoDeck = Deck_1.CeoDeck.deserialize(d.ceoDeck, rng);
        const game = new Game(d.id, players, first, d.activePlayer, gameOptions, rng, board, projectDeck, corporationDeck, preludeDeck, ceoDeck);
        game.resettable = true;
        game.spectatorId = d.spectatorId;
        game.createdTime = new Date(d.createdTimeMs);
        const milestones = [];
        d.milestones.forEach((element) => {
            const milestoneName = typeof element === 'string' ? element : element.name;
            const foundMilestone = Milestones_1.ALL_MILESTONES.find((milestone) => milestone.name === milestoneName);
            if (foundMilestone !== undefined) {
                milestones.push(foundMilestone);
            }
        });
        game.milestones = milestones;
        game.claimedMilestones = (0, ClaimedMilestone_1.deserializeClaimedMilestones)(d.claimedMilestones, players, milestones);
        const awards = [];
        d.awards.forEach((element) => {
            const awardName = typeof element === 'string' ? element : element.name;
            const foundAward = Awards_1.ALL_AWARDS.find((award) => award.name === awardName);
            if (foundAward !== undefined) {
                awards.push(foundAward);
            }
        });
        game.awards = awards;
        game.fundedAwards = (0, FundedAward_1.deserializeFundedAwards)(d.fundedAwards, players, awards);
        if (gameOptions.aresExtension) {
            game.aresData = d.aresData;
        }
        if (gameOptions.coloniesExtension) {
            game.colonies = ColonyDeserializer_1.ColonyDeserializer.deserializeAndFilter(d.colonies);
            const colonyDealer = new ColonyDealer_1.ColonyDealer(rng, gameOptions);
            colonyDealer.restore(game.colonies);
            game.discardedColonies = colonyDealer.discardedColonies;
        }
        if (d.turmoil && gameOptions.turmoilExtension) {
            game.turmoil = Turmoil_1.Turmoil.deserialize(d.turmoil, players);
        }
        if (d.moonData !== undefined && gameOptions.moonExpansion === true) {
            game.moonData = IMoonData_1.IMoonData.deserialize(d.moonData, players);
        }
        if (d.pathfindersData !== undefined && gameOptions.pathfindersExpansion === true) {
            game.pathfindersData = PathfindersData_1.PathfindersData.deserialize(d.pathfindersData);
        }
        game.passedPlayers = new Set(d.passedPlayers);
        game.donePlayers = new Set(d.donePlayers);
        game.researchedPlayers = new Set(d.researchedPlayers);
        game.draftedPlayers = new Set(d.draftedPlayers);
        const cardFinder = new CardFinder_1.CardFinder();
        game.unDraftedCards = new Map();
        d.unDraftedCards.forEach((unDraftedCard) => {
            game.unDraftedCards.set(unDraftedCard[0], cardFinder.cardsFromJSON(unDraftedCard[1]));
        });
        game.corporationsToDraft = cardFinder.corporationCardsFromJSON(d.corporationsToDraft);
        game.corporationsDraftDirection = (_b = d.corporationsDraftDirection) !== null && _b !== void 0 ? _b : false;
        game.lastSaveId = d.lastSaveId;
        game.clonedGamedId = d.clonedGamedId;
        game.gameAge = d.gameAge;
        game.gameLog = d.gameLog;
        game.generation = d.generation;
        game.phase = d.phase;
        game.oxygenLevel = d.oxygenLevel;
        game.undoCount = (_c = d.undoCount) !== null && _c !== void 0 ? _c : 0;
        game.temperature = d.temperature;
        game.venusScaleLevel = d.venusScaleLevel;
        game.activePlayer = d.activePlayer;
        game.draftRound = d.draftRound;
        game.initialDraftIteration = d.initialDraftIteration;
        game.someoneHasRemovedOtherPlayersPlants = d.someoneHasRemovedOtherPlayersPlants;
        game.syndicatePirateRaider = d.syndicatePirateRaider;
        if (game.generation === 1 && players.some((p) => p.corporations.length === 0)) {
            if (game.phase === Phase_1.Phase.INITIALDRAFTING) {
                if (game.initialDraftIteration === 3) {
                    game.runDraftRound(true, true);
                }
                else {
                    game.runDraftRound(true);
                }
            }
            else {
                game.gotoInitialResearchPhase();
            }
        }
        else if (game.phase === Phase_1.Phase.DRAFTING) {
            game.runDraftRound();
        }
        else if (game.phase === Phase_1.Phase.RESEARCH) {
            game.gotoResearchPhase();
        }
        else if (game.phase === Phase_1.Phase.END) {
        }
        else {
            game.getPlayerById(game.activePlayer).takeAction(false);
        }
        if (game.phase === Phase_1.Phase.END)
            GameLoader_1.GameLoader.getInstance().mark(game.id);
        return game;
    }
    logIllegalState(description, metadata) {
        const gameMetadata = {
            gameId: this.id,
            lastSaveId: this.lastSaveId,
            logAge: this.gameLog.length,
            currentPlayer: this.activePlayer,
            metadata: metadata,
        };
        console.warn('Illegal state: ' + description, JSON.stringify(gameMetadata, null, ' '));
    }
}
exports.Game = Game;