<template lang="html">
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          Order by
          <nav aria-label="Page navigation example">
            <ul class="pagination  justify-content-center">

              <li class="page-item"  :class="orderByColumn == 'name' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderByColumn('name')">Name</a></li>
              <li class="page-item"  :class="orderByColumn == 'likes' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderByColumn('likes')">Likes</a></li>
              <li class="page-item"  :class="orderByColumn == 'price' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderByColumn('price')">Price</a></li>
              <li class="page-item"  :class="orderByColumn == 'stock' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderByColumn('stock')">Stock</a></li>
            </ul>
          </nav>
          <nav aria-label="Page navigation example">
            <ul class="pagination  justify-content-center">
              <li class="page-item"  :class="orderBy == 'asc' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderBy('asc')">ASC <i class="f arrow-up"></i></a></li>
              <li class="page-item"  :class="orderBy == 'desc' ? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadOrderBy('desc')">DESC <i class="f arrow-down"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 col-sm-6"  v-for="product in products.result">

          <div class="card mb-4 box-shadow">
            <div class="card-body">
              <p>
                <h3>
                  {{ product.name }}
                </h3>
              </p>
              <p>
                <h5>
                  Price: $ {{ product.price }}
                </h5>
              </p>

              <p class="card-text">{{ product.description }}.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-primary" v-on:click="likeProduct(product.id)"><i class="fa fa fa-thumbs-o-up"></i> Like {{product.likes}}</button>
                  <button type="button" class="btn btn-sm btn-outline-success"><i class="fa fa-cart-plus"></i> Add to Cart</button>
                </div>

              </div>
              <div class="d-flex align-items-end">
                <small >Stock: {{product.stock}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <nav aria-label="Page navigation example">
            <ul class="pagination  justify-content-center">

              <li class="page-item" ><a class="page-link" :class="products.current_page == 1 ? 'disabled': ''" href="javascript:void(0)" v-on:click="loadPreviousProducts">&laquo;</a></li>
              <li class="page-item" v-for="index in products.pages" :class="index == products.current_page? 'disabled': ''"><a class="page-link" href="javascript:void(0)" v-on:click="loadProducts(index)">{{ index }}</a></li>
              <li class="page-item"><a class="page-link" href="javascript:void(0)" :class="products.pages == products.current_page? 'disabled': ''" v-on:click="loadNextProducts">&raquo;</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsController from '../../controllers/products.js'

export default {
  name: 'products',
  data() {
    return {
      products: [],
      page: 1,
      orderByColumn: 'name',
      orderBy: 'asc',
      previousPage: 0,
      nextPage: 0,
      product : {}
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData',
    products: function(val, oldVal) {
      this.previousPage = Number(val.current_page) - 1
      this.nextPage = Number(val.current_page) + 1
      console.log(val)
    },
    product: function(val, oldVal) {
      productsController.index(this)
    }
  },
  methods: {
    fetchData() {
      productsController.index(this)
    },
    loadPreviousProducts(){
      this.page = this.previousPage
      productsController.index(this)
    },
    loadNextProducts(){
      this.page = this.nextPage
      productsController.index(this)
    },
    loadProducts(page){
      this.page = page
      productsController.index(this)
    },
    loadOrderByColumn(orderByColumn){
      this.orderByColumn = orderByColumn
      productsController.index(this)
    },
    loadOrderBy(orderBy){
      this.orderBy = orderBy
      productsController.index(this)
    },
    likeProduct(id){
      productsController.likeProduct(this, id)
    }
  }

}
</script>

<style lang="css">
  .page-link {
    color: #007bff !important;
  }
  .btn-outline-success {
    color: #28a745;
    background-color: transparent;
    background-image: none;
    border-color: #28a745 !important;
  }
  .btn-outline-primary {
    color: #007bff;
    background-color: transparent;
    background-image: none;
    border-color: #007bff !important;
  }
</style>
