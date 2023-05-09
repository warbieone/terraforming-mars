"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TURMOIL_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const AerialLenses_1 = require("./AerialLenses");
const BannedDelegate_1 = require("./BannedDelegate");
const CulturalMetropolis_1 = require("./CulturalMetropolis");
const DiasporaMovement_1 = require("./DiasporaMovement");
const EventAnalysts_1 = require("./EventAnalysts");
const GMOContract_1 = require("./GMOContract");
const LakefrontResorts_1 = require("./LakefrontResorts");
const MartianMediaCenter_1 = require("./MartianMediaCenter");
const ParliamentHall_1 = require("./ParliamentHall");
const PoliticalAlliance_1 = require("./PoliticalAlliance");
const Pristar_1 = require("./Pristar");
const PROffice_1 = require("./PROffice");
const PublicCelebrations_1 = require("./PublicCelebrations");
const Recruitment_1 = require("./Recruitment");
const RedTourismWave_1 = require("./RedTourismWave");
const SeptumTribus_1 = require("./SeptumTribus");
const SponsoredMohole_1 = require("./SponsoredMohole");
const SupportedResearch_1 = require("./SupportedResearch");
const TerralabsResearch_1 = require("./TerralabsResearch");
const UtopiaInvest_1 = require("./UtopiaInvest");
const VoteOfNoConfidence_1 = require("./VoteOfNoConfidence");
const WildlifeDome_1 = require("./WildlifeDome");
exports.TURMOIL_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'turmoil',
    projectCards: {
        [CardName_1.CardName.AERIAL_LENSES]: { Factory: AerialLenses_1.AerialLenses },
        [CardName_1.CardName.BANNED_DELEGATE]: { Factory: BannedDelegate_1.BannedDelegate },
        [CardName_1.CardName.CULTURAL_METROPOLIS]: { Factory: CulturalMetropolis_1.CulturalMetropolis },
        [CardName_1.CardName.DIASPORA_MOVEMENT]: { Factory: DiasporaMovement_1.DiasporaMovement },
        [CardName_1.CardName.EVENT_ANALYSTS]: { Factory: EventAnalysts_1.EventAnalysts },
        [CardName_1.CardName.GMO_CONTRACT]: { Factory: GMOContract_1.GMOContract },
        [CardName_1.CardName.MARTIAN_MEDIA_CENTER]: { Factory: MartianMediaCenter_1.MartianMediaCenter },
        [CardName_1.CardName.PARLIAMENT_HALL]: { Factory: ParliamentHall_1.ParliamentHall },
        [CardName_1.CardName.PR_OFFICE]: { Factory: PROffice_1.PROffice },
        [CardName_1.CardName.POLITICAL_ALLIANCE]: { Factory: PoliticalAlliance_1.PoliticalAlliance },
        [CardName_1.CardName.PUBLIC_CELEBRATIONS]: { Factory: PublicCelebrations_1.PublicCelebrations },
        [CardName_1.CardName.RECRUITMENT]: { Factory: Recruitment_1.Recruitment },
        [CardName_1.CardName.RED_TOURISM_WAVE]: { Factory: RedTourismWave_1.RedTourismWave },
        [CardName_1.CardName.SPONSORED_MOHOLE]: { Factory: SponsoredMohole_1.SponsoredMohole },
        [CardName_1.CardName.SUPPORTED_RESEARCH]: { Factory: SupportedResearch_1.SupportedResearch },
        [CardName_1.CardName.WILDLIFE_DOME]: { Factory: WildlifeDome_1.WildlifeDome },
        [CardName_1.CardName.VOTE_OF_NO_CONFIDENCE]: { Factory: VoteOfNoConfidence_1.VoteOfNoConfidence },
    },
    corporationCards: {
        [CardName_1.CardName.LAKEFRONT_RESORTS]: { Factory: LakefrontResorts_1.LakefrontResorts },
        [CardName_1.CardName.PRISTAR]: { Factory: Pristar_1.Pristar },
        [CardName_1.CardName.TERRALABS_RESEARCH]: { Factory: TerralabsResearch_1.TerralabsResearch },
        [CardName_1.CardName.UTOPIA_INVEST]: { Factory: UtopiaInvest_1.UtopiaInvest },
        [CardName_1.CardName.SEPTUM_TRIBUS]: { Factory: SeptumTribus_1.SeptumTribus, compatibility: 'turmoil' },
    },
});
