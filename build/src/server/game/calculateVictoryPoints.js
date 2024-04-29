"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVictoryPoints = void 0;
const Phase_1 = require("../../common/Phase");
const Board_1 = require("../boards/Board");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const PathfindersExpansion_1 = require("../pathfinders/PathfindersExpansion");
const Turmoil_1 = require("../turmoil/Turmoil");
const VictoryPointsBreakdown_1 = require("./VictoryPointsBreakdown");
const AwardScorer_1 = require("../awards/AwardScorer");
function calculateVictoryPoints(player) {
    const victoryPointsBreakdown = new VictoryPointsBreakdown_1.VictoryPointsBreakdown();
    let negativeVP = 0;
    for (const playedCard of player.tableau) {
        if (playedCard.victoryPoints !== undefined) {
            const vp = playedCard.getVictoryPoints(player);
            victoryPointsBreakdown.setVictoryPoints('victoryPoints', vp, playedCard.name);
            if (vp < 0) {
                negativeVP += vp;
            }
        }
    }
    victoryPointsBreakdown.setVictoryPoints('terraformRating', player.getTerraformRating());
    giveAwards(player, victoryPointsBreakdown);
    for (const milestone of player.game.claimedMilestones) {
        if (milestone.player !== undefined && milestone.player.id === player.id) {
            victoryPointsBreakdown.setVictoryPoints('milestones', 5, 'Claimed ${0} milestone', [milestone.milestone.name]);
        }
    }
    player.game.board.spaces.forEach((space) => {
        if (Board_1.Board.isGreenerySpace(space) && Board_1.Board.spaceOwnedBy(space, player)) {
            victoryPointsBreakdown.setVictoryPoints('greenery', 1);
        }
        if (Board_1.Board.isCitySpace(space) && Board_1.Board.spaceOwnedBy(space, player)) {
            const adjacent = player.game.board.getAdjacentSpaces(space);
            for (const adj of adjacent) {
                if (Board_1.Board.isGreenerySpace(adj)) {
                    victoryPointsBreakdown.setVictoryPoints('city', 1);
                }
            }
        }
    });
    const includeTurmoilVP = player.game.gameIsOver() || player.game.phase === Phase_1.Phase.END;
    Turmoil_1.Turmoil.ifTurmoil(player.game, (turmoil) => {
        if (includeTurmoilVP) {
            victoryPointsBreakdown.setVictoryPoints('victoryPoints', turmoil.getPlayerVictoryPoints(player), 'Turmoil Points');
        }
    });
    player.colonies.calculateVictoryPoints(victoryPointsBreakdown);
    MoonExpansion_1.MoonExpansion.calculateVictoryPoints(player, victoryPointsBreakdown);
    PathfindersExpansion_1.PathfindersExpansion.calculateVictoryPoints(player, victoryPointsBreakdown);
    if (player.game.gameOptions.underworldExpansion === true) {
        const bribe = Math.min(Math.abs(negativeVP), player.underworldData.corruption);
        victoryPointsBreakdown.setVictoryPoints('victoryPoints', bribe, 'Underworld Corruption Bribe');
    }
    if (player.game.gameOptions.escapeVelocityMode) {
        const threshold = player.game.gameOptions.escapeVelocityThreshold;
        const bonusSecondsPerAction = player.game.gameOptions.escapeVelocityBonusSeconds;
        const period = player.game.gameOptions.escapeVelocityPeriod;
        const penaltyPerMin = player.game.gameOptions.escapeVelocityPenalty ?? 1;
        const elapsedTimeInMinutes = player.timer.getElapsedTimeInMinutes();
        if (threshold !== undefined && bonusSecondsPerAction !== undefined && period !== undefined && elapsedTimeInMinutes > threshold) {
            const overTimeInMinutes = Math.max(elapsedTimeInMinutes - threshold - (player.actionsTakenThisGame * (bonusSecondsPerAction / 60)), 0);
            victoryPointsBreakdown.updateTotal();
            const totalBeforeEscapeVelocity = victoryPointsBreakdown.points.total;
            const penaltyTotal = Math.min(penaltyPerMin * Math.floor(overTimeInMinutes / period), totalBeforeEscapeVelocity);
            victoryPointsBreakdown.setVictoryPoints('escapeVelocity', -penaltyTotal, 'Escape Velocity Penalty');
        }
    }
    victoryPointsBreakdown.updateTotal();
    return victoryPointsBreakdown.points;
}
exports.calculateVictoryPoints = calculateVictoryPoints;
function maybeSetVP(thisPlayer, awardWinner, fundedAward, vps, place, vpb) {
    if (thisPlayer.id === awardWinner.id) {
        vpb.setVictoryPoints('awards', vps, '${0} place for ${1} award (funded by ${2})', [place, fundedAward.award.name, fundedAward.player.name]);
    }
}
function giveAwards(player, vpb) {
    if (player.game.isSoloMode())
        return;
    player.game.fundedAwards.forEach((fundedAward) => {
        const award = fundedAward.award;
        const scorer = new AwardScorer_1.AwardScorer(player.game, award);
        const players = player.game.getPlayers().slice();
        players.sort((p1, p2) => scorer.get(p2) - scorer.get(p1));
        if (scorer.get(players[0]) > scorer.get(players[1])) {
            maybeSetVP(player, players[0], fundedAward, 5, '1st', vpb);
            players.shift();
            if (players.length > 1) {
                if (scorer.get(players[0]) > scorer.get(players[1])) {
                    maybeSetVP(player, players[0], fundedAward, 2, '2nd', vpb);
                }
                else {
                    const score = scorer.get(players[0]);
                    while (players.length > 0 && scorer.get(players[0]) === score) {
                        maybeSetVP(player, players[0], fundedAward, 2, '2nd', vpb);
                        players.shift();
                    }
                }
            }
        }
        else {
            const score = scorer.get(players[0]);
            while (players.length > 0 && scorer.get(players[0]) === score) {
                maybeSetVP(player, players[0], fundedAward, 5, '1st', vpb);
                players.shift();
            }
        }
    });
}
