<template>
  <div class="container">
    <div class="row mt-5">
      <form class="row p-0" @submit.prevent="searchProduct()">
        <div class="col-auto">
            <input v-model="search.title" type="text" name="title" placeholder="Product Title" class="form-control">
        </div>
        <div class="col-auto">
          <div class="input-group">
            <span class="input-group-text">Price Range</span>
            <input type="text" v-model="search.price_from" name="price_from" aria-label="First name" placeholder="From" class="form-control">
            <input type="text" v-model="search.price_to" name="price_to" aria-label="Last name" placeholder="To" class="form-control">
          </div>
        </div>
        <div class="col-auto">
          <input type="date" v-model="search.date" name="date" placeholder="Date" class="form-control">
        </div>
        <div class="col-2 float-end">
          <button type="submit" class="btn btn-primary mb-3"><i class="fa fa-search"></i></button>
        </div>
      </form>
      <div class="col-md-12 p-0">
        <div class="card">

          <div class="card-header">
            <div class="card-tools">
              <h3 class="d-flex justify-content-between mb-0">
                <span class="card-title my-auto">Product List</span>
                <button class="btn btn-success"  @click.prevent="showModal()">Add New <i class="fas fa-plus"></i></button>
              </h3>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table">
              <thead class="thead-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Image</th>
                <th>Price</th>
                <th>Details</th>
                <th>Status</th>
                <th>Created At</th>
                <th width="15%">Modify</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product, index) in productList" :key="index">
                <td class="align-middle">{{ product.id }}</td>
                <td class="align-middle">{{ product.title | upperText }}</td>
                <td class="align-middle"> <img width="20%"  :src="getProductImg(product.img_path)" class="img-fluid"/></td>
                <td class="align-middle">{{ product.price }}</td>
                <td class="align-middle">{{ product.details }}</td>
                <td class="align-middle"><span :class="product.status?'badge badge-primary':'badge badge-danger'">{{ product.status?'Active':'In Active' }}</span></td>
                <td class="align-middle">{{ product.created_at |formateDate}}</td>
                <td class="align-middle">
                  <button @click.prevent="editModal(product)"   class="btn btn-success mr-5"><i class="fa fa-edit"></i></button>
                  <button @click.prevent="deleteProduct(product.id)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                </td>
              </tr>
              <tr v-if="productList==''">
                <td colspan="8"><h3 class="text-center">Product Not Found</h3></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <pagination :data="paginate" @pagination-change-page="loadProduct" align="right"></pagination>
          </div>
        </div>

      </div>
    </div>

    <!--    modal-->

    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Update Product' : 'Add New Product' }}</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode?updateProduct():addProduct()" id="clearForm">

            <div class="modal-body">
              <div class="form-group">
                <label for="product-title" class="col-form-label">Title:</label>
                <input v-model="products.title" type="text" class="form-control" id="product-title">
              </div>
              <div class="form-group">
                <label for="product-price" class="col-form-label">Price:</label>
                <input v-model="products.price" type="number" class="form-control" id="product-price">
              </div>
              <div class="form-group">
                <label for="product-details" class="col-form-label">Description:</label>
                <textarea v-model="products.details" class="form-control" id="product-details"></textarea>
              </div>
              <div class="form-group">
                <label for="product-image" class="col-form-label">Upload Image:</label><br/>
                <img width="50%" height="50%" :src="new_image" class="img-fluid mx-auto d-block"/>
                <img :style="imageEditMode?'':'display:none'" width="50%" height="50%"
                     :src="imageEditMode?getProductImg(products.img_path):''" class="img-fluid mx-auto d-block"/>
                <div v-if="!imageEditMode" class="mt-3">
                  <input @change="uploadImage" type="file" class="form-control" id="product-image">
                </div>
                <div v-else class="mt-3 py-3">
                  <button @click="RemoveImage" type="button" class="btn btn-danger mt-2 float-right d-block">Change
                    image
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label class="col-form-label">Status:</label>
                <select v-model="products.status" class="form-control">
                  <option value=''>Choose option</option>
                  <option value="1">Active</option>
                  <option value="0">InActive</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Add New' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Modal} from "bootstrap";

export default {
  name: 'ProductList',
  data() {
    return {
      paginate:{},
      access_token: false,
      Modal:'',
      editMode: false,
      imageEditMode: true,
      productList: [],
      base_path: window.location.origin,
      search: {
        title: '',
        price_from: '',
        price_to: '',
        date: '',
      },
      new_image: '',
      products: {
        id: '',
        title: '',
        price: '',
        img_path: '',
        details: '',
        status: '',
        created_at: '',
      }
    }

  },
  components: {Modal},
  methods: {
    modalInstance(){
      let productModal = new Modal(document.getElementById('productModal'));
      this.Modal=productModal;
    },
    loadProduct(page = 1) {
      this.axios.get('api/products?page=' + page)
          .then(response => {
            console.log(response);
            // handle success
            this.paginate = response.data;
            this.productList = response.data.data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    },
    uploadImage(event) {
      let file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.new_image = reader.result;
      }
      reader.readAsDataURL(file);

    },
    getProductImg(img) {

      let photo = `${window.http}/storage/products/` + img;
      return photo;
    },
    RemoveImage() {
      this.imageEditMode = false;
      this.new_image = '';
    },
    searchProduct() {
      this.$Progress.start();
      this.axios.post('api/search-product', this.search)
          .then((data) => {
            console.log(data);
            this.productList = data.data.data;
            //this.successMsg("Record insert successfully");
            this.$Progress.finish();
          })
          .catch((error) => {
            let errors = error.response.data.errors;
            this.errorMsg(errors);
            this.$Progress.fail();
          })
    },
    addProduct() {
      this.$Progress.start();
      this.products.img_path = this.new_image;
      this.axios.post('api/products', this.products)
          .then(() => {
            this.loadProduct();
            this.Modal.hide();
            this.successMsg("Record insert successfully");
            this.$Progress.finish();
          })
          .catch((error) => {
            let errors = error.response.data.errors;
            this.errorMsg(errors);
            this.$Progress.fail();
          })
    },
    updateProduct() {
      let self = this;
      if (self.new_image != '') {
        self.products.img_path = self.new_image;
        self.$set(self.products, 'imageEditMode', true);
        self.new_image = '';
      }
      self.axios.put('api/products/' + this.products.id, this.products).then(() => {
        self.loadProduct();
        self.Modal.hide();
        this.successMsg("Record updated successfully");
      }).catch((error) => {
        let errors = error.response.data.errors;
        this.errorMsg(errors);
        this.$Progress.fail();
      })
    },
    deleteProduct(product_id) {
      console.log(product_id);
      let ref = this;
      window.iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        title: 'Hey',
        message: 'Are you sure to delete that?',
        position: 'center',
        buttons: [
          ['<button><b>Yes</b></button>', function (instance, toast) {
            instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
            ref.axios.delete("api/products/" + product_id)
                .then(response => {
                  console.log(response);
                  ref.loadProduct();
                  window.iziToast.success({
                    title: 'Success',
                    message: response.data.success,
                  });
                })
                .catch(err => {
                  console.log(err);
                })
          }, true],
          ['<button><b>Cancel</b></button>', function (instance, toast) {
            instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
          }],
        ],
      });
    },
    successMsg(msg) {
      window.iziToast.success({
        title: 'Success',
        position: 'topRight',
        message: msg,
      });
    },
    errorMsg(msg) {
      let self = window;
      var x;
      for (x in msg) {
        self.iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: msg[x],
        });
        console.log(x);
      }
    },
    showModal() {
      this.editMode = false;
      this.imageEditMode = false;
      var myInput = document.getElementById('myInput')
      var myModalEl = document.getElementById('productModal')
      console.log('sssss');
      myModalEl.addEventListener('shown.bs.modal', function (event) {
        console.log(event);
      })
      this.resetModal();
    },
    editModal(product) {
      this.editMode = true;
      this.imageEditMode = true;
      this.products = product;
      this.resetModal();
    },
    resetModal() {
      this.new_image = '';
      //productModaldocument.getElementById('clearForm').dispose();
      this.Modal.show();
    },
  },
  mounted() {
    this.modalInstance();
  },
  created() {
    this.loadProduct();

  },
}
</script>