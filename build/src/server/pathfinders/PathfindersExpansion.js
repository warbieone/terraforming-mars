"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathfindersExpansion = exports.TRACKS = void 0;
const AddResourcesToCard_1 = require("../deferredActions/AddResourcesToCard");
const CardName_1 = require("../../common/cards/CardName");
const GrantResourceDeferred_1 = require("./GrantResourceDeferred");
const PathfindersData_1 = require("./PathfindersData");
const PlaceCityTile_1 = require("../deferredActions/PlaceCityTile");
const PlaceGreeneryTile_1 = require("../deferredActions/PlaceGreeneryTile");
const PlaceMoonMineTile_1 = require("../moon/PlaceMoonMineTile");
const PlaceMoonRoadTile_1 = require("../moon/PlaceMoonRoadTile");
const PlaceOceanTile_1 = require("../deferredActions/PlaceOceanTile");
const PlanetaryTracks_1 = require("../../common/pathfinders/PlanetaryTracks");
const Resource_1 = require("../../common/Resource");
const CardResource_1 = require("../../common/CardResource");
const GainResources_1 = require("../inputs/GainResources");
const SendDelegateToArea_1 = require("../deferredActions/SendDelegateToArea");
const Turmoil_1 = require("../turmoil/Turmoil");
const Priority_1 = require("../deferredActions/Priority");
exports.TRACKS = PlanetaryTracks_1.PlanetaryTracks.initialize();
class PathfindersExpansion {
    constructor() {
    }
    static initialize(gameOptions) {
        return {
            venus: gameOptions.venusNextExtension ? 0 : -1,
            earth: 0,
            mars: 0,
            jovian: 0,
            moon: gameOptions.moonExpansion ? 0 : -1,
            vps: [],
        };
    }
    static onCardPlayed(player, card) {
        if (player.game.gameOptions.pathfindersExpansion === false) {
            return;
        }
        const tags = card.tags;
        tags.forEach((tag) => {
            if ((0, PathfindersData_1.isPlanetaryTag)(tag)) {
                PathfindersExpansion.raiseTrack(tag, player);
            }
        });
    }
    static raiseTrack(tag, player, steps = 1) {
        PathfindersExpansion.raiseTrackEssense(tag, player, player.game, steps, true);
    }
    static raiseTrackForGlobalEvent(tag, name, game, steps = 1, gainRewards = true) {
        PathfindersExpansion.raiseTrackEssense(tag, name, game, steps, gainRewards);
    }
    static raiseTrackEssense(tag, from, game, steps = 1, gainRewards = true) {
        const data = game.pathfindersData;
        if (data === undefined) {
            return;
        }
        const track = exports.TRACKS[tag];
        if (track === undefined) {
            return;
        }
        let space = data[tag];
        if (space === -1) {
            return;
        }
        const lastSpace = Math.min(track.spaces.length - 1, space + steps);
        const distance = lastSpace - space;
        if (distance === 0)
            return;
        if (typeof (from) === 'object') {
            game.log('${0} raised the ${1} planetary track ${2} step(s)', (b) => {
                b.player(from).string(tag).number(distance);
            });
        }
        else {
            game.log('Global Event ${0} raised the ${1} planetary track ${2} step(s)', (b) => {
                b.globalEventName(from).string(tag).number(distance);
            });
        }
        while (space < lastSpace) {
            space++;
            data[tag] = space;
            const rewards = track.spaces[space];
            if (gainRewards) {
                if (typeof (from) === 'object') {
                    rewards.risingPlayer.forEach((reward) => {
                        PathfindersExpansion.grant(reward, from, tag);
                    });
                }
            }
            rewards.everyone.forEach((reward) => {
                game.getPlayers().forEach((p) => {
                    PathfindersExpansion.grant(reward, p, tag);
                });
            });
            if (rewards.mostTags.length > 0) {
                const players = PathfindersExpansion.playersWithMostTags(tag, game.getPlayers().slice(), (typeof (from) === 'object') ? from : undefined);
                rewards.mostTags.forEach((reward) => {
                    players.forEach((p) => {
                        PathfindersExpansion.grant(reward, p, tag);
                    });
                });
            }
        }
    }
    static grant(reward, player, tag) {
        const game = player.game;
        switch (reward) {
            case '1vp':
                game.pathfindersData?.vps.push({ id: player.id, tag, points: 1 });
                game.log('${0} has the most ${1} tags and earns 1VP', (b) => b.player(player).string(tag));
                break;
            case '2vp':
                game.pathfindersData?.vps.push({ id: player.id, tag, points: 2 });
                game.log('${0} has the most ${1} tags and earns 2VP', (b) => b.player(player).string(tag));
                break;
            case '3mc':
                player.stock.add(Resource_1.Resource.MEGACREDITS, 3, { log: true });
                break;
            case '6mc':
                player.stock.add(Resource_1.Resource.MEGACREDITS, 6, { log: true });
                break;
            case 'any_resource':
                game.defer(new GrantResourceDeferred_1.GrantResourceDeferred(player, false));
                break;
            case 'card':
                player.drawCard();
                break;
            case 'city':
                game.defer(new PlaceCityTile_1.PlaceCityTile(player));
                break;
            case 'delegate':
                Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => {
                    if (turmoil.hasDelegatesInReserve(player)) {
                        game.defer(new SendDelegateToArea_1.SendDelegateToArea(player));
                    }
                }, () => player.stock.add(Resource_1.Resource.MEGACREDITS, 3, { log: true }));
                break;
            case 'energy':
                player.stock.add(Resource_1.Resource.ENERGY, 1, { log: true });
                break;
            case 'energy_production':
                player.production.add(Resource_1.Resource.ENERGY, 1, { log: true });
                break;
            case 'floater':
                game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, CardResource_1.CardResource.FLOATER));
                break;
            case 'greenery':
                game.defer(new PlaceGreeneryTile_1.PlaceGreeneryTile(player));
                break;
            case 'heat':
                player.stock.add(Resource_1.Resource.HEAT, 1, { log: true });
                break;
            case 'heat_production':
                player.production.add(Resource_1.Resource.HEAT, 1, { log: true });
                break;
            case 'moon_mine':
                game.defer(new PlaceMoonMineTile_1.PlaceMoonMineTile(player));
                break;
            case 'moon_road':
                game.defer(new PlaceMoonRoadTile_1.PlaceMoonRoadTile(player));
                break;
            case 'ocean':
                game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
                break;
            case 'plant':
                player.stock.add(Resource_1.Resource.PLANTS, 1, { log: true });
                break;
            case 'plant_production':
                player.production.add(Resource_1.Resource.PLANTS, 1, { log: true });
                break;
            case 'resource':
                player.defer(new GainResources_1.GainResources(player, 1, 'Gain 1 resource for your Planetary track bonus.'));
                break;
            case 'steel':
                player.stock.add(Resource_1.Resource.STEEL, 1, { log: true });
                break;
            case 'steel_production':
                player.production.add(Resource_1.Resource.STEEL, 1, { log: true });
                break;
            case 'titanium':
                player.stock.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                break;
            case 'titanium_production':
                player.production.add(Resource_1.Resource.TITANIUM, 1, { log: true });
                break;
            case 'tr':
                player.increaseTerraformRating();
                break;
            case 'venus_scale':
                if (game.gameOptions.venusNextExtension) {
                    game.increaseVenusScaleLevel(player, 1);
                }
                else {
                    player.game.log('TODO: come up with some reward in place of Increase Venus Scale.');
                }
                break;
            default:
                throw new Error('Unknown reward: ' + reward);
        }
    }
    static playersWithMostTags(tag, players, activePlayer) {
        const counts = players.map((player) => {
            const includeWildTags = player.id === activePlayer?.id;
            const count = player.tags.count(tag, includeWildTags ? 'default' : 'raw');
            return { player, count };
        });
        const max = Math.max(...counts.map((c) => c.count));
        const filtered = counts.filter((c) => c.count === max);
        const result = filtered.map((c) => c.player);
        return result;
    }
    static calculateVictoryPoints(player, victoryPointsBreakdown) {
        const data = player.game.pathfindersData;
        if (data === undefined) {
            return;
        }
        data.vps
            .filter((vp) => vp.id === player.id)
            .forEach((vp) => victoryPointsBreakdown.setVictoryPoints('planetary tracks', vp.points, vp.tag));
    }
    static addToSolBank(player) {
        const solBank = player.getCorporation(CardName_1.CardName.SOLBANK);
        if (solBank !== undefined) {
            player.defer(() => player.addResourceTo(solBank, { qty: 1, log: true }), Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
    }
}
exports.PathfindersExpansion = PathfindersExpansion;
