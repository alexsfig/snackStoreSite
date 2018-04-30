
// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';

// Use router
import {router} from '../router/index.js'
import moment from 'moment'
// define base url to Employees
const products = 'products'

export default {
  index(context){
    HTTP.get(products + '/' + context.page + '/' + context.orderByColumn + '/' + context.orderBy)
    .then((resp) => {
      context.products = resp.data

    })
    .catch((err) => {
      console.log(err)
    })
  },
  likeProduct(context, id){
    HTTP.post('/users/products/' + id + '/like')
    .then((resp) => {
      context.product = resp.data

    })
    .catch((err) => {
      context.$toasted.error('You must be logged').goAway(2000)
    })
  },
}
