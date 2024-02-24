"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeClaimedMilestones = exports.serializeClaimedMilestones = void 0;
function serializeClaimedMilestones(claimedMilestones) {
    return claimedMilestones.map((claimedMilestone) => {
        return {
            name: claimedMilestone.milestone.name,
            playerId: claimedMilestone.player.id,
        };
    });
}
exports.serializeClaimedMilestones = serializeClaimedMilestones;
function deserializeClaimedMilestones(claimedMilestones, players, milestones) {
    const ms = new Set();
    const filtered = [];
    for (const claimedMilestone of claimedMilestones) {
        const name = claimedMilestone.name;
        if (name === undefined) {
            throw new Error('Milestone name not found');
        }
        const playerId = claimedMilestone.playerId;
        if (playerId === undefined) {
            throw new Error(`Player ID not found when rebuilding claimed milestone ${name}`);
        }
        if (ms.has(name)) {
            console.error('Found duplicate milestone: ' + name);
            continue;
        }
        else {
            filtered.push({ name, playerId });
            ms.add(name);
        }
    }
    return filtered.map((element) => {
        const milestoneName = element.name;
        const milestone = milestones.find((milestone) => milestone.name === milestoneName);
        if (milestone === undefined) {
            throw new Error(`Milestone ${milestoneName} not found when rebuilding Claimed Milestone`);
        }
        const playerId = element.playerId;
        const player = players.find((player) => player.id === playerId);
        if (player === undefined) {
            throw new Error(`Player ${playerId} not found when rebuilding claimed milestone ${milestoneName}`);
        }
        return { milestone, player };
    });
}
exports.deserializeClaimedMilestones = deserializeClaimedMilestones;
