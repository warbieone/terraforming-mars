"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAresGlobalParametersResponse = exports.isShiftAresGlobalParametersResponse = exports.isSelectProductionToLoseResponse = exports.isSelectPaymentResponse = exports.isSelectColonyResponse = exports.isSelectAmountResponse = exports.isSelectDelegateResponse = exports.isSelectPartyResponse = exports.isSelectPlayerResponse = exports.isSelectSpaceResponse = exports.isSelectProjectCardToPlayResponse = exports.isSelectCardResponse = exports.isAndOptionsResponse = exports.isOrOptionsResponse = exports.isSelectOptionResponse = void 0;
function difference(arr1, arr2) {
    return arr1
        .filter((x) => !arr2.includes(x))
        .concat(arr2.filter((x) => !arr1.includes(x)));
}
function matches(response, fields) {
    return difference(Object.keys(response), fields).length === 0;
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
