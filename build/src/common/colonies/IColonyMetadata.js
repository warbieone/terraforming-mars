"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colonyMetadata = void 0;
const DEFAULT_BUILD_QUANTITY = [1, 1, 1];
const DEFAULT_TRADE_QUANTITY = [1, 1, 1, 1, 1, 1, 1];
function colonyMetadata(partial) {
    return Object.assign({ buildQuantity: DEFAULT_BUILD_QUANTITY, tradeQuantity: DEFAULT_TRADE_QUANTITY, colonyBonusQuantity: 1, shouldIncreaseTrack: 'yes' }, partial);
}
exports.colonyMetadata = colonyMetadata;
