"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectColony = void 0;
const PlayerInput_1 = require("../PlayerInput");
const InputResponse_1 = require("../../common/inputs/InputResponse");
const ModelUtils_1 = require("../models/ModelUtils");
class SelectColony extends PlayerInput_1.BasePlayerInput {
    constructor(title, buttonLabel = 'Save', colonies) {
        super('colony', title);
        this.colonies = colonies;
        this.showTileOnly = false;
        this.buttonLabel = buttonLabel;
    }
    toModel(player) {
        return {
            title: this.title,
            buttonLabel: this.buttonLabel,
            type: 'colony',
            coloniesModel: (0, ModelUtils_1.coloniesToModel)(player.game, this.colonies, this.showTileOnly),
        };
    }
    process(input) {
        if (!(0, InputResponse_1.isSelectColonyResponse)(input)) {
            throw new Error('Not a valid SelectColonyResponse');
        }
        if (input.colonyName === undefined) {
            throw new Error('No colony selected');
        }
        const colony = this.colonies.find((c) => c.name === input.colonyName);
        if (colony === undefined) {
            throw new Error(`Colony ${input.colonyName} not found`);
        }
        return this.cb(colony);
    }
}
exports.SelectColony = SelectColony;
