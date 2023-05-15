"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVictoryPoints = void 0;
const constants = require("../../common/constants");
const Phase_1 = require("../../common/Phase");
const CeoExtension_1 = require("../CeoExtension");
const Board_1 = require("../boards/Board");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const PathfindersExpansion_1 = require("../pathfinders/PathfindersExpansion");
const Turmoil_1 = require("../turmoil/Turmoil");
const VictoryPointsBreakdown_1 = require("./VictoryPointsBreakdown");
const AwardScorer_1 = require("../awards/AwardScorer");
function calculateVictoryPoints(player) {
    var _a;
    const victoryPointsBreakdown = new VictoryPointsBreakdown_1.VictoryPointsBreakdown();
    for (const playedCard of player.tableau) {
        if (playedCard.victoryPoints !== undefined) {
            victoryPointsBreakdown.setVictoryPoints('victoryPoints', playedCard.getVictoryPoints(player), playedCard.name);
        }
    }
    victoryPointsBreakdown.setVictoryPoints('terraformRating', player.getTerraformRating());
    giveAwards(player, victoryPointsBreakdown);
    for (const milestone of player.game.claimedMilestones) {
        if (milestone.player !== undefined && milestone.player.id === player.id) {
            victoryPointsBreakdown.setVictoryPoints('milestones', 5, 'Claimed ' + milestone.milestone.name + ' milestone');
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
    CeoExtension_1.CeoExtension.calculateVictoryPoints(player, victoryPointsBreakdown);
    if (player.game.gameOptions.escapeVelocityMode) {
        const threshold = player.game.gameOptions.escapeVelocityThreshold;
        const period = player.game.gameOptions.escapeVelocityPeriod;
        const penaltyPerMin = (_a = player.game.gameOptions.escapeVelocityPenalty) !== null && _a !== void 0 ? _a : 1;
        const elapsedTimeInMinutes = player.timer.getElapsedTimeInMinutes();
        if (threshold !== undefined && period !== undefined && elapsedTimeInMinutes > threshold) {
            const overTimeInMinutes = Math.max(elapsedTimeInMinutes - threshold - (player.actionsTakenThisGame * (constants.BONUS_SECONDS_PER_ACTION / 60)), 0);
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
        vpb.setVictoryPoints('awards', vps, `${place} place for ${fundedAward.award.name} award (funded by ${fundedAward.player.name})`);
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
//# sourceMappingURL=calculateVictoryPoints.js.map