"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelectResourcesResponse = exports.isSelectResourceResponse = exports.isSelectPolicyResponse = exports.isSelectGlobalEventResponse = exports.isAresGlobalParametersResponse = exports.isShiftAresGlobalParametersResponse = exports.isSelectProductionToLoseResponse = exports.isSelectPaymentResponse = exports.isSelectColonyResponse = exports.isSelectAmountResponse = exports.isSelectDelegateResponse = exports.isSelectPartyResponse = exports.isSelectPlayerResponse = exports.isSelectSpaceResponse = exports.isSelectProjectCardToPlayResponse = exports.isSelectCardResponse = exports.isSelectInitialCardsResponse = exports.isAndOptionsResponse = exports.isOrOptionsResponse = exports.isSelectOptionResponse = void 0;
const utils_1 = require("../utils/utils");
function matches(response, fields) {
    return (0, utils_1.twoWayDifference)(Object.keys(response), fields).length === 0;
}
function isSelectOptionResponse(response) {
    return response.type === 'option' && Object.keys(response).length === 1;
}
exports.isSelectOptionResponse = isSelectOptionResponse;
function isOrOptionsResponse(response) {
    return response.type === 'or' && matches(response, ['type', 'index', 'response']);
}
exports.isOrOptionsResponse = isOrOptionsResponse;
function isAndOptionsResponse(response) {
    return response.type === 'and' && matches(response, ['type', 'responses']);
}
exports.isAndOptionsResponse = isAndOptionsResponse;
function isSelectInitialCardsResponse(response) {
    return response.type === 'initialCards' && matches(response, ['type', 'responses']);
}
exports.isSelectInitialCardsResponse = isSelectInitialCardsResponse;
function isSelectCardResponse(response) {
    return response.type === 'card' && matches(response, ['type', 'cards']);
}
exports.isSelectCardResponse = isSelectCardResponse;
function isSelectProjectCardToPlayResponse(response) {
    return response.type === 'projectCard' && matches(response, ['type', 'card', 'payment']);
}
exports.isSelectProjectCardToPlayResponse = isSelectProjectCardToPlayResponse;
function isSelectSpaceResponse(response) {
    return response.type === 'space' && matches(response, ['type', 'spaceId']);
}
exports.isSelectSpaceResponse = isSelectSpaceResponse;
function isSelectPlayerResponse(response) {
    return response.type === 'player' && matches(response, ['type', 'player']);
}
exports.isSelectPlayerResponse = isSelectPlayerResponse;
function isSelectPartyResponse(response) {
    return response.type === 'party' && matches(response, ['type', 'partyName']);
}
exports.isSelectPartyResponse = isSelectPartyResponse;
function isSelectDelegateResponse(response) {
    return response.type === 'delegate' && matches(response, ['type', 'player']);
}
exports.isSelectDelegateResponse = isSelectDelegateResponse;
function isSelectAmountResponse(response) {
    return response.type === 'amount' && matches(response, ['type', 'amount']);
}
exports.isSelectAmountResponse = isSelectAmountResponse;
function isSelectColonyResponse(response) {
    return response.type === 'colony' && matches(response, ['type', 'colonyName']);
}
exports.isSelectColonyResponse = isSelectColonyResponse;
function isSelectPaymentResponse(response) {
    return response.type === 'payment' && matches(response, ['type', 'payment']);
}
exports.isSelectPaymentResponse = isSelectPaymentResponse;
function isSelectProductionToLoseResponse(response) {
    return response.type === 'productionToLose' && matches(response, ['type', 'units']);
}
exports.isSelectProductionToLoseResponse = isSelectProductionToLoseResponse;
function isShiftAresGlobalParametersResponse(response) {
    return response.type === 'aresGlobalParameters' && matches(response, ['type', 'response']);
}
exports.isShiftAresGlobalParametersResponse = isShiftAresGlobalParametersResponse;
function isAresGlobalParametersResponse(obj) {
    return matches(obj, ['lowOceanDelta', 'highOceanDelta', 'temperatureDelta', 'oxygenDelta']);
}
exports.isAresGlobalParametersResponse = isAresGlobalParametersResponse;
function isSelectGlobalEventResponse(response) {
    return response.type === 'globalEvent' && matches(response, ['type', 'globalEventName']);
}
exports.isSelectGlobalEventResponse = isSelectGlobalEventResponse;
function isSelectPolicyResponse(response) {
    return response.type === 'policy' && matches(response, ['type', 'policyId']);
}
exports.isSelectPolicyResponse = isSelectPolicyResponse;
function isSelectResourceResponse(response) {
    return response.type === 'resource' && matches(response, ['type', 'resource']);
}
exports.isSelectResourceResponse = isSelectResourceResponse;
function isSelectResourcesResponse(response) {
    return response.type === 'resources' && matches(response, ['type', 'units']);
}
exports.isSelectResourcesResponse = isSelectResourcesResponse;
