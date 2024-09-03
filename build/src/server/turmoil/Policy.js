"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyDescription = exports.Policy = void 0;
class Policy {
    onPolicyStart(game) {
        game.getPlayersInGenerationOrder().forEach((p) => this.onPolicyStartForPlayer(p));
    }
    onPolicyEnd(game) {
        game.getPlayersInGenerationOrder().forEach((p) => this.onPolicyEndForPlayer(p));
    }
}
exports.Policy = Policy;
function policyDescription(policy, player) {
    return typeof (policy.description) === 'string' ? policy.description : policy.description(player);
}
exports.policyDescription = policyDescription;
