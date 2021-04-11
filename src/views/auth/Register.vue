<template>
  <div class="bg-light p-5">
    <div  class="row justify-content-md-center">
      <div class="col-6 offsets-3">
        <div class="card text-center">
          <div class="card-header">
            <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="registration">
              <div class="mb-3">
                <label for="name" class="form-label">Your Name</label>
                <input v-model="user.name" type="text" class="form-control" id="name" aria-describedby="emailHelp"  placeholder="First Name...">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"  placeholder="Enter Email Address...">
              </div>
              <div class="mb-3">
                <label for="Password" class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="Password" placeholder="Password">
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label">Password Confirmation</label>
                <input v-model="user.password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Repeat Password">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <hr>
            <div class="text-center">
              <router-link :to="{name: 'Login'}" class="small">Already have an account? Login!</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"Register",
    data(){
      return {
        user:{
          name:'',
          email:'',
          password:'',
          password_confirmation:''
        }
      }
    },
    methods: {
      registration(){
        this.$Progress.start();
        this.axios.post(`${window.http}/api/register`,this.user)
            .then((response)=>{
              console.log(response);
              this.successMsg("Registration success");
              localStorage.setItem('access_token',response.data.access_token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              this.updateAuthStatus();
              this.$Progress.finish();
              this.$router.push({name:'Home'});
            })
            .catch((errors)=>{
              let error=errors.response.data.errors;
              this.errorMsg(error);
              this.$Progress.fail();
            })
      },
      updateAuthStatus() {
        window.bus.$emit('authStatus', true)
      },
      successMsg(msg){
        window.iziToast.success({
          title: 'Success',
          position: 'topRight',
          message: msg,
        });
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

    },
    mounted() {
    }


  }
</script>