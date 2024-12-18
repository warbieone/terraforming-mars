"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeRenamedAward = exports.AWARD_RENAMES = exports.awardNames = void 0;
exports.awardNames = [
    'Landlord',
    'Scientist',
    'Banker',
    'Thermalist',
    'Miner',
    'Celebrity',
    'Industrialist',
    'Desert Settler',
    'Estate Dealer',
    'Benefactor',
    'Contractor',
    'Cultivator',
    'Excentric',
    'Magnate',
    'Space Baron',
    'Venuphile',
    'Entrepreneur',
    'Full Moon',
    'Lunar Magnate',
    'Curator',
    'A. Engineer',
    'Tourist',
    'A. Zoologist',
    'Cosmic Settler',
    'Botanist',
    'Coordinator',
    'A. Manufacturer',
    'Zoologist',
    'Biologist',
    'T. Economizer',
    'T. Politician',
    'Urbanist',
    'Warmonger',
    'Adapter',
    'Edgedancer',
    'Hoarder',
    'Naturalist',
    'Voyager',
    'Kingpin',
    'EdgeLord',
    'Administrator',
    'Collector',
    'Constructor',
    'Electrician',
    'Founder',
    'Highlander',
    'Investor',
    'Landscaper',
    'Manufacturer',
    'Metropolist',
    'Mogul',
    'Politician',
    'Traveller',
];
exports.AWARD_RENAMES = new Map([
    ['Engineer', 'A. Engineer'],
]);
function maybeRenamedAward(name) {
    const renamed = exports.AWARD_RENAMES.get(name);
    return renamed ?? name;
}
exports.maybeRenamedAward = maybeRenamedAward;
