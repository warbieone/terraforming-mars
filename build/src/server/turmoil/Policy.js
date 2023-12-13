"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.policyDescription = void 0;
function policyDescription(policy, player) {
    return typeof (policy.description) === 'string' ? policy.description : policy.description(player);
}
exports.policyDescription = policyDescription;
//# sourceMappingURL=Policy.js.map