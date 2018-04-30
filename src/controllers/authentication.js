// Import classes to use in methods
// Base class connection
import {HTTP} from '../common_class/http.js';
// Use router
import {router} from '../router/index.js'
// Define URL to authenticate
const LOGIN_URL = 'users/sign_in'

export default {

    // Create method to authenticate Users
    /*
    Use the context to redirect after succeded login
    */
    authenticate(context, params){
        context.showAlert = false;

        console.log(params)
        HTTP.post(LOGIN_URL, params )
        .then((resp) => {
            // Use localStorage to save access token, to use in each request
            localStorage.setItem('authorization', resp.data.token)
            window.location.replace(process.env.BASE_ROUTE +'/products');
        })
        .catch((err) => {
            context.showAlert = true;
            context.errMsg = err.response.data.message;
        })
    },
    signOut(context){
        //context.$router.push({name: 'Login'})
        window.location.replace(process.env.BASE_ROUTE + '/login');
    }

}
