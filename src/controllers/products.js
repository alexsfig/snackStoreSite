
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
    context.loading = true
    context.loading = true
    HTTP.get(products + '/' + context.page + '/' + context.orderByColumn + '/' + context.orderBy)
    .then((resp) => {
      context.products = resp.data
      context.loading = false

    })
    .catch((err) => {
      console.log(err)
      context.loading = false
      
    })
  },
  likeProduct(context, id){
    HTTP.post('/users/products/' + id + '/like')
    .then((resp) => {
      context.$toasted.success('Thanks for your like').goAway(2000)
      context.product = resp.data

    })
    .catch((err) => {
      context.$toasted.error('You must be logged').goAway(2000)
    })
  },
}
