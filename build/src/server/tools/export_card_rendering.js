"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fs = require("fs");
const AllManifests_1 = require("../cards/AllManifests");
const ModuleManifest_1 = require("../cards/ModuleManifest");
const ICard_1 = require("../cards/ICard");
const ICorporationCard_1 = require("../cards/corporation/ICorporationCard");
const IPreludeCard_1 = require("../cards/prelude/IPreludeCard");
const Units_1 = require("../../common/Units");
const ColonyManifest_1 = require("../colonies/ColonyManifest");
const Milestones_1 = require("../milestones/Milestones");
const Awards_1 = require("../awards/Awards");
const CardType_1 = require("../../common/cards/CardType");
const globalInitialize_1 = require("../globalInitialize");
class CardProcessor {
    static makeJson() {
        AllManifests_1.ALL_MODULE_MANIFESTS.forEach(this.processManifest);
    }
    static processManifest(manifest) {
        CardProcessor.processDeck(manifest.module, manifest.projectCards);
        CardProcessor.processDeck(manifest.module, manifest.corporationCards);
        CardProcessor.processDeck(manifest.module, manifest.preludeCards);
        CardProcessor.processDeck(manifest.module, manifest.ceoCards);
        CardProcessor.processDeck(manifest.module, manifest.standardActions);
        CardProcessor.processDeck(manifest.module, manifest.standardProjects);
    }
    static processDeck(module, cardManifest) {
        for (const factory of ModuleManifest_1.CardManifest.values(cardManifest)) {
            CardProcessor.processCard(module, new factory.Factory(), factory.compatibility);
        }
    }
    static processCard(module, card, compatibility) {
        if (card.type === CardType_1.CardType.PROXY)
            return;
        let startingMegaCredits = undefined;
        let cardCost = undefined;
        if ((0, IPreludeCard_1.isPreludeCard)(card)) {
            startingMegaCredits = card.startingMegaCredits;
        }
        if ((0, ICorporationCard_1.isICorporationCard)(card)) {
            startingMegaCredits = card.startingMegaCredits;
            cardCost = card.cardCost;
        }
        const production = card.behavior?.production;
        const clientCard = {
            module: module,
            name: card.name,
            tags: card.tags,
            cardDiscount: card.cardDiscount,
            victoryPoints: card.victoryPoints,
            cost: card.cost,
            type: card.type,
            requirements: card.requirements ?? [],
            metadata: card.metadata,
            productionBox: Units_1.Units.isUnits(production) ? production : Units_1.Units.EMPTY,
            resourceType: card.resourceType,
            startingMegaCredits: startingMegaCredits,
            cardCost: cardCost,
            compatibility: [],
            hasAction: (0, ICard_1.isIActionCard)(card),
        };
        if (Array.isArray(compatibility)) {
            clientCard.compatibility.push(...compatibility);
        }
        else if (compatibility !== undefined) {
            clientCard.compatibility.push(compatibility);
        }
        CardProcessor.json.push(clientCard);
    }
}
CardProcessor.json = [];
class GlobalEventProcessor {
    static makeJson() {
        AllManifests_1.ALL_MODULE_MANIFESTS.forEach(this.processManifest);
    }
    static processManifest(manifest) {
        for (const cf of ModuleManifest_1.GlobalEventManifest.values(manifest.globalEvents)) {
            GlobalEventProcessor.processGlobalEvent(manifest.module, new cf.Factory());
        }
    }
    static processGlobalEvent(module, globalEvent) {
        const event = {
            module: module,
            name: globalEvent.name,
            description: globalEvent.description,
            revealedDelegate: globalEvent.revealedDelegate,
            currentDelegate: globalEvent.currentDelegate,
            renderData: globalEvent.renderData,
        };
        GlobalEventProcessor.json.push(event);
    }
}
GlobalEventProcessor.json = [];
class ColoniesProcessor {
    static makeJson() {
        ColonyManifest_1.ALL_COLONIES_TILES.forEach((entry) => {
            const colony = new entry.Factory();
            ColoniesProcessor.processColony(colony.metadata);
        });
    }
    static processColony(metadata) {
        const clientMetadata = {
            module: (0, ColonyManifest_1.getColonyModule)(metadata.name),
            name: metadata.name,
            description: metadata.description,
            buildType: metadata.buildType,
            buildQuantity: metadata.buildQuantity,
            buildResource: metadata.buildResource,
            cardResource: metadata.cardResource,
            tradeType: metadata.tradeType,
            tradeQuantity: metadata.tradeQuantity,
            tradeResource: metadata.tradeResource,
            colonyBonusType: metadata.colonyBonusType,
            colonyBonusQuantity: metadata.colonyBonusQuantity,
            colonyBonusResource: metadata.colonyBonusResource,
            shouldIncreaseTrack: metadata.shouldIncreaseTrack,
        };
        ColoniesProcessor.json.push(clientMetadata);
    }
}
ColoniesProcessor.json = [];
class MAProcessor {
    static makeJson() {
        Milestones_1.ALL_MILESTONES.forEach((entry) => {
            MAProcessor.processEntry(entry);
        });
        Awards_1.ALL_AWARDS.forEach((entry) => {
            MAProcessor.processEntry(entry);
        });
    }
    static processEntry(metadata) {
        MAProcessor.json.push({
            name: metadata.name,
            description: metadata.description,
        });
    }
}
MAProcessor.json = [];
if (!fs.existsSync('src/genfiles')) {
    fs.mkdirSync('src/genfiles');
}
(0, globalInitialize_1.globalInitialize)();
CardProcessor.makeJson();
GlobalEventProcessor.makeJson();
ColoniesProcessor.makeJson();
MAProcessor.makeJson();
fs.writeFileSync('src/genfiles/cards.json', JSON.stringify(CardProcessor.json, null, 2));
fs.writeFileSync('src/genfiles/events.json', JSON.stringify(GlobalEventProcessor.json, null, 2));
fs.writeFileSync('src/genfiles/colonies.json', JSON.stringify(ColoniesProcessor.json, null, 2));
fs.writeFileSync('src/genfiles/ma.json', JSON.stringify(MAProcessor.json, null, 2));
