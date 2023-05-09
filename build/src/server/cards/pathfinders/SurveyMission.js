"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyMission = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const BoardType_1 = require("../../boards/BoardType");
const SelectSpace_1 = require("../../inputs/SelectSpace");
const LogHelper_1 = require("../../LogHelper");
const Options_1 = require("../Options");
class SurveyMission extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.SURVEY_MISSION,
            behavior: {
                stock: { steel: 5 },
            },
            metadata: {
                cardNumber: 'P07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.steel(5, { digit: Options_1.digit });
                    b.br;
                    b.surveyMission();
                }),
                description: 'Gain 5 steel. Land-claim three non-reserved spaces in a triangle shape. Gain all placement bonuses. ' +
                    'Only you may place tiles there, and will gain placement bonuses again.',
            },
        });
    }
    validTriplets(board) {
        const spaces = board.getNonReservedLandSpaces().filter((space) => {
            return space.player === undefined && (space.tile === undefined || space.tile.protectedHazard === true);
        });
        const result = [];
        function validAdjacentSpace(s1, s2) {
            if (s2.id < s1.id)
                return false;
            return spaces.includes(s2);
        }
        spaces.forEach((space) => {
            const adjacentSpaces = board.getAdjacentSpaces(space).filter((adjacent) => validAdjacentSpace(space, adjacent));
            for (let idx1 = 0; idx1 <= adjacentSpaces.length - 2; idx1++) {
                const n1 = adjacentSpaces[idx1];
                if (n1 === undefined)
                    throw new Error('');
                for (let idx2 = idx1 + 1; idx2 <= adjacentSpaces.length - 1; idx2++) {
                    const n2 = adjacentSpaces[idx2];
                    if (n2 === undefined)
                        throw new Error('');
                    if (board.getAdjacentSpaces(n1).includes(n2)) {
                        result.push([space, n1, n2]);
                    }
                }
            }
        });
        return result;
    }
    bespokeCanPlay(player) {
        return this.validTriplets(player.game.board).length > 0;
    }
    selectSpace(player, iteration, triplets) {
        const messages = [
            'Select first space',
            'Select second space',
            'Select third space',
        ];
        const spaceSet = new Set(triplets.flat());
        const spaces = Array.from(spaceSet).filter((space) => space.player === undefined);
        spaces.sort((s1, s2) => parseInt(s2.id) - parseInt(s1.id));
        return new SelectSpace_1.SelectSpace(messages[iteration], spaces, (space) => {
            var _a, _b;
            space.player = player;
            player.game.grantSpaceBonuses(player, space);
            LogHelper_1.LogHelper.logBoardTileAction(player, space, 'claimed');
            (_b = (_a = player.getCorporation(CardName_1.CardName.MINING_GUILD)) === null || _a === void 0 ? void 0 : _a.onTilePlaced) === null || _b === void 0 ? void 0 : _b.call(_a, player, player, space, BoardType_1.BoardType.MARS);
            if (iteration === 2)
                return undefined;
            const revisedTriplets = triplets.filter((triplet) => {
                return triplet[0].id === space.id ||
                    triplet[1].id === space.id ||
                    triplet[2].id === space.id;
            });
            if (revisedTriplets.length === 0)
                return undefined;
            return this.selectSpace(player, iteration + 1, revisedTriplets);
        });
    }
    bespokePlay(player) {
        const triplets = this.validTriplets(player.game.board);
        return this.selectSpace(player, 0, triplets);
    }
}
exports.SurveyMission = SurveyMission;
