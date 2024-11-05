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
    'Engineer',
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
    'Constructor',
    'Investor',
    'Mogul',
    'Traveller',
];
exports.AWARD_RENAMES = new Map([
    ['Manufacturer', 'A. Manufacturer'],
    ['Politician', 'T. Politician'],
]);
function maybeRenamedAward(name) {
    const renamed = exports.AWARD_RENAMES.get(name);
    return renamed ?? name;
}
exports.maybeRenamedAward = maybeRenamedAward;
