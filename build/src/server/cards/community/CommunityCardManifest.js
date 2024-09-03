"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMUNITY_CARD_MANIFEST = void 0;
const AerospaceMission_1 = require("./AerospaceMission");
const AgricolaInc_1 = require("./AgricolaInc");
const Athena_1 = require("./Athena");
const ByElection_1 = require("./ByElection");
const CardName_1 = require("../../../common/cards/CardName");
const CuriosityII_1 = require("./CuriosityII");
const Eris_1 = require("./Eris");
const ExecutiveOrder_1 = require("./ExecutiveOrder");
const GlobalEventName_1 = require("../../../common/turmoil/globalEvents/GlobalEventName");
const Incite_1 = require("./Incite");
const JunkVentures_1 = require("./JunkVentures");
const LeadershipSummit_1 = require("./LeadershipSummit");
const Midas_1 = require("./Midas");
const ModuleManifest_1 = require("../ModuleManifest");
const Playwrights_1 = require("./Playwrights");
const PoliticalUprising_1 = require("./PoliticalUprising");
const ProjectWorkshop_1 = require("./ProjectWorkshop");
const ResearchGrant_1 = require("./ResearchGrant");
const SpecialDesignProxy_1 = require("./SpecialDesignProxy");
const TradeAdvance_1 = require("./TradeAdvance");
const UnitedNationsMissionOne_1 = require("./UnitedNationsMissionOne");
const ValuableGases_1 = require("./ValuableGases");
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
        [CardName_1.CardName.ERIS]: { Factory: Eris_1.Eris, compatibility: 'ares' },
        [CardName_1.CardName.ATHENA]: { Factory: Athena_1.Athena, compatibility: 'ares' },
    },
    preludeCards: {
        [CardName_1.CardName.RESEARCH_GRANT]: { Factory: ResearchGrant_1.ResearchGrant },
        [CardName_1.CardName.VALUABLE_GASES]: { Factory: ValuableGases_1.ValuableGases, compatibility: 'venus' },
        [CardName_1.CardName.AEROSPACE_MISSION]: { Factory: AerospaceMission_1.AerospaceMission, compatibility: 'colonies' },
        [CardName_1.CardName.TRADE_ADVANCE]: { Factory: TradeAdvance_1.TradeAdvance, compatibility: 'colonies' },
        [CardName_1.CardName.POLITICAL_UPRISING]: { Factory: PoliticalUprising_1.PoliticalUprising, compatibility: 'turmoil' },
        [CardName_1.CardName.BY_ELECTION]: { Factory: ByElection_1.ByElection, compatibility: 'turmoil' },
        [CardName_1.CardName.EXECUTIVE_ORDER]: { Factory: ExecutiveOrder_1.ExecutiveOrder, compatibility: 'turmoil' },
    },
    projectCards: {
        [CardName_1.CardName.SPECIAL_DESIGN_PROXY]: { Factory: SpecialDesignProxy_1.SpecialDesignProxy, instantiate: false },
    },
    globalEvents: {
        [GlobalEventName_1.GlobalEventName.LEADERSHIP_SUMMIT]: { Factory: LeadershipSummit_1.LeadershipSummit },
    },
});
