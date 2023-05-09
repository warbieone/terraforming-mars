"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColonyModule = exports.ALL_COLONIES_TILES = exports.PATHFINDERS_COLONIES_TILES = exports.COMMUNITY_COLONIES_TILES = exports.BASE_COLONIES_TILES = void 0;
const Europa_1 = require("./Europa");
const Ganymede_1 = require("./Ganymede");
const Titan_1 = require("./Titan");
const Callisto_1 = require("./Callisto");
const Triton_1 = require("./Triton");
const Ceres_1 = require("./Ceres");
const Luna_1 = require("./Luna");
const Io_1 = require("./Io");
const Miranda_1 = require("./Miranda");
const Pluto_1 = require("./Pluto");
const Enceladus_1 = require("./Enceladus");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const Iapetus_1 = require("../cards/community/Iapetus");
const Mercury_1 = require("../cards/community/Mercury");
const Hygiea_1 = require("../cards/community/Hygiea");
const Titania_1 = require("../cards/community/Titania");
const Venus_1 = require("../cards/community/Venus");
const Leavitt_1 = require("../cards/community/Leavitt");
const Pallas_1 = require("../cards/community/Pallas");
const IapetusII_1 = require("../cards/pathfinders/IapetusII");
exports.BASE_COLONIES_TILES = [
    { colonyName: ColonyName_1.ColonyName.CERES, Factory: Ceres_1.Ceres },
    { colonyName: ColonyName_1.ColonyName.ENCELADUS, Factory: Enceladus_1.Enceladus },
    { colonyName: ColonyName_1.ColonyName.EUROPA, Factory: Europa_1.Europa },
    { colonyName: ColonyName_1.ColonyName.GANYMEDE, Factory: Ganymede_1.Ganymede },
    { colonyName: ColonyName_1.ColonyName.IO, Factory: Io_1.Io },
    { colonyName: ColonyName_1.ColonyName.LUNA, Factory: Luna_1.Luna },
    { colonyName: ColonyName_1.ColonyName.MIRANDA, Factory: Miranda_1.Miranda },
    { colonyName: ColonyName_1.ColonyName.TITAN, Factory: Titan_1.Titan },
    { colonyName: ColonyName_1.ColonyName.CALLISTO, Factory: Callisto_1.Callisto },
    { colonyName: ColonyName_1.ColonyName.PLUTO, Factory: Pluto_1.Pluto },
    { colonyName: ColonyName_1.ColonyName.TRITON, Factory: Triton_1.Triton },
];
exports.COMMUNITY_COLONIES_TILES = [
    { colonyName: ColonyName_1.ColonyName.IAPETUS, Factory: Iapetus_1.Iapetus },
    { colonyName: ColonyName_1.ColonyName.MERCURY, Factory: Mercury_1.Mercury },
    { colonyName: ColonyName_1.ColonyName.HYGIEA, Factory: Hygiea_1.Hygiea },
    { colonyName: ColonyName_1.ColonyName.TITANIA, Factory: Titania_1.Titania },
    { colonyName: ColonyName_1.ColonyName.VENUS, Factory: Venus_1.Venus },
    { colonyName: ColonyName_1.ColonyName.LEAVITT, Factory: Leavitt_1.Leavitt },
    { colonyName: ColonyName_1.ColonyName.PALLAS, Factory: Pallas_1.Pallas },
];
exports.PATHFINDERS_COLONIES_TILES = [
    { colonyName: ColonyName_1.ColonyName.IAPETUS_II, Factory: IapetusII_1.IapetusII },
];
exports.ALL_COLONIES_TILES = [...exports.BASE_COLONIES_TILES, ...exports.COMMUNITY_COLONIES_TILES, ...exports.PATHFINDERS_COLONIES_TILES];
function getColonyModule(name) {
    if (exports.COMMUNITY_COLONIES_TILES.some((f) => f.colonyName === name))
        return 'community';
    if (exports.PATHFINDERS_COLONIES_TILES.some((f) => f.colonyName === name))
        return 'pathfinders';
    return 'colonies';
}
exports.getColonyModule = getColonyModule;
