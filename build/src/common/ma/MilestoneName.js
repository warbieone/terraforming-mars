"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeRenamedMilestone = exports.milestoneNames = void 0;
exports.milestoneNames = [
    'Terraformer',
    'Mayor',
    'Gardener',
    'Planner',
    'Builder',
    'Generalist',
    'Specialist',
    'Ecologist',
    'Tycoon',
    'Legend',
    'Diversifier',
    'Tactician',
    'Polar Explorer',
    'Energizer',
    'Rim Settler',
    'Hoverlord',
    'Networker',
    'One Giant Step',
    'Lunarchitect',
    'Colonizer',
    'Farmer',
    'Minimalist',
    'Terran',
    'Tropicalist',
    'Economizer',
    'Pioneer',
    'Land Specialist',
    'Martian',
    'Businessperson',
    'T. Collector',
    'Firestarter',
    'Terra Pioneer',
    'Spacefarer',
    'Gambler',
    'V. Electrician',
    'Smith',
    'Tradesman',
    'Irrigator',
    'Capitalist',
    'Tunneler',
    'Risktaker',
    'Fundraiser',
    'Philantropist',
    'Producer',
    'Researcher',
    'Sponsor',
];
const MILESTONE_RENAMES = new Map([
    ['Electrician', 'V. Electrician'],
    ['Collector', 'T. Collector'],
]);
function maybeRenamedMilestone(name) {
    const renamed = MILESTONE_RENAMES.get(name);
    return renamed ?? name;
}
exports.maybeRenamedMilestone = maybeRenamedMilestone;
