"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const CardName_1 = require("../../common/cards/CardName");
const CardType_1 = require("../../common/cards/CardType");
const Tag_1 = require("../../common/cards/Tag");
const ICorporationCard_1 = require("../cards/corporation/ICorporationCard");
const CeoExtension_1 = require("../CeoExtension");
class Tags {
    constructor(player) {
        this.player = player;
    }
    getAllTags() {
        const counts = Tags.COUNTED_TAGS.map((tag) => {
            return { tag, count: this.count(tag, 'raw') };
        }).filter((tag) => tag.count > 0);
        counts.push({ tag: Tag_1.Tag.EVENT, count: this.player.getPlayedEventsCount() });
        return counts;
    }
    count(tag, mode = 'default') {
        const includeEvents = this.player.isCorporation(CardName_1.CardName.ODYSSEY);
        const includeTagSubstitutions = (mode === 'default' || mode === 'milestone');
        let tagCount = this.rawCount(tag, includeEvents);
        if (tag === Tag_1.Tag.SCIENCE && this.player.scienceTagCount > 0) {
            tagCount += this.player.scienceTagCount;
        }
        if (tag === Tag_1.Tag.WILD || includeTagSubstitutions) {
            tagCount += CeoExtension_1.CeoExtension.getBonusWildTags(this.player);
        }
        if (includeTagSubstitutions) {
            if (tag === Tag_1.Tag.EARTH && this.player.cardIsInEffect(CardName_1.CardName.EARTH_EMBASSY)) {
                tagCount += this.rawCount(Tag_1.Tag.MOON, includeEvents);
            }
            if (tag !== Tag_1.Tag.WILD) {
                tagCount += this.rawCount(Tag_1.Tag.WILD, includeEvents);
            }
        }
        if (mode !== 'raw') {
            if (tag === Tag_1.Tag.SCIENCE && this.player.isCorporation(CardName_1.CardName.HABITAT_MARTE)) {
                tagCount += this.rawCount(Tag_1.Tag.MARS, includeEvents);
            }
        }
        if (this.player.isCorporation(CardName_1.CardName.CHIMERA)) {
            if (mode === 'award') {
                tagCount++;
            }
            if (mode === 'milestone') {
                tagCount--;
            }
        }
        return tagCount;
    }
    cardHasTag(card, target) {
        for (const tag of card.tags) {
            if (tag === target)
                return true;
            if (tag === Tag_1.Tag.MARS &&
                target === Tag_1.Tag.SCIENCE &&
                this.player.isCorporation(CardName_1.CardName.HABITAT_MARTE)) {
                return true;
            }
            if (tag === Tag_1.Tag.MOON &&
                target === Tag_1.Tag.EARTH &&
                this.player.cardIsInEffect(CardName_1.CardName.EARTH_EMBASSY)) {
                return true;
            }
        }
        return false;
    }
    cardTagCount(card, target) {
        let count = 0;
        for (const tag of card.tags) {
            if (tag === target) {
                count++;
            }
            else if (Array.isArray(target) && target.includes(tag)) {
                count++;
            }
            else if (tag === Tag_1.Tag.MARS && target === Tag_1.Tag.SCIENCE &&
                this.player.isCorporation(CardName_1.CardName.HABITAT_MARTE)) {
                count++;
            }
            else if (tag === Tag_1.Tag.MOON && target === Tag_1.Tag.EARTH &&
                this.player.cardIsInEffect(CardName_1.CardName.EARTH_EMBASSY)) {
                count++;
            }
        }
        return count;
    }
    rawCount(tag, includeEventsTags) {
        let tagCount = 0;
        this.player.tableau.forEach((card) => {
            if (!includeEventsTags && card.type === CardType_1.CardType.EVENT)
                return;
            if ((0, ICorporationCard_1.isICorporationCard)(card) && card.isDisabled)
                return;
            tagCount += card.tags.filter((cardTag) => cardTag === tag).length;
        });
        return tagCount;
    }
    multipleCount(tags, mode = 'default') {
        let tagCount = 0;
        tags.forEach((tag) => {
            tagCount += this.rawCount(tag, false);
        });
        if (tags.includes(Tag_1.Tag.EARTH) && !tags.includes(Tag_1.Tag.MOON) && this.player.cardIsInEffect(CardName_1.CardName.EARTH_EMBASSY)) {
            tagCount += this.rawCount(Tag_1.Tag.MOON, false);
        }
        if (mode !== 'award') {
            tagCount += this.rawCount(Tag_1.Tag.WILD, false);
            if (this.player.isCorporation(CardName_1.CardName.CHIMERA) && mode === 'milestone')
                tagCount--;
        }
        else {
            if (this.player.isCorporation(CardName_1.CardName.CHIMERA))
                tagCount++;
        }
        return tagCount;
    }
    distinctCount(mode, extraTag) {
        const uniqueTags = new Set();
        let wildTagCount = 0;
        const addTag = (tag) => {
            if (tag === Tag_1.Tag.WILD) {
                wildTagCount++;
            }
            else {
                uniqueTags.add(tag);
            }
        };
        for (const card of this.player.corporations) {
            if (!card.isDisabled) {
                card.tags.forEach(addTag);
            }
        }
        for (const card of this.player.playedCards) {
            if (card.type !== CardType_1.CardType.EVENT) {
                card.tags.forEach(addTag);
            }
        }
        if (this.player.isCorporation(CardName_1.CardName.ODYSSEY)) {
            for (const card of this.player.playedCards) {
                if (card.type === CardType_1.CardType.EVENT) {
                    card.tags.forEach(addTag);
                }
            }
        }
        if (extraTag !== undefined) {
            uniqueTags.add(extraTag);
        }
        wildTagCount += CeoExtension_1.CeoExtension.getBonusWildTags(this.player);
        if (this.player.scienceTagCount > 0)
            uniqueTags.add(Tag_1.Tag.SCIENCE);
        if (mode === 'globalEvent')
            return uniqueTags.size;
        if (mode === 'milestone' && this.player.isCorporation(CardName_1.CardName.CHIMERA))
            wildTagCount--;
        let maxTagCount = 10;
        const game = this.player.game;
        if (game.gameOptions.venusNextExtension)
            maxTagCount++;
        if (game.gameOptions.moonExpansion)
            maxTagCount++;
        if (game.gameOptions.pathfindersExpansion)
            maxTagCount++;
        return Math.min(uniqueTags.size + wildTagCount, maxTagCount);
    }
    playerHas(tags) {
        let distinctCount = 0;
        tags.forEach((tag) => {
            if (this.count(tag, 'raw') > 0) {
                distinctCount++;
            }
            else if (tag === Tag_1.Tag.SCIENCE && this.player.hasTurmoilScienceTagBonus) {
                distinctCount++;
            }
        });
        if (distinctCount + this.count(Tag_1.Tag.WILD) >= tags.length) {
            return true;
        }
        return false;
    }
    gainScienceTag() {
        this.player.scienceTagCount++;
    }
}
exports.Tags = Tags;
Tags.COUNTED_TAGS = Tag_1.ALL_TAGS.filter((tag) => tag !== Tag_1.Tag.CLONE && tag !== Tag_1.Tag.EVENT);
