<template>
<div class="">
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 py-4">
            <h4 class="text-white">About</h4>
            <p class="text-muted">Snack store.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark box-shadow">
      <div class="container d-flex justify-content-between">
        <a href="#" class="navbar-brand d-flex align-items-center">
          <img src="../assets/images/logo2.png" alt="" class="img-fluid" style="max-width: 40px;">
          <strong>&nbsp;&nbsp;Snack Store</strong>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
  <main role="main">
    <router-view/>
  </main>
</div>

</template>



<style lang="css">

  @import '../assets/bower_components/font-awesome/css/font-awesome.min.css';
  @import '../assets/bower_components/Ionicons/css/ionicons.min.css';
  .breadcrumb > li { width: auto !important }
  .help-block{ color: #dd4b39 !important; }
  .has-error { color: #dd4b39 !important }
  .btn.has-error { border-color: #dd4b39 !important }
  .table > tbody > tr > td {
       vertical-align: middle;
  }
  .margin { margin: 5px; }
</style>
