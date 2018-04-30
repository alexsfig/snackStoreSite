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
            <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" :alt="product.name" style="height: 225px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22208%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20208%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163151f44cd%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A11pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163151f44cd%22%3E%3Crect%20width%3D%22208%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2266.953125%22%20y%3D%22117.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
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
</style>
