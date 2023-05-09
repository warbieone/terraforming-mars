"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const http = require("http");
const fs = require("fs");
const MilestoneAwardSelector_1 = require("../ma/MilestoneAwardSelector");
const GameOptions_1 = require("../GameOptions");
const BoardName_1 = require("../../common/boards/BoardName");
const RandomMAOptionType_1 = require("../../common/ma/RandomMAOptionType");
const mnemonist_1 = require("mnemonist");
function processRequest(req, res) {
    if (req.url === undefined) {
        return;
    }
    const url = new URL(req.url, `http://localhost`);
    if (url.pathname === '/') {
        fs.readFile('src/server/tools/analyze_ma.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.write('Internal server error ' + err);
                res.end();
            }
            res.setHeader('Content-Length', data.length);
            res.end(data);
        });
    }
    else if (url.pathname === '/data') {
        const data = calc(url.searchParams);
        res.setHeader('Content-type', 'text/csv');
        res.setHeader('Content-Length', data.length);
        res.end(data);
    }
    else {
        res.writeHead(404);
        res.write('Not found');
        res.end();
    }
}
const server = http.createServer(processRequest);
console.log('Starting server on port ' + (process.env.PORT || 8081));
server.listen(process.env.PORT || 8081);
function calc(params) {
    const runs = Number(params.get('runs') || 100);
    const options = simpleGameOptions();
    if (params.get('venus') === 'true') {
        options.venusNextExtension = true;
        options.includeVenusMA = true;
    }
    if (params.get('ares') === 'true') {
        options.aresExtension = true;
    }
    if (params.get('moon') === 'true') {
        options.moonExpansion = true;
    }
    if (params.get('fan-maps') === 'true') {
        options.includeFanMA = true;
    }
    const type = params.get('type');
    switch (type) {
        case 'NONE':
            options.randomMA = RandomMAOptionType_1.RandomMAOptionType.NONE;
            break;
        case 'LIMITED':
            options.randomMA = RandomMAOptionType_1.RandomMAOptionType.LIMITED;
            break;
        case 'FULL':
            options.randomMA = RandomMAOptionType_1.RandomMAOptionType.UNLIMITED;
            break;
    }
    const results = new mnemonist_1.MultiSet();
    for (let nth = 1; nth <= runs; nth++) {
        if (nth % 100 === 0) {
            console.log(`#${nth}`);
        }
        try {
            const mas = (0, MilestoneAwardSelector_1.chooseMilestonesAndAwards)(options);
            mas.awards.forEach((award) => results.add(award.name));
            mas.milestones.forEach((milestone) => results.add(milestone.name));
        }
        catch (err) {
            console.log(err);
            results.add('ERROR');
        }
    }
    const copy = new Array(...results.multiplicities());
    copy.sort((a, b) => b[1] - a[1]);
    return 'name,count\n' + copy.map(([name, count]) => `${name},${count}`).join('\n');
}
function simpleGameOptions() {
    return Object.assign(Object.assign({}, GameOptions_1.DEFAULT_GAME_OPTIONS), { aresHazards: false, corporateEra: false, initialDraftVariant: false, showTimers: false, startingCorporations: 0, boardName: BoardName_1.BoardName.THARSIS, venusNextExtension: false, aresExtension: false, includeVenusMA: false, moonExpansion: false, pathfindersExpansion: false, includeFanMA: false, randomMA: RandomMAOptionType_1.RandomMAOptionType.NONE });
}
