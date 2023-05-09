"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNITY_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AgricolaInc_1 = require("./AgricolaInc");
const Incite_1 = require("./Incite");
const Playwrights_1 = require("./Playwrights");
const ProjectWorkshop_1 = require("./ProjectWorkshop");
const ResearchGrant_1 = require("./ResearchGrant");
const ValuableGases_1 = require("./ValuableGases");
const VenusFirst_1 = require("./VenusFirst");
const AerospaceMission_1 = require("./AerospaceMission");
const TradeAdvance_1 = require("./TradeAdvance");
const PoliticalUprising_1 = require("./PoliticalUprising");
const ByElection_1 = require("./ByElection");
const Midas_1 = require("./Midas");
const CuriosityII_1 = require("./CuriosityII");
const ExecutiveOrder_1 = require("./ExecutiveOrder");
const UnitedNationsMissionOne_1 = require("./UnitedNationsMissionOne");
const JunkVentures_1 = require("./JunkVentures");
const SpecialDesignProxy_1 = require("./SpecialDesignProxy");
exports.COMMUNITY_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'community',
    corporationCards: {
        [CardName_1.CardName.AGRICOLA_INC]: { Factory: AgricolaInc_1.AgricolaInc },
        [CardName_1.CardName.PROJECT_WORKSHOP]: { Factory: ProjectWorkshop_1.ProjectWorkshop },
        [CardName_1.CardName.INCITE]: { Factory: Incite_1.Incite, compatibility: 'turmoil' },
        [CardName_1.CardName.PLAYWRIGHTS]: { Factory: Playwrights_1.Playwrights },
        [CardName_1.CardName.CURIOSITY_II]: { Factory: CuriosityII_1.CuriosityII },
        [CardName_1.CardName.MIDAS]: { Factory: Midas_1.Midas },
        [CardName_1.CardName.UNITED_NATIONS_MISSION_ONE]: { Factory: UnitedNationsMissionOne_1.UnitedNationsMissionOne },
        [CardName_1.CardName.JUNK_VENTURES]: { Factory: JunkVentures_1.JunkVentures },
    },
    preludeCards: {
        [CardName_1.CardName.RESEARCH_GRANT]: { Factory: ResearchGrant_1.ResearchGrant },
        [CardName_1.CardName.VALUABLE_GASES]: { Factory: ValuableGases_1.ValuableGases, compatibility: 'venus' },
        [CardName_1.CardName.VENUS_FIRST]: { Factory: VenusFirst_1.VenusFirst, compatibility: 'venus' },
        [CardName_1.CardName.AEROSPACE_MISSION]: { Factory: AerospaceMission_1.AerospaceMission, compatibility: 'colonies' },
        [CardName_1.CardName.TRADE_ADVANCE]: { Factory: TradeAdvance_1.TradeAdvance, compatibility: 'colonies' },
        [CardName_1.CardName.POLITICAL_UPRISING]: { Factory: PoliticalUprising_1.PoliticalUprising, compatibility: 'turmoil' },
        [CardName_1.CardName.BY_ELECTION]: { Factory: ByElection_1.ByElection, compatibility: 'turmoil' },
        [CardName_1.CardName.EXECUTIVE_ORDER]: { Factory: ExecutiveOrder_1.ExecutiveOrder, compatibility: 'turmoil' },
    },
    projectCards: {
        [CardName_1.CardName.SPECIAL_DESIGN_PROXY]: { Factory: SpecialDesignProxy_1.SpecialDesignProxy, instantiate: false },
    },
});
