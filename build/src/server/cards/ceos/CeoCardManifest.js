"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CEO_CARD_MANIFEST = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ModuleManifest_1 = require("../ModuleManifest");
const Apollo_1 = require("./Apollo");
const Asimov_1 = require("./Asimov");
const Bjorn_1 = require("./Bjorn");
const Caesar_1 = require("./Caesar");
const Clarke_1 = require("./Clarke");
const Duncan_1 = require("./Duncan");
const Ender_1 = require("./Ender");
const Faraday_1 = require("./Faraday");
const Floyd_1 = require("./Floyd");
const Gaia_1 = require("./Gaia");
const Gordon_1 = require("./Gordon");
const Greta_1 = require("./Greta");
const HAL9000_1 = require("./HAL9000");
const Ingrid_1 = require("./Ingrid");
const Jansson_1 = require("./Jansson");
const Karen_1 = require("./Karen");
const Lowell_1 = require("./Lowell");
const Maria_1 = require("./Maria");
const Musk_1 = require("./Musk");
const Naomi_1 = require("./Naomi");
const Neil_1 = require("./Neil");
const Oscar_1 = require("./Oscar");
const Petra_1 = require("./Petra");
const Quill_1 = require("./Quill");
const Rogers_1 = require("./Rogers");
const Ryu_1 = require("./Ryu");
const Shara_1 = require("./Shara");
const Stefan_1 = require("./Stefan");
const Tate_1 = require("./Tate");
const Ulrich_1 = require("./Ulrich");
const VanAllen_1 = require("./VanAllen");
const Will_1 = require("./Will");
const Xavier_1 = require("./Xavier");
const Xu_1 = require("./Xu");
const Yvonne_1 = require("./Yvonne");
const Zan_1 = require("./Zan");
const CoLeadership_1 = require("./CoLeadership");
exports.CEO_CARD_MANIFEST = new ModuleManifest_1.ModuleManifest({
    module: 'ceo',
    ceoCards: {
        [CardName_1.CardName.APOLLO]: { Factory: Apollo_1.Apollo, compatibility: 'moon' },
        [CardName_1.CardName.ASIMOV]: { Factory: Asimov_1.Asimov },
        [CardName_1.CardName.BJORN]: { Factory: Bjorn_1.Bjorn },
        [CardName_1.CardName.CAESAR]: { Factory: Caesar_1.Caesar, compatibility: 'ares' },
        [CardName_1.CardName.CLARKE]: { Factory: Clarke_1.Clarke },
        [CardName_1.CardName.DUNCAN]: { Factory: Duncan_1.Duncan },
        [CardName_1.CardName.ENDER]: { Factory: Ender_1.Ender },
        [CardName_1.CardName.FARADAY]: { Factory: Faraday_1.Faraday },
        [CardName_1.CardName.FLOYD]: { Factory: Floyd_1.Floyd },
        [CardName_1.CardName.GAIA]: { Factory: Gaia_1.Gaia, compatibility: 'ares' },
        [CardName_1.CardName.GORDON]: { Factory: Gordon_1.Gordon },
        [CardName_1.CardName.GRETA]: { Factory: Greta_1.Greta },
        [CardName_1.CardName.HAL9000]: { Factory: HAL9000_1.HAL9000 },
        [CardName_1.CardName.INGRID]: { Factory: Ingrid_1.Ingrid },
        [CardName_1.CardName.JANSSON]: { Factory: Jansson_1.Jansson },
        [CardName_1.CardName.KAREN]: { Factory: Karen_1.Karen, compatibility: 'prelude' },
        [CardName_1.CardName.LOWELL]: { Factory: Lowell_1.Lowell },
        [CardName_1.CardName.MARIA]: { Factory: Maria_1.Maria, compatibility: 'colonies' },
        [CardName_1.CardName.MUSK]: { Factory: Musk_1.Musk },
        [CardName_1.CardName.NAOMI]: { Factory: Naomi_1.Naomi, compatibility: 'colonies' },
        [CardName_1.CardName.NEIL]: { Factory: Neil_1.Neil, compatibility: 'moon' },
        [CardName_1.CardName.OSCAR]: { Factory: Oscar_1.Oscar, compatibility: 'turmoil' },
        [CardName_1.CardName.PETRA]: { Factory: Petra_1.Petra, compatibility: 'turmoil' },
        [CardName_1.CardName.QUILL]: { Factory: Quill_1.Quill, compatibility: 'venus' },
        [CardName_1.CardName.ROGERS]: { Factory: Rogers_1.Rogers, compatibility: 'venus' },
        [CardName_1.CardName.RYU]: { Factory: Ryu_1.Ryu },
        [CardName_1.CardName.SHARA]: { Factory: Shara_1.Shara, compatibility: 'pathfinders' },
        [CardName_1.CardName.STEFAN]: { Factory: Stefan_1.Stefan },
        [CardName_1.CardName.TATE]: { Factory: Tate_1.Tate },
        [CardName_1.CardName.ULRICH]: { Factory: Ulrich_1.Ulrich },
        [CardName_1.CardName.VANALLEN]: { Factory: VanAllen_1.VanAllen },
        [CardName_1.CardName.WILL]: { Factory: Will_1.Will, compatibility: 'venus' },
        [CardName_1.CardName.XAVIER]: { Factory: Xavier_1.Xavier, compatibility: 'prelude' },
        [CardName_1.CardName.XU]: { Factory: Xu_1.Xu, compatibility: 'venus' },
        [CardName_1.CardName.YVONNE]: { Factory: Yvonne_1.Yvonne, compatibility: 'colonies' },
        [CardName_1.CardName.ZAN]: { Factory: Zan_1.Zan, compatibility: 'turmoil' },
    },
    preludeCards: {
        [CardName_1.CardName.CO_LEADERSHIP]: { Factory: CoLeadership_1.CoLeadership },
    },
});
