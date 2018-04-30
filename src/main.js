// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as uiv from 'uiv'
import moment from 'moment'
import {HTTP} from './common_class/http.js';
import esp from 'vee-validate/dist/locale/es';
import VueGoodTable from 'vue-good-table'
/* eslint-disable no-new */
import VeeValidate, { Validator } from 'vee-validate';
import VueMask from 'v-mask'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import VTooltip from 'v-tooltip'
import round from 'vue-round-filter';
import Toasted from 'vue-toasted';



Vue.config.productionTip = false;

Vue.use(VueFormWizard)
Vue.use(VueMask);
Vue.use(VueGoodTable)
Vue.use(VTooltip)
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

import VueSweetAlert from 'vue-sweetalert'
Vue.use(VueSweetAlert)
Vue.use(uiv)
Vue.use(round)
Vue.config.productionTip = false
Vue.use(Toasted)
router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        if (localStorage.authorization == null) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          HTTP.get('persona')
                .then((resp) => {
                    next()
                })
                .catch((err) => {
                  localStorage.removeItem('authorization')
                    next({
                        path: '/login',
                        query: {
                            redirect: to.fullPath
                        }
                    })
                })
        }
      }

  else {
    next() // make sure to always call next()!
  }
  if (!to.matched.length) {
    next('/404');
  } else {
    next();
  }
})


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD hh:mm')
  }
})

// Merge the locales.
Validator.localize('es', esp);

const config = {
    locale: 'es'
};

Vue.use(VeeValidate, config);

/* eslint-disable no-new */
new Vue({
  filters: {
    round,
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: () => ({
    email: '',
    phone: ''
  }),
})
