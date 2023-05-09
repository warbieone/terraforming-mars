"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeFundedAwards = exports.serializeFundedAwards = void 0;
function serializeFundedAwards(fundedAwards) {
    return fundedAwards.map((fundedAward) => {
        return {
            name: fundedAward.award.name,
            playerId: fundedAward.player.id,
        };
    });
}
exports.serializeFundedAwards = serializeFundedAwards;
function deserializeFundedAwards(fundedAwards, players, awards) {
    const aw = new Set();
    const filtered = [];
    for (const fundedAward of fundedAwards) {
        const name = fundedAward.name;
        if (name === undefined) {
            throw new Error('Award name not found');
        }
        const playerId = fundedAward.playerId;
        if (playerId === undefined) {
            throw new Error(`Player ID not found when rebuilding funded award ${name}`);
        }
        if (aw.has(name)) {
            console.error('Found duplicate award: ' + name);
            continue;
        }
        else {
            filtered.push({ name, playerId });
            aw.add(name);
        }
    }
    return filtered.map((element) => {
        const awardName = element.name;
        const award = awards.find((award) => award.name === awardName);
        if (award === undefined) {
            throw new Error(`Award ${awardName} not found when rebuilding Funded Award`);
        }
        const playerId = element.playerId;
        const player = players.find((player) => player.id === playerId);
        if (player === undefined) {
            throw new Error(`Player ${playerId} not found when rebuilding Funded Award ${awardName}`);
        }
        return { award, player };
    });
}
exports.deserializeFundedAwards = deserializeFundedAwards;
