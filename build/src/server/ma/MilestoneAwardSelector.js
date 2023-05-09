"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySynergyRules = exports.chooseMilestonesAndAwards = exports.LIMITED_SYNERGY = exports.maximumSynergy = void 0;
const Awards_1 = require("../awards/Awards");
const BoardName_1 = require("../../common/boards/BoardName");
const Milestones_1 = require("../milestones/Milestones");
const FullMoon_1 = require("../moon/FullMoon");
const Lunarchitect_1 = require("../moon/Lunarchitect");
const LunarMagnate_1 = require("../moon/LunarMagnate");
const OneGiantStep_1 = require("../moon/OneGiantStep");
const RandomMAOptionType_1 = require("../../common/ma/RandomMAOptionType");
const shuffle_1 = require("../utils/shuffle");
const Random_1 = require("../Random");
const utils_1 = require("../../common/utils/utils");
const MilestoneAwardSynergies_1 = require("./MilestoneAwardSynergies");
function maximumSynergy(names) {
    let max = 0;
    for (let i = 0; i < names.length - 1; i++) {
        for (let j = i + 1; j < names.length; j++) {
            const synergy = MilestoneAwardSynergies_1.synergies.get(names[i], names[j]);
            max = Math.max(synergy, max);
        }
    }
    return max;
}
exports.maximumSynergy = maximumSynergy;
exports.LIMITED_SYNERGY = {
    maxSynergyAllowed: 6,
    totalSynergyAllowed: 20,
    numberOfHighAllowed: 20,
    highThreshold: 4,
};
const UNLIMITED_SYNERGY = {
    maxSynergyAllowed: 100,
    totalSynergyAllowed: 100,
    numberOfHighAllowed: 100,
    highThreshold: 100,
};
function chooseMilestonesAndAwards(gameOptions) {
    let drawnMilestonesAndAwards = {
        milestones: [],
        awards: [],
    };
    function push(milestones, awards) {
        drawnMilestonesAndAwards.milestones.push(...milestones);
        drawnMilestonesAndAwards.awards.push(...awards);
    }
    const includeVenus = gameOptions.venusNextExtension && gameOptions.includeVenusMA;
    const requiredQty = includeVenus ? 6 : 5;
    switch (gameOptions.randomMA) {
        case RandomMAOptionType_1.RandomMAOptionType.NONE:
            switch (gameOptions.boardName) {
                case BoardName_1.BoardName.THARSIS:
                    push(Milestones_1.THARSIS_MILESTONES, Awards_1.THARSIS_AWARDS);
                    break;
                case BoardName_1.BoardName.HELLAS:
                    push(Milestones_1.HELLAS_MILESTONES, Awards_1.HELLAS_AWARDS);
                    break;
                case BoardName_1.BoardName.ELYSIUM:
                    push(Milestones_1.ELYSIUM_MILESTONES, Awards_1.ELYSIUM_AWARDS);
                    break;
                case BoardName_1.BoardName.ARABIA_TERRA:
                    push(Milestones_1.ARABIA_TERRA_MILESTONES, Awards_1.ARABIA_TERRA_AWARDS);
                    break;
                case BoardName_1.BoardName.AMAZONIS:
                    push(Milestones_1.AMAZONIS_PLANITIA_MILESTONES, Awards_1.AMAZONIS_PLANITIA_AWARDS);
                    break;
                case BoardName_1.BoardName.TERRA_CIMMERIA:
                    push(Milestones_1.TERRA_CIMMERIA_MILESTONES, Awards_1.TERRA_CIMMERIA_AWARDS);
                    break;
                case BoardName_1.BoardName.VASTITAS_BOREALIS:
                    push(Milestones_1.VASTITAS_BOREALIS_MILESTONES, Awards_1.VASTITAS_BOREALIS_AWARDS);
                    break;
            }
            if (includeVenus) {
                push(Milestones_1.VENUS_MILESTONES, Awards_1.VENUS_AWARDS);
            }
            if (gameOptions.aresExtension) {
                push(Milestones_1.ARES_MILESTONES, Awards_1.ARES_AWARDS);
            }
            if (gameOptions.moonExpansion) {
                if (Math.random() > 0.5) {
                    push([new OneGiantStep_1.OneGiantStep], [new LunarMagnate_1.LunarMagnate()]);
                }
                else {
                    push([new Lunarchitect_1.Lunarchitect], [new FullMoon_1.FullMoon()]);
                }
            }
            break;
        case RandomMAOptionType_1.RandomMAOptionType.LIMITED:
            drawnMilestonesAndAwards = getRandomMilestonesAndAwards(gameOptions, requiredQty, exports.LIMITED_SYNERGY);
            break;
        case RandomMAOptionType_1.RandomMAOptionType.UNLIMITED:
            drawnMilestonesAndAwards = getRandomMilestonesAndAwards(gameOptions, requiredQty, UNLIMITED_SYNERGY);
            break;
        default:
            throw new Error('Unknown milestone/award type: ' + gameOptions.randomMA);
    }
    return drawnMilestonesAndAwards;
}
exports.chooseMilestonesAndAwards = chooseMilestonesAndAwards;
function getRandomMilestonesAndAwards(gameOptions, numberMARequested, constraints, attempt = 1) {
    const maxAttempts = 5;
    if (attempt > maxAttempts) {
        throw new Error('No limited synergy milestones and awards set was generated after ' + maxAttempts + ' attempts. Please try again.');
    }
    function toName(e) {
        return e.name;
    }
    const candidateMilestones = [...Milestones_1.THARSIS_MILESTONES, ...Milestones_1.ELYSIUM_MILESTONES, ...Milestones_1.HELLAS_MILESTONES].map(toName);
    const candidateAwards = [...Awards_1.THARSIS_AWARDS, ...Awards_1.ELYSIUM_AWARDS, ...Awards_1.HELLAS_AWARDS].map(toName);
    if (gameOptions.venusNextExtension && gameOptions.includeVenusMA) {
        candidateMilestones.push(...Milestones_1.VENUS_MILESTONES.map(toName));
        candidateAwards.push(...Awards_1.VENUS_AWARDS.map(toName));
    }
    if (gameOptions.aresExtension) {
        candidateMilestones.push(...Milestones_1.ARES_MILESTONES.map(toName));
        candidateAwards.push(...Awards_1.ARES_AWARDS.map(toName));
    }
    if (gameOptions.moonExpansion) {
        candidateMilestones.push(...Milestones_1.MOON_MILESTONES.map(toName));
        candidateAwards.push(...Awards_1.MOON_AWARDS.map(toName));
    }
    if (gameOptions.includeFanMA) {
        candidateMilestones.push(...Milestones_1.ARABIA_TERRA_MILESTONES.map(toName), ...Milestones_1.AMAZONIS_PLANITIA_MILESTONES.map(toName), ...Milestones_1.TERRA_CIMMERIA_MILESTONES.map(toName), ...Milestones_1.VASTITAS_BOREALIS_MILESTONES.map(toName));
        candidateAwards.push(...Awards_1.ARABIA_TERRA_AWARDS.map(toName), ...Awards_1.AMAZONIS_PLANITIA_AWARDS.map(toName), ...Awards_1.TERRA_CIMMERIA_AWARDS.map(toName), ...Awards_1.VASTITAS_BOREALIS_AWARDS.map(toName));
        if (!gameOptions.pathfindersExpansion) {
            (0, utils_1.inplaceRemove)(candidateMilestones, 'Martian');
        }
        if (!gameOptions.coloniesExtension) {
            (0, utils_1.inplaceRemove)(candidateMilestones, 'Colonizer');
            (0, utils_1.inplaceRemove)(candidateMilestones, 'Pioneer');
        }
        if (!gameOptions.turmoilExtension) {
            (0, utils_1.inplaceRemove)(candidateAwards, 'Politician');
        }
    }
    (0, shuffle_1.inplaceShuffle)(candidateMilestones, Random_1.UnseededRandom.INSTANCE);
    (0, shuffle_1.inplaceShuffle)(candidateAwards, Random_1.UnseededRandom.INSTANCE);
    const accum = new Accumulator(constraints);
    while (accum.milestones.length + accum.awards.length < numberMARequested * 2) {
        if (accum.awards.length === numberMARequested || (accum.milestones.length !== numberMARequested && Math.round(Math.random()))) {
            const newMilestone = candidateMilestones.splice(0, 1)[0];
            if (newMilestone === undefined) {
                return getRandomMilestonesAndAwards(gameOptions, numberMARequested, constraints, attempt + 1);
            }
            accum.add(newMilestone, true);
        }
        else {
            const newAward = candidateAwards.splice(0, 1)[0];
            if (newAward === undefined) {
                return getRandomMilestonesAndAwards(gameOptions, numberMARequested, constraints, attempt + 1);
            }
            accum.add(newAward, false);
        }
    }
    if (!verifySynergyRules(accum.milestones.concat(accum.awards), constraints)) {
        throw new Error('The randomized milestones and awards set does not satisfy the given synergy rules.');
    }
    return {
        milestones: accum.milestones.map((name) => Milestones_1.Milestones.getByName(name)),
        awards: accum.awards.map((name) => Awards_1.Awards.getByName(name)),
    };
}
function verifySynergyRules(mas, constraints) {
    let max = 0;
    let totalSynergy = 0;
    let numberOfHigh = 0;
    for (let i = 0; i < mas.length - 1; i++) {
        for (let j = i + 1; j < mas.length; j++) {
            const synergy = MilestoneAwardSynergies_1.synergies.get(mas[i], mas[j]);
            max = Math.max(synergy, max);
            totalSynergy += synergy;
            if (synergy >= constraints.highThreshold)
                numberOfHigh++;
        }
    }
    return max <= constraints.maxSynergyAllowed &&
        totalSynergy <= constraints.totalSynergyAllowed &&
        numberOfHigh <= constraints.numberOfHighAllowed;
}
exports.verifySynergyRules = verifySynergyRules;
class Accumulator {
    constructor(constraints) {
        this.constraints = constraints;
        this.milestones = [];
        this.awards = [];
        this.accumulatedHighCount = 0;
        this.accumulatedTotalSynergy = 0;
    }
    add(candidate, milestone) {
        let totalSynergy = this.accumulatedTotalSynergy;
        let highCount = this.accumulatedHighCount;
        let max = 0;
        this.milestones.concat(this.awards).forEach((ma) => {
            const synergy = MilestoneAwardSynergies_1.synergies.get(ma, candidate);
            totalSynergy += synergy;
            if (synergy >= this.constraints.highThreshold) {
                highCount++;
            }
            max = Math.max(synergy, max);
        });
        if (max <= this.constraints.maxSynergyAllowed &&
            highCount <= this.constraints.numberOfHighAllowed &&
            totalSynergy <= this.constraints.totalSynergyAllowed) {
            if (milestone) {
                this.milestones.push(candidate);
            }
            else {
                this.awards.push(candidate);
            }
            this.accumulatedHighCount = highCount;
            this.accumulatedTotalSynergy = totalSynergy;
            return true;
        }
        else {
            return false;
        }
    }
}
