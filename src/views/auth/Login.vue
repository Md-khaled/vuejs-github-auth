<template>
  <div class="bg-light p-5">
    <div  class="row justify-content-md-center">
    <div class="col-6 offsets-3">
      <div class="card text-center">
        <div class="card-header">
          <h1 class="h4 text-gray-900 mb-4">Login an Account!</h1>
        </div>
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"  placeholder="Enter Email Address...">
            </div>
            <div class="mb-3">
              <label for="Password" class="form-label">Password</label>
              <input v-model="user.password" type="password" class="form-control" id="Password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <hr>
          <div class="text-center">
            <router-link :to="{name: 'Register'}" class="small">Don't have an account? Register!</router-link>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email:'',
          password:'',
        }
      }
    },
    methods:{
      login(){
        this.$Progress.start();
        this.axios.post(`${window.http}/api/login`,this.user)
        .then(response=>{
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.updateAuthStatus();
          this.$Progress.finish();
          this.$router.push({name:'Home'});

        })
        .catch((errs)=>{
          let errors=errs.response.data.errors;
          this.errorMsg(errors);
          console.log(errs);
        })
      },
      updateAuthStatus() {
        window.bus.$emit('authStatus', true)
      },
      errorMsg(msg){
        let self=window;
        var x;
        for (x in msg) {
          self.iziToast.error({
            title: 'Error',
            position: 'topRight',
            message:msg[x],
          });
          console.log(x);
        }

      },

    }
  }
</script>

