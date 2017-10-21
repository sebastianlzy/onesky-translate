import Vue from 'vue';

export default Vue.component('translate-value', {
  props: ['text', 'locale', 'original', 'translationId', 'change'],
  template: `
    <div class="translate__value">
      <div class="translate__label align-middle">{{locale}}</div>
      <div class="translate__input">
        <input 
          type="text" 
          value="text"
          v-on:change="handleValueChange(translationId, locale, text)" 
          v-bind:class="{ active: isDirty() }"
        />
      </div>
    </div>
   `,
    methods: {
      handleValueChange: function (translationId, locale, value) {
        console.log('handleV -');
        this.$emit('change', translationId, locale, value);
      },
      isDirty: function () {
        const translation =  this.original[this.translationId].filter((translation) => {
          return translation.locale === this.locale;
        });
        console.log('translation -', translation);
        return translation.length === 0;
      }
  }
});
