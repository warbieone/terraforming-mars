"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const MilestoneAwardSynergies_1 = require("../ma/MilestoneAwardSynergies");
const MilestoneName_1 = require("../../common/ma/MilestoneName");
const AwardName_1 = require("../../common/ma/AwardName");
const Milestones_1 = require("../milestones/Milestones");
const Awards_1 = require("../awards/Awards");
function get(name) {
    try {
        return Milestones_1.Milestones.getByName(name);
    }
    catch (err) {
        return Awards_1.Awards.getByName(name);
    }
}
const manames = [...MilestoneName_1.milestoneNames, ...AwardName_1.awardNames];
for (const name of manames) {
    const first = get(name);
    console.log(`${first.name} (${first.description}):`);
    const entries = [];
    for (const name2 of manames) {
        const second = get(name2);
        const x = MilestoneAwardSynergies_1.synergies.get(name, name2);
        if (x === 1000 || x === 0)
            continue;
        entries.push(` ${x} ${second.name} (${second.description})`);
    }
    entries.sort().reverse();
    entries.forEach((x) => console.log(x));
    console.log();
}
