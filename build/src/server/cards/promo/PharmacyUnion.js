"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyUnion = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardType_1 = require("../../../common/cards/CardType");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class PharmacyUnion extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.PHARMACY_UNION,
            startingMegaCredits: 46,
            resourceType: CardResource_1.CardResource.DISEASE,
            behavior: {
                drawCard: { count: 1, tag: Tag_1.Tag.SCIENCE },
                addResources: 2,
            },
            metadata: {
                cardNumber: 'R39',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(54).cards(1, { secondaryTag: Tag_1.Tag.SCIENCE });
                    b.text('(You start with 54 M€ . Draw a Science card.)', Size_1.Size.TINY, false, false);
                    b.corpBox('effect', (ce) => {
                        ce.vSpace(Size_1.Size.LARGE);
                        ce.effect(undefined, (eb) => {
                            eb.microbes(1, { all: Options_1.all, played: Options_1.played }).startEffect.disease().megacredits(-4);
                        });
                        ce.vSpace();
                        ce.effect('When ANY microbe tag is played, add a disease here and lose 4 M€ or as much as possible. When you play a science tag, remove a disease here and gain 1 TR OR if there are no diseases here, you MAY put this card face down in your EVENTS PILE to gain 3 TR.', (eb) => {
                            eb.science(1, { played: Options_1.played }).startEffect.minus().disease();
                            eb.tr(1, { size: Size_1.Size.SMALL }).slash().tr(3, { size: Size_1.Size.SMALL, digit: Options_1.digit });
                        });
                    });
                }),
            },
        });
        this.isDisabled = false;
    }
    get tags() {
        if (this.isDisabled) {
            return [];
        }
        return [Tag_1.Tag.MICROBE, Tag_1.Tag.MICROBE];
    }
    onCardPlayed(player, card) {
        this._onCardPlayed(player, card);
    }
    onCorpCardPlayed(player, card) {
        this._onCardPlayed(player, card);
        return undefined;
    }
    _onCardPlayed(player, card) {
        if (this.isDisabled)
            return undefined;
        const game = player.game;
        const hasScienceTag = player.tags.cardHasTag(card, Tag_1.Tag.SCIENCE);
        const hasMicrobesTag = card.tags.includes(Tag_1.Tag.MICROBE);
        const isPharmacyUnion = player.isCorporation(CardName_1.CardName.PHARMACY_UNION);
        if (isPharmacyUnion && hasScienceTag && hasMicrobesTag && this.resourceCount === 0) {
            if (player.canAfford(0, { tr: { tr: 3 } })) {
                game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                    const orOptions = new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Turn it face down to gain 3 TR and lose up to 4 M€', 'Confirm', () => {
                        const megaCreditsLost = Math.min(player.megaCredits, 4);
                        this.isDisabled = true;
                        player.increaseTerraformRatingSteps(3);
                        player.deductResource(Resource_1.Resource.MEGACREDITS, megaCreditsLost);
                        game.log('${0} turned ${1} face down to gain 3 TR and lost ${2} M€', (b) => b.player(player).card(this).number(megaCreditsLost));
                        return undefined;
                    }), new SelectOption_1.SelectOption('Add a disease to it and lose up to 4 M€, then remove a disease to gain 1 TR', 'Confirm', () => {
                        const megaCreditsLost = Math.min(player.megaCredits, 4);
                        player.increaseTerraformRating();
                        player.megaCredits -= megaCreditsLost;
                        game.log('${0} added a disease to ${1} and lost ${2} M€', (b) => b.player(player).card(this).number(megaCreditsLost));
                        game.log('${0} removed a disease from ${1} to gain 1 TR', (b) => b.player(player).card(this));
                        return undefined;
                    }));
                    orOptions.title = 'Choose the order of tag resolution for Pharmacy Union';
                    return orOptions;
                }), -1);
                return undefined;
            }
        }
        if (isPharmacyUnion && hasScienceTag) {
            const scienceTags = player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE);
            for (let i = 0; i < scienceTags; i++) {
                game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                    if (this.isDisabled)
                        return undefined;
                    if (this.resourceCount > 0) {
                        if (player.canAfford(0, { tr: { tr: 1 } }) === false) {
                            game.log('${0} cannot remove a disease from ${1} to gain 1 TR because of unaffordable Reds policy cost', (b) => b.player(player).card(this));
                        }
                        else {
                            this.resourceCount--;
                            player.increaseTerraformRating();
                            game.log('${0} removed a disease from ${1} to gain 1 TR', (b) => b.player(player).card(this));
                        }
                        return undefined;
                    }
                    if (player.canAfford(0, { tr: { tr: 3 } }) === false) {
                        game.log('${0} cannot turn ${1} face down to gain 3 TR because of unaffordable Reds policy cost', (b) => b.player(player).card(this));
                        return undefined;
                    }
                    return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Turn this card face down and gain 3 TR', 'Gain TR', () => {
                        this.isDisabled = true;
                        player.increaseTerraformRatingSteps(3);
                        game.log('${0} turned ${1} face down to gain 3 TR', (b) => b.player(player).card(this));
                        return undefined;
                    }), new SelectOption_1.SelectOption('Do nothing', 'Confirm', () => {
                        return undefined;
                    }));
                }), -1);
            }
        }
        if (hasMicrobesTag) {
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                const microbeTagCount = card.tags.filter((cardTag) => cardTag === Tag_1.Tag.MICROBE).length;
                const player = game.getPlayers().find((p) => p.isCorporation(this.name));
                if (player === undefined) {
                    throw new Error(`PharmacyUnion: did not find player for ${game.id}`);
                }
                const megaCreditsLost = Math.min(player.megaCredits, microbeTagCount * 4);
                player.addResourceTo(this, microbeTagCount);
                player.megaCredits -= megaCreditsLost;
                game.log('${0} added a disease to ${1} and lost ${2} M€', (b) => b.player(player).card(this).number(megaCreditsLost));
                return undefined;
            }), DeferredAction_1.Priority.SUPERPOWER);
        }
        return undefined;
    }
    serialize(serialized) {
        serialized.isDisabled = this.isDisabled;
    }
    deserialize(serialized) {
        this.isDisabled = Boolean(serialized.isDisabled);
    }
}
exports.PharmacyUnion = PharmacyUnion;
