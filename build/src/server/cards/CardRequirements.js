"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRequirements = void 0;
const CardRequirement_1 = require("./CardRequirement");
const RequirementType_1 = require("../../common/cards/RequirementType");
const constants_1 = require("../../common/constants");
class CardRequirements {
    constructor(requirements) {
        this.requirements = requirements;
    }
    static builder(f) {
        const builder = new Builder();
        f(builder);
        return builder.build();
    }
    satisfies(player) {
        const tags = [];
        this.requirements.forEach((requirement) => {
            if ((requirement.type === RequirementType_1.RequirementType.TAG) &&
                requirement.isAny !== true && requirement.isMax !== true) {
                tags.push(requirement.tag);
            }
        });
        if (tags.length > 1 && !player.tags.playerHas(tags)) {
            return false;
        }
        return this.requirements.every((requirement) => requirement.satisfies(player));
    }
}
exports.CardRequirements = CardRequirements;
class Builder {
    constructor() {
        this.reqs = [];
    }
    build() {
        return new CardRequirements(this.reqs);
    }
    oceans(amount = 1, options) {
        const req = new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.OCEANS, amount, options);
        if (req.amount <= 0 || req.amount > constants_1.MAX_OCEAN_TILES) {
            throw new Error('Ocean tiles must be above 0 and below ' + constants_1.MAX_OCEAN_TILES);
        }
        this.reqs.push(req);
        return this;
    }
    oxygen(amount = 1, options) {
        const req = new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.OXYGEN, amount, options);
        if (req.amount < constants_1.MIN_OXYGEN_LEVEL || req.amount > constants_1.MAX_OXYGEN_LEVEL) {
            throw new Error('Oxygen must be above ' + constants_1.MIN_OXYGEN_LEVEL + ' and below ' + constants_1.MAX_OXYGEN_LEVEL);
        }
        this.reqs.push(req);
        return this;
    }
    temperature(amount = 1, options) {
        const req = new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.TEMPERATURE, amount, options);
        if (req.amount < constants_1.MIN_TEMPERATURE || req.amount > constants_1.MAX_TEMPERATURE) {
            throw new Error('Temperature must be above ' + constants_1.MIN_TEMPERATURE + ' and below ' + constants_1.MAX_TEMPERATURE);
        }
        if (req.amount % 2 !== 0) {
            throw new Error('Temperature must be even');
        }
        this.reqs.push(req);
        return this;
    }
    venus(amount = 1, options) {
        const req = new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.VENUS, amount, options);
        if (req.amount < constants_1.MIN_VENUS_SCALE || req.amount > constants_1.MAX_VENUS_SCALE) {
            throw new Error('Venus must be above ' + constants_1.MIN_VENUS_SCALE + ' and below ' + constants_1.MAX_VENUS_SCALE);
        }
        this.reqs.push(req);
        return this;
    }
    tr(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.TR, amount, options));
        return this;
    }
    chairman() {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.CHAIRMAN));
        return this;
    }
    resourceTypes(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.RESOURCE_TYPES, amount, options));
        return this;
    }
    greeneries(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.GREENERIES, amount, options));
        return this;
    }
    cities(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.CITIES, amount, options));
        return this;
    }
    colonies(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.COLONIES, amount, options));
        return this;
    }
    floaters(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.FLOATERS, amount, options));
        return this;
    }
    partyLeaders(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.PARTY_LEADERS, amount, options));
        return this;
    }
    tag(tag, amount = 1, options) {
        this.reqs.push(new CardRequirement_1.TagCardRequirement(tag, amount, options));
        return this;
    }
    production(resource, amount = 1, options) {
        this.reqs.push(new CardRequirement_1.ProductionCardRequirement(resource, amount, options));
        return this;
    }
    party(party) {
        this.reqs.push(new CardRequirement_1.PartyCardRequirement(party));
        return this;
    }
    plantsRemoved() {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.REMOVED_PLANTS));
        return this;
    }
    habitatRate(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.HABITAT_RATE, amount, options));
        return this;
    }
    miningRate(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.MINING_RATE, amount, options));
        return this;
    }
    logisticRate(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.LOGISTIC_RATE, amount, options));
        return this;
    }
    habitatTiles(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.HABITAT_TILES, amount, options));
        return this;
    }
    miningTiles(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.MINING_TILES, amount, options));
        return this;
    }
    roadTiles(amount = 1, options) {
        this.reqs.push(new CardRequirement_1.CardRequirement(RequirementType_1.RequirementType.ROAD_TILES, amount, options));
        return this;
    }
}
