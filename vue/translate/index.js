import Vue from 'vue';
import translateDisplay from './components/translateDisplay';
import request from '../../common/request';

let vm = new Vue({
  el: '#translate',
  data: {
    original: {
      'hello': [
        {locale: 'en-sg', text: 'hello'},
        {locale: 'en-my', text: 'hello'}
      ],
      'test2': [
        {locale: 'en-sg', text: 'hello'},
        {locale: 'en-my', text: 'hello'}
      ]
    },
    translations: {
      'hello': [
        {locale: 'en-sg', text: 'hello'},
        {locale: 'en-my', text: 'hello'}
      ],
      'test2': [
        {locale: 'en-sg', text: 'hello'},
        {locale: 'en-my', text: 'hello'}
      ]
    }
  },
  components: {
    'translate-display': translateDisplay,
  },
  methods: {
    fetchTranslations: function() {
      request.get(`${window.location.origin}/translations/all`).then((resp) => {
        this.translations = JSON.parse(resp);
      });
    },
    handleValueChange: function(translationId, value) {
     return function(evt) {
       const translation =  this.translations[translationId].filter((translation) => {
         return translation.locale === value.locale;
       });
       console.log('translationId, value.text, value.locale -', translationId, value.text, value.locale);
       translation[0].isDirty = true;
       translation[0].text = value.text;
       console.log('============ index.js ::: handleValueChange ::: 44 =============');
       console.log('translation - ', translation);
       console.log('============ index.js ::: handleValueChange ::: 44 =============');
     }
      

    },
    updateTranslations: function() {
      console.log('UPDATING', this.translations);
    }
  }
});


export default vm;
