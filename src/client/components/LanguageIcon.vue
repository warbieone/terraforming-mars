<template>
  <div class="sidebar_item sidebar_item--language" :title="$t('Language')">
    <div
      class="sidebar_icon sidebar_icon--language"
      :class="{'sidebar_item--is-active': languagePanelOpen}">
      <div :class="`language-icon language-icon-for-sidebar language-icon--${lang}`"
      :title="title"
      v-on:click="languagePanelOpen = !languagePanelOpen"/>
      </div>
    <language-selection-dialog v-show="languagePanelOpen" :preferencesManager="preferencesManager"/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {PreferencesManager} from '@/client/utils/PreferencesManager';
import LanguageSelectionDialog from '@/client/components/LanguageSelectionDialog.vue';
import {LANGUAGES} from '@/common/constants';

export default Vue.extend({
  name: 'LanguageIcon',
  components: {
    'language-selection-dialog': LanguageSelectionDialog,
  },
  data() {
    return {
      languagePanelOpen: false,
    };
  },
  computed: {
    preferencesManager(): PreferencesManager {
      return PreferencesManager.INSTANCE;
    },
    lang(): keyof typeof LANGUAGES {
      return PreferencesManager.INSTANCE.values().lang as keyof typeof LANGUAGES;
    },
    title(): string {
      const lang = LANGUAGES[this.lang];
      return `${lang[0]} (${lang[1]})`;
    },
  },
});

</script>
