<template>
	<div class="login-box">
	    <div class="login-logo">
	        <div class="col-md-2 offset-5">
	        	<!-- <img src="../../assets/images/logo.png" alt=""> -->
	        	<img src="../../assets/images/logo2.png" alt="" class="img-fluid">
	        </div>
	    </div>
	    <!-- /.login-logo -->
		<div class="wrapper-alert">
			<alert type="danger" :closable="true" v-if="showAlert" @close="showAlert=false">
				<h4><i class="icon fa fa-ban"></i> Alert!</h4>
				<p>{{ errMsg }}</p>
			</alert>
		</div>

	    <div class="login-box-body">
	        <p class="login-box-msg">
	        	<h3 class="text-center">
	        		Inicio de Sesión
	        	</h3>
	        </p>

	        <form @submit.prevent="validateBeforeSubmit">
	            <div class="form-group has-feedback" :class="{'has-error': errors.has('email') }">
	                <input id="email" name="email" v-model="email" v-validate="'required'" type="text" placeholder="Usuario" class="form-control">
	                <span class="glyphicon glyphicon-user form-control-feedback" :class="{'has-error': errors.has('email') }"></span>
	                <span class="help-block" v-show="errors.has('email')" for="email" v-bind:data-error="errors.first('email')">
	                    {{ errors.first('email') }}
	                </span>
	            </div>

	            <div class="form-group has-feedback" :class="{'has-error': errors.has('password') }">
	                <input name="password" v-model="password" v-validate="'required|min:6'" type="password" placeholder="Contraseña" class="form-control">
	                <span class="glyphicon glyphicon-lock form-control-feedback" :class="{'has-error': errors.has('password') }"></span>
	                 <span v-show="errors.has('password')" for="password" v-bind:data-error="errors.first('password')">
	                    {{ errors.first('password') }}
	                </span>
	            </div>

	            <div class="row">
	                <div class="col-xs-12 text-right">
	                    <button type="submit" name="action" class="btn btn-primary btn-flat">Iniciar Sesión</button>
	                </div>
	            </div>
	        </form>

	    </div>
	    <!-- /.login-box-body -->

	</div>
</template>

<script>

import auth from '../../controllers/authentication.js'

export default {
	name: 'LoginForm',
	data: () => ({
		email: '',
		password: '',
		showAlert: false,
		errMsg: ''
	}),
	methods: {
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {

				if (result)
				{
					var credentials = {
						email: this.email,
						password: this.password
					}
					auth.authenticate(this, credentials)
				}
				else
				{
					this.showAlert = true;
					this.errMsg = "Invalid credentials";
				}

			});
		}
	}
};
</script>

<style lang="css">
  .login-box, .register-box{
		margin-top: 20px;
	}
	.has-error { color: #dd4b39 !important }
</style>
